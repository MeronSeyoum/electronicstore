//services/cartService
import { createConnection } from "mysql2/promise";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

// Function to add an item to the cart
async function addToCart(userId, productId, quantity) {
  //   const connection = await pool.getConnection();
const connectionParams = serverRuntimeConfig.dbConfig;
  const connection = await createConnection(connectionParams);

  try {
    await connection.query(
      "INSERT INTO cart_item (session_id, product_id, quantity) VALUES(?, ?, ?)",
      [userId, productId, quantity]
    );
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Function to retrieve cart items for a user
async function getCartItems(userId) {
alert("retrieving data")

  //   const connection = await pool.getConnection();
  const connectionParams = serverRuntimeConfig.dbConfig;
  const connection = await createConnection(connectionParams);
  try {
    const [rows] = await connection.query(
      "SELECT ci.id AS cart_item_id,p.id AS product_id, p.slug, p.product_name, p.desc AS description, pc.name AS category_name, d.percentage, p.price, p.quantity, p.color, p.size, p.justIn, pi.image_path AS main_image, r.rating, r.reviews FROM electronic_shop.cart_item AS ci JOIN electronic_shop.shopping_session AS ss ON ci.session_id = ss.id JOIN electronic_shop.product AS p ON ci.product_id = p.id JOIN electronic_shop.product_category AS pc ON p.category_id = pc.id JOIN electronic_shop.discount AS d ON p.discount_id = d.id LEFT JOIN electronic_shop.product_images AS pi ON p.id = pi.product_id AND pi.isMain = true LEFT JOIN electronic_shop.ratings AS r ON p.id = r.product_id WHERE  ss.id =  ?",
      [userId]
    );
    return rows;
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Function to update cart item quantity
async function updateCartItem(userId, productId, quantity) {
  //   const connection = await pool.getConnection();
const connectionParams = serverRuntimeConfig.dbConfig;
  const connection = await createConnection(connectionParams);

  try {
    await connection.query(
      "UPDATE cart_item SET quantity = ? WHERE user_id = ? AND product_id = ?",
      [quantity, userId, productId]
    );
  } catch (error) {
    throw error;
  } finally {
    connection.release();
  }
}

// Export the functions
module.exports = { addToCart, getCartItems, updateCartItem };
