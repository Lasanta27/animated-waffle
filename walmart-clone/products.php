<?php
require_once 'database/config.php';

// Obtener productos y categorías
$products = getProducts();
$categories = getCategories();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Productos - La Guelaguetza</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/responsive.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        .products-page {
            padding: 4rem 0;
            min-height: calc(100vh - 200px);
        }

        .products-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }

        .product-card {
            background: var(--white);
            border-radius: 1.5rem;
            overflow: hidden;
            box-shadow: 0 4px 12px rgba(210, 105, 30, 0.1);
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .product-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 20px rgba(210, 105, 30, 0.2);
        }

        .product-image {
            height: 250px;
            background: linear-gradient(135deg, var(--warm-gray) 0%, var(--warm-beige) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 4rem;
            color: var(--primary-terracotta);
        }

        .product-info {
            padding: 2rem;
        }

        .product-category {
            color: var(--secondary-terracotta);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }

        .product-name {
            font-size: 1.3rem;
            color: var(--text-brown);
            margin-bottom: 1rem;
            font-family: 'Georgia', serif;
        }

        .product-description {
            color: var(--text-gray);
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }

        .product-price {
            font-size: 1.5rem;
            color: var(--primary-terracotta);
            font-weight: bold;
            margin-bottom: 1.5rem;
        }

        .add-to-cart-btn {
            background: linear-gradient(135deg, var(--primary-terracotta) 0%, var(--secondary-terracotta) 100%);
            color: var(--white);
            border: none;
            padding: 1rem 2rem;
            border-radius: 25px;
            width: 100%;
            font-size: 1rem;
            cursor: pointer;
            font-family: 'Georgia', serif;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(210, 105, 30, 0.3);
        }

        .add-to-cart-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(210, 105, 30, 0.4);
        }

        .category-filter {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
            flex-wrap: wrap;
        }

        .filter-btn {
            background: none;
            border: 2px solid var(--primary-terracotta);
            color: var(--primary-terracotta);
            padding: 0.5rem 1.5rem;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .filter-btn.active,
        .filter-btn:hover {
            background: var(--primary-terracotta);
            color: var(--white);
        }

        .stock-info {
            color: var(--text-gray);
            font-size: 0.9rem;
            margin-bottom: 1rem;
        }

        .stock-low {
            color: var(--accent-red);
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="header-top">
                <div class="logo">
                    <i class="fas fa-sun walmart-spark"></i>
                    <span class="logo-text">La Guelaguetza</span>
                </div>
                
                <nav class="main-nav">
                    <a href="index.html" class="nav-link">
                        <i class="fas fa-home"></i>
                        Inicio
                    </a>
                    <a href="products.php" class="nav-link">
                        <i class="fas fa-th-large"></i>
                        Productos
                    </a>
                    <a href="#" class="nav-link">
                        <i class="fas fa-gift"></i>
                        Beneficios
                    </a>
                </nav>

                <div class="search-container">
                    <input type="text" class="search-input" placeholder="Buscar productos oaxaqueños">
                    <button class="search-btn">
                        <i class="fas fa-search"></i>
                    </button>
                </div>

                <div class="header-actions">
                    <a href="cart.html" class="cart-btn" style="text-decoration: none;">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="cart-count">0</span>
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Products Content -->
    <main class="products-page">
        <div class="container">
            <h1 class="section-title">Nuestros Productos Artesanales</h1>
            
            <!-- Category Filter -->
            <div class="category-filter">
                <button class="filter-btn active" data-category="all">Todos</button>
                <?php foreach ($categories as $category): ?>
                    <button class="filter-btn" data-category="<?php echo $category['id']; ?>">
                        <?php echo htmlspecialchars($category['name']); ?>
                    </button>
                <?php endforeach; ?>
            </div>

            <!-- Products Grid -->
            <div class="products-grid">
                <?php foreach ($products as $product): ?>
                    <div class="product-card" data-category="<?php echo $product['category_id']; ?>">
                        <div class="product-image">
                            <?php
                            // Iconos según la categoría
                            $icons = [
                                1 => 'fas fa-mask',      // Alebrijes
                                2 => 'fas fa-tshirt',    // Textiles
                                3 => 'fas fa-wine-bottle', // Mezcal
                                4 => 'fas fa-vase',      // Barro Negro
                                5 => 'fas fa-th-large',  // Tapetes
                                6 => 'fas fa-female'     // Huipiles
                            ];
                            $icon = isset($icons[$product['category_id']]) ? $icons[$product['category_id']] : 'fas fa-star';
                            ?>
                            <i class="<?php echo $icon; ?>"></i>
                        </div>
                        <div class="product-info">
                            <div class="product-category"><?php echo htmlspecialchars($product['category_name']); ?></div>
                            <h3 class="product-name"><?php echo htmlspecialchars($product['name']); ?></h3>
                            <p class="product-description"><?php echo htmlspecialchars($product['description']); ?></p>
                            <div class="stock-info <?php echo $product['stock'] < 5 ? 'stock-low' : ''; ?>">
                                <?php if ($product['stock'] > 0): ?>
                                    <?php echo $product['stock']; ?> disponibles
                                <?php else: ?>
                                    Agotado
                                <?php endif; ?>
                            </div>
                            <div class="product-price">$<?php echo number_format($product['price'], 2); ?> MXN</div>
                            <button class="add-to-cart-btn" 
                                    data-product-id="<?php echo $product['id']; ?>"
                                    <?php echo $product['stock'] == 0 ? 'disabled' : ''; ?>>
                                <?php echo $product['stock'] == 0 ? 'Agotado' : 'Agregar al Carrito'; ?>
                            </button>
                        </div>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>Acerca de La Guelaguetza</h4>
                    <ul>
                        <li><a href="#">Quiénes somos</a></li>
                        <li><a href="#">Trabaja con nosotros</a></li>
                        <li><a href="#">Inversionistas</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Ayuda</h4>
                    <ul>
                        <li><a href="#">Centro de ayuda</a></li>
                        <li><a href="#">Compra segura</a></li>
                        <li><a href="#">Términos y condiciones</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Síguenos</h4>
                    <div class="social-links">
                        <a href="#"><i class="fab fa-facebook"></i></a>
                        <a href="#"><i class="fab fa-twitter"></i></a>
                        <a href="#"><i class="fab fa-instagram"></i></a>
                    </div>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2024 La Guelaguetza. Todos los derechos reservados.</p>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', function() {
            // Filtros de categoría
            const filterBtns = document.querySelectorAll('.filter-btn');
            const productCards = document.querySelectorAll('.product-card');

            filterBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    const category = this.getAttribute('data-category');
                    
                    // Actualizar botones activos
                    filterBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    
                    // Filtrar productos
                    productCards.forEach(card => {
                        if (category === 'all' || card.getAttribute('data-category') === category) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });

            // Agregar al carrito
            const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
            
            addToCartBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    if (this.disabled) return;
                    
                    const productId = this.getAttribute('data-product-id');
                    
                    // Enviar solicitud AJAX
                    fetch('cart_actions.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `action=add&product_id=${productId}&quantity=1`
                    })
                    .then(response => response.json())
                    .then(data => {
                        if (data.success) {
                            // Actualizar contador del carrito
                            const cartCount = document.querySelector('.cart-count');
                            cartCount.textContent = parseInt(cartCount.textContent) + 1;
                            
                            // Mostrar mensaje de éxito
                            alert('Producto agregado al carrito');
                        } else {
                            alert('Error: ' + data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);
                        alert('Error al agregar el producto');
                    });
                });
            });
        });
    </script>
</body>
</html>
