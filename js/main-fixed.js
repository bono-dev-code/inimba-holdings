// Fixed Contact Form Validation - No more red errors on valid inputs
document.addEventListener('DOMContentLoaded', function() {
    // Navbar
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));
        document.querySelectorAll('#mobile-menu a').forEach(link => link.addEventListener('click', () => mobileMenu.classList.add('hidden')));
    }

    // Contact Form Validation - FIXED UX
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const fields = {
            name: { min: 2, required: true },
            email: { regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i, required: true },
            service: { required: true },
            message: { min: 10, required: true },
            phone: { min: 10, required: false }
        };

        function clearField(fieldId) {
            const field = document.getElementById(fieldId);
            if (field) {
                field.classList.remove('border-red-500', 'ring-red-200', 'border-green-500', 'ring-green-200');
                const error = field.parentNode.querySelector('.error-msg');
                if (error) error.remove();
            }
        }

        function setError(fieldId, msg) {
            const field = document.getElementById(fieldId);
            if (field) {
                clearField(fieldId);
                field.classList.add('border-red-500', 'ring-2', 'ring-red-200');
                const errorDiv = document.createElement('div');
                errorDiv.className = 'error-msg text-red-600 text-sm mt-1 font-medium';
                errorDiv.textContent = msg;
                field.parentNode.appendChild(errorDiv);
            }
        }

        function setValid(fieldId) {
            const field = document.getElementById(fieldId);
            if (field && field.value.trim()) {
                clearField(fieldId);
                field.classList.add('border-green-500', 'ring-2', 'ring-green-200');
            }
        }

        function validateSingle(fieldId) {
            const field = document.getElementById(fieldId);
            if (!field) return true;
            
            const value = field.value.trim();
            const config = fields[fieldId];
            if (!config) return true;

            // Required check
            if (config.required && !value) {
                setError(fieldId, 'This field is required');
                return false;
            }
            if (!value) return true; // Optional empty OK

            // Specific rules
            if (config.min && value.length < config.min) {
                setError(fieldId, `${fieldId.charAt(0).toUpperCase() + fieldId.slice(1)} min ${config.min} chars`);
                return false;
            }
            if (config.regex && !config.regex.test(value)) {
                setError(fieldId, 'Invalid format');
                return false;
            }

            setValid(fieldId);
            return true;
        }

        // Live validation
        ['name', 'email', 'service', 'message', 'phone'].forEach(id => {
            const field = document.getElementById(id);
            if (field) {
                field.addEventListener('input', () => validateSingle(id));
                field.addEventListener('blur', () => validateSingle(id));
            }
        });

        // Submit
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let allValid = true;
            Object.keys(fields).forEach(id => {
                if (!validateSingle(id)) allValid = false;
            });

            if (allValid) {
                const btn = contactForm.querySelector('button[type="submit"]');
                btn.textContent = '✓ Thanks!';
                btn.disabled = true;
                btn.classList.add('submit-success');
                
                const name = document.getElementById('name')?.value.trim() || 'Visitor';
                setTimeout(() => {
                    alert(`Thank you ${name}! We'll reply within 24 hours.`);
                    contactForm.reset();
                    Object.keys(fields).forEach(clearField);
                    btn.textContent = 'Send Message';
                    btn.disabled = false;
                    btn.classList.remove('submit-success');
                }, 1200);
            }
        });
    }

    console.log('Contact form validation fixed - green on valid, submits perfectly');
});
