import { createConnection } from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  if (req.method === 'PUT') {
    const { sessionId, total, userId } = req.body;

    // Validate the request data
    if (!sessionId || typeof total !== 'number') {
      return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
      // Ensure the dbConfig is available
      const connectionParams = serverRuntimeConfig.dbConfig;
      if (!connectionParams) {
        throw new Error('Database configuration is missing');
      }

      const connection = await createConnection(connectionParams);

      // Define the query string based on userId
      let queryString;
      let queryParams;

      if (userId !== 3) {
        queryString = `
          UPDATE electronic_shop.shopping_session
          SET user_id = ?, total = ?, modified_at = NOW()
          WHERE id = ?
        `;
        queryParams = [userId, total, sessionId];
      } else {
        queryString = `
          UPDATE electronic_shop.shopping_session
          SET total = ?, modified_at = NOW()
          WHERE id = ?
        `;
        queryParams = [total, sessionId];
      }

      // Execute the query
      const [result] = await connection.execute(queryString, queryParams);

      await connection.end();

      if (result.affectedRows > 0) {
        return res.status(200).json({ message: 'Total updated successfully' });
      } else {
        return res.status(404).json({ error: 'Session not found' });
      }
    } catch (error) {
      console.error('Error executing SQL query:', error);
      return res.status(500).json({ error: 'Error updating total' });
    }
  } else {
    // Handle any non-PUT requests
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
