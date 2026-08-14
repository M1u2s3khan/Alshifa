/* ============================================================
    main.js – Complete JavaScript
    ============================================================ */

// ===== INITIALIZE AOS =====
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 600,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });
});

// ===== WHATSAPP FORM SUBMIT =====
const WHATSAPP_NUMBER = '91 8445491054'; // Replace with your actual number

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('userName')?.value?.trim() || '';
            const email = document.getElementById('userEmail')?.value?.trim() || '';
            const phone = document.getElementById('userPhone')?.value?.trim() || '';
            const message = document.getElementById('userMessage')?.value?.trim() || '';

            // Validate required fields
            if (!name || !email || !message) {
                alert('Please fill in all required fields (Name, Email, and Message).');
                return;
            }

            // Build WhatsApp message
            const msg =
                `🏥 *Alshifa Healthcare Enquiry*%0A%0A` +
                `👤 *Name:* ${encodeURIComponent(name)}%0A` +
                `📧 *Email:* ${encodeURIComponent(email)}%0A` +
                `📞 *Phone:* ${encodeURIComponent(phone || 'Not provided')}%0A` +
                `💬 *Message:* ${encodeURIComponent(message)}%0A%0A` +
                `📅 *Date:* ${new Date().toLocaleString()}`;

            const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${msg}`;

            // Open WhatsApp in new tab
            window.open(url, '_blank');

            // Reset form after a moment
            setTimeout(() => {
                contactForm.reset();
                // Remove any validation states
                contactForm.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
            }, 1500);
        });

        // ===== REAL-TIME VALIDATION =====
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.classList.add('is-invalid');
                } else {
                    this.classList.remove('is-invalid');
                }
            });
            input.addEventListener('input', function() {
                if (this.hasAttribute('required') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });
    }
});

// ===== GALLERY FILTER =====
document.addEventListener('DOMContentLoaded', function() {
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const cards = document.querySelectorAll('#galleryGrid .gallery-card');

    if (filterBtns.length && cards.length) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                const filter = this.dataset.filter;

                cards.forEach(card => {
                    const category = card.dataset.category;
                    if (filter === 'all' || category === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
});


// ===== SMOOTH SCROLL FOR NAV LINKS =====
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = document.querySelector('.navbar')?.offsetHeight || 70;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// ===== NAVBAR COLLAPSE ON LINK CLICK (mobile) =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.getElementById('mainNav');
    const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                if (bsCollapse) {
                    bsCollapse.hide();
                } else {
                    // Fallback
                    const collapse = new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                    collapse.hide();
                }
            }
        });
    });
});

// ===== REFRESH AOS ON RESIZE =====
let resizeTimer;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
        AOS.refresh();
    }, 250);
});

console.log('✅ Alshifa Healthcare – All scripts loaded successfully.');

