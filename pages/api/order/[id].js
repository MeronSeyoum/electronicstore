import { createConnection } from "mysql2/promise";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  const { id } = req.query;
  const userId = req.query.userId;

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await createConnection(connectionParams);

    const queryString = `
      SELECT
        o.id AS order_id,
        CONCAT(u.first_name, ' ', u.last_name) AS customer_name,
        GROUP_CONCAT(CONCAT(p.product_name, ' (', p.price, ')') SEPARATOR ', ') AS products,
        SUM(oi.quantity) AS total_quantity,
        o.total AS total_price,
        'Shipped' AS status,
        o.created_at AS order_date,
        op.status AS payment_status,
        sd.icon as shipping_icon,
        sd.tracking_number,
        sd.title AS shipping_title,
        sd.description AS shipping_description
      FROM
        electronic_shop.order_details AS o
      JOIN
        electronic_shop.users AS u ON o.user_id = u.id
      JOIN
        electronic_shop.order_item AS oi ON oi.order_id = o.id
      JOIN
        electronic_shop.product AS p ON oi.product_id = p.id
      JOIN
        electronic_shop.payment_detail AS op ON op.order_id = o.id
      JOIN
        electronic_shop.shipment_details AS sd ON sd.order_id = o.id
      WHERE
        o.id = ? AND o.user_id = ?
      GROUP BY
        o.id, u.first_name, u.last_name, o.total, op.status, o.created_at, sd.icon, sd.tracking_number, sd.title, sd.description;
         `;

    const [rows] = await connection.execute(queryString, [id, userId]);
    await connection.end();

    if (rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    // Parsing the products string into an array
    const productStrings = rows[0].products ? rows[0].products.split(', ') : [];
    const products = productStrings.map(productString => {
      const [name, price] = productString.split(' (');
      return { name, price: price.replace(')', '') };
    });

    return res.status(200).json({
      ...rows[0],
      products
    });
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
