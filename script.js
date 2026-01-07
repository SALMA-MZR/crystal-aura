// ===========================
// Smooth Scrolling for Navigation Links
// ===========================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for all anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                    bsCollapse.hide();
                }
            }
        });
    });
});

// ===========================
// Navbar Scroll Effect
// ===========================
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.classList.add('shadow');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.classList.remove('shadow');
        navbar.style.backgroundColor = '#ffffff';
    }
});

// ===========================
// Back to Top Button
// ===========================
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
        setTimeout(() => {
            backToTopButton.style.opacity = '1';
        }, 10);
    } else {
        backToTopButton.style.opacity = '0';
        setTimeout(() => {
            backToTopButton.style.display = 'none';
        }, 300);
    }
});

backToTopButton.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===========================
// Countdown Timer
// ===========================
function updateCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    // Set end time to 24 hours from now
    const endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
    
    function update() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Reset to 24 hours
            endTime = new Date().getTime() + (24 * 60 * 60 * 1000);
            return;
        }
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    update();
    setInterval(update, 1000);
}

updateCountdown();

// ===========================
// Form Validation and Submission
// ===========================
const orderForm = document.getElementById('orderForm');

if (orderForm) {
    orderForm.addEventListener('submit', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (orderForm.checkValidity()) {
            // Get form data
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                quantity: document.getElementById('quantity').value
            };
            
            // Show success message
            showSuccessMessage();
            
            // Reset form
            orderForm.reset();
            orderForm.classList.remove('was-validated');
            
            // Log form data (in production, send to server)
            console.log('Order submitted:', formData);
        }
        
        orderForm.classList.add('was-validated');
    });
}

function showSuccessMessage() {
    // Create success alert
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-success alert-dismissible fade show position-fixed top-0 start-50 translate-middle-x mt-5';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.maxWidth = '500px';
    alertDiv.innerHTML = `
        <i class="fas fa-check-circle me-2"></i>
        <strong>Commande reçue avec succès!</strong> Nous vous contacterons sous peu.
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(alertDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        alertDiv.remove();
    }, 5000);
}

// ===========================
// Scroll Animations
// ===========================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.benefit-card, .ingredient-card, .testimonial-card');
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
});

// ===========================
// Dynamic Price Update
// ===========================
const quantitySelect = document.getElementById('quantity');

if (quantitySelect) {
    quantitySelect.addEventListener('change', function() {
        const quantity = parseInt(this.value);
        let price, savings;
        
        switch(quantity) {
            case 1:
                price = '49.99€';
                savings = '';
                break;
            case 2:
                price = '89.99€';
                savings = '(Économisez 10€)';
                break;
            case 3:
                price = '119.99€';
                savings = '(Économisez 30€)';
                break;
            default:
                price = '49.99€';
                savings = '';
        }
        
        console.log(`Selected quantity: ${quantity}, Price: ${price} ${savings}`);
    });
}

// ===========================
// Lazy Loading Images
// ===========================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// Mobile Menu Close on Outside Click
// ===========================
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('.navbar-collapse');
    const toggler = document.querySelector('.navbar-toggler');
    
    if (navbar && navbar.classList.contains('show')) {
        if (!navbar.contains(event.target) && !toggler.contains(event.target)) {
            const bsCollapse = new bootstrap.Collapse(navbar);
            bsCollapse.hide();
        }
    }
});

// ===========================
// Add to Cart Animation
// ===========================
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.querySelector('.fa-shopping-cart')) {
            // Create ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        }
    });
});

// Add ripple CSS dynamically
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        width: 100px;
        height: 100px;
        margin-top: -50px;
        margin-left: -50px;
        animation: ripple-animation 0.6s;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===========================
// Console Welcome Message
// ===========================
console.log('%c🌿 Bienvenue sur LuminaSkin! 🌿', 'color: #2D5F4F; font-size: 20px; font-weight: bold;');
console.log('%cRévélez votre beauté naturelle avec nos produits premium', 'color: #D4A574; font-size: 14px;');