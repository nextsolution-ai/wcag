export function setupAccessibilityFeatures() {
    // Initialize text-to-speech
    setupTextToSpeech();
    
    // Initialize reading ruler
    setupReadingRuler();
    
    // Initialize keyboard navigation
    setupKeyboardNavigation();

    // Setup feature toggles
    setupFeatureToggles();
}

function setupTextToSpeech() {
    document.body.addEventListener('click', (e) => {
        if (document.body.getAttribute('data-tts-enabled') === 'true') {
            const text = e.target.innerText;
            if (text) {
                const msg = new SpeechSynthesisUtterance(text);
                window.speechSynthesis.speak(msg);
            }
        }
    });
}

function setupReadingRuler() {
    const daccsl = document.getElementById('daccsl');
    if (daccsl) {
        daccsl.addEventListener('click', function() {
            const isShown = document.documentElement.getAttribute('data-show-ruler') === 'true';
            if (!isShown) {
                const ruler = document.createElement('div');
                ruler.className = 'reading-ruler';
                document.body.appendChild(ruler);
                enableRulerFollow();
            } else {
                const ruler = document.querySelector('.reading-ruler');
                if (ruler) {
                    ruler.remove();
                }
                disableRulerFollow();
            }
            document.documentElement.setAttribute('data-show-ruler', !isShown);
            this.setAttribute('aria-pressed', !isShown);
        });
    }
}

function setupKeyboardNavigation() {
    // Add keyboard navigation to all interactive elements
    const interactiveElements = document.querySelectorAll('button, [role="button"], a, input, select, textarea');
    interactiveElements.forEach(element => {
        element.setAttribute('tabindex', '0');
    });

    // Handle keyboard navigation in the widget
    const widget = document.getElementById('accessibility-widget');
    if (widget) {
        widget.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                const panel = document.getElementById('accessibility-panel');
                if (panel?.classList.contains('open')) {
                    panel.classList.remove('open');
                    panel.setAttribute('aria-hidden', 'true');
                }
            }
        });
    }
}

function setupFeatureToggles() {
    // Profile buttons functionality
    const profileBtns = document.querySelectorAll('.profile-btn');
    profileBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isActive = btn.classList.contains('active');
            if (!isActive) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                applyAccessibilityProfile(btn.id, true);
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
                applyAccessibilityProfile(btn.id, false);
            }
        });
    });

    // Reset button
    const resetBtnEl = document.getElementById('reset-btn');
    if (resetBtnEl) {
        resetBtnEl.addEventListener('click', function() {
            const attributes = [
                'data-font-size',
                'data-letter-spacing',
                'data-line-height',
                'data-dyslexic-font',
                'data-invert-colors',
                'data-high-contrast',
                'data-saturation',
                'data-disable-animations',
                'data-enlarge-cursor',
                'data-hide-media',
                'data-show-ruler'
            ];
            attributes.forEach(attr => {
                document.documentElement.removeAttribute(attr);
            });
            const ruler = document.querySelector('.reading-ruler');
            if (ruler) {
                ruler.remove();
            }
            document.querySelectorAll('a').forEach(link => {
                link.style.textDecoration = '';
            });
            document.querySelectorAll('[aria-pressed]').forEach(btn => {
                btn.setAttribute('aria-pressed', 'false');
            });
            // Reset all profile buttons
            document.querySelectorAll('.profile-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            // Reset all dots
            document.querySelectorAll('.daccdts .dot').forEach(dot => {
                dot.classList.remove('active');
            });
            
            // Clean up text-to-speech
            const elements = document.querySelectorAll('p, h1, h2, h3, span, li');
            elements.forEach(el => {
                el.style.cursor = '';
                el.removeEventListener('click', ttsClickHandler);
            });
            window.speechSynthesis.cancel();
        });
    }

    // Font size
    const daccfs = document.getElementById('daccfs');
    if (daccfs) {
        daccfs.addEventListener('click', function() {
            const currentSize = document.documentElement.getAttribute('data-font-size') || 'default';
            const sizes = ['default', '1', '2', '3'];
            const nextIndex = (sizes.indexOf(currentSize) + 1) % sizes.length;
            const newSize = sizes[nextIndex];
            document.documentElement.removeAttribute('data-font-size');
            document.querySelectorAll('p, span, div, li, td, th').forEach(el => {
                el.style.removeProperty('font-size');
            });
            if (newSize !== 'default') {
                document.documentElement.setAttribute('data-font-size', newSize);
                const sizeMap = { '1': '1.0556em', '2': '1.0588em', '3': '1.0656em' };
                document.querySelectorAll('p, span, div, li, td, th').forEach(el => {
                    if (!el.closest('#accessibility-widget')) {
                        el.style.fontSize = sizeMap[newSize];
                    }
                });
            }
            const dots = this.querySelectorAll('.daccdts .dot');
            dots.forEach((dot, idx) => {
                if (idx === (newSize === 'default' ? -1 : parseInt(newSize, 10) - 1)) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            this.setAttribute('aria-pressed', newSize !== 'default');
        });
    }

    // Underline links
    const daccul = document.getElementById('daccul');
    if (daccul) {
        daccul.addEventListener('click', function() {
            const links = document.querySelectorAll('a');
            const isUnderlined = links[0]?.style.textDecoration === 'underline';
            links.forEach(link => {
                link.style.textDecoration = isUnderlined ? 'none' : 'underline';
            });
            this.setAttribute('aria-pressed', !isUnderlined);
        });
    }

    // Letter spacing
    const daccls = document.getElementById('daccls');
    if (daccls) {
        daccls.addEventListener('click', function() {
            const currentSpacing = document.documentElement.getAttribute('data-letter-spacing') || 'default';
            const spacings = ['default', '1', '2', '3'];
            const nextIndex = (spacings.indexOf(currentSpacing) + 1) % spacings.length;
            const newSpacing = spacings[nextIndex];
            document.documentElement.setAttribute('data-letter-spacing', newSpacing);
            this.setAttribute('aria-pressed', newSpacing !== 'default');
            const dots = this.querySelectorAll('.daccdts .dot');
            dots.forEach((dot, idx) => {
                if (idx === (newSpacing === 'default' ? -1 : parseInt(newSpacing, 10) - 1)) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // Line height
    const dacclh = document.getElementById('dacclh');
    if (dacclh) {
        dacclh.addEventListener('click', function() {
            const currentLevel = document.documentElement.getAttribute('data-line-height') || 'default';
            const levels = ['default', '1', '2', '3'];
            const newLevel = levels[(levels.indexOf(currentLevel) + 1) % levels.length];
            
            // Remove current line height
            document.documentElement.removeAttribute('data-line-height');
            document.documentElement.style.removeProperty('--line-height');
            
            // Apply new line height if not default
            if (newLevel !== 'default') {
                document.documentElement.setAttribute('data-line-height', newLevel);
                const lineHeightValue = newLevel === '1' ? '1.5' : newLevel === '2' ? '2' : '2.5';
                document.documentElement.style.setProperty('--line-height', lineHeightValue);
            }
            
            // Update button state
            this.setAttribute('aria-pressed', newLevel !== 'default');
            
            // Update dots
            const dots = this.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index < levels.indexOf(newLevel));
            });
        });
    }

    // Text to speech
    const dacctts = document.getElementById('dacctts');
    if (dacctts) {
        dacctts.addEventListener('click', function() {
            const isActive = this.getAttribute('aria-pressed') === 'true';
            
            // Cancel any ongoing speech when toggling
            window.speechSynthesis.cancel();
            
            // Remove event listeners and reset cursor for all text elements
            const elements = document.querySelectorAll('p, h1, h2, h3, span, li');
            elements.forEach(el => {
                el.style.cursor = '';
                el.removeEventListener('click', ttsClickHandler);
            });
            
            if (!isActive) {
                // Enable text-to-speech
                elements.forEach(el => {
                    el.style.cursor = 'pointer';
                    el.addEventListener('click', ttsClickHandler);
                });
            }
            
            this.setAttribute('aria-pressed', !isActive);
        });
    }

    // Dyslexic font
    const daccffd = document.getElementById('daccffd');
    if (daccffd) {
        daccffd.addEventListener('click', function() {
            const isDyslexic = document.documentElement.getAttribute('data-dyslexic-font') === 'true';
            
            // Remove dyslexic font from all elements first
            document.querySelectorAll('p, span, div, li, td, th, h1, h2, h3, h4, h5, h6, button, input, textarea, select').forEach(el => {
                el.style.removeProperty('font-family');
                el.style.removeProperty('letter-spacing');
                el.style.removeProperty('line-height');
            });
            
            // Set new dyslexic font state
            document.documentElement.setAttribute('data-dyslexic-font', !isDyslexic);
            this.setAttribute('aria-pressed', !isDyslexic);
        });
    }

    // Invert colors
    const daccic = document.getElementById('daccic');
    if (daccic) {
        daccic.addEventListener('click', function() {
            const isInverted = document.documentElement.getAttribute('data-invert-colors') === 'true';
            document.documentElement.setAttribute('data-invert-colors', !isInverted);
            this.setAttribute('aria-pressed', !isInverted);
        });
    }

    // High contrast
    const dacccc = document.getElementById('dacccc');
    if (dacccc) {
        dacccc.addEventListener('click', function() {
            const isHighContrast = document.documentElement.getAttribute('data-high-contrast') === 'true';
            document.documentElement.setAttribute('data-high-contrast', !isHighContrast);
            this.setAttribute('aria-pressed', !isHighContrast);
        });
    }

    // Saturation
    const daccsat = document.getElementById('daccsat');
    if (daccsat) {
        daccsat.addEventListener('click', function() {
            const currentSaturation = document.documentElement.getAttribute('data-saturation') || 'default';
            const saturations = ['default', '1', '2', '3'];
            const nextIndex = (saturations.indexOf(currentSaturation) + 1) % saturations.length;
            const newSaturation = saturations[nextIndex];
            
            // Remove current saturation
            document.documentElement.removeAttribute('data-saturation');
            document.documentElement.style.removeProperty('--saturation-filter');
            
            // Apply new saturation if not default
            if (newSaturation !== 'default') {
                document.documentElement.setAttribute('data-saturation', newSaturation);
                // Set the saturation filter value based on the level
                const saturationValues = {
                    '1': 'saturate(150%)',
                    '2': 'saturate(200%)',
                    '3': 'grayscale(100%)'
                };
                document.documentElement.style.setProperty('--saturation-filter', saturationValues[newSaturation]);
            }
            
            this.setAttribute('aria-pressed', newSaturation !== 'default');
            const dots = this.querySelectorAll('.daccdts .dot');
            dots.forEach((dot, idx) => {
                if (idx === (newSaturation === 'default' ? -1 : parseInt(newSaturation, 10) - 1)) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        });
    }

    // Disable animations
    const daccda = document.getElementById('daccda');
    if (daccda) {
        daccda.addEventListener('click', function() {
            const isDisabled = document.documentElement.getAttribute('data-disable-animations') === 'true';
            document.documentElement.setAttribute('data-disable-animations', !isDisabled);
            this.setAttribute('aria-pressed', !isDisabled);
        });
    }

    // Enlarge cursor
    const daccec = document.getElementById('daccec');
    if (daccec) {
        daccec.addEventListener('click', function() {
            const isEnlarged = document.documentElement.getAttribute('data-enlarge-cursor') === 'true';
            document.documentElement.setAttribute('data-enlarge-cursor', !isEnlarged);
            this.setAttribute('aria-pressed', !isEnlarged);
        });
    }

    // Hide media
    const dacchm = document.getElementById('dacchm');
    if (dacchm) {
        dacchm.addEventListener('click', function() {
            const isHidden = document.documentElement.getAttribute('data-hide-media') === 'true';
            document.documentElement.setAttribute('data-hide-media', !isHidden);
            this.setAttribute('aria-pressed', !isHidden);
        });
    }
}

// --- Ruler follow logic ---
let rulerMoveHandler = null;

function enableRulerFollow() {
    const ruler = document.querySelector('.reading-ruler');
    if (!ruler) return;
    if (rulerMoveHandler) return; // Already enabled
    
    const rulerHeight = 100; // px
    
    // Add the ruler-strip if not present
    let strip = ruler.querySelector('.ruler-strip');
    if (!strip) {
        strip = document.createElement('div');
        strip.className = 'ruler-strip';
        ruler.appendChild(strip);
    }
    
    rulerMoveHandler = function(e) {
        let y = 0;
        if (e.touches && e.touches.length) {
            y = e.touches[0].clientY;
        } else {
            y = e.clientY;
        }
        // Calculate the top and bottom of the transparent strip
        const top = Math.max(0, y - rulerHeight / 2);
        const bottom = Math.min(window.innerHeight, y + rulerHeight / 2);
        // Use clip-path to create a transparent strip
        ruler.style.clipPath = `polygon(0 0, 100vw 0, 100vw ${top}px, 0 ${top}px, 0 ${bottom}px, 100vw ${bottom}px, 100vw 100vh, 0 100vh)`;
        // Position the strip exactly at the clear strip's top edge
        strip.style.top = `${top}px`;
    };
    
    window.addEventListener('mousemove', rulerMoveHandler);
    window.addEventListener('touchmove', rulerMoveHandler);
    
    // Initialize at center
    const initialY = window.innerHeight / 2;
    const top = Math.max(0, initialY - rulerHeight / 2);
    const bottom = Math.min(window.innerHeight, initialY + rulerHeight / 2);
    ruler.style.clipPath = `polygon(0 0, 100vw 0, 100vw ${top}px, 0 ${top}px, 0 ${bottom}px, 100vw ${bottom}px, 100vw 100vh, 0 100vh)`;
    strip.style.top = `${top}px`;
}

function disableRulerFollow() {
    if (rulerMoveHandler) {
        window.removeEventListener('mousemove', rulerMoveHandler);
        window.removeEventListener('touchmove', rulerMoveHandler);
        rulerMoveHandler = null;
    }
}

// --- Text-to-speech handler ---
function ttsClickHandler(e) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const msg = new SpeechSynthesisUtterance(e.currentTarget.innerText);
    window.speechSynthesis.speak(msg);
}

// Accessibility profile functions
export function applyAccessibilityProfile(profileId, enable) {
    const root = document.documentElement;
    switch(profileId) {
        case 'daccpmi':
            // Motor impairments
            if (enable) {
                root.style.setProperty('--target-size', '44px');
                root.style.setProperty('--spacing', '24px');
                document.documentElement.setAttribute('data-disable-animations', 'true');
            } else {
                root.style.removeProperty('--target-size');
                root.style.removeProperty('--spacing');
                document.documentElement.removeAttribute('data-disable-animations');
            }
            break;
            
        case 'daccpbl':
            // Blindness
            if (enable) {
                root.style.setProperty('--screen-reader', 'block');
                // Enable text-to-speech feature if not already enabled
                const ttsBtn = document.getElementById('dacctts');
                if (ttsBtn && ttsBtn.getAttribute('aria-pressed') !== 'true') {
                    ttsBtn.click();
                }
            } else {
                root.style.removeProperty('--screen-reader');
                // Disable text-to-speech feature if enabled
                const ttsBtn = document.getElementById('dacctts');
                if (ttsBtn && ttsBtn.getAttribute('aria-pressed') === 'true') {
                    ttsBtn.click();
                }
            }
            break;
            
        case 'daccpcb':
            // Color blindness
            if (enable) {
                root.style.setProperty('--contrast', 'high');
                document.documentElement.setAttribute('data-saturation', '1');
                // Set the saturation filter value
                document.documentElement.style.setProperty('--saturation-filter', 'saturate(150%)');
            } else {
                root.style.removeProperty('--contrast');
                document.documentElement.removeAttribute('data-saturation');
                document.documentElement.style.removeProperty('--saturation-filter');
            }
            break;
            
        case 'daccpds':
            // Dyslexia
            if (enable) {
                root.style.setProperty('--font-family', 'OpenDyslexic, sans-serif');
                root.style.setProperty('--line-height', '1.8');
                document.documentElement.setAttribute('data-disable-animations', 'true');
                document.documentElement.setAttribute('data-saturation', '1');
                document.documentElement.setAttribute('data-dyslexic-font', 'true');
            } else {
                root.style.removeProperty('--font-family');
                root.style.removeProperty('--line-height');
                document.documentElement.removeAttribute('data-disable-animations');
                document.documentElement.removeAttribute('data-saturation');
                document.documentElement.removeAttribute('data-dyslexic-font');
            }
            break;
            
        case 'daccplv':
            // Low vision
            if (enable) {
                root.style.setProperty('--font-size', '120%');
                root.style.setProperty('--contrast', 'high');
                document.documentElement.setAttribute('data-disable-animations', 'true');
                document.documentElement.setAttribute('data-font-size', '2');
                document.documentElement.setAttribute('data-saturation', '1');
                document.documentElement.setAttribute('data-enlarge-cursor', 'true');
            } else {
                root.style.removeProperty('--font-size');
                root.style.removeProperty('--contrast');
                document.documentElement.removeAttribute('data-disable-animations');
                document.documentElement.removeAttribute('data-font-size');
                document.documentElement.removeAttribute('data-saturation');
                document.documentElement.removeAttribute('data-enlarge-cursor');
            }
            break;
            
        case 'daccpep':
            // Epilepsy
            if (enable) {
                root.style.setProperty('--reduce-motion', 'reduce');
                root.style.setProperty('--reduce-transparency', '1');
                document.documentElement.setAttribute('data-disable-animations', 'true');
                document.documentElement.setAttribute('data-saturation', '3');
            } else {
                root.style.removeProperty('--reduce-motion');
                root.style.removeProperty('--reduce-transparency');
                document.documentElement.removeAttribute('data-disable-animations');
                document.documentElement.removeAttribute('data-saturation');
            }
            break;
            
        case 'daccpco':
            // Cognitive
            if (enable) {
                root.style.setProperty('--contrast', 'high');
            } else {
                root.style.removeProperty('--contrast');
            }
            break;
            
        case 'daccpad':
            // ADHD
            if (enable) {
                root.style.setProperty('--contrast', 'high');
                document.documentElement.setAttribute('data-disable-animations', 'true');
                document.documentElement.setAttribute('data-saturation', '3');
                document.documentElement.setAttribute('data-show-ruler', 'true');
                // Add the reading ruler if not present
                if (!document.querySelector('.reading-ruler')) {
                    const ruler = document.createElement('div');
                    ruler.className = 'reading-ruler';
                    document.body.appendChild(ruler);
                    if (typeof enableRulerFollow === 'function') enableRulerFollow();
                }
            } else {
                root.style.removeProperty('--contrast');
                document.documentElement.removeAttribute('data-disable-animations');
                document.documentElement.removeAttribute('data-saturation');
                document.documentElement.removeAttribute('data-show-ruler');
                // Remove the reading ruler if present
                const ruler = document.querySelector('.reading-ruler');
                if (ruler) ruler.remove();
                if (typeof disableRulerFollow === 'function') disableRulerFollow();
            }
            break;
            
        case 'daccpcal':
            // Cognitive and Learning Disabilities
            if (enable) {
                document.documentElement.setAttribute('data-disable-animations', 'true');
                document.documentElement.setAttribute('data-font-size', '2');
            } else {
                document.documentElement.removeAttribute('data-disable-animations');
                document.documentElement.removeAttribute('data-font-size');
            }
            break;
    }
}

export function resetAccessibilityProfile() {
    const root = document.documentElement;
    root.style.removeProperty('--target-size');
    root.style.removeProperty('--spacing');
    root.style.removeProperty('--screen-reader');
    root.style.removeProperty('--contrast');
    root.style.removeProperty('--font-family');
    root.style.removeProperty('--line-height');
    root.style.removeProperty('--font-size');
    root.style.removeProperty('--reduce-motion');
    root.style.removeProperty('--reduce-transparency');
}

// Update the CSS variable application for line height
document.documentElement.style.setProperty('--line-height', '1.5');
const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, li, td, th');
textElements.forEach(element => {
    // Skip elements inside the accessibility widget
    if (element.closest('#accessibility-widget')) {
        return;
    }
    element.style.lineHeight = 'var(--line-height)';
}); 