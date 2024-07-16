import { createConnection } from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  const { session_id, productId, quantity, price, cart_item_id } = req.body;
  const sessionId = req.query.session_id; // Assuming session_id is passed in the query parameters

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await createConnection(connectionParams);

    if (req.method === 'GET') {
      // Fetch cart items based on session_id
      const queryString = `
        SELECT 
          ci.id AS cart_item_id,
          p.id AS product_id,
          p.slug,
          p.product_name,
          p.description AS description,
          pc.name AS category_name,
          d.percentage,
          p.price,
          ci.quantity,
          p.color,
          p.size,
          p.justIn,
          pi.image_path AS main_image,
          r.rating,
          r.reviews
        FROM 
          electronic_shop.cart_item AS ci
        JOIN
          electronic_shop.shopping_session AS ss ON ci.session_id = ss.id
        JOIN
          electronic_shop.product AS p ON ci.product_id = p.id
        JOIN
          electronic_shop.product_category AS pc ON p.category_id = pc.id
        JOIN
          electronic_shop.discount AS d ON p.discount_id = d.id
        LEFT JOIN
          electronic_shop.product_images AS pi ON p.id = pi.product_id AND pi.isMain = true
        LEFT JOIN
          electronic_shop.ratings AS r ON p.id = r.product_id
        WHERE 
          ss.id = ?`; // Use placeholder for session_id

      // Execute the query with the session_id as parameter and retrieve the results
      const [rows] = await connection.execute(queryString, [sessionId]);
      await connection.end();

      // Return the fetched data as JSON response
      return res.status(200).json(rows);
    } else if (req.method === 'POST') {
      // Add item to cart or update quantity
      const queryString = `INSERT INTO cart_item (session_id, product_id, quantity, price) VALUES (?, ?, ?, ?)
                           ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
      const [rows] = await connection.execute(queryString, [session_id, productId, quantity, price]);
      await connection.end();
      return res.status(200).json({ cart: rows });
    } else if (req.method === 'DELETE') {
      // Delete item from cart
      const queryString = `DELETE FROM cart_item WHERE id = ?`;
      const [rows] = await connection.execute(queryString, [cart_item_id]);
      await connection.end();
      return res.status(200).json({ cart: rows });
    } else if (req.method === 'PUT') {
      // Update item quantity in cart
      const queryString = `UPDATE cart_item SET quantity = ? WHERE id = ?`;
      const [rows] = await connection.execute(queryString, [quantity, cart_item_id]);
      await connection.end();
      return res.status(200).json({ cart: rows });
    } else {
      return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
