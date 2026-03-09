document.addEventListener('DOMContentLoaded', () => {

    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Active Link Highlighting based on current URL
    const currentLocation = location.href;
    const navItems = document.querySelectorAll('.navbar ul li a');
    navItems.forEach(link => {
        if (link.href === currentLocation) {
            link.classList.add('active');
        }
    });

    // 3. Scroll Reveal Animation for elements with .reveal class
    const revealElements = document.querySelectorAll('.reveal');
    const progressBars = document.querySelectorAll('.progress');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });

        // Progress bar animation for skills page
        progressBars.forEach(bar => {
            const barTop = bar.getBoundingClientRect().top;
            if (barTop < windowHeight - revealPoint) {
                const targetWidth = bar.getAttribute('style').match(/--target-width:\s*([^;]+)/)[1];
                bar.style.width = targetWidth;
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger once on load

    // 4. Typing Effect for Home Page
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text') || "WEB DEVELOPER";
        let i = 0;
        typingElement.innerHTML = '';

        const typeWriter = () => {
            if (i < textToType.length) {
                typingElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Add blinking cursor effect class after typing is done
                typingElement.classList.add('typing-done');
            }
        };

        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // 5. Contact Form WhatsApp Interception
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            // We don't prevent default here because we still want the form to submit to FormSubmit.co
            // We just grab the data and open WhatsApp in a new tab simultaneously

            const name = document.getElementById('senderName').value;
            const email = document.getElementById('senderEmail').value;
            const message = document.getElementById('senderMessage').value;

            // Format the WhatsApp message
            const whatsappNumber = "919110838854";
            const waMessage = `Hello Nithin!%0A%0A*New Message from Portfolio*%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${waMessage}`;

            // Open WhatsApp in a new tab
            window.open(whatsappUrl, '_blank');

            // The form will naturally continue submitting to the FormSubmit.co action URL
        });
    }
});
