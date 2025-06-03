document.addEventListener('DOMContentLoaded', function() {
    let cartCount = 0;
    const cartCountElement = document.querySelector('.cart-count');

    // Load cart from localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Update cart count on page load
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;

    // Handle search functionality
    const searchForm = document.querySelector('.search-container');
    const searchInput = document.querySelector('.search-input');
    const searchBtn = document.querySelector('.search-btn');

    // Add event listener to search button
    searchBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleSearch();
    });

    // Add event listener for Enter key in search input
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    });

    function handleSearch() {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            // Navigate to products.php with search query as URL parameter
            const encodedTerm = encodeURIComponent(searchTerm);
            window.location.href = `products.php?search=${encodedTerm}`;
        }
    }

    // Add to cart functionality for product buttons on main page
    const addToCartButtons = document.querySelectorAll('.card-btn, .banner-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            cartCountElement.textContent = cartCount;

            // Add animation effect
            cartCountElement.classList.add('cart-count-animation');
            setTimeout(() => {
                cartCountElement.classList.remove('cart-count-animation');
            }, 300);
        });
    });

    // Add to cart functionality for add-to-cart buttons on category pages
    const addToCartCategoryButtons = document.querySelectorAll('.add-to-cart');
    addToCartCategoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-name').textContent.trim();
            const productPriceText = productCard.querySelector('.product-price').textContent.trim();
            const productPrice = parseFloat(productPriceText.replace(/[^0-9.-]+/g,""));

            // Check if product already in cart
            const existingProductIndex = cart.findIndex(item => item.name === productName);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += 1;
            } else {
                cart.push({ name: productName, price: productPrice, quantity: 1 });
            }

            // Save cart to localStorage
            localStorage.setItem('cart', JSON.stringify(cart));

            // Update cart count
            cartCount = cart.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = cartCount;

            // Add animation effect
            cartCountElement.classList.add('cart-count-animation');
            setTimeout(() => {
                cartCountElement.classList.remove('cart-count-animation');
            }, 300);
        });
    });

// Category hover effects and click handling
const categoryItems = document.querySelectorAll('.category-item');
categoryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'scale(1.1)';
    });

    item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.category-icon');
        icon.style.transform = 'scale(1)';
    });

    // Agregar manejo de clic para redireccionar en la misma pestaña
    item.addEventListener('click', function() {
        const categoryName = this.querySelector('.category-name').textContent.toLowerCase();
        let categoryUrl;
        
        // Mapear nombres de categorías a archivos específicos
        switch(categoryName) {
            case 'alebrijes':
                categoryUrl = '/categories/alebrijes.html';
                break;
            case 'textiles':
                categoryUrl = '/categories/textiles.html';
                break;
            case 'mezcal':
                categoryUrl = '/categories/mezcal.html';
                break;
            case 'barro negro':
                categoryUrl = '/categories/barro-negro.html';
                break;
            case 'tapetes':
                categoryUrl = '/categories/tapetes.html';
                break;
            case 'huipiles':
                categoryUrl = '/categories/huipiles.html';
                break;
            default:
                categoryUrl = `/categories/${categoryName.replace(/\s+/g, '-')}.html`;
        }
        
        window.location.href = categoryUrl;
    });
});

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation class for service cards on scroll
const serviceCards = document.querySelectorAll('.service-card');
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    },
    { threshold: 0.1 }
);

serviceCards.forEach(card => {
    observer.observe(card);
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes cartBump {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }

    .cart-count-animation {
        animation: cartBump 0.3s ease-in-out;
    }

    .service-card {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease, transform 0.5s ease;
    }

    .service-card.fade-in {
        opacity: 1;
        transform: translateY(0);
    }

    .category-icon {
        transition: transform 0.3s ease;
    }
`;
document.head.appendChild(style);
});
