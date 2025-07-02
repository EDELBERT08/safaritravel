document.addEventListener('DOMContentLoaded', () => {
    // Navbar toggle
    const navbar = document.querySelector('.header .navbar');
    const menuBtn = document.querySelector('#menu-btn');
    const closeNavbar = document.querySelector('#close-navbar');

    if (menuBtn && closeNavbar && navbar) {
        menuBtn.onclick = () => navbar.classList.add('active');
        closeNavbar.onclick = () => navbar.classList.remove('active');
        window.onscroll = () => navbar.classList.remove('active');
    }

    // About image switcher
    const controlBtns = document.querySelectorAll('.about .controls .control-btn');
    const imageElement = document.querySelector('.about .image-container .image');

    controlBtns.forEach(btn => {
        btn.onclick = () => {
            const src = btn.getAttribute('data-src');
            if (imageElement) imageElement.src = src;
        };
    });

    // Slideshow functionality
    const slides = document.querySelectorAll('.book .slide');
    let index = 0;

    window.next = function () {
        if (slides.length > 0) {
            slides[index].classList.remove('active');
            index = (index + 1) % slides.length;
            slides[index].classList.add('active');
        }
    };

    window.prev = function () {
        if (slides.length > 0) {
            slides[index].classList.remove('active');
            index = (index - 1 + slides.length) % slides.length;
            slides[index].classList.add('active');
        }
    };

    // Signup logic
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.onsubmit = function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            alert('Signup successful! Please sign in.');
            showLogin();
        };
    }

    // Show login form
    function showLogin() {
        const signupSection = document.getElementById('signup');
        const loginSection = document.getElementById('login');
        if (signupSection && loginSection) {
            signupSection.style.display = 'none';
            loginSection.style.display = 'block';
        }
    }

    // Login logic
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function (e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            const savedEmail = localStorage.getItem('userEmail');
            const savedPassword = localStorage.getItem('userPassword');

            if (email === savedEmail && password === savedPassword) {
                alert('Login successful! You can now book.');
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'booking.html'; // redirect to booking page
            } else {
                alert('Invalid credentials.');
            }
        };
    }

    // Protect booking page
    if (window.location.pathname.includes('booking.html')) {
        const loggedIn = localStorage.getItem('isLoggedIn');
        if (loggedIn !== 'true') {
            alert('You must log in to access bookings.');
            window.location.href = 'index.html';
        }
    }

    // Optional: Logout functionality
    window.logout = function () {
        localStorage.removeItem('isLoggedIn');
        alert('You have been logged out.');
        window.location.href = 'index.html';
    };
});
