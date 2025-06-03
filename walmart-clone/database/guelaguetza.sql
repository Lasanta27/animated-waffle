-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS guelaguetza_db;
USE guelaguetza_db;

-- Tabla de categorías
CREATE TABLE categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de productos
CREATE TABLE products (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Tabla de usuarios
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    address TEXT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de pedidos
CREATE TABLE orders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    total_amount DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    shipping_address TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Tabla de detalles de pedido
CREATE TABLE order_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    price_at_time DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Tabla de carrito de compras
CREATE TABLE cart_items (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Insertar categorías de ejemplo
INSERT INTO categories (name, description) VALUES
('Alebrijes', 'Figuras artesanales de animales fantásticos'),
('Textiles', 'Productos textiles tradicionales oaxaqueños'),
('Mezcal', 'Bebidas tradicionales de agave'),
('Barro Negro', 'Artesanías en barro negro de Oaxaca'),
('Tapetes', 'Tapetes tejidos a mano'),
('Huipiles', 'Vestimenta tradicional bordada');

-- Insertar productos de ejemplo
INSERT INTO products (category_id, name, description, price, stock, image_url) VALUES
(1, 'Alebrije Decorativo', 'Alebrije tallado a mano con colores vibrantes', 850.00, 10, 'images/products/alebrije1.jpg'),
(2, 'Huipil Bordado', 'Huipil tradicional con bordados hechos a mano', 1200.00, 5, 'images/products/huipil1.jpg'),
(3, 'Mezcal Artesanal', 'Mezcal artesanal de agave espadín', 750.00, 20, 'images/products/mezcal1.jpg'),
(4, 'Vasija de Barro Negro', 'Vasija decorativa de barro negro pulido', 650.00, 8, 'images/products/barro1.jpg'),
(5, 'Tapete de Lana', 'Tapete tejido a mano con tintes naturales', 2500.00, 3, 'images/products/tapete1.jpg'),
(6, 'Huipil de Gala', 'Huipil ceremonial con bordados elaborados', 3500.00, 2, 'images/products/huipil2.jpg');

-- Crear usuario administrador de ejemplo
INSERT INTO users (first_name, last_name, email, password_hash, address, phone) VALUES
('Admin', 'Guelaguetza', 'admin@guelaguetza.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Oaxaca Centro', '9515555555');
