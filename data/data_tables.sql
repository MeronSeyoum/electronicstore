INSERT INTO products (slug, productName, coverImage, currentPrice, previousPrice, category, rating, reviews, pieces_sold, justIn, desc)
VALUES
    ('Cables-Packages', 'Cables Package', '/CablesPackages1.jpg', 199, 250, 'Accessories', 4.8, 56, 600, 0, 'Overview 1'),
    ('powerCharger', 'Power Charger White', '/power_charger.jpg', 19, 25, 'Accessories', 4.8, 56, 60, 1, 'Overview 2'),
    ('micro-a_infinity_silver', '3 ft Micro USB To USB Type A Cable', '/microinfinitysilver.jpg', 199, 250, 'Accessories', 4.8, 56, 600, 0, 'Overview 3'),
    ('apple', 'Iphone  13 Pro Max', '/apple3.jpg', 199, 250, 'Apple', 4.8, 56, 600, 0, 'Overview 4'),
    ('playstation', 'Play Station', '/playstation1.jpg', 199, 250, 'Game Console', 4.8, 56, 600, 0, 'Overview 5'),
    ('playstation', 'Play Station VR', '/playstation2.jpg', 199, 250, 'Game Console', 4.8, 56, 600, 0, 'Overview 6'),
    ('samsung1', 'Samsung  Galaxy S22 Ultra', '/samsung1.jpg', 1299, 1499, 'Smartphone', 4.6, 156, 1500, 1, 'Overview 7'),
    ('samsung2', 'Samsung s 20', '/samsung2.jpg', 199, 250, 'Phone', 4.8, 56, 600, 0, 'Overview 8'),
    ('appleIPhone', 'Apple  iPhone 15 Pro Max', '/apple4.jpg', 999, 1099, 'Smart Phone', 4.7, 123, 150, 1, 'Overview 9'),
    ('playstation', 'Play station 5', '/playstation3.jpg', 199, 250, 'Game Console', 4.8, 56, 600, 0, 'Overview 10'),
    ('slides', 'Apple Case for iPhone/iPad', '/apple3.jpg', 199, 250, 'Smart Phone', 4.8, 56, 600, 0, 'Overview 11'),
    ('playstation', 'Play Station 4', '/playstation4.jpg', 199, 250, 'Game Console', 4.8, 56, 600, 1, 'Overview 12');






-- Insert data into product_category table
INSERT INTO electronic_shop.product_category (name, `desc`, created_at, modified_at) VALUES
('Accessories', 'Category for various accessories', NOW(), NOW()),
('Apple', 'Apple products category', NOW(), NOW()),
('Game Console', 'Category for gaming consoles', NOW(), NOW()),
('Smartphone', 'Category for smartphones', NOW(), NOW());

-- Insert data into discount table
INSERT INTO electronic_shop.discount (name, `desc`, percentage, active, created_at, modified_at) VALUES
('No Discount', 'No discount applied', 0.00, true, NOW(), NOW());

-- Insert data into product table
INSERT INTO electronic_shop.product (slug, product_name, `desc`, category_id, price, quantity, color, size, justIn, discount_id, created_at, modified_at) VALUES
('Cables-Packages', 'Cables Package', 'Overview 1', 1, 199, 600, 'White', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('powerCharger', 'Power Charger White', 'Overview 2', 1, 19, 60, 'White', 'Standard', 1, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('micro-a_infinity_silver', '3 ft Micro USB To USB Type A Cable', 'Overview 3', 1, 199, 600, 'Silver', '3 ft', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('apple', 'Iphone 13 Pro Max', 'Overview 4', 2, 199, 600, 'Black', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('playstation', 'Play Station', 'Overview 5', 3, 199, 600, 'Black', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('playstation', 'Play Station VR', 'Overview 6', 3, 199, 600, 'White', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('samsung1', 'Samsung Galaxy S22 Ultra', 'Overview 7', 4, 1299, 1500, 'Black', 'Standard', 1, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('samsung2', 'Samsung s 20', 'Overview 8', 4, 199, 600, 'White', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('appleIPhone', 'Apple iPhone 15 Pro Max', 'Overview 9', 4, 999, 150, 'Silver', 'Standard', 1, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('playstation', 'Play station 5', 'Overview 10', 3, 199, 600, 'Black', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('slides', 'Apple Case for iPhone/iPad', 'Overview 11', 4, 199, 600, 'White', 'Standard', 0, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW()),
('playstation', 'Play Station 4', 'Overview 12', 3, 199, 600, 'Black', 'Standard', 1, (SELECT id FROM electronic_shop.discount WHERE name = 'No Discount'), NOW(), NOW());
    ('airpod', 'Apple AirPods Pro', 'Wireless earbuds with active noise cancellation and transparency mode.', 13, 249, 100, 'White', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('watch', 'Apple Watch Series 7', 'Advanced smartwatch with Always-On Retina display and various health monitoring features.', 15, 399, 50, 'Black', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('camera', 'Canon EOS R5', 'High-resolution mirrorless camera with 45MP sensor, 8K video recording, and Dual Pixel CMOS AF II.', 12, 3699, 20, 'Black', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('mobile', 'Samsung Galaxy S22', 'Flagship smartphone with Exynos 2200/Snapdragon 8 Gen 2 processor, 6.6-inch AMOLED display, and advanced camera system.', 8, 1299, 150, 'Phantom Black', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('mouse', 'Logitech MX Master 3', 'Advanced wireless mouse with ultra-fast MagSpeed scrolling, customizable buttons, and ergonomic design.', 7, 99, 200, 'Graphite', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('mobile-cover', 'Spigen Liquid Air Armor Mobile Cover', 'Slim, shock-absorbing mobile cover with a matte finish for enhanced grip and protection.', 17, 19, 300, 'Black', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00'),
    ('speaker', 'Bose SoundLink Revolve+', 'Portable Bluetooth speaker with 360-degree sound, water-resistant design, and up to 16 hours of battery life.', 16, 249, 100, 'Triple Black', 'Standard', 1, 1, '2024-06-14 00:00:00', '2024-06-14 00:00:00');

-- Insert data into product_images table
INSERT INTO electronic_shop.product_images (product_id, image_path, isMain) VALUES
(1, '/CablesPackages1.jpg', true),
(2, '/power_charger.jpg', true),
(3, '/microinfinitysilver.jpg', true),
(4, '/apple3.jpg', true),
(5, '/playstation1.jpg', true),
(6, '/playstation2.jpg', true),
(7, '/samsung1.jpg', true),
(8, '/samsung2.jpg', true),
(9, '/apple4.jpg', true),
(10, '/playstation3.jpg', true),
(11, '/apple3.jpg', true),
(12, '/playstation4.jpg', true);

-- Insert data into ratings table
INSERT INTO electronic_shop.ratings (product_id, rating, reviews) VALUES
(1, 4.8, 56),
(2, 4.8, 56),
(3, 4.8, 56),
(4, 4.8, 56),
(5, 4.8, 56),
(6, 4.8, 56),
(7, 4.6, 156),
(8, 4.8, 56),
(9, 4.7, 123),
(10, 4.8, 56),
(11, 4.8, 56),
(12, 4.8, 56);

SELECT 
    p.id AS product_id,
    p.slug,
    p.product_name,
    p.`desc` AS product_description,
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
JOIN 
    electronic_shop.discount AS d ON p.discount_id = d.id
LEFT JOIN 
    electronic_shop.product_images AS pi ON p.id = pi.product_id AND pi.isMain = true
LEFT JOIN 
    electronic_shop.ratings AS r ON p.id = r.product_id;



    -- Insert sample data into the user table
INSERT INTO electronic_shop.user (username, email, password, first_name, last_name, telephone, created_at, modified_at) VALUES
('user1', 'user1@example.com', 'password1', 'John', 'Doe', 1234567890, NOW(), NULL),
('user2', 'user2@example.com', 'password2', 'Jane', 'Smith', 9876543210, NOW(), NULL),
('user3', 'user3@example.com', 'password3', 'Alice', 'Johnson', 5551234567, NOW(), NULL);
