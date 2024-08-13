
-- Static Data
-- Product Table (product):
-- Contains information about products such as name, description, SKU, category, price, and quantity.
-- Foreign key constraints are added for the category_id and image_id, referencing the product_category and product_images tables, respectively.

-- Product Category Table (product_category):
-- Stores the categories of products.

-- Discount Table (discount):
-- Stores discount information with a percentage and active status.

-- Product Images Table (product_images):
-- Stores the image paths associated with products.
-- Has a foreign key reference to the product table.

-- Ratings Table (ratings):
-- Stores product ratings and reviews.
-- Has a foreign key reference to the product table.

-- User Table (user):
-- Stores user information like username, email, password, first name, last name, and telephone number.
-- Includes unique constraints on the email field.

-- User Address Table (user_address):
-- Stores user addresses with foreign key constraints referencing the user table.


-- Session Data

-- Shopping Session Table (shopping_session):
-- Tracks shopping sessions with a total and a foreign key reference to the user table.

-- Cart Item Table (cart_item):
-- Stores cart items with foreign key references to the shopping session and product tables.



-- Processed Data

-- Order Details Table (order_details):
-- Stores order details with a total and foreign key references to the user and payment details tables.

-- Order Item Table (order_item):
-- Contains order item details such as product, quantity, and price.
-- Foreign key constraints reference the order details and product tables.

-- Payment Detail Table (payment_detail):
-- Stores payment details related to orders, including amount, method, status, and transaction ID.
-- Has a foreign key reference to the order details table.

-- Shipment Details Table (shipment_details):
-- Stores details related to product shipments.
-- Includes a foreign key reference to the product table.

-- carrier Table (carrier):
-- Stores details related to  carrier.
-- stores information about shipping carriers or companies.
-- Tracking Number Table (tracking  
-- A tracking number is associated with a single ship
-- Includes a foreign key reference to the product table.



-- Create the database
CREATE DATABASE IF NOT EXISTS electronic_shop;

-- Use the database
USE electronic_shop;


-- Static Data
-- This component will include somewhat static data that the customer needs only to retrieve while interacting with a shopping cart. The data is stored in the following types of tables:

-- product table
-- category table
-- product_imaged table
-- product_rating table
-- discount table
-- user table 
-- user_address table


-- Product category table stores information about product categories.
CREATE TABLE electronic_shop.product_category (
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Discount table stores information about discounts applicable to products.
CREATE TABLE electronic_shop.discount (
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    percentage DECIMAL(5,2) NOT NULL,
    active BOOLEAN  DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;


-- Product table stores information about each product available in the shop.
CREATE TABLE electronic_shop.product (
    id INT(10) NOT NULL AUTO_INCREMENT,
    slug VARCHAR(255) NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    `desc` TEXT NOT NULL,
    category_id INT(10) NOT NULL,
    price DECIMAL(6,2) NOT NULL,
    quantity INT(10) NOT NULL,
    color VARCHAR(50),            -- New column for product color.
    size VARCHAR(20),             -- New column for product size.
    justIn BOOLEAN DEFAULT FALSE,   -- If true then it is a JIT item.
    discount_id INT(5) DEFAULT '0',
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE KEY prod_index (id) USING BTREE,
    PRIMARY KEY (id),
    CONSTRAINT fk_prod_category
        FOREIGN KEY (category_id)
        REFERENCES electronic_shop.product_category (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_prod_discount
        FOREIGN KEY (discount_id)
        REFERENCES electronic_shop.discount (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

-- Product features table stores product features information about each product available in the shop.

CREATE TABLE electronic_shop.ProductFeatures (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    feature TEXT,
    FOREIGN KEY (product_id) REFERENCES electronic_shop.product(id)
);

-- Product variations table stores information about variations of products (e.g., different colors, sizes).
CREATE TABLE electronic_shop.product_variations (
    id INT(10) NOT NULL AUTO_INCREMENT,
    product_id INT(10) NOT NULL,
    SKU VARCHAR(50) NOT NULL,   -- SKU for the product variation.
    price DECIMAL(6,2) NOT NULL,  -- Price for the product variation.
    quantity INT(10) NOT NULL,  -- Quantity available for the product variation.
    color VARCHAR(50),          -- Color of the product variation.
    size VARCHAR(20),           -- Size of the product variation.
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE KEY variation_index (id) USING BTREE,
    PRIMARY KEY (id),
    FOREIGN KEY (product_id)
        REFERENCES electronic_shop.product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Product images table stores images associated with each product.
CREATE TABLE electronic_shop.product_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    image_path VARCHAR(255) NOT NULL,
    isMain BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (product_id) REFERENCES electronic_shop.product(id)
) ENGINE=InnoDB;


-- Ratings table stores ratings and reviews for each product.
CREATE TABLE electronic_shop.ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    rating DECIMAL(3,1) NOT NULL,
    reviews INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES electronic_shop.product(id)
);

-- User table stores information about registered users.
CREATE TABLE electronic_shop.users (
    id INT(10) NOT NULL AUTO_INCREMENT,
    username VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(20) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) ,
    type_account VARCHAR(20) ,
    status_account VARCHAR(20) ,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY email_unique (email)
) ENGINE=InnoDB;

-- User address table stores addresses associated with each user.
CREATE TABLE electronic_shop.user_address (
    id INT(10) NOT NULL AUTO_INCREMENT,
    user_id INT(10) NOT NULL,
    address_line1 VARCHAR(255) NOT NULL,
    address_line2 VARCHAR(255),
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    country VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_user_address_user
        FOREIGN KEY (user_id)
        REFERENCES electronic_shop.users (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Session Data
-- This is the most important component of the shopping cart database where all the live interactions (session details) are stored when the client is interacting with the shopping cart.

-- shopping_session table
-- cart_item table

-- Shopping session table stores information about user sessions.
CREATE TABLE electronic_shop.shopping_session (
    id INT(30) NOT NULL AUTO_INCREMENT,
    user_id INT(10) DEFAULT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT '0.00',
    session_status VARCHAR(20) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY session_index (id,user_id) USING BTREE,
    PRIMARY KEY (id),
    CONSTRAINT fk_shopping_user
        FOREIGN KEY (user_id)
        REFERENCES electronic_shop.users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;

-- Cart item table stores items added to the shopping cart.
CREATE TABLE electronic_shop.cart_item (
    id INT(20) NOT NULL AUTO_INCREMENT,
    session_id INT(20) NOT NULL,
    product_id INT(20) NOT NULL,
    quantity INT(10) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
   
    UNIQUE KEY cart_item_index (id) USING BTREE,
    PRIMARY KEY (id),
      UNIQUE KEY unique_session_product (session_id, product_id), -- Unique constraint on session_id and product_id
    CONSTRAINT fk_session_item_order
        FOREIGN KEY (session_id)
        REFERENCES electronic_shop.shopping_session (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_cart_item_product
        FOREIGN KEY (product_id)
        REFERENCES electronic_shop.product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;


-- Processed Data
-- Once the customer completes a transaction, we need to permanently store the order information by moving the Session Data into permanent storage. Additionally, we need to store the payment details.

-- order_details table
-- order_items table
-- payment_details table
-- carrier table
-- shipment_details table

-- Order details table stores information about each order.
CREATE TABLE electronic_shop.order_details (
    id INT(20) NOT NULL AUTO_INCREMENT,
    user_id INT(10),
    total DECIMAL(10,2) NOT NULL,
    order_status VARCHAR(20) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE KEY order_index (id) USING BTREE,
    UNIQUE KEY customer_order_index (id,user_id) USING BTREE,
    PRIMARY KEY (id),
    CONSTRAINT fk_shopping_user_order
        FOREIGN KEY (user_id)
        REFERENCES electronic_shop.users (id)
        ON DELETE SET NULL
        ON UPDATE SET NULL
) ENGINE=InnoDB;


-- Order item table stores items included in each order.
CREATE TABLE electronic_shop.order_item (
    id INT(20) NOT NULL AUTO_INCREMENT,
    order_id INT(20) NOT NULL,
    product_id INT(20) NOT NULL,
    quantity INT(10) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE KEY order_item_index (id) USING BTREE,
    PRIMARY KEY (id),
    CONSTRAINT fk_order_item_order
        FOREIGN KEY (order_id)
        REFERENCES electronic_shop.order_details (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    CONSTRAINT fk_order_item_product
        FOREIGN KEY (product_id)
        REFERENCES electronic_shop.product (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Payment detail table stores payment information for each order.
CREATE TABLE electronic_shop.payment_detail (
    id INT(20) NOT NULL AUTO_INCREMENT,
    order_id INT(20) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    payment_method VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    transaction_id VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    UNIQUE KEY payment_index (id) USING BTREE,
    PRIMARY KEY (id),
    CONSTRAINT fk_payment_order
        FOREIGN KEY (order_id)
        REFERENCES electronic_shop.order_details (id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;


-- carrier table stores information about shipping carriers or companies.
CREATE TABLE electronic_shop.carrier (
    id INT(10) NOT NULL AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,              -- Name of the carrier.
    description TEXT NOT NULL,               -- Description of the carrier.
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- shipment_details table stores detailed information about shipments associated with orders.
CREATE TABLE electronic_shop.shipment_details (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,                   -- ID of the order associated with the shipment.
    carrier_id INT,                          -- ID of the carrier responsible for the shipment.
    icon VARCHAR(255) NOT NULL,              -- Icon representing the shipment status.
    title VARCHAR(255) NOT NULL,             -- Title or brief description of the shipment.
    description VARCHAR(255) NOT NULL,       -- Detailed description of the shipment.
    FOREIGN KEY (order_id) REFERENCES electronic_shop.order_details(id),  -- Reference to the order details.
    FOREIGN KEY (carrier_id) REFERENCES electronic_shop.carrier(id)        -- Reference to the carrier.
)ENGINE=InnoDB;


CREATE TABLE electronic_shop.slide_Banner (
    id INT AUTO_INCREMENT PRIMARY KEY,
    type ENUM('slide', 'banner') NOT NULL,
    title VARCHAR(255),
    discount VARCHAR(50),
    price VARCHAR(50) NOT NULL,
    link VARCHAR(255),
    banner_img VARCHAR(255) NOT NULL,
    alt VARCHAR(255)
);
