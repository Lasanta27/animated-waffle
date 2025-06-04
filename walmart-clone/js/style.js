document.addEventListener('DOMContentLoaded', function() {
    // Define Airbnb-like color palette and fonts
    const colors = {
        background: '#FFFFFF',
        text: '#222222',
        accent: '#FF385C',
        lightGray: '#F7F7F7',
        borderGray: '#DDDDDD',
        shadow: 'rgba(0, 0, 0, 0.1)'
    };

    const fontFamily = "'Arial', 'Helvetica Neue', Helvetica, sans-serif";

    // Apply body styles
    document.body.style.backgroundColor = colors.background;
    document.body.style.color = colors.text;
    document.body.style.fontFamily = fontFamily;
    document.body.style.lineHeight = '1.6';
    document.body.style.margin = '0';
    document.body.style.padding = '0';

    // Container max width and padding
    const containers = document.querySelectorAll('.container');
    containers.forEach(container => {
        container.style.maxWidth = '1140px';
        container.style.margin = '0 auto';
        container.style.padding = '0 15px';
    });

    // Header styles
    const header = document.querySelector('.header');
    if (header) {
        header.style.backgroundColor = colors.background;
        header.style.boxShadow = '0 2px 4px ' + colors.shadow;
        header.style.position = 'sticky';
        header.style.top = '0';
        header.style.zIndex = '1000';
        header.style.padding = '10px 0';
    }

    // Header top flex layout
    const headerTop = document.querySelector('.header-top');
    if (headerTop) {
        headerTop.style.display = 'flex';
        headerTop.style.alignItems = 'center';
        headerTop.style.justifyContent = 'space-between';
        headerTop.style.gap = '1rem';
        headerTop.style.padding = '0 15px';
    }

    // Logo styles
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.color = colors.text;
        logo.style.fontWeight = '700';
        logo.style.fontSize = '1.5rem';
        logo.style.fontFamily = fontFamily;
        logo.style.display = 'flex';
        logo.style.alignItems = 'center';
        logo.style.gap = '0.5rem';
    }

    // Remove icon color override
    const sparkIcon = document.querySelector('.walmart-spark');
    if (sparkIcon) {
        sparkIcon.style.color = colors.accent;
        sparkIcon.style.fontSize = '1.8rem';
        sparkIcon.style.textShadow = 'none';
    }

    // Navigation styles
    const mainNav = document.querySelector('.main-nav');
    if (mainNav) {
        mainNav.style.display = 'flex';
        mainNav.style.gap = '1rem';
        mainNav.style.fontSize = '0.95rem';
        mainNav.style.fontWeight = '600';
        mainNav.style.color = colors.text;
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.style.color = colors.text;
        link.style.textDecoration = 'none';
        link.style.display = 'flex';
        link.style.alignItems = 'center';
        link.style.gap = '0.3rem';
        link.style.padding = '8px 12px';
        link.style.borderRadius = '20px';
        link.style.transition = 'background-color 0.3s ease';
        link.onmouseover = () => link.style.backgroundColor = colors.lightGray;
        link.onmouseout = () => link.style.backgroundColor = 'transparent';
    });

    // Search container styles
    const searchContainer = document.querySelector('.search-container');
    if (searchContainer) {
        searchContainer.style.flex = '1';
        searchContainer.style.maxWidth = '400px';
        searchContainer.style.display = 'flex';
        searchContainer.style.border = '1px solid ' + colors.borderGray;
        searchContainer.style.borderRadius = '9999px';
        searchContainer.style.overflow = 'hidden';
        searchContainer.style.backgroundColor = colors.lightGray;
    }

    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.style.flex = '1';
        searchInput.style.border = 'none';
        searchInput.style.padding = '8px 15px';
        searchInput.style.fontSize = '1rem';
        searchInput.style.outline = 'none';
        searchInput.style.backgroundColor = 'transparent';
        searchInput.style.color = colors.text;
    }

    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.style.backgroundColor = colors.accent;
        searchBtn.style.border = 'none';
        searchBtn.style.color = '#fff';
        searchBtn.style.padding = '8px 15px';
        searchBtn.style.cursor = 'pointer';
        searchBtn.style.transition = 'background-color 0.3s ease';
        searchBtn.onmouseover = () => searchBtn.style.backgroundColor = '#e72e50';
        searchBtn.onmouseout = () => searchBtn.style.backgroundColor = colors.accent;
    }

    // Header actions (cart)
    const headerActions = document.querySelector('.header-actions');
    if (headerActions) {
        headerActions.style.display = 'flex';
        headerActions.style.alignItems = 'center';
        headerActions.style.gap = '1rem';
    }

    const cartBtn = document.querySelector('.cart-btn');
    if (cartBtn) {
        cartBtn.style.color = colors.text;
        cartBtn.style.fontSize = '1.3rem';
        cartBtn.style.position = 'relative';
        cartBtn.style.textDecoration = 'none';
    }

    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.style.position = 'absolute';
        cartCount.style.top = '-8px';
        cartCount.style.right = '-8px';
        cartCount.style.backgroundColor = colors.accent;
        cartCount.style.color = '#fff';
        cartCount.style.fontSize = '0.75rem';
        cartCount.style.padding = '2px 6px';
        cartCount.style.borderRadius = '9999px';
        cartCount.style.boxShadow = '0 2px 4px ' + colors.shadow;
    }

    // Main content padding
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.style.padding = '2rem 0';
    }

    // Welcome section styles
    const welcomeSection = document.querySelector('.welcome-section');
    if (welcomeSection) {
        welcomeSection.style.textAlign = 'center';
        welcomeSection.style.padding = '3rem 0';
        welcomeSection.style.backgroundColor = colors.background;
    }

    const welcomeTitle = document.querySelector('.welcome-title');
    if (welcomeTitle) {
        welcomeTitle.style.fontSize = '2.5rem';
        welcomeTitle.style.fontWeight = '700';
        welcomeTitle.style.color = colors.text;
        welcomeTitle.style.marginBottom = '1rem';
        welcomeTitle.style.fontFamily = fontFamily;
    }

    // Service cards grid
    const cardsGrid = document.querySelector('.cards-grid');
    if (cardsGrid) {
        cardsGrid.style.display = 'grid';
        cardsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        cardsGrid.style.gap = '1.5rem';
        cardsGrid.style.padding = '0 15px';
    }

    // Service card styles
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.style.backgroundColor = colors.background;
        card.style.borderRadius = '12px';
        card.style.boxShadow = '0 2px 8px ' + colors.shadow;
        card.style.padding = '1.5rem';
        card.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        card.style.border = 'none';
        card.style.cursor = 'pointer';
        card.onmouseover = () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 6px 20px ' + colors.shadow;
        };
        card.onmouseout = () => {
            card.style.transform = 'none';
            card.style.boxShadow = '0 2px 8px ' + colors.shadow;
        };
    });

    // Card titles and text
    const cardTitles = document.querySelectorAll('.card-title');
    cardTitles.forEach(title => {
        title.style.fontSize = '1.25rem';
        title.style.fontWeight = '700';
        title.style.color = colors.text;
        title.style.marginBottom = '0.5rem';
        title.style.fontFamily = fontFamily;
    });

    const cardSubtitles = document.querySelectorAll('.card-subtitle');
    cardSubtitles.forEach(subtitle => {
        subtitle.style.fontSize = '1rem';
        subtitle.style.fontWeight = '500';
        subtitle.style.color = '#555';
        subtitle.style.marginBottom = '0.75rem';
        subtitle.style.fontFamily = fontFamily;
    });

    const cardDescriptions = document.querySelectorAll('.card-description');
    cardDescriptions.forEach(desc => {
        desc.style.fontSize = '1rem';
        desc.style.color = '#666';
        desc.style.lineHeight = '1.4';
        desc.style.fontFamily = fontFamily;
    });

    // Card buttons
    const cardButtons = document.querySelectorAll('.card-btn');
    cardButtons.forEach(btn => {
        btn.style.backgroundColor = colors.accent;
        btn.style.color = '#fff';
        btn.style.border = 'none';
        btn.style.padding = '0.75rem 1.5rem';
        btn.style.borderRadius = '9999px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '700';
        btn.style.fontFamily = fontFamily;
        btn.style.transition = 'background-color 0.3s ease';
        btn.onmouseover = () => btn.style.backgroundColor = '#e72e50';
        btn.onmouseout = () => btn.style.backgroundColor = colors.accent;
    });

    // Categories section
    const categoriesSection = document.querySelector('.categories-section');
    if (categoriesSection) {
        categoriesSection.style.padding = '3rem 0';
        categoriesSection.style.backgroundColor = colors.lightGray;
    }

    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        title.style.fontSize = '2rem';
        title.style.fontWeight = '700';
        title.style.color = colors.text;
        title.style.textAlign = 'center';
        title.style.marginBottom = '2rem';
        title.style.fontFamily = fontFamily;
    });

    // Categories grid
    const categoriesGrid = document.querySelector('.categories-grid');
    if (categoriesGrid) {
        categoriesGrid.style.display = 'grid';
        categoriesGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(140px, 1fr))';
        categoriesGrid.style.gap = '1rem';
        categoriesGrid.style.padding = '0 15px';
    }

    // Category items
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.style.textAlign = 'center';
        item.style.cursor = 'pointer';
        item.style.transition = 'transform 0.3s ease';
        item.onmouseover = () => item.style.transform = 'scale(1.05)';
        item.onmouseout = () => item.style.transform = 'none';
    });

    // Category icons
    const categoryIcons = document.querySelectorAll('.category-icon');
    categoryIcons.forEach(icon => {
        icon.style.width = '100px';
        icon.style.height = '100px';
        icon.style.backgroundColor = colors.background;
        icon.style.borderRadius = '50%';
        icon.style.display = 'flex';
        icon.style.alignItems = 'center';
        icon.style.justifyContent = 'center';
        icon.style.margin = '0 auto 0.5rem';
        icon.style.color = colors.accent;
        icon.style.fontSize = '2rem';
        icon.style.border = '1px solid ' + colors.borderGray;
        icon.style.boxShadow = '0 2px 6px ' + colors.shadow;
        icon.style.transition = 'all 0.3s ease';
    });

    // Featured products section
    const featuredProducts = document.querySelector('.featured-products');
    if (featuredProducts) {
        featuredProducts.style.padding = '3rem 0';
        featuredProducts.style.backgroundColor = colors.background;
    }

    const productsGrid = document.querySelector('.products-grid');
    if (productsGrid) {
        productsGrid.style.display = 'grid';
        productsGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(280px, 1fr))';
        productsGrid.style.gap = '1.5rem';
        productsGrid.style.padding = '0 15px';
    }

    // Product banners
    const productBanners = document.querySelectorAll('.product-banner');
    productBanners.forEach(banner => {
        banner.style.backgroundColor = colors.lightGray;
        banner.style.borderRadius = '12px';
        banner.style.padding = '1.5rem';
        banner.style.boxShadow = '0 2px 8px ' + colors.shadow;
        banner.style.display = 'flex';
        banner.style.flexDirection = 'column';
        banner.style.justifyContent = 'space-between';
        banner.style.transition = 'transform 0.3s ease';
        banner.style.border = 'none';
        banner.style.cursor = 'pointer';
        banner.onmouseover = () => {
            banner.style.transform = 'translateY(-5px)';
            banner.style.boxShadow = '0 6px 20px ' + colors.shadow;
        };
        banner.onmouseout = () => {
            banner.style.transform = 'none';
            banner.style.boxShadow = '0 2px 8px ' + colors.shadow;
        };
    });

    // Banner content titles and text
    const bannerTitles = document.querySelectorAll('.banner-content h3');
    bannerTitles.forEach(title => {
        title.style.fontSize = '1.25rem';
        title.style.fontWeight = '700';
        title.style.color = colors.text;
        title.style.marginBottom = '0.5rem';
        title.style.fontFamily = fontFamily;
    });

    const bannerTexts = document.querySelectorAll('.banner-content p');
    bannerTexts.forEach(p => {
        p.style.fontSize = '1rem';
        p.style.color = '#555';
        p.style.marginBottom = '1rem';
        p.style.fontFamily = fontFamily;
    });

    // Banner buttons
    const bannerButtons = document.querySelectorAll('.banner-btn');
    bannerButtons.forEach(btn => {
        btn.style.backgroundColor = 'transparent';
        btn.style.color = colors.accent;
        btn.style.border = '2px solid ' + colors.accent;
        btn.style.padding = '0.5rem 1.5rem';
        btn.style.borderRadius = '9999px';
        btn.style.cursor = 'pointer';
        btn.style.fontWeight = '700';
        btn.style.fontFamily = fontFamily;
        btn.style.transition = 'all 0.3s ease';
        btn.onmouseover = () => {
            btn.style.backgroundColor = colors.accent;
            btn.style.color = '#fff';
        };
        btn.onmouseout = () => {
            btn.style.backgroundColor = 'transparent';
            btn.style.color = colors.accent;
        };
    });

    // Seasonal section
    const seasonalSection = document.querySelector('.seasonal-section');
    if (seasonalSection) {
        seasonalSection.style.padding = '3rem 0';
        seasonalSection.style.backgroundColor = colors.lightGray;
    }

    const seasonalGrid = document.querySelector('.seasonal-grid');
    if (seasonalGrid) {
        seasonalGrid.style.display = 'grid';
        seasonalGrid.style.gridTemplateColumns = 'repeat(auto-fit, minmax(220px, 1fr))';
        seasonalGrid.style.gap = '1.5rem';
        seasonalGrid.style.padding = '0 15px';
    }

    const seasonalItems = document.querySelectorAll('.seasonal-item');
    seasonalItems.forEach(item => {
        item.style.textAlign = 'center';
        item.style.cursor = 'default';
    });

    const seasonalImages = document.querySelectorAll('.seasonal-image');
    seasonalImages.forEach(img => {
        img.style.width = '180px';
        img.style.height = '180px';
        img.style.backgroundColor = colors.background;
        img.style.borderRadius = '12px';
        img.style.margin = '0 auto 1rem';
        img.style.display = 'flex';
        img.style.alignItems = 'center';
        img.style.justifyContent = 'center';
        img.style.fontSize = '3rem';
        img.style.color = colors.accent;
        img.style.border = '1px solid ' + colors.borderGray;
        img.style.boxShadow = '0 2px 6px ' + colors.shadow;
        img.style.transition = 'transform 0.3s ease';
    });

    seasonalItems.forEach(item => {
        item.onmouseover = () => {
            const img = item.querySelector('.seasonal-image');
            if (img) img.style.transform = 'scale(1.05)';
        };
        item.onmouseout = () => {
            const img = item.querySelector('.seasonal-image');
            if (img) img.style.transform = 'none';
        };
    });

    // Footer styles
    const footer = document.querySelector('.footer');
    if (footer) {
        footer.style.backgroundColor = colors.background;
        footer.style.color = colors.text;
        footer.style.padding = '3rem 0 1rem';
        footer.style.borderTop = '1px solid ' + colors.borderGray;
    }

    const footerContent = document.querySelector('.footer-content');
    if (footerContent) {
        footerContent.style.display = 'flex';
        footerContent.style.justifyContent = 'space-between';
        footerContent.style.flexWrap = 'wrap';
        footerContent.style.gap = '1rem';
        footerContent.style.padding = '0 15px';
    }

    const footerSections = document.querySelectorAll('.footer-section');
    footerSections.forEach(section => {
        section.style.flex = '1 1 200px';
    });

    const footerHeadings = document.querySelectorAll('.footer-section h4');
    footerHeadings.forEach(h4 => {
        h4.style.fontWeight = '700';
        h4.style.color = colors.text;
        h4.style.marginBottom = '1rem';
        h4.style.fontFamily = fontFamily;
    });

    const footerLinks = document.querySelectorAll('.footer-section ul li a');
    footerLinks.forEach(link => {
        link.style.color = colors.accent;
        link.style.textDecoration = 'none';
        link.style.transition = 'color 0.3s ease';
        link.onmouseover = () => link.style.color = '#e72e50';
        link.onmouseout = () => link.style.color = colors.accent;
    });

    const socialLinks = document.querySelectorAll('.social-links a');
    socialLinks.forEach(link => {
        link.style.color = colors.accent;
        link.style.fontSize = '1.5rem';
        link.style.transition = 'transform 0.3s ease, color 0.3s ease';
        link.onmouseover = () => {
            link.style.color = '#e72e50';
            link.style.transform = 'scale(1.2)';
        };
        link.onmouseout = () => {
            link.style.color = colors.accent;
            link.style.transform = 'none';
        };
    });

    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        footerBottom.style.textAlign = 'center';
        footerBottom.style.paddingTop = '1rem';
        footerBottom.style.color = '#999';
        footerBottom.style.fontSize = '0.9rem';
        footerBottom.style.fontFamily = fontFamily;
    }
});
