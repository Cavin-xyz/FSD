// ─────────────────────────────────────────
// effects.js — Cursor glow, scroll-reveal,
//              3D card tilt, parallax, count-up,
//              scroll progress bar
// ─────────────────────────────────────────

/* ── Scroll-progress bar ── */
const progressBar = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrolled / maxScroll * 100) + '%';
}, { passive: true });

/* ── Cursor glow orb ── */
const glow = document.getElementById('cursor-glow');
if (glow && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', e => {
        glow.style.left = e.clientX + 'px';
        glow.style.top = e.clientY + 'px';
    }, { passive: true });
} else if (glow) {
    glow.style.display = 'none';
}

/* ── IntersectionObserver scroll-reveal ── */
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .word-reveal').forEach(el => {
    revealObserver.observe(el);
});

/* ── 3D Magnetic card tilt ── */
function initCardTilt() {
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            const rotateX = -dy * 8;
            const rotateY = dx * 8;
            card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s ease, border-color 0.3s ease';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });

        card.addEventListener('mouseenter', () => {
            card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
        });
    });
}

// Re-init tilt whenever products are re-rendered
const productGrid = document.getElementById('productGrid');
if (productGrid) {
    new MutationObserver(() => {
        initCardTilt();
        document.querySelectorAll('.product-card').forEach(el => revealObserver.observe(el));
    }).observe(productGrid, { childList: true });
}

initCardTilt();

/* ── Parallax on hero text (subtle) ── */
const heroText = document.querySelector('.hero > div:first-child');
const heroVisual = document.querySelector('.hero-visual');
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroText) heroText.style.transform = `translateY(${y * 0.18}px)`;
    if (heroVisual) heroVisual.style.transform = `translateY(${y * 0.08}px)`;
}, { passive: true });

/* ── Count-up animation ── */
function countUp(el, target, suffix = '', duration = 1800) {
    const start = performance.now();
    const update = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        el.textContent = Math.floor(eased * target) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const suffix = el.dataset.suffix || '';
            countUp(el, target, suffix);
            statObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    el.textContent = '0' + (el.dataset.suffix || '');
    statObserver.observe(el);
});

/* ── Logo glitch data-text attribute ── */
const logo = document.querySelector('.logo');
if (logo) logo.setAttribute('data-text', logo.textContent.trim());

/* ── Word-split reveal setup ── */
document.querySelectorAll('.word-reveal').forEach(el => {
    const words = el.textContent.trim().split(/\s+/);
    el.innerHTML = words.map(w =>
        `<span class="word"><span>${w}</span></span>`
    ).join(' ');
});
