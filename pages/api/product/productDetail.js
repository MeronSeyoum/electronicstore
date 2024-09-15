import mysql from 'mysql2/promise';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Only GET requests allowed' });
  }
  
  const { slug } = req.query;
  
  if (!slug) {
    return res.status(400).json({ message: 'Missing product slug' });
  }

  try {
    const connectionParams = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection(connectionParams);

    // Fetch products based on slug
    const productQuery = `
      SELECT p.id, p.slug, p.product_name, p.description, 
             pc.name AS category_name, d.percentage, p.price, p.quantity, 
             p.color, p.size, p.justIn, p.created_at, r.rating, r.reviews
      FROM electronic_shop.product AS p
      JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id
      JOIN electronic_shop.discount AS d ON p.discount_id = d.id
      LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id
      WHERE p.slug = ?
      GROUP BY p.id, p.slug, p.product_name, p.description, pc.name, d.percentage, 
               p.price, p.quantity, p.color, p.size, p.justIn, r.rating, r.reviews
    `;

    // Execute product query
    const [products] = await connection.execute(productQuery, [slug]);

    // Process products with features and images
    const processedProducts = await Promise.all(products.map(async (product) => {
      // Fetch features
      const [features] = await connection.execute(
        'SELECT feature FROM electronic_shop.ProductFeatures WHERE product_id = ? ORDER BY id DESC',
        [product.id]
      );
      
      // Fetch images
      const [images] = await connection.execute(
        'SELECT image_path, product_image, isMain FROM electronic_shop.product_images WHERE product_id = ?',
        [product.id]
      );

      product.features = features.map(f => f.feature).join('; ');
      product.images = images.map(img => ({
        src: img.product_image ? `data:image/png;base64,${Buffer.from(img.product_image).toString('base64')}` : img.image_path || '/placeholder_image.jpg',
        isMain: img.isMain,
      }));
      product.main_image = product.images.find(img => img.isMain)?.src || '/placeholder_image.jpg';

      return product;
    }));

    // Close the connection
    await connection.end();

    // Return the processed products
    res.status(200).json({ products: processedProducts });
  } catch (error) {
    console.error('ERROR: API -', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
