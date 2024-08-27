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
            SELECT p.id, p.slug, p.product_name, p.description, 
             pc.name AS category_name,  
             d.percentage, 
             p.price, 
             p.quantity, 
             p.color, 
             p.size, 
             p.justIn, 
             r.rating,
             r.reviews
      FROM electronic_shop.product AS p
      JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id
      JOIN electronic_shop.discount AS d ON p.discount_id = d.id
      LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id
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



// New code

    // Process each result to check for images and features
    const processedResults = await Promise.all(results.map(async (result) => {
        // Fetch features for the product
        const [featureRows] = await connection.execute(
          "SELECT feature FROM electronic_shop.ProductFeatures WHERE product_id = ? ORDER BY id DESC",
          [result.id]
        );
  
        // Fetch all images for the product
        const [imageRows] = await connection.execute(
          "SELECT image_path, product_image, isMain FROM electronic_shop.product_images WHERE product_id = ?",
          [result.id]
        );
  
        // Process images
        result.images = imageRows.map(image => {
          if (image.product_image) {
            // If product_image (blob) exists, use it
            return {
              src: `data:image/png;base64,${Buffer.from(image.product_image).toString('base64')}`,
              isMain: image.isMain
            };
          } else {
            // Use image_path
            return {
              src: image.image_path || '/placeholder_image.jpg',
              isMain: image.isMain
            };
          }
        });
  
        // Set main image, if available
        result.main_image = result.images.find(img => img.isMain)?.src || '/placeholder_image.jpg';
  
        // Add features to the product object
        result.features = featureRows.map(row => row.feature).join('; ');
  
        return result;
      }));


        // Close the connection when done
        await connection.end();

        // Return the results as a JSON API response
        res.status(200).json(processedResults);
    } catch (err) {
        console.error('ERROR: API - ', err.message);
        // Return the error message as a JSON API response with appropriate status code
        res.status(500).json({ error: err.message });
    }
}
