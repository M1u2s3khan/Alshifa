 // ===== INITIALIZE AOS =====
    AOS.init({
        duration: 600,
        once: true,
        offset: 80,
        easing: 'ease-out-cubic'
    });

    // ===== WHATSAPP FORM SUBMIT =====
    // Replace with your actual WhatsApp number (with country code, no '+' sign)
    const WHATSAPP_NUMBER = '919999999999';

    function sendToWhatsApp(event) {
        event.preventDefault();

        const name = document.getElementById('formName').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        const message = document.getElementById('formMessage').value.trim();

        if (!name || !phone || !message) {
            alert('Please fill all fields before sending.');
            return;
        }

        // Build the WhatsApp message
        const whatsappMsg =
            `🏥 *Alshifa Healthcare Enquiry*%0A%0A👤 *Name:* ${encodeURIComponent(name)}%0A📞 *Phone:* ${encodeURIComponent(phone)}%0A💬 *Message:* ${encodeURIComponent(message)}%0A%0A📅 *Date:* ${new Date().toLocaleString()}`;

        const url = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${whatsappMsg}`;

        // Open WhatsApp in a new tab
        window.open(url, '_blank');

        // Optionally reset form after a moment
        setTimeout(() => {
            document.getElementById('contactForm').reset();
        }, 1000);
    }

    // ===== GALLERY FILTER =====
    document.addEventListener('DOMContentLoaded', function() {
        const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
        const cards = document.querySelectorAll('#galleryGrid .gallery-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                filterBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                const filter = this.dataset.filter;
                cards.forEach(card => {
                    const category = card.dataset.category;
                    card.style.display = (filter === 'all' || category === filter) ? 'block' :
                        'none';
                });
            });
        });
    });
