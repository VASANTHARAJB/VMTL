document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    const header = document.querySelector('.fti-header-2-area');
    
    // Desktop dropdown functionality
    const dropdownToggles = document.querySelectorAll('.main-navigation .dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.closest('.dropdown');
            const dropdownMenu = dropdown.querySelector('.dropdown-menu');
            
            // Toggle visibility
            const isVisible = dropdownMenu.style.opacity === '1';
            
            // Close all dropdowns first
            document.querySelectorAll('.main-navigation .dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
            
            // Open this dropdown if it wasn't visible
            if (!isVisible) {
                dropdownMenu.style.opacity = '1';
                dropdownMenu.style.visibility = 'visible';
                dropdownMenu.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.main-navigation .dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        }
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            toggleMobileMenu();
        });
    }
    
    // Close mobile menu when clicking on overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Close mobile menu when clicking on a link (except dropdowns)
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-overlay a:not(.mobile-dropdown-toggle)');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });
    
    // Mobile dropdown toggles
    const mobileDropdownToggles = document.querySelectorAll('.mobile-dropdown-toggle');
    mobileDropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            const isActive = this.classList.contains('active');
            
            // Close all other dropdowns
            mobileDropdownToggles.forEach(otherToggle => {
                if (otherToggle !== this) {
                    otherToggle.classList.remove('active');
                    if (otherToggle.nextElementSibling) {
                        otherToggle.nextElementSibling.classList.remove('active');
                    }
                }
            });
            
            // Toggle current dropdown
            if (isActive) {
                this.classList.remove('active');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('active');
                }
            } else {
                this.classList.add('active');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('active');
                }
            }
        });
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeMobileMenu();
            // Also close desktop dropdowns
            document.querySelectorAll('.main-navigation .dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(10px)';
            });
        }
    });
    
    function toggleMobileMenu() {
        const isActive = mobileNavOverlay.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
    
    function openMobileMenu() {
        mobileNavOverlay.classList.add('active');
        menuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeMobileMenu() {
        mobileNavOverlay.classList.remove('active');
        menuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Close all mobile dropdowns
        mobileDropdownToggles.forEach(toggle => {
            toggle.classList.remove('active');
            if (toggle.nextElementSibling) {
                toggle.nextElementSibling.classList.remove('active');
            }
        });
    }
    
    // Force video to play
    const video = document.getElementById('bg-video');
    if (video) {
        video.muted = true;
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video is playing');
            }).catch(error => {
                console.log('Autoplay prevented:', error);
                setTimeout(() => {
                    video.play().catch(e => console.log('Still cannot play:', e));
                }, 1000);
            });
        }
    }
    
    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 90;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Header scroll effect
    let lastScrollTop = 0;
    let ticking = false;
    
    function updateHeader() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past 100px
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });
    
    // Hero Slider Initialization
    const heroSlider = new Swiper('.fti_hero_2_active', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        speed: 1000,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        pagination: {
            el: '.fti-hero-2-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="' + className + '">0' + (index + 1) + '</span>';
            },
        },
        on: {
            init: function() {
                // Trigger animations for first slide
                this.slides[this.activeIndex].classList.add('swiper-slide-active');
            },
            slideChange: function() {
                // Remove active class from all slides
                this.slides.forEach(slide => {
                    slide.classList.remove('swiper-slide-active');
                });
                // Add active class to current slide
                this.slides[this.activeIndex].classList.add('swiper-slide-active');
            }
        }
    });

    // Pause autoplay on hover
    const heroSection = document.querySelector('.fti-hero-2-area');
    if (heroSection && heroSlider) {
        heroSection.addEventListener('mouseenter', () => {
            heroSlider.autoplay.stop();
        });
        
        heroSection.addEventListener('mouseleave', () => {
            heroSlider.autoplay.start();
        });
    }
    
    // Parallax Background Effects
    function initParallaxEffects() {
        const orb1 = document.querySelector('.bg-gradient-orb-1');
        const orb2 = document.querySelector('.bg-gradient-orb-2');
        const shape1 = document.querySelector('.shape-1');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax1 = scrolled * 0.3;
            const parallax2 = scrolled * 0.5;
            const parallax3 = scrolled * 0.2;
            
            if (orb1) {
                orb1.style.transform = `translate3d(0, ${parallax1}px, 0)`;
            }
            if (orb2) {
                orb2.style.transform = `translate3d(0, ${parallax2}px, 0)`;
            }
            if (shape1) {
                shape1.style.transform = `translate3d(0, ${parallax3}px, 0)`;
            }
        });
    }

    // Enhanced Machine Scroll Animation
    function initMachineScroll() {
        const machineScroll = document.querySelector('.machine-scroll');
        if (machineScroll) {
            // Pause animation on hover
            machineScroll.addEventListener('mouseenter', () => {
                machineScroll.style.animationPlayState = 'paused';
            });
            
            machineScroll.addEventListener('mouseleave', () => {
                machineScroll.style.animationPlayState = 'running';
            });
        }
    }

    // Floating Particles Animation Control
    function initFloatingParticles() {
        const particles = document.querySelectorAll('.floating-particles span');
        
        particles.forEach((particle, index) => {
            // Random starting positions
            const randomX = Math.random() * 100;
            const randomDelay = Math.random() * 5;
            
            particle.style.left = randomX + '%';
            particle.style.animationDelay = randomDelay + 's';
            
            // Different colors for variety
            const colors = [
                'rgba(46, 134, 171, 0.8)',
                'rgba(162, 59, 114, 0.8)',
                'rgba(241, 143, 1, 0.8)'
            ];
            particle.style.background = colors[index % colors.length];
        });
    }

    // Enhanced Client Logo Hover Effects
    function initClientLogoEffects() {
        const logos = document.querySelectorAll('.fti-hero-2-marquee .logo');
        
        logos.forEach(logo => {
            logo.addEventListener('mouseenter', () => {
                // Pause the marquee animation temporarily
                const marqueeContent = document.querySelector('.marquee-content');
                if (marqueeContent) {
                    marqueeContent.style.animationPlayState = 'paused';
                }
            });
            
            logo.addEventListener('mouseleave', () => {
                // Resume the marquee animation
                const marqueeContent = document.querySelector('.marquee-content');
                if (marqueeContent) {
                    marqueeContent.style.animationPlayState = 'running';
                }
            });
        });
    }
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Schedule button functionality
    const scheduleBtn = document.querySelector('.schedule-btn');
    if (scheduleBtn) {
        scheduleBtn.addEventListener('click', function() {
            // You can replace this with actual scheduling functionality
            alert('Thank you for your interest! We will contact you soon to schedule an appointment.');
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
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.service-card, .experience-card, .client-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Initialize all enhanced effects
    initParallaxEffects();
    initMachineScroll();
    initFloatingParticles();
    initClientLogoEffects();
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', function () {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.style.opacity = '1';
            scrollTop.style.visibility = 'visible';
        } else {
            scrollTop.style.opacity = '0';
            scrollTop.style.visibility = 'hidden';
        }
    }
});



/*provide section start*/
// Add hover animations and interactions
        document.addEventListener('DOMContentLoaded', function() {
            const processItems = document.querySelectorAll('.process-step-item');
            
            processItems.forEach(item => {
                item.addEventListener('mouseenter', function() {
                    this.classList.add('active');
                });
                
                item.addEventListener('mouseleave', function() {
                    if (!this.classList.contains('active')) {
                        this.classList.remove('active');
                    }
                });
            });
        });
/*provide section end*/