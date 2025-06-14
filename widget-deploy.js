// License validation
function validateLicense() {
  return new Promise((resolve) => {
    const config = window.ACCESSIBILITY_CONFIG || {};
    const licenseKey = config.licenseKey;
    const domain = window.location.hostname;

    if (!licenseKey) {
      console.error('Accessibility widget: No license key provided');
      resolve(false);
      return;
    }

    if (!/^[0-9a-f]{32}$/.test(licenseKey)) {
      console.error('Accessibility widget: Invalid license key format');
      resolve(false);
      return;
    }

    if (!domain) {
      console.error('Accessibility widget: No domain provided');
      resolve(false);
      return;
    }

    const apiUrl = 'https://wcag-g2za.onrender.com/api/licenses/verify';
    const xhr = new XMLHttpRequest();

    xhr.open('POST', apiUrl, true); // true makes it asynchronous
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
      if (xhr.status === 200) {
        try {
          const response = JSON.parse(xhr.responseText);
          if (response.valid) {
            console.log('Accessibility widget: License validated successfully.');
            resolve(true);
          } else {
            console.error('Accessibility widget: License validation failed:', response.message || 'Invalid license');
            resolve(false);
          }
        } catch (e) {
          console.error('Accessibility widget: Failed to parse validation response:', e);
          resolve(false);
        }
      } else {
        console.error('Accessibility widget: License validation API error. Status:', xhr.status, 'Response:', xhr.responseText);
        resolve(false);
      }
    };

    xhr.onerror = function() {
      console.error('Accessibility widget: License validation request failed.');
      resolve(false);
    };

    try {
      const requestBody = JSON.stringify({
        licenseKey: licenseKey,
        domain: domain
      });
      xhr.send(requestBody);
    } catch (e) {
      console.error('Accessibility widget: Failed to send validation request:', e);
      resolve(false);
    }
  });
}

(function() {
  // Check license before initializing
  if (!validateLicense()) {
    console.error('Accessibility widget initialization failed: Invalid license');
    return;
  }

  const widgetHTML = `

  `;

  function setLanguage(lang) {
    const t = translations[lang] || translations.en;
    
    // Update all static texts
    // Header
    document.querySelector('.accessibility-header-title').childNodes[0].textContent = t.accessibilityMenu + ' ';
    document.querySelector('.accessibility-header-title span').textContent = t.keyboardShortcut;
    
    // Update button aria-labels
    document.getElementById('accessibility-btn').setAttribute('aria-label', t.openMenu);
    document.getElementById('daccheac').setAttribute('aria-label', t.closeMenu);
    
    // Widget settings
    document.querySelector('.accordion-toggle[aria-controls="widget-settings-panel"] span').textContent = t.widgetSettings;
    document.querySelector('.settings-label').textContent = t.language;
    document.querySelector('#position-select').previousElementSibling.textContent = t.position;
    document.querySelector('#position-select option[value="right"]').textContent = t.right;
    document.querySelector('#position-select option[value="left"]').textContent = t.left;
    
    // Profiles
    document.querySelector('.accordion-toggle[aria-controls="profiles-panel"] span').textContent = t.accessibilityProfiles;
    const profileBtns = document.querySelectorAll('.profile-btn');
    if (profileBtns[0]) profileBtns[0].querySelectorAll('span')[1].textContent = t.motorImpairments;
    if (profileBtns[1]) profileBtns[1].querySelectorAll('span')[1].textContent = t.blindness;
    if (profileBtns[2]) profileBtns[2].querySelectorAll('span')[1].textContent = t.colorBlindness;
    if (profileBtns[3]) profileBtns[3].querySelectorAll('span')[1].textContent = t.dyslexia;
    if (profileBtns[4]) profileBtns[4].querySelectorAll('span')[1].textContent = t.lowVision;
    if (profileBtns[5]) profileBtns[5].querySelectorAll('span')[1].textContent = t.epilepsy;
    if (profileBtns[6]) profileBtns[6].querySelectorAll('span')[1].textContent = t.adhd;
    if (profileBtns[7]) profileBtns[7].querySelectorAll('span')[1].textContent = t.cognitive;
    
    // Content
    document.querySelector('.accordion-toggle[aria-controls="content-panel"] span').textContent = t.content;
    const contentBtns = document.querySelectorAll('#daccbxc2 button');
    const contentLabels = [t.fontSize, t.underlineLinks, t.letterSpacing, t.lineHeight, t.textToSpeech];
    contentBtns.forEach((btn, i) => {
      if (btn) {
        // Only update the label span (the second span), do not remove .daccdts or other elements
        const spans = btn.querySelectorAll('span');
        if (spans.length > 1) {
          spans[1].textContent = contentLabels[i];
        }
      }
    });
    
    // Color
    document.querySelector('.accordion-toggle[aria-controls="color-panel"] span').textContent = t.color;
    const colorBtns = document.querySelectorAll('#daccbxc3 button');
    const colorLabels = [t.invertColors, t.contrast, t.saturation];
    colorBtns.forEach((btn, i) => {
      if (btn) {
        // Only update the label span (the second span), do not remove .daccdts or other elements
        const spans = btn.querySelectorAll('span');
        if (spans.length > 1) {
          spans[1].textContent = colorLabels[i];
        }
      }
    });
    
    // Visibility
    document.querySelector('.accordion-toggle[aria-controls="visibility-panel"] span').textContent = t.visibility;
    const visBtns = document.querySelectorAll('#daccbxc4 button');
    const visLabels = [t.disableAnimations, t.enlargeCursor, t.hideMedia, t.showLine, t.facilitiesDyslexics];
    visBtns.forEach((btn, i) => {
      if (btn) {
        // Remove all label spans except the icon (first span)
        const spans = btn.querySelectorAll('span');
        for (let j = spans.length - 1; j > 0; j--) {
          spans[j].remove();
        }
        // Add the correct label
        const labelSpan = document.createElement('span');
        labelSpan.textContent = visLabels[i];
        btn.appendChild(labelSpan);
      }
    });
    
    // Reset button
    const resetBtn = document.querySelector('#reset-btn span:last-child');
    if (resetBtn) resetBtn.textContent = t.reset;

    // Update tooltips
    const tooltipElements = document.querySelectorAll('.dacctltp');
    tooltipElements.forEach(tooltip => {
      const button = tooltip.closest('button');
      if (button) {
        const buttonText = button.querySelector('span:last-child').textContent.toLowerCase();
        for (const [key, value] of Object.entries(t.tooltips)) {
          if (buttonText.includes(key.toLowerCase())) {
            tooltip.setAttribute('title', value);
            break;
          }
        }
      }
    });
  }

  function init() {
    // Check if widget already exists
    if (document.getElementById('accessibility-widget')) {
      return;
    }

    // Double-check license before proceeding
    if (!validateLicense()) {
      console.error('Accessibility widget initialization failed: Invalid license');
      return;
    }

    // --- Fix: Ensure panel is closed by default on all viewports ---
    // Remove any forced open state on mobile
    // (No code change needed here, but ensure the panel is not given the 'open' class by default)

    const styles = `
 

    `;

    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    if (!document.querySelector('link[href*="Plus Jakarta Sans"]')) {
      const fontLink = document.createElement("link");
      fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }

    // Import OpenDyslexic font for dyslexic mode
    if (!document.querySelector('link[href*="opendyslexic"]')) {
      const dysFontLink = document.createElement("link");
      dysFontLink.href = "https://fonts.cdnfonts.com/css/opendyslexic";
      dysFontLink.rel = "stylesheet";
      document.head.appendChild(dysFontLink);
    }

    const container = document.createElement("div");
    container.innerHTML = widgetHTML;
    
    if (document.body) {
      document.body.appendChild(container);
      // --- Fix: Ensure panel is closed by default on all viewports ---
      const panel = container.querySelector('#accessibility-panel');
      if (panel) {
        panel.classList.remove('open');
        panel.setAttribute('aria-hidden', 'true');
      }
      initializeWidget();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(container);
        // --- Fix: Ensure panel is closed by default on all viewports ---
        const panel = container.querySelector('#accessibility-panel');
        if (panel) {
          panel.classList.remove('open');
          panel.setAttribute('aria-hidden', 'true');
        }
        initializeWidget();
      });
    }
  }

  function initializeWidget() {
    const panel = document.getElementById('accessibility-panel');
    const btn = document.getElementById('accessibility-btn');
    const closeBtn = document.getElementById('daccheac');
    const overlay = document.getElementById('accessibility-overlay');
    const positionSelect = document.getElementById('position-select');
    const resetBtn = document.querySelector('.reset-btn');
    const profileBtns = document.querySelectorAll('.profile-btn');

    if (!panel || !btn) {
      console.error('Accessibility widget elements not found');
      return;
    }

    // Toggle panel visibility
    function togglePanel() {
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
    }

    // Event listeners
    btn.addEventListener('click', togglePanel);
    closeBtn.addEventListener('click', togglePanel);
    overlay.addEventListener('click', togglePanel);

    // Close panel on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && panel.classList.contains('open')) {
        togglePanel();
      }
    });

    // Set initial state for accordions
    // const accordionContents = document.querySelectorAll('.accordion-content');
    // accordionContents.forEach(content => {
    //   content.hidden = true;
    // });

    // Accordion functionality
    // accordionToggles.forEach(toggle => {
    //   toggle.addEventListener('click', () => {
    //     const content = document.getElementById(toggle.getAttribute('aria-controls'));
    //     const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
    //     toggle.setAttribute('aria-expanded', !isExpanded);
    //     content.hidden = isExpanded;
    //   });
    // });

    // Position select functionality
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

    // Profile buttons functionality
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

    // Reset button functionality
    if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      resetAccessibilityProfile();
      profileBtns.forEach(btn => btn.classList.remove('active'));
      profileBtns.forEach(btn => btn.setAttribute('aria-pressed', 'false'));
      // Remove all profile effects
      [
        'daccpmi', 'daccpbl', 'daccpcb', 'daccpds', 'daccplv', 'daccpep', 'daccpco', 'daccpad'
      ].forEach(pid => applyAccessibilityProfile(pid, false));
    });
    }

    // Add keyboard shortcut (CTRL + U)
    document.addEventListener('keydown', (e) => {
      if (e.ctrlKey && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        const isOpen = panel.classList.contains('open');
        if (!isOpen) {
          panel.classList.add('open');
          panel.setAttribute('aria-hidden', false);
        } else {
          panel.classList.remove('open');
          panel.setAttribute('aria-hidden', true);
        }
      }
    });

    // Add event listeners for accessibility features
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
    const dacclh = document.getElementById('dacclh');
    if (dacclh) {
      dacclh.addEventListener('click', function() {
      const currentHeight = document.documentElement.getAttribute('data-line-height') || 'default';
      const heights = ['default', '1', '2', '3'];
      const nextIndex = (heights.indexOf(currentHeight) + 1) % heights.length;
      const newHeight = heights[nextIndex];
      document.documentElement.setAttribute('data-line-height', newHeight);
      this.setAttribute('aria-pressed', newHeight !== 'default');
      const dots = this.querySelectorAll('.daccdts .dot');
      dots.forEach((dot, idx) => {
        if (idx === (newHeight === 'default' ? -1 : parseInt(newHeight, 10) - 1)) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    });
    }
    const dacctts = document.getElementById('dacctts');
    if (dacctts) {
      dacctts.addEventListener('click', function() {
      const isActive = this.getAttribute('aria-pressed') === 'true';
      this.setAttribute('aria-pressed', !isActive);
      if (!isActive) {
        const elements = document.querySelectorAll('p, h1, h2, h3, span, li');
        elements.forEach(el => {
          el.style.cursor = 'pointer';
          el.addEventListener('click', ttsClickHandler);
        });
      } else {
        const elements = document.querySelectorAll('p, h1, h2, h3, span, li');
        elements.forEach(el => {
          el.style.cursor = '';
          el.removeEventListener('click', ttsClickHandler);
        });
      }
    });
    }
    const daccffd = document.getElementById('daccffd');
    if (daccffd) {
      daccffd.addEventListener('click', function() {
      const isDyslexic = document.documentElement.getAttribute('data-dyslexic-font') === 'true';
      document.documentElement.setAttribute('data-dyslexic-font', !isDyslexic);
      this.setAttribute('aria-pressed', !isDyslexic);
    });
    }
    const daccic = document.getElementById('daccic');
    if (daccic) {
      daccic.addEventListener('click', function() {
      const isInverted = document.documentElement.getAttribute('data-invert-colors') === 'true';
      document.documentElement.setAttribute('data-invert-colors', !isInverted);
      this.setAttribute('aria-pressed', !isInverted);
    });
    }
    const dacccc = document.getElementById('dacccc');
    if (dacccc) {
      dacccc.addEventListener('click', function() {
      const isHighContrast = document.documentElement.getAttribute('data-high-contrast') === 'true';
      document.documentElement.setAttribute('data-high-contrast', !isHighContrast);
      this.setAttribute('aria-pressed', !isHighContrast);
    });
    }
    const daccsat = document.getElementById('daccsat');
    if (daccsat) {
      daccsat.addEventListener('click', function() {
      const currentSaturation = document.documentElement.getAttribute('data-saturation') || 'default';
      const saturations = ['default', '1', '2', '3'];
      const nextIndex = (saturations.indexOf(currentSaturation) + 1) % saturations.length;
      const newSaturation = saturations[nextIndex];
      document.documentElement.setAttribute('data-saturation', newSaturation);
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
    const daccda = document.getElementById('daccda');
    if (daccda) {
      daccda.addEventListener('click', function() {
      const isDisabled = document.documentElement.getAttribute('data-disable-animations') === 'true';
      document.documentElement.setAttribute('data-disable-animations', !isDisabled);
      this.setAttribute('aria-pressed', !isDisabled);
    });
    }
    const daccec = document.getElementById('daccec');
    if (daccec) {
      daccec.addEventListener('click', function() {
      const isEnlarged = document.documentElement.getAttribute('data-enlarge-cursor') === 'true';
      document.documentElement.setAttribute('data-enlarge-cursor', !isEnlarged);
      this.setAttribute('aria-pressed', !isEnlarged);
    });
    }
    const dacchm = document.getElementById('dacchm');
    if (dacchm) {
      dacchm.addEventListener('click', function() {
      const isHidden = document.documentElement.getAttribute('data-hide-media') === 'true';
      document.documentElement.setAttribute('data-hide-media', !isHidden);
      this.setAttribute('aria-pressed', !isHidden);
    });
    }
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
    });
    }

    // Add language change event listener
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      languageSelect.value = 'sv'; // Set Swedish as default
      languageSelect.addEventListener('change', function() {
        setLanguage(this.value);
      });
      // Set initial language to Swedish
      setLanguage('sv');
    }

    // Tab navigation logic
    const tabBtns = panel.querySelectorAll('.tab-btn');
    const contentSections = panel.querySelectorAll('.content-section');
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

  // Accessibility profile functions
  function applyAccessibilityProfile(profileId, enable) {
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
        } else {
          root.style.removeProperty('--contrast');
          document.documentElement.removeAttribute('data-saturation');
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

  function resetAccessibilityProfile() {
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

  // Call init when script loads
  // Modified to use async validation
  (async function() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', async () => {
        const isLicenseValid = await validateLicense();
        if (isLicenseValid) {
          init();
        }
      });
    } else {
      const isLicenseValid = await validateLicense();
      if (isLicenseValid) {
        init();
      }
    }
  })();
})(); 

// Inject CSS for accessibility features
(function injectAccessibilityCSS() {
  if (document.getElementById('wcag-accessibility-css')) return;
  const style = document.createElement('style');
  style.id = 'wcag-accessibility-css';
  style.innerHTML = ``
  ;
  document.head.appendChild(style);
})(); 

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
  const msg = new SpeechSynthesisUtterance(e.currentTarget.innerText);
  window.speechSynthesis.speak(msg);
}