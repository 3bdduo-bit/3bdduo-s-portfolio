/* ============================================
   AbdUlrahman Hassan — Portfolio JavaScript
   ============================================ */

/* ---- Page Loader ---- */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }, 200);
});
document.body.classList.add('no-scroll');

/* ---- Navbar Scroll Effect ---- */
const navbar = document.getElementById('navbar');
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Sticky navbar
    if (scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll-to-top visibility
    if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }

    // Active nav link highlight
    updateActiveNavLink();
});

/* ---- Scroll to Top ---- */
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ---- Active Nav Link ---- */
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a:not(.nav-cta)');
    const scrollY = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop    = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId     = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

/* ---- Mobile Menu ---- */
const menuToggle  = document.getElementById('menuToggle');
const navLinks    = document.getElementById('navLinks');
const navOverlay  = document.getElementById('navOverlay');

menuToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
    navOverlay.classList.toggle('active');
    document.body.classList.toggle('no-scroll', isOpen);
});

navOverlay.addEventListener('click', closeMenu);

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', closeMenu);
});

function closeMenu() {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
    navOverlay.classList.remove('active');
    document.body.classList.remove('no-scroll');
}

/* ---- Smooth Scroll for All Anchor Links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ---- Typed Text Effect ---- */
const typedEl = document.getElementById('typedText');
const phrases = [
    'Front-end Developer || React.js || Next.js',
    'Back-end Devloper || Node.js',
    'University student',
];

let phraseIndex  = 0;
let charIndex    = 0;
let isDeleting   = false;
let typingPaused = false;

function typeEffect() {
    if (!typedEl) return;

    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
        // Typing
        typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentPhrase.length) {
            // Pause before deleting
            typingPaused = true;
            setTimeout(() => {
                typingPaused = false;
                isDeleting = true;
                typeEffect();
            }, 2200);
            return;
        }
    } else {
        // Deleting
        typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            setTimeout(typeEffect, 400);
            return;
        }
    }

    const speed = isDeleting ? 55 : 90;
    setTimeout(typeEffect, speed);
}

// Start typing after loader hides
setTimeout(typeEffect, 1100);

/* ---- Scroll Reveal (Intersection Observer) ---- */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: '0px 0px -60px 0px',
    }
);

document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
});

/* ---- Stat Counter Animation ---- */
function animateCounter(el, target, duration = 1400) {
    let startTime = null;
    const start   = 0;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        // easeOutCubic
        const eased  = 1 - Math.pow(1 - progress, 3);
        const current = Math.floor(eased * target);
        el.textContent = current + (el.dataset.suffix || '');
        if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
}

const statObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const nums = entry.target.querySelectorAll('.stat-number');
                nums.forEach(num => {
                    const raw    = num.textContent.replace(/\D/g, '');
                    const suffix = num.textContent.replace(/[0-9]/g, '');
                    num.dataset.suffix = suffix;
                    animateCounter(num, parseInt(raw));
                });
                statObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.3 }
);

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statObserver.observe(aboutStats);

/* ---- Skill Tag Hover Ripple ---- */
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-3px) scale(1.06)';
    });
    tag.addEventListener('mouseleave', function () {
        this.style.transform = '';
    });
});

/* ---- Project Card Tilt Effect (Subtle) ---- */
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect   = this.getBoundingClientRect();
        const x      = e.clientX - rect.left;
        const y      = e.clientY - rect.top;
        const cx     = rect.width  / 2;
        const cy     = rect.height / 2;
        const tiltX  = ((y - cy) / cy) * 4;
        const tiltY  = ((cx - x) / cx) * 4;
        this.style.transform = `translateY(-8px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
        this.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', function () {
        this.style.transform   = '';
        this.style.transition  = 'transform 0.4s ease';
    });
});

/* ---- Navbar Logo Glitch on Hover ---- */
const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('mouseenter', function () {
        this.style.letterSpacing = '2px';
    });
    logo.addEventListener('mouseleave', function () {
        this.style.letterSpacing = '';
    });
}



/* ---- Parallax on Hero Image ---- */
window.addEventListener('scroll', () => {
    const heroImg = document.querySelector('.hero-image-wrapper');
    if (!heroImg) return;
    const scrollY = window.scrollY;
    if (scrollY < window.innerHeight) {
        heroImg.style.transform = `translateY(${scrollY * 0.08}px)`;
    }
});

/* ---- Year in Footer ---- */
const yearEl = document.querySelector('.footer-left p');
if (yearEl) {
    yearEl.innerHTML = yearEl.innerHTML.replace('2026', new Date().getFullYear());
}

console.log(
    '%c AbdUlrahman Hassan Portfolio ',
    'background: #00d4aa; color: #0a0a0a; font-weight: bold; font-size: 14px; padding: 6px 14px; border-radius: 4px;'
);
console.log('%c Built with ❤️  HTML · CSS · JavaScript', 'color: #a8a8a8; font-size: 12px;');
