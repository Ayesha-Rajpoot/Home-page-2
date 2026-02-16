document.addEventListener('DOMContentLoaded', () => {
    console.log('GTTI RYK Website Loaded');

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Mobile Menu Toggle
    const mobileMenu = document.getElementById('mobileMenu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileMenu.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });

        // Close menu after clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileMenu.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Modal Logic
    const modal = document.getElementById('admissionModal');
    const applyBtns = document.querySelectorAll('.apply-btn');
    const closeBtn = document.querySelector('.close');

    applyBtns.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            modal.style.display = "block";
            document.body.style.overflow = "hidden"; // Prevent scrolling
        }
    });

    closeBtn.onclick = function () {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }


    // Form Submission Placeholder
    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Application submitted successfully! Our team will contact you soon.');
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            admissionForm.reset();
        });
    }

    // Trade Details Modal Logic
    const tradeModal = document.getElementById('tradeModal');
    const tradeCards = document.querySelectorAll('.trade-card-btn');
    const closeTrade = document.getElementById('closeTrade');
    const tradeTitle = document.getElementById('modalTradeTitle');
    const tradeDetails = document.getElementById('modalTradeDetails');
    const tradeSelect = modal.querySelector('select');

    tradeCards.forEach(card => {
        card.onclick = function () {
            const title = this.getAttribute('data-trade');
            const details = this.getAttribute('data-details');

            tradeTitle.innerText = title;
            tradeDetails.innerText = details;

            tradeModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });

    closeTrade.onclick = function () {
        tradeModal.style.display = "none";
        document.body.style.overflow = "auto";
    }

    // "Apply Now" inside trade modal
    const applyNowBtn = tradeModal.querySelector('.apply-now-btn');
    applyNowBtn.onclick = function () {
        const selectedTrade = tradeTitle.innerText;
        tradeModal.style.display = "none";

        // Open admission modal
        modal.style.display = "block";
        document.body.style.overflow = "hidden";

        // Pre-select the trade
        if (tradeSelect) {
            for (let i = 0; i < tradeSelect.options.length; i++) {
                if (tradeSelect.options[i].text === selectedTrade) {
                    tradeSelect.selectedIndex = i;
                    break;
                }
            }
        }
    }

    // News Details Modal Logic
    const newsModal = document.getElementById('newsModal');
    const readMoreBtns = document.querySelectorAll('.read-more-news');
    const closeNews = document.getElementById('closeNews');
    const closeNewsBtn = document.getElementById('closeNewsBtn');
    const newsTitle = document.getElementById('modalNewsTitle');
    const newsContent = document.getElementById('modalNewsContent');

    readMoreBtns.forEach(btn => {
        btn.onclick = function (e) {
            e.preventDefault();
            const title = this.getAttribute('data-title');
            const content = this.getAttribute('data-content');

            newsTitle.innerText = title;
            newsContent.innerText = content;

            newsModal.style.display = "block";
            document.body.style.overflow = "hidden";
        }
    });

    const hideNewsModal = () => {
        newsModal.style.display = "none";
        document.body.style.overflow = "auto";
    };

    if (closeNews) closeNews.onclick = hideNewsModal;
    if (closeNewsBtn) closeNewsBtn.onclick = hideNewsModal;

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (event.target == tradeModal) {
            tradeModal.style.display = "none";
            document.body.style.overflow = "auto";
        }
        if (event.target == newsModal) {
            hideNewsModal();
        }
    }
});
