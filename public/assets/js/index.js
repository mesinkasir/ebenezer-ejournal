/**
 * UI Hub: Sidebar, Theme, and Modal Search
 * tags: - AI vision - automation - finTech
 */

// Fungsi Modal ditaruh di global agar bisa diakses onclick HTML
window.openSearch = () => {
    const modal = document.getElementById('search-modal');
    if (!modal) return;
    
    document.body.classList.add('modal-open');
    modal.style.display = 'flex';
    
    // Auto-focus ke input Pagefind
    setTimeout(() => {
        const searchInput = modal.querySelector('.pagefind-ui__search-input');
        searchInput?.focus();
    }, 150);
};

window.closeSearch = () => {
    document.body.classList.remove('modal-open');
    const modal = document.getElementById('search-modal');
    if (modal) modal.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        menuBtn: document.getElementById('menu-toggle'),
        closeBtn: document.getElementById('close-menu'),
        sideNav: document.getElementById('side-nav'),
        themeBtn: document.getElementById('theme-toggle'),
        modal: document.getElementById('search-modal')
    };

    // --- 1. Inisialisasi Pagefind ---
    if (document.getElementById('search')) {
        new PagefindUI({ 
            element: "#search", 
            showSubResults: true,
            resetStyles: false, // Biarkan kita kontrol lewat CSS variabel
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

    // Tutup sidebar jika klik di luar, tapi abaikan jika klik di dalam modal
    document.addEventListener('click', (e) => {
        if (elements.sideNav?.classList.contains('active') && 
            !elements.sideNav.contains(e.target) && 
            !elements.modal?.contains(e.target)) {
            toggleNav(false);
        }
    });

    // --- 3. Modal Escape Key ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeSearch();
            toggleNav(false);
        }
    });

    // --- 4. Theme Toggle ---
    elements.themeBtn?.addEventListener('click', () => {
        const root = document.documentElement;
        const targetTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', targetTheme);
        localStorage.setItem('theme', targetTheme);
    });

    console.log("✅ UI Engine Synced");
});