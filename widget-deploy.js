

// Add this at the beginning of the file, before any widget initialization
async function validateLicense() {
  const config = window.ACCESSIBILITY_CONFIG;
  if (!config || !config.licenseKey) {
    console.error('Accessibility Widget: License key is required');
    return false;
  }

  try {
    const response = await fetch('https://wcag-g2za.onrender.com/api/licenses/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        licenseKey: config.licenseKey,
        domain: config.domain || window.location.hostname
      })
    });

    const data = await response.json();
    if (!data.valid) {
      console.error('Accessibility Widget: Invalid license key');
      return false;
    }

    // Track usage
    trackUsage();
    return true;
  } catch (error) {
    console.error('Accessibility Widget: License validation failed', error);
    return false;
  }
}

async function trackUsage() {
  try {
    await fetch('https://wcag-g2za.onrender.com/api/usage/track', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        licenseKey: window.ACCESSIBILITY_CONFIG.licenseKey,
        domain: window.ACCESSIBILITY_CONFIG.domain || window.location.hostname
      })
    });
  } catch (error) {
    console.error('Accessibility Widget: Usage tracking failed', error);
  }
}

// Modify the init function to check license first
async function init() {
  if (document.getElementById('accessibility-widget')) {
    return;
  }

  // Check license before initializing
  const isValid = await validateLicense();
  if (!isValid) {
    console.error('Accessibility Widget: License validation failed. Widget will not initialize.');
    return;
  }

  // ... rest of the init function code ...
}

// ... existing code ...