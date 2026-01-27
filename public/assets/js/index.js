// Global search functions
window.openSearch = () => {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    document.body.classList.add('modal-open');
    modal.style.display = 'flex';
    setTimeout(() => {
        modal.querySelector('.pagefind-ui__search-input')?.focus();
    }, 150);
};

window.closeSearch = () => {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('search-modal');
    if (modal) modal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    const root = document.documentElement;
    const elements = {
        menuBtn: document.getElementById('menu-toggle'),
        closeBtn: document.getElementById('close-menu'),
        sideNav: document.getElementById('side-nav'),
        themeBtn: document.getElementById('theme-toggle'),
        modal: document.getElementById('search-modal')
    };

    // --- 1. Pagefind Init ---
    if (document.getElementById('search')) {
        new PagefindUI({ 
            element: "#search", 
            showSubResults: true,
            resetStyles: false,
            bundlePath: "/pagefind/"
        });
    }

    // --- 2. Sidebar Logic ---
    const toggleNav = (isActive) => {
        if (!elements.sideNav) return;
        elements.sideNav.classList.toggle('active', isActive);
        elements.menuBtn?.classList.toggle('hidden', isActive);
        document.body.style.overflow = isActive ? 'hidden' : '';
    };

    elements.menuBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleNav(true);
    });

    elements.closeBtn?.addEventListener('click', () => toggleNav(false));

    document.addEventListener('click', (e) => {
        if (elements.sideNav?.classList.contains('active') && 
            !elements.sideNav.contains(e.target) && 
            !elements.modal?.contains(e.target)) {
            toggleNav(false);
        }
    });

    // --- 3. Keydown Handler ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
            toggleNav(false);
        }
    });

    // --- 4. Theme Toggle (FIXED LOGIC & SYNTAX) ---
    const applyTheme = (theme) => {
        root.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    // Sync theme on load
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    elements.themeBtn?.addEventListener('click', () => {
        const root = document.documentElement;
        const target = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';

        root.classList.add('no-transition');
        root.setAttribute('data-theme', target);
        localStorage.setItem('theme', target);

        // Force reflow
        window.getComputedStyle(root).opacity;
        root.classList.remove('no-transition');
    });
    console.log("✅ UI Engine Synced");
});