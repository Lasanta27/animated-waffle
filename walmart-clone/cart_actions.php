<?php
require_once 'database/config.php';

// Iniciar sesión si no está iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Verificar si el usuario está logueado (para este ejemplo usaremos un ID de usuario fijo)
$user_id = 1; // En una implementación real, esto vendría de la sesión del usuario

// Manejar las diferentes acciones del carrito
if (isset($_POST['action'])) {
    $action = $_POST['action'];
    $response = array('success' => false, 'message' => '');

    switch ($action) {
        case 'add':
            if (isset($_POST['product_id']) && isset($_POST['quantity'])) {
                $product_id = $_POST['product_id'];
                $quantity = $_POST['quantity'];
                
                if (addToCart($user_id, $product_id, $quantity)) {
                    $response['success'] = true;
                    $response['message'] = 'Producto agregado al carrito';
                } else {
                    $response['message'] = 'Error al agregar el producto';
                }
            }
            break;

        case 'update':
            if (isset($_POST['cart_item_id']) && isset($_POST['quantity'])) {
                $database = new Database();
                $db = $database->getConnection();
                
                $query = "UPDATE cart_items SET quantity = :quantity 
                         WHERE id = :id AND user_id = :user_id";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(':quantity', $_POST['quantity']);
                $stmt->bindParam(':id', $_POST['cart_item_id']);
                $stmt->bindParam(':user_id', $user_id);
                
                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Cantidad actualizada';
                } else {
                    $response['message'] = 'Error al actualizar cantidad';
                }
            }
            break;

        case 'remove':
            if (isset($_POST['cart_item_id'])) {
                $database = new Database();
                $db = $database->getConnection();
                
                $query = "DELETE FROM cart_items 
                         WHERE id = :id AND user_id = :user_id";
                
                $stmt = $db->prepare($query);
                $stmt->bindParam(':id', $_POST['cart_item_id']);
                $stmt->bindParam(':user_id', $user_id);
                
                if ($stmt->execute()) {
                    $response['success'] = true;
                    $response['message'] = 'Producto eliminado del carrito';
                } else {
                    $response['message'] = 'Error al eliminar el producto';
                }
            }
            break;

        case 'checkout':
            if (isset($_POST['shipping_address'])) {
                $cart_items = getCartItems($user_id);
                
                if (empty($cart_items)) {
                    $response['message'] = 'El carrito está vacío';
                } else {
                    $order_id = createOrder($user_id, $_POST['shipping_address'], $cart_items);
                    
                    if ($order_id) {
                        $response['success'] = true;
                        $response['message'] = 'Pedido creado exitosamente';
                        $response['order_id'] = $order_id;
                    } else {
                        $response['message'] = 'Error al crear el pedido';
                    }
                }
            }
            break;

        case 'get_cart':
            $cart_items = getCartItems($user_id);
            $total = 0;
            
            foreach ($cart_items as $item) {
                $total += $item['price'] * $item['quantity'];
            }
            
            $response['success'] = true;
            $response['cart_items'] = $cart_items;
            $response['total'] = $total;
            break;
    }

    // Devolver respuesta en formato JSON
    header('Content-Type: application/json');
    echo json_encode($response);
    exit;
}

// Si no hay acción especificada, redirigir al carrito
header('Location: cart.html');
?>
