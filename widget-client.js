(function() {
  // Configuration validation
  if (!window.ACCESSIBILITY_CONFIG) {
    console.error('Accessibility Widget: Configuration is required. Please add ACCESSIBILITY_CONFIG object.');
    return;
  }

  const { licenseKey, domain } = window.ACCESSIBILITY_CONFIG;
  if (!licenseKey) {
    console.error('Accessibility Widget: License key is required.');
    return;
  }

  // API endpoint from Render
  const API_URL = 'https://wcag-g2za.onrender.com';
  // Widget script URL
  const WIDGET_URL = 'https://nextsolution-ai.github.io/wcag/widget-deploy.min.js';

  // License verification
  async function verifyLicense() {
    try {
      const response = await fetch(`${API_URL}/api/licenses/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          licenseKey,
          domain: domain || window.location.hostname
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
      console.error('Accessibility Widget: License verification failed', error);
      return false;
    }
  }

  // Usage tracking
  async function trackUsage() {
    try {
      await fetch(`${API_URL}/api/usage/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          licenseKey,
          domain: domain || window.location.hostname
        })
      });
    } catch (error) {
      console.error('Accessibility Widget: Usage tracking failed', error);
    }
  }

  // Load and initialize widget
  async function loadWidget() {
    const isValid = await verifyLicense();
    if (!isValid) return;

    // Load the widget script
    const script = document.createElement('script');
    script.src = WIDGET_URL;
    script.async = true;
    document.body.appendChild(script);
  }

  // Start the process
  loadWidget();
})(); 