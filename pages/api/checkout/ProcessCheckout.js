// /pages/api/order/create.js

import { createConnection } from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  const { session_id, paymentMethod, paymentStatus, transactionId, shipmentIcon, shipmentTitle, shipmentDescription, total } = req.body;

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await createConnection(connectionParams);

    // Start a transaction
    await connection.beginTransaction();

    // Fetch session data
    const [sessionRows] = await connection.execute('SELECT * FROM shopping_session WHERE id = ?', [session_id]);
    const sessionData = sessionRows[0];

    if (!sessionData) {
      await connection.rollback();
      await connection.end();
      return res.status(404).json({ error: 'Session not found' });
    }

    // Insert into order_details
    const [orderResult] = await connection.execute(
      'INSERT INTO order_details (user_id, total, created_at) VALUES (?, ?, NOW())',
      [sessionData.user_id, total]
    );
    const orderId = orderResult.insertId;

    // Fetch cart items
    const [cartItems] = await connection.execute('SELECT * FROM cart_item WHERE session_id = ?', [session_id]);

    // Insert into order_item
    for (const item of cartItems) {
      await connection.execute(
        'INSERT INTO order_item (order_id, product_id, quantity, price, created_at) VALUES (?, ?, ?, ?, NOW())',
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // Insert into payment_detail
    await connection.execute(
      'INSERT INTO payment_detail (order_id, amount, payment_method, status, transaction_id, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [orderId, total, paymentMethod, paymentStatus, transactionId]
    );

    // Insert into carrier (if not already present)
    const [carrierResult] = await connection.execute(
      'INSERT INTO carrier (name, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)',
      [shipmentTitle, shipmentDescription]
    );
    const carrierId = carrierResult.insertId;

    // Insert into shipment_details
    await connection.execute(
      'INSERT INTO shipment_details (order_id, carrier_id, icon, title, description) VALUES (?, ?, ?, ?, ?)',
      [orderId, carrierId, shipmentIcon, shipmentTitle, shipmentDescription]
    );

    // Commit the transaction
    await connection.commit();

    // Delete cart items and shopping session after successful commit
    // await connection.execute('DELETE FROM cart_item WHERE session_id = ?', [session_id]);
    // await connection.execute('DELETE FROM shopping_session WHERE id = ?', [session_id]);

    await connection.execute('UPDATE shopping_session SET session_status = ? WHERE id = ?', ['session ended', session_id]);


    await connection.end();

     return res.status(200).json({ message: 'Order created successfully', clearSession: true });

  } catch (error) {
    console.error('Error executing SQL query:', error);

    try {
      await connection.rollback();
    } catch (rollbackError) {
      console.error('Error rolling back transaction:', rollbackError);
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
