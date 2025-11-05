// Harsha Automation Studio - Landing Page JavaScript

// ============================================
// HEADER SCROLL EFFECT
// ============================================

const header = document.getElementById('header');
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ============================================
// MOBILE MENU (FIXED - Scrolling Works!)
// ============================================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const body = document.body;

if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            closeMenu();
        }
    });
}

// Function to close menu
function closeMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Close menu when clicking on a link and scroll
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        
        // Only handle if it's an anchor link
        if (href && href.startsWith('#')) {
            e.preventDefault();
            
            // Close menu first
            closeMenu();
            
            // Small delay to allow menu to close, then scroll
            setTimeout(() => {
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const targetPosition = target.offsetTop - headerOffset;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL
                    if (history.pushState) {
                        history.pushState(null, null, href);
                    }
                }
            }, 300); // Wait for menu close animation
        }
    });
});

/// ============================================
// SMOOTH SCROLLING (MODERN METHOD)
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.offsetTop - headerOffset;
            
            window.scrollTo({
                top: elementPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAVIGATION LINK
// ============================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================================
// BACK TO TOP BUTTON
// ============================================

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = Math.floor(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Trigger counter animation when visible
const resultNumbers = document.querySelectorAll('.result-number');
let countersAnimated = false;

const observerOptions = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !countersAnimated) {
            countersAnimated = true;
            resultNumbers.forEach(number => {
                const target = parseFloat(number.getAttribute('data-target'));
                animateCounter(number, target);
            });
        }
    });
}, observerOptions);

const resultsSection = document.querySelector('.results');
if (resultsSection) {
    counterObserver.observe(resultsSection);
}

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faq => {
            faq.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ============================================
// TESTIMONIALS SLIDER
// ============================================

const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');

let currentSlide = 0;
const totalSlides = testimonialCards.length;

function showSlide(index) {
    // Hide all cards
    testimonialCards.forEach(card => {
        card.style.display = 'none';
    });
    
    // Show current card(s)
    if (window.innerWidth > 1024) {
        // Show 3 cards on desktop
        for (let i = 0; i < 3; i++) {
            const cardIndex = (index + i) % totalSlides;
            if (testimonialCards[cardIndex]) {
                testimonialCards[cardIndex].style.display = 'block';
            }
        }
    } else if (window.innerWidth > 768) {
        // Show 2 cards on tablet
        for (let i = 0; i < 2; i++) {
            const cardIndex = (index + i) % totalSlides;
            if (testimonialCards[cardIndex]) {
                testimonialCards[cardIndex].style.display = 'block';
            }
        }
    } else {
        // Show 1 card on mobile
        if (testimonialCards[index]) {
            testimonialCards[index].style.display = 'block';
        }
    }
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

if (prevBtn) {
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    });
}

if (nextBtn) {
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    });
}

// Dot navigation
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// Auto-play slider
let sliderInterval;

function startSlider() {
    sliderInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }, 5000);
}

function stopSlider() {
    clearInterval(sliderInterval);
}

// Initialize slider
if (testimonialCards.length > 0) {
    showSlide(currentSlide);
    startSlider();
    
    // Pause on hover
    const testimonialsSection = document.querySelector('.testimonials');
    if (testimonialsSection) {
        testimonialsSection.addEventListener('mouseenter', stopSlider);
        testimonialsSection.addEventListener('mouseleave', startSlider);
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        };
        
        // Validation
        if (!formData.name || !formData.email || !formData.service || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // In production, send to your backend
            console.log('Form submitted:', formData);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Success message
            alert(`Thank you, ${formData.name}! We've received your message and will get back to you soon at ${formData.email}.`);
            
            // Reset form
            contactForm.reset();
            
        } catch (error) {
            alert('Oops! Something went wrong. Please try again or contact us directly at +91 733 093 7354.');
            console.error('Form submission error:', error);
        } finally {
            // Reset button
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
        
        // In production, integrate with:
        // - EmailJS: https://www.emailjs.com/
        // - Formspree: https://formspree.io/
        // - Your own backend API
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

const newsletterForm = document.getElementById('newsletter-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Show loading
        const submitBtn = newsletterForm.querySelector('button');
        const originalIcon = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        try {
            // In production, send to your newsletter service
            console.log('Newsletter subscription:', email);
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            alert('Thank you for subscribing! Check your email for confirmation.');
            newsletterForm.reset();
            
        } catch (error) {
            alert('Oops! Something went wrong. Please try again.');
            console.error('Newsletter subscription error:', error);
        } finally {
            submitBtn.innerHTML = originalIcon;
            submitBtn.disabled = false;
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.service-card, .problem-card, .result-card, .timeline-item, .testimonial-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', animateOnScroll);

// ============================================
// CHAT WIDGET
// ============================================

const chatWidget = document.getElementById('chat-widget');
const chatButton = chatWidget?.querySelector('.chat-button');

if (chatButton) {
    chatButton.addEventListener('click', () => {
        // Open chat - integrate with your chat solution
        // Examples: Intercom, Drift, Tawk.to, WhatsApp, etc.
        
        // For now, open WhatsApp
        const phone = '917330937354';
        const message = encodeURIComponent('Hi! I\'m interested in automation services.');
        const whatsappUrl = `https://wa.me/${phone}?text=${message}`;
        
        window.open(whatsappUrl, '_blank');
    });
}

// ============================================
// PHONE NUMBER CLICK TO CALL
// ============================================

document.querySelectorAll('a[href^="tel:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Track phone click (for analytics)
        console.log('Phone number clicked:', link.href);
        
        // Optional: Google Analytics event
        // gtag('event', 'phone_click', {
        //     'event_category': 'contact',
        //     'event_label': link.href
        // });
    });
});

// ============================================
// EMAIL CLICK TRACKING
// ============================================

document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        console.log('Email link clicked:', link.href);
        
        // Optional: Copy email to clipboard on desktop
        if (window.innerWidth > 768 && navigator.clipboard) {
            e.preventDefault();
            const email = link.href.replace('mailto:', '');
            navigator.clipboard.writeText(email).then(() => {
                const originalText = link.textContent;
                link.textContent = '✓ Email copied!';
                setTimeout(() => {
                    link.textContent = originalText;
                }, 2000);
            }).catch(() => {
                // If clipboard fails, proceed with mailto
                window.location.href = link.href;
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ============================================
// FORM INPUT ANIMATIONS
// ============================================

const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (!input.value) {
            input.parentElement.classList.remove('focused');
        }
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// PRICING CARD HOVER EFFECT
// ============================================

const pricingCards = document.querySelectorAll('.pricing-card');

pricingCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        pricingCards.forEach(c => c.classList.remove('hover'));
        card.classList.add('hover');
    });
});

// ============================================
// SERVICE CARD CLICK TO CONTACT
// ============================================

document.querySelectorAll('.service-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const serviceCard = btn.closest('.service-card');
        const serviceTitle = serviceCard.querySelector('.service-title').textContent;
        
        // Pre-fill contact form if navigating to contact section
        if (btn.getAttribute('href') === '#contact') {
            setTimeout(() => {
                const serviceSelect = document.getElementById('service');
                if (serviceSelect) {
                    // Try to match service
                    const options = Array.from(serviceSelect.options);
                    const matchingOption = options.find(opt => 
                        serviceTitle.toLowerCase().includes(opt.text.toLowerCase())
                    );
                    if (matchingOption) {
                        serviceSelect.value = matchingOption.value;
                    }
                }
            }, 500);
        }
    });
});

// ============================================
// WINDOW RESIZE HANDLER
// ============================================

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize slider on resize
        if (testimonialCards.length > 0) {
            showSlide(currentSlide);
        }
    }, 250);
});

// ============================================
// PREVENT FORM RESUBMISSION
// ============================================

if (window.history.replaceState) {
    window.history.replaceState(null, null, window.location.href);
}

// ============================================
// ANALYTICS TRACKING (Optional)
// ============================================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        const buttonHref = this.getAttribute('href');
        
        console.log('Button clicked:', {
            text: buttonText,
            href: buttonHref,
            section: this.closest('section')?.id || 'unknown'
        });
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', 'button_click', {
        //         'event_category': 'engagement',
        //         'event_label': buttonText,
        //         'value': 1
        //     });
        // }
    });
});

// Track section views
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            console.log('Section viewed:', sectionId);
            
            // Example: Google Analytics
            // if (typeof gtag !== 'undefined') {
            //     gtag('event', 'section_view', {
            //         'event_category': 'engagement',
            //         'event_label': sectionId,
            //         'value': 1
            //     });
            // }
        }
    });
}, {
    threshold: 0.5
});

sections.forEach(section => {
    sectionObserver.observe(section);
});

// ============================================
// COPY TO CLIPBOARD
// ============================================

function copyToClipboard(text, element) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            const originalText = element.textContent;
            element.textContent = '✓ Copied!';
            element.style.color = '#10B981';
            
            setTimeout(() => {
                element.textContent = originalText;
                element.style.color = '';
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    }
}

// ============================================
// PRINT PAGE
// ============================================

function printPage() {
    window.print();
}

// ============================================
// SHARE PAGE
// ============================================

function sharePage() {
    if (navigator.share) {
        navigator.share({
            title: 'Harsha Automation Studio',
            text: 'Check out Harsha Automation Studio - Intelligent Workflow Automation Solutions',
            url: window.location.href
        }).catch(err => console.log('Share failed:', err));
    } else {
        // Fallback: Copy URL to clipboard
        copyToClipboard(window.location.href, document.body);
        alert('Link copied to clipboard!');
    }
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Focus search or contact form
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const firstInput = document.querySelector('.contact-form input');
        if (firstInput) {
            firstInput.focus();
            firstInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
    
    // Escape: Close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================================
// PAGE LOAD COMPLETION
// ============================================

window.addEventListener('load', () => {
    console.log('🚀 Harsha Automation Studio loaded successfully!');
    
    // Hide loading spinner if you have one
    const loader = document.querySelector('.page-loader');
    if (loader) {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }
    
    // Trigger initial animations
    document.body.classList.add('loaded');
});

// ============================================
// ERROR HANDLING
// ============================================

window.addEventListener('error', (e) => {
    console.error('Page error:', e);
    // You can send errors to your logging service here
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
                // Log performance metrics
                if (entry.entryType === 'navigation') {
                    console.log('Page load time:', entry.loadEventEnd - entry.fetchStart, 'ms');
                }
            });
        });
        
        perfObserver.observe({ entryTypes: ['navigation', 'resource'] });
    } catch (e) {
        // Browser doesn't support PerformanceObserver
    }
}

// ============================================
// SERVICE WORKER (Optional - for PWA)
// ============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => {
        //         console.log('ServiceWorker registered:', registration);
        //     })
        //     .catch(error => {
        //         console.log('ServiceWorker registration failed:', error);
        //     });
    });
}

// ============================================
// INITIALIZE ALL ON DOM READY
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded - initializing Harsha Automation Studio...');
    
    // Any additional initialization code
    
    // Check if user came from a specific source
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    if (source) {
        console.log('Traffic source:', source);
        // Track in analytics
    }
    
    // Show cookie consent if needed
    // showCookieConsent();
    
    // Initialize any third-party scripts
    // initializeAnalytics();
    // initializeChatWidget();
    
    console.log('✅ All systems initialized!');
});

// ============================================
// EXPORT FUNCTIONS (if using modules)
// ============================================

// export { copyToClipboard, printPage, sharePage };