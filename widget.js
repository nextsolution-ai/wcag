const btn = document.getElementById('accessibility-btn');
const panel = document.getElementById('accessibility-panel');
const closeBtn = document.getElementById('daccheac');

// Toggle panel
btn.addEventListener('click', () => {
  const isOpen = panel.classList.toggle('open');
  panel.setAttribute('aria-hidden', !isOpen);
});

closeBtn.addEventListener('click', () => {
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', true);
});

// Initialize accordion functionality
document.addEventListener('DOMContentLoaded', function() {
  const accordionToggles = document.querySelectorAll('.accordion-toggle');
  
  accordionToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
      const content = document.getElementById(toggle.getAttribute('aria-controls'));
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      
      toggle.setAttribute('aria-expanded', !isExpanded);
      content.hidden = isExpanded;
    });
  });
});

// Position select logic
const positionSelect = document.getElementById('position-select');
if (positionSelect) {
  positionSelect.addEventListener('change', function() {
    const widget = document.getElementById('accessibility-widget');
    if (this.value === 'left') {
      widget.style.right = '';
      widget.style.left = '32px';
    } else {
      widget.style.left = '';
      widget.style.right = '32px';
    }
  });
}

// Profile buttons functionality
const profileBtns = document.querySelectorAll('.profile-btn');
profileBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const wasActive = btn.classList.contains('active');
    
    // Remove active state from all buttons
    profileBtns.forEach(b => b.classList.remove('active'));
    
    // Toggle active state
    if (!wasActive) {
      btn.classList.add('active');
      applyAccessibilityProfile(btn.id);
    } else {
      resetAccessibilityProfile();
    }
  });
});

// Reset button functionality
const resetBtn = document.querySelector('.reset-btn');
if (resetBtn) {
  resetBtn.addEventListener('click', () => {
    resetAccessibilityProfile();
    profileBtns.forEach(btn => btn.classList.remove('active'));
  });
}

// Accessibility profile functions
function applyAccessibilityProfile(profileId) {
  const root = document.documentElement;
  
  switch(profileId) {
    case 'daccpmi':
      // Motor impairments
      root.style.setProperty('--target-size', '44px');
      root.style.setProperty('--spacing', '24px');
      break;
    case 'daccpbl':
      // Blindness
      root.style.setProperty('--screen-reader', 'block');
      break;
    case 'daccpcb':
      // Color blindness
      root.style.setProperty('--contrast', 'high');
      break;
    case 'daccpds':
      // Dyslexia
      root.style.setProperty('--font-family', 'OpenDyslexic, sans-serif');
      root.style.setProperty('--line-height', '1.8');
      break;
    case 'daccplv':
      // Low vision
      root.style.setProperty('--font-size', '120%');
      root.style.setProperty('--contrast', 'high');
      break;
    case 'daccpep':
      // Epilepsy
      root.style.setProperty('--reduce-motion', 'reduce');
      root.style.setProperty('--reduce-transparency', '1');
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
