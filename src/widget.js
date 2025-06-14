import './styles/widget.css';
import { validateLicense } from './utils/license';
import { initializeUI } from './ui/interface';
import { setupEventListeners } from './ui/events';
import { setupAccessibilityFeatures } from './features/accessibility';

class WCAGWidget {
    constructor() {
        this.config = null;
        this.initialized = false;
    }

    async init(config) {
        if (this.initialized) return;
        
        this.config = config;
        
        // Validate license
        const isValid = await validateLicense(config.licenseKey);
        if (!isValid) {
            console.error('Invalid license key');
            return;
        }

        // Initialize UI first
        initializeUI();
        
        // Then setup event listeners for UI elements
        setupEventListeners();
        
        // Finally setup accessibility features
        setupAccessibilityFeatures();

        this.initialized = true;
    }
}

// Export as global
window.WCAGWidget = new WCAGWidget(); 