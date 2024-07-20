import mysql from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  const { q, type } = req.query;

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection(connectionParams);

    // Base query to fetch data
    let query = `
      SELECT id, type, title, discount, price, link, banner_img AS image, alt
      FROM electronic_shop.slide_Banner
    `;

    // Array to hold query parameters
    let values = [];

    // Modify query if search term or type is provided
    let whereClauses = [];

    if (q) {
      whereClauses.push(`title LIKE ?`);
      values.push(`%${q}%`);
    }

    if (type) {
      whereClauses.push(`type = ?`);
      values.push(type);
    }

    if (whereClauses.length > 0) {
      query += ` WHERE ` + whereClauses.join(' AND ');
    }

    // Execute the query and retrieve the results
    const [results] = await connection.execute(query, values);

    // Close the connection when done
    connection.end();

    // Return the results as a JSON API response
    res.status(200).json(results);
  } catch (err) {
    console.error('ERROR: API - ', err.message);
    // Return the error message as a JSON API response with appropriate status code
    res.status(500).json({ error: err.message });
  }
}
