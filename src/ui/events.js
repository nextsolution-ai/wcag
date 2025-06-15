export function setupEventListeners() {
    const btn = document.getElementById('accessibility-btn');
    const panel = document.getElementById('accessibility-panel');
    const closeBtn = document.getElementById('daccheac');
    const overlay = document.getElementById('accessibility-overlay');
    
    if (btn) {
        btn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            if (isOpen) {
                // Move focus to accessibility button before hiding panel
                btn.focus();
            }
            panel.classList.toggle('open');
            overlay.classList.toggle('open');
            panel.setAttribute('aria-hidden', !isOpen);
            btn.setAttribute('aria-expanded', !isOpen);
            btn.setAttribute('aria-label', isOpen ? 'Open accessibility menu' : 'Close accessibility menu');
            // Prevent body scroll when panel is open
            document.body.style.overflow = isOpen ? '' : 'hidden';
        });
    }

    // Close button functionality
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            if (isOpen) {
                btn.focus();
            }
            panel.classList.remove('open');
            overlay.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open accessibility menu');
            document.body.style.overflow = '';
        });
    }

    // Overlay click to close
    if (overlay) {
        overlay.addEventListener('click', () => {
            const isOpen = panel.classList.contains('open');
            if (isOpen) {
                btn.focus();
            }
            panel.classList.remove('open');
            overlay.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open accessibility menu');
            document.body.style.overflow = '';
        });
    }

    // Keyboard shortcut (CTRL + U)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            btn?.click();
        }
    });

    // Close panel on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel?.classList.contains('open')) {
            btn.focus();
            panel.classList.remove('open');
            overlay.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            btn.setAttribute('aria-expanded', 'false');
            btn.setAttribute('aria-label', 'Open accessibility menu');
            document.body.style.overflow = '';
        }
    });

    // --- Section Menu (Tab) Functionality ---
    const tabBtns = panel?.querySelectorAll('.tab-btn');
    const contentSections = panel?.querySelectorAll('.content-section');
    if (tabBtns && contentSections) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Remove active from all tabs
                tabBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked tab
                btn.classList.add('active');
                // Hide all content sections
                contentSections.forEach(section => section.hidden = true);
                // Show the target section
                const targetId = btn.getAttribute('data-target');
                const targetSection = panel.querySelector(`#${targetId}`);
                if (targetSection) targetSection.hidden = false;
            });
        });
    }

    // Position select functionality
    const positionSelect = document.getElementById('position-select');
    if (positionSelect) {
        positionSelect.addEventListener('change', function() {
            const widget = document.getElementById('accessibility-widget');
            if (this.value === 'left') {
                widget.classList.add('left');
            } else {
                widget.classList.remove('left');
            }
        });
    }

    // Language select functionality
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
        languageSelect.addEventListener('change', function() {
            setLanguage(this.value);
        });
    }
} 