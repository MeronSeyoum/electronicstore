// /pages/api/shoppingSession/createShoppingSession.js

import { createConnection } from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  const { userId, total } = req.body;
  
  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await createConnection(connectionParams);

    const queryString = `INSERT INTO shopping_session (user_id, total) VALUES(?, ?)`;
    const [result] = await connection.execute(queryString, [userId, total]);

    // Get the ID of the newly inserted record
    const newSessionId = result.insertId;

    await connection.end();

    // Return the ID of the newly created shopping session
    return res.status(200).json({ sessionId: newSessionId });
  } catch (error) {
    console.error('Error executing SQL query:', error);
    return res.status(500).json({ error: 'Error creating shopping session' });
  }
}
