 // ============================================================
    // CONTACT FORM HANDLER — DATA → CONSOLE
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {

        const form = document.getElementById('contactForm');
        const submitBtn = document.getElementById('submitBtn');
        const toastContainer = document.getElementById('toastContainer');

        // --- Show Toast ---
        function showToast(message, type = 'success') {
            const icon = type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill';
            const title = type === 'success' ? '✅ Success!' : '⚠️ Oops!';
            const toast = document.createElement('div');
            toast.className = `toast-custom ${type === 'error' ? 'error' : ''}`;
            toast.innerHTML = `
                        <div class="toast-icon"><i class="bi ${icon}"></i></div>
                        <div class="toast-body">
                            <h6>${title}</h6>
                            <p>${message}</p>
                        </div>
                        <button class="toast-close" aria-label="Close">&times;</button>
                    `;
            toast.querySelector('.toast-close').addEventListener('click', () => toast.remove());
            toastContainer.appendChild(toast);
            setTimeout(() => { if (toast.parentNode) toast.remove(); }, 5000);
        }

        // --- Form Submit ---
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // 🔥 Prevents page reload

            // Get fields
            const name = document.getElementById('userName');
            const email = document.getElementById('userEmail');
            const phone = document.getElementById('userPhone');
            const message = document.getElementById('userMessage');

            // Validate
            let isValid = true;
            [name, email, message].forEach(field => {
                field.classList.remove('is-invalid');
                if (!field.value.trim()) {
                    field.classList.add('is-invalid');
                    isValid = false;
                }
            });

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email.value.trim() && !emailPattern.test(email.value.trim())) {
                email.classList.add('is-invalid');
                isValid = false;
            }

            if (!isValid) {
                showToast('Please fill in all required fields correctly.', 'error');
                return;
            }

            // ✅ Build data
            const formData = {
                name: name.value.trim(),
                email: email.value.trim(),
                phone: phone.value.trim() || 'Not provided',
                message: message.value.trim(),
                submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
            };

            // ✅ LOG TO CONSOLE
            console.log('📩 ===== CONTACT FORM DATA =====');
            console.log('👤 Name:', formData.name);
            console.log('📧 Email:', formData.email);
            console.log('📱 Phone:', formData.phone);
            console.log('💬 Message:', formData.message);
            console.log('🕐 Submitted At:', formData.submittedAt);
            console.log('📦 Full Object:', formData);
            console.log('✅ Data captured successfully!');

            showToast('Your inquiry has been logged to the console! Open DevTools (F12) → Console tab.');

            // Reset form
            form.reset();
            [name, email, message].forEach(f => f.classList.remove('is-invalid'));

            // Show loading briefly
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }, 800);
        });

        // --- Clear validation on input ---
        document.querySelectorAll('#contactForm .form-control').forEach(field => {
            field.addEventListener('input', function() {
                if (this.classList.contains('is-invalid') && this.value.trim()) {
                    this.classList.remove('is-invalid');
                }
            });
        });

        // --- Language toggle (UI) ---
        document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                document.querySelectorAll('.lang-toggle .btn').forEach(b => b.classList.remove('active-lang'));
                this.classList.add('active-lang');
            });
        });

        console.log('✅ Contact form ready! Fill in the form and submit to see data in the console.');
    });

// contact form close 

// navbar start //
  document.addEventListener('DOMContentLoaded', function() {
        const toggler = document.getElementById('navToggler');
        const collapseEl = document.getElementById('mainNav');

        if (!toggler || !collapseEl) return;

        // 1) Toggle class on click (for instant feedback)
        toggler.addEventListener('click', function(e) {
            // The 'open' class will be toggled, but we also listen to Bootstrap events
            // to keep it in sync. We'll let Bootstrap handle the collapse state,
            // and we'll toggle the class based on the collapse state.
            // But we need to prevent double-toggle if the user clicks fast.
            // Better: listen to Bootstrap's shown.bs.collapse / hidden.bs.collapse
        });

        // 2) Use Bootstrap events to keep the toggler in sync
        collapseEl.addEventListener('shown.bs.collapse', function() {
            toggler.classList.add('open');
            toggler.setAttribute('aria-expanded', 'true');
        });

        collapseEl.addEventListener('hidden.bs.collapse', function() {
            toggler.classList.remove('open');
            toggler.setAttribute('aria-expanded', 'false');
        });

        // 3) If the collapse is already open on page load (e.g., from previous session),
        //    we need to set the initial state.
        if (collapseEl.classList.contains('show')) {
            toggler.classList.add('open');
            toggler.setAttribute('aria-expanded', 'true');
        } else {
            toggler.classList.remove('open');
            toggler.setAttribute('aria-expanded', 'false');
        }

        // 4) (Optional) Close the menu when a nav link is clicked (on mobile)
        const navLinks = document.querySelectorAll('#mainNav .nav-link');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                // Only on mobile (collapse is shown)
                if (window.innerWidth < 992) {
                    const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
                    if (bsCollapse) {
                        bsCollapse.hide();
                    }
                }
            });
        });

        // 5) (Optional) Close when clicking outside the navbar (on mobile)
        document.addEventListener('click', function(e) {
            const isMobile = window.innerWidth < 992;
            if (!isMobile) return;

            const nav = document.querySelector('.navbar');
            if (!nav) return;

            // If click is outside the navbar and the collapse is open
            if (!nav.contains(e.target) && collapseEl.classList.contains('show')) {
                const bsCollapse = bootstrap.Collapse.getInstance(collapseEl);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

// navbar close//
    // ============================================================
    // 1. MASTER TRANSLATIONS (merged: main + gallery)
    // ============================================================
    const TRANSLATIONS = {
        // ---- NAV ----
        'nav.home': { hi: 'होम', en: 'Home' },
        'nav.about': { hi: 'परिचय', en: 'About' },
        'nav.services': { hi: 'सेवाएँ', en: 'Services' },
        'nav.contact': { hi: 'संपर्क करें', en: 'Contact Us' },
        'nav.gallery': { hi: 'गैलरी', en: 'Gallery' },
        'nav.gallery': { hi: 'गैलरी', en: 'Gallery' },
        'brand.sub': { hi: 'Dr. Mohammed Deen', en: 'Alshifa Healthcare Medical Center' },

        // ---- HERO ----
        'hero.badge': { hi: 'आपका स्वागत है', en: 'Welcome To' },
        'hero.title1': { hi: 'अल (हकीम)', en: 'Al. (Hakeem)' },
        'hero.title2': { hi: 'उनानी मेडिकल सेंटर', en: 'Unani Medical Centre' },
        'hero.desc': { hi: 'अल हकीम यूनानी मेडिकेयर सेंटर, यूनानी चिकित्सा पद्धति से कई तरह की बीमारियों के इलाज के लिए एक बेहतरीन जगह है। यह सेंटर भारत के जाने-माने विद्वानों और मशहूर यूनानी डॉक्टरों की सोच का नतीजा है, जिनका मकसद आधुनिक, सुरक्षित और अच्छी क्वालिटी की हेल्थकेयर सर्विस देना है। यूनानी चिकित्सा पद्धति पारंपरिक आयुष (AYUSH) चिकित्सा का एक अहम हिस्सा है, जिसे भारत सरकार के आयुष मंत्रालय से मान्यता और रेगुलेशन मिला हुआ है।',
            en: 'Al Hakeem Unani Medicare Center is an excellent place for treatment of various diseases through UnaniMedicine. This center is the vision of top Indian scholars and renowned Unani physicians aimed toprovide state of the art, safe and quality health care services. Unani medical system is an importantelement of traditional AYUSH medicine which is recognized and governed by Ministry of AYUSH,Government of India.' },
        'hero.btn1': { hi: 'हमारी सेवाएँ', en: 'Our Services' },
        'hero.btn2': { hi: 'अधिक जानें', en: 'Learn More' },

        // ---- STATS ----
        'stat1.num': { hi: '15+', en: '15+' },
        'stat1.label': { hi: 'वर्षों का अनुभव', en: 'Years of Experience' },
        'stat2.num': { hi: '10K+', en: '10K+' },
        'stat2.label': { hi: 'संतुष्ट रोगी', en: 'Satisfied Patients' },
        'stat3.num': { hi: '20+', en: '20+' },
        'stat3.label': { hi: 'राष्ट्रीय/अंतर्राष्ट्रीय पुरस्कार', en: 'National/International Awards' },
        'stat4.num': { hi: '100%', en: '100%' },
        'stat4.label': { hi: 'प्राकृतिक एवं सुरक्षित उपचार', en: 'Natural & Safe Treatment' },

        // ---- ABOUT ----
        'about.title': { hi: 'केंद्र के बारे में', en: 'About the Centre' },
        'about.p1': { hi: '<strong>अलशिफ़ा हेल्थकेयर मेडिकल सेंटर</strong> की स्थापना <strong>2020</strong> में नई दिल्ली के गुलाओही में एक उद्देश्य से की गई थी – विभिन्न रोग स्थितियों/स्वास्थ्य समस्याओं को समग्र उनानी दृष्टिकोण से रोकना और उनका उपचार करना।',
            en: '<strong>DR. (Hkm) Alshifa Healthcare Unani Medical Centre (SJUMC)</strong> was established in <strong>2020</strong> in Gulaohi, New Delhi with a mission – to prevent and treat various disease conditions / health problems through a holistic Unani approach.' },
        'about.p2': { hi: 'उनानी चिकित्सा पद्धति में विभिन्न प्रकार की प्राकृतिक जड़ी-बूटियों और न्यूनतम दुष्प्रभाव वाली चिकित्सा पद्धतियों का उपयोग किया जाता है। केंद्र विशेषज्ञ उनानी चिकित्सकों का परामर्श और गुणवत्तापूर्ण उनानी दवाएं उपभोक्ता की सुविधानुसार प्रदान करता है।',
            en: 'Unani medicine uses various natural herbs and therapies with minimal side effects. The centre provides expert Unani consultation and quality Unani medicines at the convenience of the patients.' },
        'about.p3': { hi: 'इस केंद्र की शुरुआत भारत के प्रसिद्ध उनानी चिकित्सक <strong>‘डॉ. मोहम्मद दीन’</strong> ने की, জিন্হোঁনে 15 বছরের সমৃদ্ধ অভিজ্ঞতা এবং টিবিয়া কলেজ, কারোল বাগ এবং পরবর্তীতে মাজিদিয়া হস্পিটাল, জামিয়া হামদার্দ, নতুন দিল্লি मেঁ সফলভাবে অভিযোগনা।',
            en: 'The centre was founded by India\'s renowned Unani physician <strong>‘Dr. Mohammed Deen’</strong>, who has 15 years of rich experience and has successfully practiced at Tibia College, Karol Bagh and later at Majidia Hospital, Jamia Hamdard, New Delhi.' },
        'about.quoteTitle': { hi: 'हमारा उद्देश्य', en: 'Our Mission' },
        'about.quote': { hi: '“समाज की निरंतर सेवा के परोपकारी इरादे से, वे अपने उनानी चिकित्सा ज्ञान को आधुनिक चिकित्सा विज्ञान के साथ समन्वयित करते हुए एक स्वस्थ भारत का निर्माण कर रहे हैं।”',
            en: '“With the philanthropic intent of continuous service to society, they are building a healthy India by integrating their Unani medical knowledge with modern medical science.”' },
        'tag1': { hi: 'हेपेटोबिलियरी', en: 'Hepatobiliary' },
        'tag2': { hi: 'श्वसन रोग', en: 'Respiratory Diseases' },
        'tag3': { hi: 'त्वचा रोग', en: 'Skin Diseases' },
        'tag4': { hi: 'गठिया', en: 'Arthritis' },
        'tag5': { hi: 'न्यूरोसाइकियाट्रिक', en: 'Neuropsychiatric' },
        'tag6': { hi: 'पाचन विकार', en: 'Digestive Disorders' },
        'tag7': { hi: 'गुर्दा एवं मूत्र पथ', en: 'Kidney & Urinary Tract' },
        'tag8': { hi: 'यौन विकार', en: 'Sexual Disorders' },
        'tag9': { hi: 'जीवनशैली रोग', en: 'Lifestyle Diseases' },

        // ---- SERVICES ----
        'services.title': { hi: 'हमारी <span class="highlight">सेवाएँ</span>', en: 'Our <span class="highlight">Services</span>' },
        'services.sub': { hi: 'हम कई तरह की स्वास्थ्य समस्याओं के लिए खास यूनानी इलाज देते हैं। हमारे एक्सपर्ट डॉक्टर सुरक्षित और असरदार इलाज के लिए प्राकृतिक जड़ी-बूटियों और पारंपरिक तरीकों का इस्तेमाल करते हैं।',
            en: 'We provide specialized Unani treatments for a wide range of health conditions. Our expert physicians use natural herbs and traditional therapies for safe and effective healing.' },

        // ---- DOCTORS ----
        'doctors.title': { hi: 'हमारे <span class="highlight">विशेषज्ञ चिकित्सक</span>', en: 'Our <span class="highlight">Expert Doctors</span>' },
        'doctors.sub': { hi: 'Alshifa Health Care  में अनुभवी एवं योग्य उनानी चिकित्सकों की टीम आपके स्वास्थ्य के लिए समर्पित है।',
            en: 'The team of experienced and qualified Unani practitioners at Alshifa Health Care  is dedicated to your health.' },

        // ---- WHY UNANI ----
        'why.title': { hi: 'क्यों <span class="highlight">उनानी</span> देखभाल?', en: 'Why <span class="highlight">Unani</span> Care?' },
        'why.c1t': { hi: 'प्रतिरक्षा प्रणाली को मजबूत करना', en: 'Strengthening Immunity' },
        'why.c1d': { hi: 'उनानी चिकित्सा शरीर की प्राकृतिक प्रतिरक्षा को बढ़ावा देती है।', en: 'Unani medicine boosts the body\'s natural immunity.' },
        'why.c2t': { hi: 'न्यूनतम / कोई दुष्प्रभाव नहीं', en: 'Minimal / No Side Effects' },
        'why.c2d': { hi: 'प्राकृतिक जड़ी-बूटियों पर आधारित, सुरक्षित एवं प्रभावी।', en: 'Based on natural herbs, safe and effective.' },
        'why.c3t': { hi: 'मानसिक-शारीरिक कल्याण', en: 'Mental-Physical Wellbeing' },
        'why.c3d': { hi: 'संपूर्ण स्वास्थ्य के लिए समग्र दृष्टिकोण।', en: 'Holistic approach for complete health.' },
        'why.c4t': { hi: 'स्थायी इलाज', en: 'Permanent Cure' },
        'why.c4d': { hi: 'मूल कारण का उपचार, दीर्घकालिक राहत।', en: 'Treats the root cause, long-term relief.' },
        'why.c5t': { hi: 'भारत एवं विदेश में विश्वसनीय', en: 'Trusted in India & Abroad' },
        'why.c5d': { hi: '45 वर्षों के अनुभव के साथ अंतर्राष्ट्रीय स्तर पर मान्यता प्राप्त।', en: 'Internationally recognized with 45 years of experience.' },
        'why.c6t': { hi: 'किफायती एवं सुलभ', en: 'Affordable & Accessible' },
        'why.c6d': { hi: 'सभी वर्गों के लिए सस्ती पारंपरिक उनानी चिकित्सा।', en: 'Affordable traditional Unani medicine for all.' },

        // ---- HIGHLIGHTS ----
        'highlights.title': { hi: 'प्रमुख <span class="highlight">हाइलाइट्स</span>', en: 'Key <span class="highlight">Highlights</span>' },
        'h1.t': { hi: '15+ वर्षों का अनुभव', en: '15+ Years of Experience' },
        'h1.d': { hi: 'डॉ. मोहम्मद दीन का समृद्ध क्लिनिकल अनुभव।', en: 'Rich clinical experience of Dr. Mohammed Deen' },
        'h2.t': { hi: 'हजारों रोगियों का उपचार', en: 'Thousands of Patients Treated' },
        'h2.d': { hi: 'भारत एवं विदेश में इनडोर एवं आउटडोर रोगी।', en: 'Indoor & outdoor patients in India and abroad.' },
        'h3.t': { hi: 'राष्ट्रीय & अंतर्राष्ट्रीय पुरस्कार', en: 'National & International Awards' },
        'h3.d': { hi: 'उत्कृष्ट योगदान के लिए कई प्रतिष्ठित पुरस्कार।', en: 'Multiple prestigious awards for outstanding contribution.' },
        'h4.t': { hi: 'गुलावठी, बुलंदशहर', en: 'Gulaothi, Bulandshahr' },
        'h4.d': { hi: 'सुसज्जित केंद्र, आधुनिक सुविधाओं से युक्त।', en: 'Well-equipped centre with modern facilities.' },

        // ---- TESTIMONIALS ----
        'testimonials.title': { hi: 'मरीजों के <span class="highlight">अनुभव</span>', en: 'Patient <span class="highlight">Experiences</span>' },
        'testimonials.sub': { hi: 'हमारे मरीजों ने हमारी सेवाओं के बारे में क्या कहा – पढ़ें उनके अनुभव।',
            en: 'What our patients have said about our services – read their experiences.' },

        // ---- CONTACT ----
        'contact.title': { hi: 'आज ही संपर्क करें', en: 'Contact Us Today' },
        'contact.sub': { hi: 'एक स्वस्थ जीवन की ओर पहला कदम – Alshifa Healthcare Clinic में आपका स्वागत है।', en: 'First step towards a healthy life – Welcome to Alshifa Healthcare Clinic.' },
        'contact.addr': { hi: 'गुलावठी, बुलंदशहर', en: 'Gulaothi, Bulandshahr' },
        'contact.whatsapp': { hi: 'WhatsApp', en: 'WhatsApp' },
        'contact.appt': { hi: 'ऑनलाइन अपॉइंटमेंट', en: 'Online Appointment' },
        'contact.formTitle': { hi: 'त्वरित संपर्क', en: 'Quick Contact' },
        'contact.fname': { hi: 'आपका नाम', en: 'Your Name' },
        'contact.fnamePlace': { hi: 'पूरा नाम', en: 'Full Name' },
        'contact.fmobile': { hi: 'मोबाइल नंबर', en: 'Mobile Number' },
        'contact.fmobilePlace': { hi: '+91-XXXXXXXXXX', en: '+91-XXXXXXXXXX' },
        'contact.fmsg': { hi: 'संदेश', en: 'Message' },
        'contact.fmsgPlace': { hi: 'आपकी स्वास्थ्य समस्या...', en: 'Your health concern...' },
        'contact.fsubmit': { hi: 'संदेश भेजें', en: 'Send Message' },


        



        // ---- FOOTER ----
        'footer.addr': { hi: ' अलशिफ़ा यूनानी हेल्थ केयर हॉस्पिटल<br />गुलावठी बुलंदशहर',
            en: 'Alshifa Unani Health Care Hospital<br />Gulaothi, Bulandshahr' },
        'footer.est': { hi: 'स्थापित 2020', en: 'Established 2020' },
        'footer.linksTitle': { hi: 'त्वरित लिंक', en: 'Quick Links' },
        'footer.l4': { hi: 'होम', en: 'Home' },
        'footer.l1': { hi: 'परिचय', en: 'About' },
        'footer.l2': { hi: 'सेवाएँ', en: 'Services' },
        'footer.l3': { hi: 'संपर्क करें', en: 'Contact Us' },
        'footer.l5': { hi: 'गैलरी', en: 'Gallery' },
        'footer.follow': { hi: 'अनुसरण करें', en: 'Follow Us' },
        'footer.rights': { hi: 'सर्वाधिकार सुरक्षित।', en: 'All Rights Reserved.' },

        // ---- GALLERY ----
        'gallery.title': { hi: 'रेजिमेनल थेरेपी <span class="highlight">(इलाज-बित-तदबीर)</span>',
            en: 'Regimenal Therapy <span class="highlight">(Ilaj-bit-Tadbeer)</span>' },
        'gallery.filterAll': { hi: 'सभी', en: 'All' },
        'gallery.filterHijama': { hi: 'हिजामा', en: 'Hijama' },
        'gallery.filterFasd': { hi: 'फ़स्द', en: 'Fasd' },
        'gallery.filterIrsale': { hi: 'इरसाले अलक़', en: 'Irsale Alaq' },
        'gallery.filterDalk': { hi: 'दल्क', en: 'Dalk' },
        'gallery.filterHammam': { hi: 'हम्माम', en: 'Hammam' },
        'gallery.filterAyurveda': { hi: 'आयुर्वेद', en: 'Ayurveda' },
        'gallery.item1': { hi: 'हिजामा कपिंग थेरेपी', en: 'Hijama Cupping Therapy' },
        'gallery.desc1': { hi: 'हिजामा में शरीर के विशेष बिंदुओं पर कप लगाकर नकारात्मक दबाव से रक्त निकाला जाता है। यह रक्त परिसंचरण सुधारता है और दर्द से राहत देता है।',
            en: 'In Hijama, cups are applied on specific points with negative pressure to draw out blood. It improves circulation and relieves pain.' },
        'gallery.item2': { hi: 'हिजामा उपचार सत्र', en: 'Hijama Treatment Session' },
        'gallery.desc2': { hi: 'एक पेशेवर हिजामा सत्र में रोगी को आरामदायक स्थिति में रखा जाता है और विशेषज्ञ चिकित्सक कपिंग करता है।',
            en: 'In a professional Hijama session, the patient is placed comfortably and the expert practitioner performs cupping.' },
        'gallery.item3': { hi: 'फ़स्द (वेनिसेक्शन)', en: 'Fasd (Venesection)' },
        'gallery.desc3': { hi: 'फ़स्द में नसों से कुछ मात्रा में रक्त निकाला जाता है, जिससे रक्तचाप और सूजन कम होती है।',
            en: 'Fasd involves drawing a specific amount of blood from veins, which reduces blood pressure and inflammation.' },
        'gallery.item4': { hi: 'फ़स्द रक्त निकालना', en: 'Fasd Bloodletting' },
        'gallery.desc4': { hi: 'यह प्राचीन उनानी तकनीक शरीर से अतिरिक्त दोषपूर्ण रक्त को निकालकर संतुलन बहाल करती है।',
            en: 'This ancient Unani technique restores balance by removing excess morbid blood from the body.' },
        'gallery.item5': { hi: 'इरसाले अलक़ (जोंक थेरेपी)', en: 'Irsale Alaq (Leech Therapy)' },
        'gallery.desc5': { hi: 'चिकित्सीय जोंकों को प्रभावित क्षेत्र पर लगाया जाता है, जो रक्त चूसती हैं और सूजन कम करती हैं।',
            en: 'Medicinal leeches are applied to the affected area; they suck blood and reduce inflammation.' },
        'gallery.item6': { hi: 'जोंक चिकित्सा', en: 'Leech Therapy' },
        'gallery.desc6': { hi: 'जोंक की लार में मौजूद एंजाइम रक्त को पतला करते हैं और स्थानीय दर्द से राहत देते हैं।',
            en: 'Enzymes in leech saliva thin the blood and provide relief from local pain.' },
        'gallery.item7': { hi: 'दल्क (मालिश)', en: 'Dalk (Massage)' },
        'gallery.desc7': { hi: 'दल्क में विशेष तेलों का उपयोग करके शरीर की मालिश की जाती है, जिससे मांसपेशियाँ ढीली होती हैं।',
            en: 'Dalk involves body massage with special oils, which relaxes muscles and improves blood flow.' },
        'gallery.item8': { hi: 'दल्क तेल मालिश', en: 'Dalk Oil Massage' },
        'gallery.desc8': { hi: 'गठिया, पीठ दर्द और जोड़ों की अकड़न में दल्क अत्यंत लाभकारी है।',
            en: 'Dalk is highly beneficial for arthritis, back pain and joint stiffness.' },
        'gallery.item9': { hi: 'हम्माम (भाप स्नान)', en: 'Hammam (Steam Bath)' },
        'gallery.desc9': { hi: 'हम्माम में भाप के माध्यम से शरीर के छिद्र खुलते हैं और विषाक्त पदार्थ बाहर निकलते हैं।',
            en: 'In Hammam, steam opens the pores and expels toxins from the body.' },
        'gallery.item10': { hi: 'हम्माम चिकित्सा', en: 'Hammam Therapy' },
        'gallery.desc10': { hi: 'श्वसन तंत्र को साफ करने और त्वचा को निखारने के लिए हम्माम थेरेपी प्रभावी है।',
            en: 'Hammam therapy is effective for clearing the respiratory tract and improving skin complexion.' },
        'gallery.item11': { hi: 'नतूल (शिरोधारा)', en: 'Natool (Shirodhara)' },
        'gallery.desc11': { hi: 'नतूल में माथे पर तेल की धारा बहाई जाती है, जो मस्तिष्क को शांत करती है।',
            en: 'In Natool, a stream of oil is poured on the forehead, which calms the brain.' },
        'gallery.item12': { hi: 'नतूल तेल धारा', en: 'Natool Oil Stream' },
        'gallery.desc12': { hi: 'अनिद्रा, सिरदर्द और मानसिक तनाव में नतूल अत्यंत प्रभावी है।',
            en: 'Natool is highly effective for insomnia, headache and mental stress.' },
        'gallery.item13': { hi: 'आयुर्वेद उपचार', en: 'Ayurveda Treatment' },
        'gallery.desc13': { hi: 'आयुर्वेद में जड़ी-बूटियों, तेलों और पंचकर्म के माध्यम से संपूर्ण स्वास्थ्य पर ध्यान दिया जाता है।',
            en: 'Ayurveda focuses on overall health through herbs, oils and Panchakarma therapies.' },
        'gallery.item14': { hi: 'आयुर्वेद मालिश', en: 'Ayurveda Massage' },
        'gallery.desc14': { hi: 'आयुर्वेदिक मालिश शरीर को डिटॉक्स करती है और ऊर्जा स्तर बढ़ाती है।',
            en: 'Ayurvedic massage detoxifies the body and boosts energy levels.' },
        'gallery.item15': { hi: 'आयुर्वेद हर्बल थेरेपी', en: 'Ayurveda Herbal Therapy' },
        'gallery.desc15': { hi: 'आयुर्वेदिक हर्बल थेरेपी में प्राकृतिक जड़ी-बूटियों का उपयोग करके रोगों की जड़ से चिकित्सा की जाती है।',
            en: 'Ayurvedic herbal therapy treats diseases at their root using natural herbs.' }
    };

    // ============================================================
    // 2. DATA
    // ============================================================
    const DOCTORS = [{
        id: 1,
        name_hi: 'डॉ. मोहम्मद दीन',
        name_en: 'Dr. Mohammed Deen',
        specialty_hi: 'मुख्य उनानी चिकित्सक',
        specialty_en: 'Chief Unani Physician',
        bio_hi: '15+ वर्षों का अनुभव, उनानी चिकित्सा के क्षेत्र में राष्ट्रीय एवं अंतर्राष्ट्रीय पुरस्कार प्राप्त।',
        bio_en: '15+ years of experience, recipient of national and international awards in Unani medicine.',
        img: 'https://hips.hearstapps.com/hmg-prod/images/portrait-of-a-happy-young-doctor-in-his-clinic-royalty-free-image-1661432441.jpg?crop=0.66698xw:1xh;center,top&resize=1200:*'
    }, {
        id: 2,
        name_hi: 'डॉ. आयशा जमील',
        name_en: 'Dr. Ayesha Jamil',
        specialty_hi: 'महिला उनानी चिकित्सक (स्त्री रोग)',
        specialty_en: 'Female Unani Practitioner (Gynecology)',
        bio_hi: 'महिला रोगियों के लिए विशेषज्ञ परामर्श, स्त्री रोग एवं प्रजनन स्वास्थ्य में विशेषज्ञ।',
        bio_en: 'Expert consultation for female patients, specializing in gynecology and reproductive health.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vLiam9_EkzYNnCpJP9W-mwznKexslyCU42TtsXNJAVn3y2PpmE-Gb6Oa&s=10'
    }, {
        id: 3,
        name_hi: 'डॉ. मोहम्मद अली',
        name_en: 'Dr. Mohammad Ali',
        specialty_hi: 'उनानी चिकित्सा विशेषज्ञ (हृदय एवं श्वसन)',
        specialty_en: 'Unani Specialist (Cardio-Respiratory)',
        bio_hi: 'हृदय रोग, अस्थमा और श्वसन विकारों में 20 वर्षों का विशिष्ट अनुभव।',
        bio_en: '20 years of specialized experience in heart diseases, asthma and respiratory disorders.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsM-JOMRSCnJFv5erkn-jelu-9Ae1zByCawa4ZjbR8HiF48neKa_crkus&s=10'
    }, {
        id: 4,
        name_hi: 'डॉ. फातिमा खान',
        name_en: 'Dr. Fatima Khan',
        specialty_hi: 'उनानी चिकित्सक (त्वचा एवं बाल)',
        specialty_en: 'Unani Physician (Dermatology & Trichology)',
        bio_hi: 'त्वचा रोग, एक्जिमा, सोरायसिस एवं बाल संबंधी समस्याओं की विशेषज्ञ।',
        bio_en: 'Expert in skin diseases, eczema, psoriasis and hair-related issues.',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4vLiam9_EkzYNnCpJP9W-mwznKexslyCU42TtsXNJAVn3y2PpmE-Gb6Oa&s=10'
    }];

    // UPDATED SERVICES DATA WITH IMAGES
            // --------------------------------------------------------------
        const SERVICES_DATA = [
            {
                img:"assets/images/skin.jpg",
                color: 'primary',
                title_hi: 'त्वचा की समस्याएँ',
                title_en: 'Skin Problems',
                desc_hi: 'एक्जिमा, सोरायसिस, मुँहासे, खुजली, दाद, और अन्य त्वचा संबंधी विकारों का उनानी जड़ी-बूटियों से उपचार।',
                desc_en: 'Treatment for eczema, psoriasis, acne, itching, ringworm, and other skin disorders using Unani herbs.',
            },
            {
                 img:"assets/images/sexual.jpg",
                color: 'danger',
                title_hi: 'यौन दुर्बलता',
                title_en: 'Sexual Weakness',
                desc_hi: 'पुरुषों में यौन शक्ति की कमी, शीघ्रपतन, और अन्य यौन समस्याओं का प्राकृतिक उपचार।',
                desc_en: 'Natural treatment for male sexual weakness, premature ejaculation, and other sexual issues.',
            },
            {
                 img:"assets/images/weight.jpg",
                color: 'success',
                title_hi: 'वजन घटाना',
                title_en: 'Weight Loss',
                desc_hi: 'उनानी औषधियों और आहार-विज्ञान के माध्यम से सुरक्षित एवं प्रभावी वजन घटाने की योजना।',
                desc_en: 'Safe and effective weight loss plan through Unani medicines and dietary guidance.',
            },
            {
                 img:"assets/images/general.jpg",
                color: 'warning',
                title_hi: 'सामान्य कमज़ोरी',
                title_en: 'General Weakness',
                desc_hi: 'शारीरिक और मानसिक थकावट, कमज़ोरी, और ऊर्जा की कमी को दूर करने के लिए उनानी टॉनिक।',
                desc_en: 'Unani tonics to overcome physical and mental fatigue, weakness, and lack of energy.',
            },
            {
                img:"assets/images/liver.jpg",
                color: 'info',
                title_hi: 'फैटी लीवर / पाचन समस्याएँ',
                title_en: 'Fatty Liver / Digestion Issues',
                desc_hi: 'लीवर की समस्याएँ, अपच, एसिडिटी, कब्ज, और पाचन तंत्र के अन्य विकारों का उपचार।',
                desc_en: 'Treatment for liver problems, indigestion, acidity, constipation, and other digestive disorders.',
            },
            {
                 img:"assets/images/hair.jpg",
                color: 'secondary',
                title_hi: 'बालों का झड़ना',
                title_en: 'Hair Fall',
                desc_hi: 'बालों के झड़ने, पतले होने, और रूसी के लिए उनानी हर्बल उपचार।',
                desc_en: 'Unani herbal remedies for hair fall, thinning, and dandruff.',
            },
            {
                 img:"assets/images/hairskin.jpg",
                color: 'pink',
                title_hi: 'बाल और त्वचा देखभाल',
                title_en: 'Hair & Skin Care',
                desc_hi: 'बालों और त्वचा की समग्र देखभाल के लिए प्राकृतिक उनानी नुस्ख़े और उपचार।',
                desc_en: 'Natural Unani formulations and treatments for overall hair and skin care.',
            },
            {
                 img:"assets/images/migrane.jpg",
                color: 'dark',
                title_hi: 'माइग्रेन / सिरदर्द',
                title_en: 'Migraine / Headache',
                desc_hi: 'माइग्रेन, तनाव सिरदर्द, और अन्य सिरदर्द के लिए उनानी दवाएं और इलाज-बित-तदबीर।',
                desc_en: 'Unani medicines and regimenal therapies for migraine, tension headaches, and other headaches.',
            },
            {
                img:"assets/images/pain.jpg",
                color: 'warning',
                title_hi: 'जोड़ों का दर्द',
                title_en: 'Joint Pain',
                desc_hi: 'गठिया, ऑस्टियोआर्थराइटिस, और जोड़ों के अन्य दर्दों के लिए उनानी उपचार।',
                desc_en: 'Unani treatment for arthritis, osteoarthritis, and other joint pains.',
            },
            {
                img:"assets/images/backpain.jpg",
                color: 'danger',
                title_hi: 'पीठ दर्द',
                title_en: 'Back Pain',
                desc_hi: 'पीठ के निचले हिस्से, ऊपरी हिस्से, और कमर दर्द के लिए उनानी थेरेपी।',
                desc_en: 'Unani therapy for lower back, upper back, and lumbar pain.',
            },
            {
                img:"assets/images/sciatica.jpg",
                color: 'primary',
                title_hi: 'सायटिका',
                title_en: 'Sciatica',
                desc_hi: 'सायटिका तंत्रिका दर्द, जांघ और पैरों में दर्द के लिए विशेष उनानी इलाज।',
                desc_en: 'Special Unani treatment for sciatic nerve pain, thigh and leg pain.',
            }
        ];


    const GALLERY_ITEMS = [
        { id: 1, titleKey: 'gallery.item1', descKey: 'gallery.desc1', category: 'hijama', img: 'assets/images/hijama.png' },
        { id: 2, titleKey: 'gallery.item2', descKey: 'gallery.desc2', category: 'hijama', img: 'assets/images/hijama-2.png' },
        { id: 3, titleKey: 'gallery.item3', descKey: 'gallery.desc3', category: 'fasd', img: 'assets/images/fasad.jpg' },
        { id: 4, titleKey: 'gallery.item4', descKey: 'gallery.desc4', category: 'fasd', img: 'assets/images/fasad-2.jpg' },
        { id: 5, titleKey: 'gallery.item5', descKey: 'gallery.desc5', category: 'irsale', img: 'assets/images/irsal.jpg' },
        { id: 6, titleKey: 'gallery.item6', descKey: 'gallery.desc6', category: 'irsale', img: 'assets/images/leech.jpg' },
        { id: 7, titleKey: 'gallery.item7', descKey: 'gallery.desc7', category: 'dalk', img: 'assets/images/dalk.jpg' },
        { id: 8, titleKey: 'gallery.item8', descKey: 'gallery.desc8', category: 'dalk', img: 'assets/images/dalkoil.jpg' },
        { id: 9, titleKey: 'gallery.item9', descKey: 'gallery.desc9', category: 'hammam', img: 'assets/images/hammam.jpg' },
        { id: 10, titleKey: 'gallery.item10', descKey: 'gallery.desc10', category: 'hammam', img: 'assets/images/hammam-2.jpg' },
        { id: 11, titleKey: 'gallery.item11', descKey: 'gallery.desc11', category: 'ayurveda', img: 'assets/images/natool.jpg' },
        { id: 12, titleKey: 'gallery.item12', descKey: 'gallery.desc12', category: 'ayurveda', img: 'assets/images/natool_oil.jpg' },
        { id: 13, titleKey: 'gallery.item13', descKey: 'gallery.desc13', category: 'ayurveda', img: 'assets/images/ayurveda.jpg' },
        { id: 14, titleKey: 'gallery.item14', descKey: 'gallery.desc14', category: 'ayurveda', img: 'assets/images/ayurveda_massage.jpg' },
        { id: 15, titleKey: 'gallery.item15', descKey: 'gallery.desc15', category: 'ayurveda', img: 'assets/images/ayurveda_herbal.jpg' }
    ];

    // ============================================================
    // 3. STATE
    // ============================================================
    let currentLang = 'en';  // DEFAULT ENGLISH
    let currentFilter = 'all';

    // ============================================================
    // 4. HELPERS
    // ============================================================
    function t(key) {
        return TRANSLATIONS[key] ? TRANSLATIONS[key][currentLang] : key;
    }

    // ============================================================
    // 5. RENDER FUNCTIONS
    // ============================================================
    function renderDoctors() {
        const container = document.getElementById('doctorContainer');
        if (!container) return;
        container.innerHTML = DOCTORS.map((d, idx) => `
                <div class="col-md-6 col-lg-3" data-aos="zoom-in-up" data-aos-duration="600" data-aos-delay="${idx * 100}">
                    <div class="card-unani doctor-card p-3 shadow-lg rounded-3 border-0 h-auto">
                        <img width="100" height="auto" object-fit="cover" src="${d.img}" class="card-img-top" alt="${currentLang === 'hi' ? d.name_hi : d.name_en}">
                        <div class="card-body">
                            <h5 class="fw-bold mt-2 text-danger">${currentLang === 'hi' ? d.name_hi : d.name_en}</h5>
                            <p class="specialty text-primary">${currentLang === 'hi' ? d.specialty_hi : d.specialty_en}</p>
                            <p class="large text-dark">${currentLang === 'hi' ? d.bio_hi : d.bio_en}</p>
                        </div>
                    </div>
                </div>
            `).join('');
        if (window.AOS) AOS.refresh();
    }

    function renderServices() {
        const container = document.getElementById('servicesContainer');
        if (!container) return;
        container.innerHTML = SERVICES_DATA.map((s, idx) => `
                <div class="col-md-6 col-lg-3" data-aos="flip-up" data-aos-duration="600" data-aos-delay="${idx * 80}">
                    <div class="card-unani p-3 shadow-lg rounded-3 border-0 h-auto">
                        <div class="d-flex align-items-center gap-3 mb-2">
                        <img style="width: 70px; height: 70px; object-fit: cover;" src="${s.img || 'https://via.placeholder.com/50'}" alt="${currentLang === 'hi' ? s.title_hi : s.title_en}" class="service-img rounded-circle" onerror="this.src='https://via.placeholder.com/50'">
                            <h6 class="fw-bold mb-0 text-danger">${currentLang === 'hi' ? s.title_hi : s.title_en}</h6>
                        </div>
                        <p class="text-dark large mb-0">${currentLang === 'hi' ? s.desc_hi : s.desc_en}</p>
                    </div>
                </div>
            `).join('');
        if (window.AOS) AOS.refresh();
    }

    function renderGallery(filter) {
        const grid = document.getElementById('galleryGrid');
        if (!grid) return;
        const filtered = filter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(item => item.category === filter);
        grid.innerHTML = filtered.map((item, idx) => `
                <div class="col-6 col-md-4 col-lg-3 gallery-item" data-aos="fade-up" data-aos-duration="600" data-aos-delay="${Math.min(idx * 50, 400)}">
                    <div class="card-unani" data-bs-toggle="modal" data-bs-target="#galleryModal"
                         data-img="${item.img}" data-title="${t(item.titleKey)}" data-desc="${t(item.descKey)}">
                        <img src="${item.img}" class="card-img-top" alt="${t(item.titleKey)}" loading="lazy" onerror="this.src='https://picsum.photos/seed/fallback${item.id}/400/300'">
                        <div class="card-body shadow-lg" style="background: linear-gradient(115deg, #123c2a, #24734a);">
                            <h6 class="card-title text-light">${t(item.titleKey)}</h6>
                        </div>
                    </div>
                </div>
            `).join('');
        if (window.AOS) AOS.refresh();

        // Modal click handler
        document.querySelectorAll('#galleryGrid .card-unani[data-bs-toggle="modal"]').forEach(el => {
            el.addEventListener('click', function() {
                document.getElementById('modalImage').src = this.dataset.img;
                document.getElementById('galleryModalLabel').textContent = this.dataset.title;
                document.getElementById('modalDescription').textContent = this.dataset.desc;
            });
        });
    }

    function updateFilterButtons(filter) {
        document.querySelectorAll('#filterButtons .btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
    }

    // ============================================================
    // 6. LANGUAGE SWITCH
    // ============================================================
    function setLanguage(lang) {
        currentLang = lang;

        // Update toggle buttons
        document.querySelectorAll('.lang-toggle .btn').forEach(btn => {
            btn.classList.toggle('active-lang', btn.dataset.lang === lang);
        });

        // Update data-i18n elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (TRANSLATIONS[key]) {
                el.innerHTML = TRANSLATIONS[key][lang];
            }
        });

        // Update placeholders
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            if (TRANSLATIONS[key]) {
                el.placeholder = TRANSLATIONS[key][lang];
            }
        });

        // Re-render dynamic sections
        renderDoctors();
        renderServices();
        renderGallery(currentFilter);

        // HTML lang
        document.documentElement.lang = lang === 'hi' ? 'hi' : 'en';

        if (window.AOS) AOS.refresh();
    }

    // ============================================================
    // 7. INIT
    // ============================================================
    document.addEventListener('DOMContentLoaded', function() {
        // Init AOS
        AOS.init({
            duration: 800,
            once: true,
            easing: 'ease-out-cubic',
            disable: window.innerWidth < 576 ? true : false
        });

        // Set default language to ENGLISH
        setLanguage('en');

        // Language toggle events
        document.getElementById('langHi').addEventListener('click', function() {
            setLanguage('hi');
        });
        document.getElementById('langEn').addEventListener('click', function() {
            setLanguage('en');
        });

        // Filter buttons
        document.querySelectorAll('#filterButtons .btn').forEach(btn => {
            btn.addEventListener('click', function() {
                currentFilter = this.dataset.filter;
                updateFilterButtons(currentFilter);
                renderGallery(currentFilter);
            });
        });

        // Smooth scroll for nav links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Re-run AOS on resize
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.AOS) AOS.refresh();
            }, 250);
        });
    });
