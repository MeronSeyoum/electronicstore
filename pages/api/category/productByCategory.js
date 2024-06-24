import mysql from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Only GET requests allowed' });
    }

    const { id } = req.query;

    try {
        const connectionParams = serverRuntimeConfig.dbConfig;
        const connection = await mysql.createConnection(connectionParams);

        // Base query to fetch data
        let query = `
            SELECT 
                p.id,
                p.slug,
                p.product_name,
                p.description,
                pc.name AS category_name,
                d.percentage AS discount_percentage,
                p.price,
                p.quantity,
                p.color,
                p.size,
                p.justIn,
                pi.image_path AS main_image,
                r.rating,
                r.reviews
            FROM
                electronic_shop.product AS p
            JOIN
                electronic_shop.product_category AS pc ON p.category_id = pc.id
            LEFT JOIN
                electronic_shop.discount AS d ON p.discount_id = d.id
            LEFT JOIN
                electronic_shop.product_images AS pi ON p.id = pi.product_id AND pi.isMain = true
            LEFT JOIN
                electronic_shop.ratings AS r ON p.id = r.product_id
        `;

        // Array to hold query parameters
        const values = [];

        // Modify query if category ID is provided
        if (id) {
            query += ` WHERE p.category_id = ?`;
            values.push(id);
        }

        // Execute the query and retrieve the results
        const [results] = await connection.execute(query, values);

        // Close the connection when done
        await connection.end();

        // Return the results as a JSON API response
        res.status(200).json(results);
    } catch (err) {
        console.error('ERROR: API - ', err.message);
        // Return the error message as a JSON API response with appropriate status code
        res.status(500).json({ error: err.message });
    }
}
