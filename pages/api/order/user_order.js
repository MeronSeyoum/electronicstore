import mysql from "mysql2/promise";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Only GET requests allowed" });
  }

  const { userId } = req.query;

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection(connectionParams);

// Base query to fetch data
let query = `
      SELECT
        o.id AS order_id,
        CONCAT(u.first_name, ' ', u.last_name) AS customer_name,
        GROUP_CONCAT(p.product_name SEPARATOR ', ') AS products,
        SUM(oi.quantity) AS total_quantity,
        o.total AS total_price,
        'Shipped' AS status,
        o.created_at AS order_date,
        op.status AS payment_status
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
      WHERE
        o.user_id = ?
      GROUP BY
        o.id, u.first_name, u.last_name, o.total, op.status, o.created_at
      ORDER BY
        o.created_at DESC;
    `;

    const [rows] = await connection.execute(query, [userId]);
    await connection.end();

    return res.status(200).json(rows);
  } catch (error) {
    console.error("Error executing SQL query:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
