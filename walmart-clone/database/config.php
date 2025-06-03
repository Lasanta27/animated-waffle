<?php
// Configuración de la base de datos
define('DB_HOST', 'localhost');
define('DB_NAME', 'guelaguetza_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// Configuración de la aplicación
define('SITE_URL', 'http://localhost/guelaguetza');
define('SITE_NAME', 'La Guelaguetza');

// Clase para manejar la conexión a la base de datos
class Database {
    private $host = DB_HOST;
    private $db_name = DB_NAME;
    private $username = DB_USER;
    private $password = DB_PASS;
    private $conn;

    // Obtener conexión a la base de datos
    public function getConnection() {
        $this->conn = null;

        try {
            $this->conn = new PDO(
                "mysql:host=" . $this->host . ";dbname=" . $this->db_name,
                $this->username,
                $this->password
            );
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->conn->exec("set names utf8");
        } catch(PDOException $exception) {
            echo "Error de conexión: " . $exception->getMessage();
        }

        return $this->conn;
    }
}

// Función para obtener todos los productos
function getProducts($category_id = null) {
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT p.*, c.name as category_name 
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id";
    
    if ($category_id) {
        $query .= " WHERE p.category_id = :category_id";
    }
    
    $query .= " ORDER BY p.created_at DESC";
    
    $stmt = $db->prepare($query);
    
    if ($category_id) {
        $stmt->bindParam(':category_id', $category_id);
    }
    
    $stmt->execute();
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para obtener todas las categorías
function getCategories() {
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT * FROM categories ORDER BY name";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para obtener un producto por ID
function getProductById($id) {
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT p.*, c.name as category_name 
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id 
              WHERE p.id = :id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':id', $id);
    $stmt->execute();
    
    return $stmt->fetch(PDO::FETCH_ASSOC);
}

// Función para agregar producto al carrito
function addToCart($user_id, $product_id, $quantity = 1) {
    $database = new Database();
    $db = $database->getConnection();
    
    // Verificar si el producto ya está en el carrito
    $query = "SELECT * FROM cart_items WHERE user_id = :user_id AND product_id = :product_id";
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':product_id', $product_id);
    $stmt->execute();
    
    if ($stmt->rowCount() > 0) {
        // Actualizar cantidad
        $query = "UPDATE cart_items SET quantity = quantity + :quantity WHERE user_id = :user_id AND product_id = :product_id";
    } else {
        // Insertar nuevo item
        $query = "INSERT INTO cart_items (user_id, product_id, quantity) VALUES (:user_id, :product_id, :quantity)";
    }
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->bindParam(':product_id', $product_id);
    $stmt->bindParam(':quantity', $quantity);
    
    return $stmt->execute();
}

// Función para obtener items del carrito
function getCartItems($user_id) {
    $database = new Database();
    $db = $database->getConnection();
    
    $query = "SELECT ci.*, p.name, p.price, p.image_url 
              FROM cart_items ci 
              JOIN products p ON ci.product_id = p.id 
              WHERE ci.user_id = :user_id";
    
    $stmt = $db->prepare($query);
    $stmt->bindParam(':user_id', $user_id);
    $stmt->execute();
    
    return $stmt->fetchAll(PDO::FETCH_ASSOC);
}

// Función para crear un pedido
function createOrder($user_id, $shipping_address, $cart_items) {
    $database = new Database();
    $db = $database->getConnection();
    
    try {
        $db->beginTransaction();
        
        // Calcular total
        $total = 0;
        foreach ($cart_items as $item) {
            $total += $item['price'] * $item['quantity'];
        }
        
        // Crear pedido
        $query = "INSERT INTO orders (user_id, total_amount, shipping_address) VALUES (:user_id, :total, :address)";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->bindParam(':total', $total);
        $stmt->bindParam(':address', $shipping_address);
        $stmt->execute();
        
        $order_id = $db->lastInsertId();
        
        // Agregar items del pedido
        foreach ($cart_items as $item) {
            $query = "INSERT INTO order_items (order_id, product_id, quantity, price_at_time) VALUES (:order_id, :product_id, :quantity, :price)";
            $stmt = $db->prepare($query);
            $stmt->bindParam(':order_id', $order_id);
            $stmt->bindParam(':product_id', $item['product_id']);
            $stmt->bindParam(':quantity', $item['quantity']);
            $stmt->bindParam(':price', $item['price']);
            $stmt->execute();
        }
        
        // Limpiar carrito
        $query = "DELETE FROM cart_items WHERE user_id = :user_id";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':user_id', $user_id);
        $stmt->execute();
        
        $db->commit();
        return $order_id;
        
    } catch (Exception $e) {
        $db->rollback();
        return false;
    }
}
?>
