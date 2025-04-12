document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.querySelector('.nav-list');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        navList.classList.toggle('active');
        
        // Animate hamburger to X
        const bars = this.querySelectorAll('.bar');
        if (this.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0) translate(0, 0)';
                bar.style.opacity = '1';
            });
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navList.classList.remove('active');
            
            // Reset hamburger icon
            const bars = menuToggle.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.transform = 'rotate(0) translate(0, 0)';
                bar.style.opacity = '1';
            });
        });
    });
    
    // Sticky Navigation on Scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate Stats Counter
    const animateCounters = () => {
        const counters = document.querySelectorAll('.number');
        const speed = 200;
        
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target + '+';
            }
        });
    };
    
    // Initialize counters when section is in view
    const aboutSection = document.querySelector('.about');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    if (aboutSection) {
        observer.observe(aboutSection);
    }
    
    // Portfolio Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = [
        {
            id: 1,
            title: 'E-commerce Website',
            category: 'web',
            image: 'https://via.placeholder.com/600x400?text=E-commerce+Website'
        },
        {
            id: 2,
            title: 'Mobile Banking App',
            category: 'mobile',
            image: 'https://via.placeholder.com/600x400?text=Mobile+Banking+App'
        },
        {
            id: 3,
            title: 'Corporate Website',
            category: 'web',
            image: 'https://via.placeholder.com/600x400?text=Corporate+Website'
        },
        {
            id: 4,
            title: 'UI Dashboard Design',
            category: 'design',
            image: 'https://via.placeholder.com/600x400?text=UI+Dashboard+Design'
        },
        {
            id: 5,
            title: 'Fitness Tracking App',
            category: 'mobile',
            image: 'https://via.placeholder.com/600x400?text=Fitness+Tracking+App'
        },
        {
            id: 6,
            title: 'Restaurant Website',
            category: 'web',
            image: 'https://via.placeholder.com/600x400?text=Restaurant+Website'
        }
    ];
    
    // Render portfolio items
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    function renderPortfolioItems(items) {
        portfolioGrid.innerHTML = '';
        
        items.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = portfolio-item ${item.category};
            portfolioItem.innerHTML = `
                <img src="${item.image}" alt="${item.title}">
                <div class="portfolio-overlay">
                    <h3>${item.title}</h3>
                    <p>${item.category.toUpperCase()} Development</p>
                    <a href="#" class="btn secondary">View Project</a>
                </div>
            `;
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // Initial render
    renderPortfolioItems(portfolioItems);
    
    // Filter portfolio items
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            if (filter === 'all') {
                renderPortfolioItems(portfolioItems);
            } else {
                const filteredItems = portfolioItems.filter(item => item.category === filter);
                renderPortfolioItems(filteredItems);
            }
        });
    });
    
    // Contact Form Submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !service || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Here you would typically send the data to a server
            console.log('Form submitted:', { name, email, service, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            // Configure your particles.js options here
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#3498db" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#3498db", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "repulse" },
                    onclick: { enable: true, mode: "push" }
                }
            }
        });
    }
});\