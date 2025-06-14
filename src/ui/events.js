export function setupEventListeners() {
    const btn = document.getElementById('accessibility-btn');
    const panel = document.getElementById('accessibility-panel');
    
    if (btn) {
        btn.addEventListener('click', () => {
            panel.classList.toggle('open');
            panel.setAttribute('aria-hidden', !panel.classList.contains('open'));
            btn.setAttribute('aria-expanded', panel.classList.contains('open'));
        });
    }

    // Keyboard shortcut (CTRL + U)
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key.toLowerCase() === 'u') {
            e.preventDefault();
            btn?.click();
        }
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
        if (panel?.classList.contains('open') && 
            !panel.contains(e.target) && 
            !btn?.contains(e.target)) {
            panel.classList.remove('open');
            panel.setAttribute('aria-hidden', 'true');
            btn?.setAttribute('aria-expanded', 'false');
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