import mysql from 'mysql2/promise';
import getConfig from 'next/config';

// Retrieve database configuration from server runtime configuration
const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  // Allow only GET requests; return 405 for other methods
  if (req.method !== 'GET') {
    return res.status(405).send({ message: 'Only GET requests allowed' });
  }

  // Extract query parameter 'q' for search functionality
  const { q } = req.query;

  try {
    // Establish a connection to the MySQL database
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection(connectionParams);

    // Base SQL query to fetch product details
    let productQuery = `
      SELECT p.id, p.slug, p.product_name, pc.name AS category_name, 
             p.price, p.justIn, p.created_at
      FROM electronic_shop.product AS p
      JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id
      JOIN electronic_shop.discount AS d ON p.discount_id = d.id
      LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id
    `;

    // Initialize array to hold query parameters
    const values = [];

    // Modify query if search term 'q' is provided
    if (q) {
      // Add WHERE clause to filter products by name or category name
      productQuery += ` WHERE p.product_name LIKE ? OR pc.name LIKE ?`;
      values.push(`%${q}%`, `%${q}%`); // Add search terms to values array
    }

    // Execute the product query to retrieve products
    const [products] = await connection.execute(productQuery, values);

    // Query to fetch images for all products in one go
    let imagesQuery = `
      SELECT product_id, image_path, product_image, isMain
      FROM electronic_shop.product_images
      WHERE product_id IN (${products.map(() => '?').join(', ')})
    `;
    
    // Adjust image query if 'q' is not present to only fetch main images
    if (!q) {
      imagesQuery += ' AND isMain = 1';
    }

    // Execute the image query
    const [images] = await connection.execute(imagesQuery, products.map(p => p.id));

    // Create a map to associate images with their respective products
    const imagesMap = images.reduce((map, img) => {
      if (!map[img.product_id]) map[img.product_id] = [];
      map[img.product_id].push({
        src: img.product_image ? `data:image/png;base64,${Buffer.from(img.product_image).toString('base64')}` : img.image_path || '/placeholder_image.jpg',
        isMain: img.isMain,
      });
      return map;
    }, {});

    // Process each product to include images and main image
    const processedProducts = products.map(product => {
      product.images = imagesMap[product.id] || []; // Associate images with product
      product.main_image = product.images.find(img => img.isMain)?.src || '/placeholder_image.jpg'; // Set main image
      return product;
    });

    // Query to fetch slides and banners
    const slidesQuery = `
      SELECT id, type, title, discount, price, link, banner_img AS image, alt, banner_desc
      FROM electronic_shop.slide_Banner
    `;
    const [slidesAndBanners] = await connection.execute(slidesQuery);

    // Close the database connection
    await connection.end();

    // Respond with combined results: products and slides/banners
    res.status(200).json({
      products: processedProducts,
      slidesAndBanners,
    });
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error('ERROR: API -', error.message);
    res.status(500).json({ error: error.message });
  }
}












// import mysql from "mysql2/promise";
// import getConfig from "next/config";

// const { serverRuntimeConfig } = getConfig();

// export default async function handler(req, res) {
//   if (req.method !== "GET") {
//     return res.status(405).json({ message: "Only GET requests allowed" });
//   }

//   const { q } = req.query;

//   try {
//     const connectionParams = serverRuntimeConfig.dbConfig;
//     const connection = await mysql.createConnection(connectionParams);

//     // Base query to fetch product data
//     let query = `
//       SELECT p.id, p.slug, p.product_name, p.description, 
//              pc.name AS category_name,  
//              d.percentage, 
//              p.price, 
//              p.quantity, 
//              p.color, 
//              p.size, 
//              p.justIn, 
//              p.created_at,
//              r.rating,
//              r.reviews
//       FROM electronic_shop.product AS p
//       JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id
//       JOIN electronic_shop.discount AS d ON p.discount_id = d.id
//       LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id
//     `;

//     // Array to hold query parameters
//     let values = [];

//     // Modify query if search term is provided
//     if (q) {
//       query += ` WHERE p.product_name LIKE ? OR pc.name LIKE ?`;
//       values.push(`%${q}%`, `%${q}%`); // Correctly format placeholders for search term
//     }

//     // Append GROUP BY clause after WHERE clause
//     query += `
//       GROUP BY p.id, p.slug, p.product_name, p.description, pc.name, d.percentage, 
//                p.price, p.quantity, p.color, p.size, p.justIn, r.rating, r.reviews
//     `;

//     // Execute the query and retrieve the results
//     const [results] = await connection.execute(query, values);

//     // Process each result to check for images and features
//     const processedResults = await Promise.all(results.map(async (result) => {
//       // Fetch features for the product
//       const [featureRows] = await connection.execute(
//         "SELECT feature FROM electronic_shop.ProductFeatures WHERE product_id = ? ORDER BY id DESC",
//         [result.id]
//       );

//       // Fetch all images for the product
//       const [imageRows] = await connection.execute(
//         "SELECT image_path, product_image, isMain FROM electronic_shop.product_images WHERE product_id = ?",
//         [result.id]
//       );

//       // Process images
//       result.images = imageRows.map(image => {
//         if (image.product_image) {
//           // If product_image (blob) exists, use it
//           return {
//             src: `data:image/png;base64,${Buffer.from(image.product_image).toString('base64')}`,
//             isMain: image.isMain
//           };
//         } else {
//           // Use image_path
//           return {
//             src: image.image_path || '/placeholder_image.jpg',
//             isMain: image.isMain
//           };
//         }
//       });

//       // Set main image, if available
//       result.main_image = result.images.find(img => img.isMain)?.src || '/placeholder_image.jpg';

//       // Add features to the product object
//       result.features = featureRows.map(row => row.feature).join('; ');

//       return result;
//     }));

//     // Close the connection when done
//     await connection.end();

//     // Return the results as a JSON API response
//     res.status(200).json(processedResults);
//   } catch (err) {
//     console.error("ERROR: API - ", err.message);
//     // Return the error message as a JSON API response with appropriate status code
//     res.status(500).json({ error: err.message });
//   }
// }
