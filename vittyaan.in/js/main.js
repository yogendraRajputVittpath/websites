// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Navbar Toggle for Mobile
const navbarToggle = document.getElementById('navbarToggle');
const navbarNav = document.getElementById('navbarNav');

if (navbarToggle && navbarNav) {
    navbarToggle.addEventListener('click', function() {
        navbarNav.classList.toggle('show');
    });

    // Close navbar when clicking on a link (mobile)
    const navLinks = navbarNav.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                navbarNav.classList.remove('show');
            }
        });
    });

    // Close navbar when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInside = navbarToggle.contains(event.target) || navbarNav.contains(event.target);
        if (!isClickInside && navbarNav.classList.contains('show')) {
            navbarNav.classList.remove('show');
        }
    });
}

// Scroll to Top Button
const scrollToTopBtn = document.getElementById('scrollToTop');

if (scrollToTopBtn) {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Highlight Active Navigation Link
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
