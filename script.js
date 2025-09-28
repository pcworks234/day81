// Global state
let state = {
    selectedImage: 0,
    selectedColor: '네이비',
    selectedSize: '',
    quantity: 1,
    isLiked: false,
    cartCount: 0
};

// Product images
const productImages = [
    "https://images.unsplash.com/photo-1641483305819-587106f06f83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW1tZXIlMjBhdGhsZXRpYyUyMHdlYXIlMjBzcG9ydHN3ZWFyfGVufDF8fHx8MTc1OTAxNzEwMHww&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1720514496152-0a3aa33901ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG9ydHMlMjBjbG90aGluZyUyMGRldGFpbHMlMjBmYWJyaWN8ZW58MXx8fHwxNzU5MDE3MTA0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1586930713012-7059dc74a72b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdGhsZXRpYyUyMHdlYXIlMjBtb2RlbCUyMGZpdG5lc3N8ZW58MXx8fHwxNzU5MDE3MTA3fDA&ixlib=rb-4.1.0&q=80&w=1080"
];

// DOM elements
const elements = {
    mainImage: document.getElementById('mainImage'),
    thumbnails: document.querySelectorAll('.thumbnail'),
    colorOptions: document.querySelectorAll('.color-option'),
    sizeOptions: document.querySelectorAll('.size-option'),
    selectedColorSpan: document.getElementById('selectedColor'),
    quantitySpan: document.getElementById('quantity'),
    decreaseBtn: document.getElementById('decreaseQty'),
    increaseBtn: document.getElementById('increaseQty'),
    wishlistBtn: document.getElementById('wishlistBtn'),
    addToCartBtn: document.getElementById('addToCartBtn'),
    cartCount: document.getElementById('cartCount'),
    tabButtons: document.querySelectorAll('.tab-button'),
    tabContents: document.querySelectorAll('.tab-content')
};

// Initialize the application
function init() {
    setupEventListeners();
    updateUI();
}

// Set up all event listeners
function setupEventListeners() {
    // Image thumbnails
    elements.thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => selectImage(index));
    });

    // Color options
    elements.colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            const color = option.dataset.color;
            selectColor(color);
        });
    });

    // Size options
    elements.sizeOptions.forEach(option => {
        option.addEventListener('click', () => {
            const size = option.dataset.size;
            selectSize(size);
        });
    });

    // Quantity controls
    elements.decreaseBtn.addEventListener('click', decreaseQuantity);
    elements.increaseBtn.addEventListener('click', increaseQuantity);

    // Wishlist button
    elements.wishlistBtn.addEventListener('click', toggleWishlist);

    // Add to cart button
    elements.addToCartBtn.addEventListener('click', addToCart);

    // Tab buttons
    elements.tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.dataset.tab;
            switchTab(tabId);
        });
    });

    // Helpful buttons in reviews
    document.querySelectorAll('.helpful-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Simple animation feedback
            this.style.color = '#1a1a1a';
            setTimeout(() => {
                this.style.color = '#6b7280';
            }, 200);
        });
    });
}

// Image selection
function selectImage(index) {
    state.selectedImage = index;
    updateImageDisplay();
}

function updateImageDisplay() {
    // Update main image
    elements.mainImage.src = productImages[state.selectedImage];
    
    // Update thumbnail active state
    elements.thumbnails.forEach((thumbnail, index) => {
        thumbnail.classList.toggle('active', index === state.selectedImage);
    });
}

// Color selection
function selectColor(color) {
    state.selectedColor = color;
    updateColorDisplay();
}

function updateColorDisplay() {
    // Update selected color text
    elements.selectedColorSpan.textContent = state.selectedColor;
    
    // Update color option active state
    elements.colorOptions.forEach(option => {
        const isSelected = option.dataset.color === state.selectedColor;
        option.classList.toggle('active', isSelected);
    });
}

// Size selection
function selectSize(size) {
    state.selectedSize = size;
    updateSizeDisplay();
}

function updateSizeDisplay() {
    elements.sizeOptions.forEach(option => {
        const isSelected = option.dataset.size === state.selectedSize;
        option.classList.toggle('active', isSelected);
    });
}

// Quantity controls
function decreaseQuantity() {
    if (state.quantity > 1) {
        state.quantity--;
        updateQuantityDisplay();
    }
}

function increaseQuantity() {
    state.quantity++;
    updateQuantityDisplay();
}

function updateQuantityDisplay() {
    elements.quantitySpan.textContent = state.quantity;
}

// Wishlist functionality
function toggleWishlist() {
    state.isLiked = !state.isLiked;
    updateWishlistDisplay();
}

function updateWishlistDisplay() {
    const heart = elements.wishlistBtn.querySelector('.heart');
    if (state.isLiked) {
        heart.textContent = '♥';
        elements.wishlistBtn.classList.add('liked');
    } else {
        heart.textContent = '♡';
        elements.wishlistBtn.classList.remove('liked');
    }
}

// Add to cart functionality
function addToCart() {
    // Validate selections
    if (!state.selectedSize) {
        alert('사이즈를 선택해주세요.');
        return;
    }

    // Add to cart
    state.cartCount += state.quantity;
    updateCartDisplay();
    
    // Show success message
    showNotification('장바구니에 상품이 추가되었습니다.');
    
    // Animate button
    animateButton(elements.addToCartBtn);
}

function updateCartDisplay() {
    elements.cartCount.textContent = state.cartCount;
}

// Tab functionality
function switchTab(tabId) {
    // Update tab buttons
    elements.tabButtons.forEach(button => {
        const isActive = button.dataset.tab === tabId;
        button.classList.toggle('active', isActive);
    });
    
    // Update tab contents
    elements.tabContents.forEach(content => {
        const isActive = content.id === tabId;
        content.classList.toggle('active', isActive);
    });
}

// Utility functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #1a1a1a;
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

function animateButton(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
}

// Update all UI elements
function updateUI() {
    updateImageDisplay();
    updateColorDisplay();
    updateSizeDisplay();
    updateQuantityDisplay();
    updateWishlistDisplay();
    updateCartDisplay();
}

// Handle smooth scrolling for internal links
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Handle image loading errors
function handleImageError(img) {
    img.style.backgroundColor = '#f3f4f6';
    img.style.display = 'flex';
    img.style.alignItems = 'center';
    img.style.justifyContent = 'center';
    img.innerHTML = '<span style="color: #6b7280;">이미지를 불러올 수 없습니다</span>';
}

// Add error handling to all images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', () => handleImageError(img));
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Arrow keys for image navigation
    if (e.key === 'ArrowLeft' && state.selectedImage > 0) {
        selectImage(state.selectedImage - 1);
    } else if (e.key === 'ArrowRight' && state.selectedImage < productImages.length - 1) {
        selectImage(state.selectedImage + 1);
    }
    
    // Number keys for quantity
    if (e.key >= '1' && e.key <= '9') {
        state.quantity = parseInt(e.key);
        updateQuantityDisplay();
    }
    
    // Escape key to close notifications
    if (e.key === 'Escape') {
        const notifications = document.querySelectorAll('[style*="position: fixed"]');
        notifications.forEach(notification => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        });
    }
});

// Handle window resize for responsive behavior
window.addEventListener('resize', function() {
    // Ensure proper layout on resize
    const isMobile = window.innerWidth <= 768;
    
    // Adjust tab layout for mobile
    const tabList = document.querySelector('.tab-list');
    if (isMobile) {
        tabList.style.gridTemplateColumns = 'repeat(2, 1fr)';
    } else {
        tabList.style.gridTemplateColumns = 'repeat(4, 1fr)';
    }
});

// Performance optimization: Debounce resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to resize handler
window.addEventListener('resize', debounce(function() {
    // Resize handler code here
    const isMobile = window.innerWidth <= 768;
    // ... responsive adjustments
}, 250));

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        selectImage,
        selectColor,
        selectSize,
        addToCart,
        toggleWishlist
    };
}