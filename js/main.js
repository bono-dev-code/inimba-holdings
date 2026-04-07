// Main JavaScript for Inimba Multi Services website
// Handles navbar, smooth scroll, form submission, animations

document.addEventListener('DOMContentLoaded', function() {
    // Enhanced mobile menu toggle with full accessibility
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    function toggleMobileMenu() {
        const isOpen = !mobileMenu.classList.contains('hidden');
        mobileMenu.classList.toggle('hidden');
        
        if (!mobileMenu.classList.contains('hidden')) {
            document.body.style.overflow = 'hidden'; // Prevent body scroll
            document.documentElement.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    }
    
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    
    // Close on nav link click
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        });
    });
    
    // Close on outside click (stop propagation on btn)
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('hidden')) return;
        
        if (!e.target.closest('#navbar')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });
    
    mobileMenuBtn.addEventListener('click', (e) => e.stopPropagation());
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            mobileMenuBtn.focus(); // Accessibility
        }
    });
    
    // Close on resize (e.g., desktop orientation change)
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
        }
    });

    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.getElementById('navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling ONLY for same-page anchor links (not cross-page)
    document.querySelectorAll('a[href^="#"]:not([href*="Pages/"]):not([href$=".html"])').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

    // Form submission with comprehensive JavaScript validation
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        clearErrors();
        
        let isValid = true;
        
        // Name validation - STRICT for contact page
        const nameField = document.getElementById('name');
        const name = nameField ? nameField.value.trim() : '';
        if (!name || name.length < 2) {
            showError('name', 'Full name is required (min 2 characters)');
            isValid = false;
        }
        
        // Email validation
        const email = document.getElementById('email').value.trim();
        const emailRegex = /^[\\w\\-\\._]+@[\\w\\-\\._]+\\.[a-z]{2,}$/i;
        if (!emailRegex.test(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Service validation - STRICT
        const serviceField = document.getElementById('service');
        const service = serviceField ? serviceField.value : '';
        if (!service || service === '') {
            showError('service', 'Please select a service you are interested in');
            isValid = false;
        }
        
        // Message validation - STRICT for contact page
        const messageField = document.getElementById('message');
        if (messageField) {
            const message = messageField.value.trim();
            if (!message || message.length < 10) {
                showError('message', 'Please provide a detailed message (min 10 characters)');
                isValid = false;
            }
        }
        
        // Phone validation (for contact.html)
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            const phone = phoneField.value.trim();
            if (phone && !/^\\d{10,11}$/.test(phone.replace(/[^\\d]/g, ''))) {
                showError('phone', 'Phone must be 10-11 digits (SA format)');
                isValid = false;
            }
        }
        
        if (!isValid) {
            alert('Please fill in all required fields correctly and try again.');
            return;
        }
        
        const submitName = name || 'there';
        alert('Thank you ' + submitName + '! Your message has been sent successfully. We\\'ll respond within 24 hours.');
        contactForm.reset();
        clearErrors();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Real-time field validation on blur
    function validateField(fieldId) {
        const field = document.getElementById(fieldId);
        if (!field || !field.value.trim()) return;
        
        switch(fieldId) {
            case 'name':
                if (field.value.trim().length < 2) {
                    showError('name', 'Please enter your full name (min 2 characters)');
                }
                break;
            case 'email':
                const email = field.value.trim();
                const emailRegex = /^[\\w\\-\\._]+@[\\w\\-\\._]+\\.[a-z]{2,}$/i;
                if (!emailRegex.test(email)) {
                    showError('email', 'Please enter a valid email address');
                }
                break;
            case 'service':
                if (!field.value) {
                    showError('service', 'Please select the service you need');
                }
                break;
            case 'message':
                if (field.value.trim().length < 10) {
                    showError('message', 'Please provide more details about your request (min 10 chars)');
                }
                break;
            case 'phone':
                const phone = field.value.trim();
                if (phone && !/^\\d{10,11}$/.test(phone.replace(/[^\\d]/g, ''))) {
                    showError('phone', 'Please enter a valid South African phone number');
                }
                break;
        }
    }
    
    // Add blur listeners for real-time feedback
    ['name', 'email', 'service', 'message', 'phone'].forEach(id => {
        const field = document.getElementById(id);
        if (field) {
            field.addEventListener('blur', () => validateField(id));
        }
    });
    });  // Fixed extra closing brace issue
    
    // Error handling helpers
    function showError(fieldId, errorMsg) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.classList.add('border-red-500', 'ring-2', 'ring-red-200');
            let errorEl = field.nextElementSibling;
            if (!errorEl || !errorEl.classList.contains('error-msg')) {
                errorEl = document.createElement('div');
                errorEl.className = 'error-msg text-red-600 text-sm mt-1 font-medium';
                field.parentNode.appendChild(errorEl);
            }
            errorEl.textContent = errorMsg;
        }
    }
    
    function clearErrors() {
        document.querySelectorAll('.error-msg').forEach(el => el.remove());
        document.querySelectorAll('input, select, textarea').forEach(field => {
            field.classList.remove('border-red-500', 'ring-2', 'ring-red-200');
        });
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe service cards, why us, process steps
    document.querySelectorAll('.shadow-lg, [id="why-us"] > div > div, [id="process"] > div > div').forEach(el => {
        observer.observe(el);
    });

    // Navbar active link highlighting (only for same-page sections)
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]:not(a[href*="Pages/"]):not(a[href$=".html"])');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('text-blue-600');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('text-blue-600');
            }
        });
    });

    // Service cards hover (add class for CSS)
    document.querySelectorAll('[id="services"] > div > div > div').forEach(card => {
        card.classList.add('service-card');
    });

    // Back to top button (optional enhancement)
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition opacity-0 invisible z-40';
    backToTop.id = 'back-to-top';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.classList.remove('opacity-0', 'invisible');
            backToTop.classList.add('opacity-100', 'visible');
        } else {
            backToTop.classList.add('opacity-0', 'invisible');
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});

// Local storage for form (prevent data loss)
function saveFormData() {
    const formData = new FormData(document.getElementById('contact-form'));
    localStorage.setItem('contactForm', JSON.stringify(Object.fromEntries(formData)));
}

function loadFormData() {
    const saved = localStorage.getItem('contactForm');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('name').value = data.name || '';
        document.getElementById('email').value = data.email || '';
        document.getElementById('service').value = data.service || '';
        document.getElementById('message').value = data.message || '';
    }
}

// Auto-save form on input
document.getElementById('contact-form').addEventListener('input', saveFormData);
loadFormData();

console.log('Inimba Multi Services website JS loaded successfully!');

// ========================================
// PROFESSIONAL FOOTER JS ENHANCEMENTS
// ========================================

// Newsletter form handler (footer)
function initNewsletterForm() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;

    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        const email = emailInput.value.trim();
        const btn = newsletterForm.querySelector('.newsletter-btn');
        
        // Basic validation
        const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            emailInput.classList.add('newsletter-success', 'border-red-500');
            emailInput.placeholder = 'Please enter a valid email address';
            setTimeout(() => {
                emailInput.classList.remove('newsletter-success', 'border-red-500');
                emailInput.placeholder = 'Enter your email';
            }, 3000);
            return;
        }
        
        // Success state
        btn.innerHTML = '✓ Subscribed!';
        btn.style.background = '#10b981';
        emailInput.classList.add('newsletter-success');
        emailInput.disabled = true;
        
        setTimeout(() => {
            newsletterForm.reset();
            emailInput.classList.remove('newsletter-success');
            emailInput.disabled = false;
            btn.innerHTML = 'Subscribe';
            btn.style.background = '';
            alert('Thank you for subscribing! Welcome to Inimba Multi Services updates.');
        }, 2500);
    });
}

// Smooth scroll for footer quick links (same-page only)
function initFooterLinks() {
    document.querySelectorAll('.quick-links-list a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// Social links open in new tab
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('social-link')) {
        e.preventDefault();
        const href = e.target.getAttribute('href');
        window.open(href, '_blank', 'noopener,noreferrer');
    }
});

// Initialize footer features when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    initNewsletterForm();
    initFooterLinks();
});

// Re-init on dynamic content (if any)
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        initNewsletterForm();
        initFooterLinks();
    });
} else {
    initNewsletterForm();
    initFooterLinks();
}

// Init footer on load
initNewsletterForm();
initFooterLinks();



