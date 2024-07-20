import mysql from "mysql2/promise";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).send({ message: "Only GET requests allowed" });
  }

  const { q } = req.query;

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection(connectionParams);

    // Base query to fetch data
    let query = `
      SELECT p.id, p.slug, p.product_name, p.description, 
             pc.name AS category_name,  
             d.percentage, 
             p.price, p.quantity, p.color, p.size, p.justIn, 
             GROUP_CONCAT(DISTINCT pi.image_path) AS main_image,
             GROUP_CONCAT(DISTINCT pf.feature SEPARATOR '; ') AS features, -- Concatenate features
             r.rating,
             r.reviews
      FROM electronic_shop.product AS p
      JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id
      JOIN electronic_shop.discount AS d ON p.discount_id = d.id
      LEFT JOIN electronic_shop.product_images AS pi ON p.id = pi.product_id
      LEFT JOIN electronic_shop.ProductFeatures AS pf ON p.id = pf.product_id -- Join with ProductFeatures
      LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id
    `;

    // Array to hold query parameters
    let values = [];

    // Modify query if search term is provided
    if (q) {
      query += ` WHERE p.product_name LIKE ?`;
      values.push(`%${q}%`);
    }

    // Append GROUP BY clause after WHERE clause
    query += `
      GROUP BY p.id, p.slug, p.product_name, p.description, pc.name, d.percentage, 
               p.price, p.quantity, p.color, p.size, p.justIn, r.rating, r.reviews
    `;

    // Execute the query and retrieve the results
    const [results] = await connection.execute(query, values);

    // Close the connection when done
    connection.end();

    // Return the results as a JSON API response
    res.status(200).json(results);
  } catch (err) {
    console.error("ERROR: API - ", err.message);
    // Return the error message as a JSON API response with appropriate status code
    res.status(500).json({ error: err.message });
  }
}
