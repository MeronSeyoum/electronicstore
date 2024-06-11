import mysql from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send({ message: 'Only GET requests allowed' });
    }

    const { userId } = req.query;

    if (!userId) {
        return res.status(400).send({ message: 'User id is required' });
    }

    try {
        const connectionParams = serverRuntimeConfig.dbConfig;
        const connection = await mysql.createConnection(connectionParams);

        // Query to fetch user addresses based on user id
        const query = `SELECT * FROM electronic_shop.user_address where user_id=?`;
        const [rows] = await connection.execute(query,[userId]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'No address found for this user' });
        }

        // Close the connection when done
        await connection.end();

        // Return the results as a JSON API response
        res.status(200).json(rows);
    } catch (err) {
        console.error('ERROR: API - ', err.message);
        // Properly handle errors
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
