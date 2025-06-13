// License validation
function validateLicense() {
  return new Promise((resolve) => {
    const config = window.ACCESSIBILITY_CONFIG || {};
    const licenseKey = config.licenseKey;
    const domain = config.domain || window.location.hostname;

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
  <div id="accessibility-widget">
    <div id="accessibility-overlay"></div>
    <button id="accessibility-btn" aria-label="Open accessibility menu">
      <!-- Your SVG icon -->
      <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="#fff"></path></svg>
    </button>
    <div id="accessibility-panel" role="dialog" aria-modal="true" aria-label="Accessibility menu">
      <div class="accessibility-header">
        <span class="accessibility-header-icon">
          <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="var(--wcag-primary-color)"></path></svg>
        </span>
        <span class="accessibility-header-title">Accessibility Settings</span>
        <button aria-label="Close accessibility menu" id="daccheac" data-dacc-original-font-size="13.3333px" style="font-size: 13.3333px; text-decoration: none solid rgb(0, 0, 0);" data-dacc-text-decoration="none solid rgb(0, 0, 0)" class="accessibility-close-btn">
          <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" data-dacc-original-font-size="13.3333px" style="font-size: 13.3333px;">
            <path d="M29.9999 29.9999L18 18" stroke="black" stroke-width="2" data-dacc-original-font-size="13.3333px" style="font-size: 13.3333px;"></path>
            <path d="M18 29.9999L29.9999 18" stroke="black" stroke-width="2" data-dacc-original-font-size="13.3333px" style="font-size: 13.3333px;"></path>
          </svg>
        </button>
      </div>
      <!-- Tab navigation -->
      <div class="tab-nav">
        <button class="tab-btn active" data-target="text-reading-content">
          <span>
            <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3826 17.223H6.4879M9.43523 0.776855V17.0934M1.14746 5.27826V0.776965H17.723L17.723 5.27815M12.8021 11.2454L15.2626 8.63736M15.2626 8.63736L17.723 11.2454M15.2626 8.63736L15.2626 14.5035" stroke="var(--wcag-primary-color)" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"></path></svg>
          </span>
          <span>Text & Reading</span>
        </button>
        <button class="tab-btn" data-target="visual-display-content">
          <span>
            <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.5486 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"></path><path d="M9.45 17.37C7.2035 17.37 5.04726 16.4858 3.44746 14.9087C1.84767 13.3315 0.932879 11.1881 0.900869 8.94183C0.868859 6.69556 1.72221 4.52693 3.27641 2.90483C4.83061 1.28273 6.96078 0.337485 9.20637 0.273472L9.45 8.82V17.37Z" fill="var(--wcag-primary-color)"></path></svg>
          </span>
          <span>Visual & Display</span>
        </button>
        <button class="tab-btn" data-target="profiles-content">
          <span>
            <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="var(--wcag-primary-color)"></path></svg>
          </span>
          <span>Accessibility Profiles</span>
        </button>
            </div>
      <!-- Content sections -->
      <div id="text-reading-content" class="content-section">
          <div id="daccbxc2">
            <button id="daccfs" title="Font size" aria-label="Font size" type="button">
              <span class="icon"><svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3826 17.223H6.4879M9.43523 0.776855V17.0934M1.14746 5.27826V0.776965H17.723L17.723 5.27815M12.8021 11.2454L15.2626 8.63736M15.2626 8.63736L17.723 11.2454M15.2626 8.63736L15.2626 14.5035" stroke="var(--wcag-primary-color)" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Font size</span>
                <span class="option-desc">Adjust text size for better readability</span>
              </span>
              <div class="daccdts">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </button>
            <button id="daccls" title="Letter spacing" aria-label="Letter spacing" type="button">
              <span class="icon"><svg viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.699219 16.8639L7.6633 1.13232L13.9317 16.8639M12.7408 13.9187H2.71056M23.5159 16.4291H19.5499C18.5366 16.4291 17.754 15.5444 17.875 14.5388L17.9355 14.0359C18.0376 13.189 18.7559 12.5539 19.6104 12.5539H23.5159M18.2115 9.06805C18.7181 8.76559 19.3004 8.6068 19.8977 8.6068H20.9525C22.3741 8.6068 23.5272 9.75992 23.5272 11.1815V16.4556L25.3004 16.8677" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Letter spacing</span>
                <span class="option-desc">Adjust spacing between letters</span>
              </span>
              <div class="daccdts">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </button>
            <button id="dacclh" title="Line height" aria-label="Line height" type="button">
              <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.652344 11.739H9.26104M13.9384 11.739H17.348M0.652344 17.2174H3.58974M8.39233 17.2174H17.348M0.652344 0.782471H17.348V6.26073H0.652344V0.782471Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Line height</span>
                <span class="option-desc">Increase line spacing for readability</span>
              </span>
              <div class="daccdts">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </button>
            <button id="dacctts" title="Text to speech" aria-label="Text to speech" type="button">
              <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.69034 11.5355H2.14463C1.38606 11.5355 0.771484 10.9209 0.771484 10.1623V7.84034C0.771484 7.08177 1.38606 6.4672 2.14463 6.4672H4.69034V11.5381V11.5355ZM4.69034 11.5355L17.2286 17.2286V0.771484L4.69034 6.46463L4.69034 11.5355ZM5.20206 11.7669L4.88577 13.4795C4.77006 14.1043 5.08377 14.7266 5.65463 15.0069L8.1952 16.2566C8.8252 16.5652 9.58634 16.3698 9.98491 15.7912L10.9621 14.3795" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Text to speech</span>
                <span class="option-desc">Enable audio reading of text</span>
              </span>
            </button>
          <button id="daccul" title="Underline links" aria-label="Underline links" type="button">
            <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.947 12.8202H6.05235M8.99966 0.776855V12.6905M17.2875 17.2231H0.711914M0.711916 5.27815V0.776855H17.2875L17.2874 5.27815" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            <span class="label-group">
              <span class="label">Underline links</span>
              <span class="option-desc">Add underlines to all links</span>
          </span>
        </button>
          <button id="daccffd" title="Facilities for dyslexics" aria-label="Facilities for dyslexics" type="button">
            <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.91421 0.779785L3.84662 1.55968L1 0.779785M1 17.22L4.06759 16.4401L6.91421 17.22M3.95841 16.4401V1.81965M8.76777 12.681L13.0988 4.98083L17.0009 12.681M16.2574 11.2382H10.0182" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            <span class="label-group">
              <span class="label">Facilities for dyslexics</span>
              <span class="option-desc">Use a font designed for dyslexia</span>
            </span>
        </button>
      </div>
        </div>
      <div id="visual-display-content" class="content-section" hidden>
          <div id="daccbxc3">
            <button id="daccic" title="Invert colors" aria-label="Invert colors" type="button">
            <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.5486 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"></path><path d="M9.45 17.37C7.2035 17.37 5.04726 16.4858 3.44746 14.9087C1.84767 13.3315 0.932879 11.1881 0.900869 8.94183C0.868859 6.69556 1.72221 4.52693 3.27641 2.90483C4.83061 1.28273 6.96078 0.337485 9.20637 0.273472L9.45 8.82V17.37Z" fill="var(--wcag-primary-color)"></path></svg></span>
              <span class="label-group">
                <span class="label">Invert colors</span>
                <span class="option-desc">Invert all colors on the page</span>
          </span>
            </button>
            <button id="dacccc" title="Contrast" aria-label="Contrast" type="button">
              <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.5486 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"></path></svg></span>
              <span class="label-group">
                <span class="label">Contrast</span>
                <span class="option-desc">Increase page contrast for better visibility</span>
              </span>
            </button>
            <button id="daccsat" title="Saturation" aria-label="Saturation" type="button">
              <span class="icon"><svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00012 0.770996L3.17869 5.59242C0.51726 8.25385 0.51726 12.5687 3.17869 15.2327H3.18126C5.84269 17.8941 10.1601 17.8941 12.8215 15.2327C15.483 12.5713 15.483 8.25385 12.8215 5.59242C11.2864 4.05728 8.00012 0.770996 8.00012 0.770996ZM8.00012 0.770996L8.00012 17.2281" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Saturation</span>
                <span class="option-desc">Adjust color intensity for better readability</span>
              </span>
              <div class="daccdts">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </button>
            <button id="daccda" title="Disable animations" aria-label="Disable animations" type="button">
              <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.4187 1.14636C1.7814 1.14636 1.26477 1.66299 1.26477 2.30029V13.3261C1.26477 13.9634 1.7814 14.48 2.4187 14.48H2.77651C2.79603 14.478 2.81585 14.4769 2.83591 14.4769C2.85597 14.4769 2.87579 14.478 2.89531 14.48H13.4445C14.0818 14.48 14.5984 13.9634 14.5984 13.3261V2.30029C14.5984 1.66299 14.0818 1.14636 13.4445 1.14636H2.4187ZM2.27091 15.6053C1.07841 15.5291 0.134766 14.5378 0.134766 13.3261V2.30029C0.134766 1.03891 1.15732 0.0163574 2.4187 0.0163574H13.4445C14.7059 0.0163574 15.7284 1.03891 15.7284 2.30029V2.39453C16.9209 2.4707 17.8646 3.46207 17.8646 4.67376V15.2809C17.8646 16.7734 16.6547 17.9832 15.1622 17.9832H4.55484C3.29351 17.9832 2.27091 16.9606 2.27091 15.6993V15.6053ZM15.7284 3.5292C16.2959 3.60176 16.7346 4.08657 16.7346 4.67376V15.2809C16.7346 16.1493 16.0306 16.8532 15.1622 16.8532H4.55484C3.91759 16.8532 3.40091 16.3366 3.40091 15.6993V15.61H13.4445C14.7059 15.61 15.7284 14.5875 15.7284 13.3261V3.5292ZM4.53853 5.23692C4.53853 4.34234 5.50672 3.7833 6.2814 4.23046L10.7438 6.80684C10.7438 6.80683 10.7438 6.80685 10.7438 6.80684C11.5185 7.25405 11.5185 8.37258 10.7438 8.81976L6.28145 11.3961C5.50677 11.8433 4.53853 11.2843 4.53853 10.3897V5.23692ZM5.67179 5.22084C5.6708 5.22249 5.66853 5.2263 5.66853 5.23692V10.3897C5.66853 10.4003 5.6708 10.4041 5.67179 10.4058C5.67367 10.4089 5.6777 10.4136 5.68453 10.4175C5.69135 10.4214 5.6974 10.4226 5.70104 10.4227C5.70295 10.4227 5.70733 10.4228 5.71645 10.4175C5.71643 10.4175 5.71646 10.4175 5.71645 10.4175L10.1788 7.84112C10.1879 7.83589 10.1901 7.83207 10.191 7.83037C10.1928 7.82717 10.1948 7.82128 10.1948 7.8133C10.1948 7.80532 10.1928 7.79944 10.191 7.79623C10.1901 7.79454 10.1879 7.79074 10.1789 7.78551L5.7165 5.20913C5.71648 5.20912 5.71651 5.20914 5.7165 5.20913C5.70738 5.20388 5.70295 5.20392 5.70104 5.20395C5.6974 5.20401 5.69135 5.20517 5.68453 5.20911C5.6777 5.21305 5.67367 5.21771 5.67179 5.22084Z" fill="var(--wcag-primary-color)"></path></svg></span>
              <span class="label-group">
                <span class="label">Disable animations</span>
                <span class="option-desc">Stop all CSS animations for accessibility</span>
          </span>
        </button>
          <button id="daccec" title="Enlarge cursor" aria-label="Enlarge cursor" type="button">
              <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.51606 11.0366L1.1932 16.3595M0.771484 5.29206L17.2286 0.771484L12.7081 17.2286L0.771484 5.29206Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Enlarge cursor</span>
                <span class="option-desc">Make the cursor larger and easier to see</span>
              </span>
            </button>
          <button id="dacchm" title="Hide images and videos" aria-label="Hide images and videos" type="button">
            <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.4272 0.771484H17.2286V7.57291M7.57291 17.2286H0.771484V10.4272M5.28434 5.51577H12.4843V12.7158H5.28434V5.51577Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
            <span class="label-group">
              <span class="label">Hide images and videos</span>
              <span class="option-desc">Remove images and videos for a text-only view</span>
            </span>
          </button>
          <button id="daccsl" title="Show line" aria-label="Show line" type="button">
              <span class="icon"><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.771484 0.771484H17.2286M17.2286 17.2286H0.771484M5.40006 12.7158V5.51577H12.6001V12.7158H5.40006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Show line</span>
                <span class="option-desc">Display a reading guide line for focus</span>
              </span>
            </button>
          </div>
        </div>
      <div id="profiles-content" class="content-section" hidden>
          <div class="profiles-grid">
            <button id="daccpmi" title="Motor impairments" aria-label="Motor impairments" type="button" tabindex="0" class="profile-btn">
              <span class="icon"><svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0001 17.4999H13L11.5 12H7V6.9999C7 6.4476 6.5524 6 6.0001 6H4L1 9L4 12M10.7002 15.21C10.0003 17.13 8.1601 18.5001 6.0001 18.5001C3.2401 18.5001 1 16.26 1 13.5C1 12.9 1.105 12.3249 1.3 11.79M7.0003 3C7.0003 3.82843 6.32873 4.5 5.5003 4.5C4.67187 4.5 4.0003 3.82843 4.0003 3C4.0003 2.17157 4.67187 1.5 5.5003 1.5C6.32873 1.5 7.0003 2.17157 7.0003 3Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Motor impairments</span>
                <span class="option-desc">Enable profile to disable animations for easier use</span>
          </span>
        </button>
            <button id="daccpbl" title="Blindness" aria-label="Blindness" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0.771484 17.2286L17.2286 0.771484M17.2286 9.00006C17.2286 9.00006 13.5438 15.4286 9.00006 15.4286C4.45634 15.4286 0.771484 9.00006 0.771484 9.00006C0.771484 9.00006 4.45634 2.57148 9.00006 2.57148C13.5438 2.57148 17.2286 9.00006 17.2286 9.00006ZM11.0572 9.00006C11.0572 10.1362 10.1362 11.0572 9.00006 11.0572C7.86393 11.0572 6.94291 10.1362 6.94291 9.00006C6.94291 7.86393 7.86393 6.94291 9.00006 6.94291C10.1362 6.94291 11.0572 7.86393 11.0572 9.00006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Blindness</span>
                <span class="option-desc">Enable profile for screen reader compatibility</span>
              </span>
            </button>
            <button id="daccpcb" title="Color blindness" aria-label="Color blindness" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.00006 5.70006V12.4835M17.2286 9.00006C17.2286 13.5446 13.5446 17.2286 9.00006 17.2286C4.45554 17.2286 0.771484 13.5446 0.771484 9.00006C0.771484 4.45554 4.45554 0.771484 9.00006 0.771484C13.5446 0.771484 17.2286 4.45554 17.2286 9.00006ZM12.9858 9.00006C12.9858 11.2013 11.2013 12.9858 9.00006 12.9858C6.79881 12.9858 5.01434 11.2013 5.01434 9.00006C5.01434 6.79881 6.79881 5.01434 9.00006 5.01434C11.2013 5.01434 12.9858 6.79881 12.9858 9.00006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Color blindness</span>
                <span class="option-desc">Enable profile for color blind users</span>
              </span>
            </button>
            <button id="daccpds" title="Dyslexia" aria-label="Dyslexia" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.91421 0.779785L3.84662 1.55968L1 0.779785M1 17.22L4.06759 16.4401L6.91421 17.22M3.95841 16.4401V1.81965M8.76777 12.681L13.0988 4.98083L17.0009 12.681M16.2574 11.2382H10.0182" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Dyslexia</span>
                <span class="option-desc">Enable profile for dyslexic users</span>
              </span>
            </button>
            <button id="daccplv" title="Low vision" aria-label="Low vision" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.2853 9.00007C21.2853 9.00007 16.6792 17.0358 10.9996 17.0358C5.31994 17.0358 0.713867 9.00007 0.713867 9.00007C0.713867 9.00007 5.31994 0.964355 10.9996 0.964355C16.6792 0.964355 21.2853 9.00007 21.2853 9.00007Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10.9996 11.5715C12.4197 11.5715 13.571 10.4202 13.571 9.00007C13.571 7.57991 12.4197 6.42864 10.9996 6.42864C9.57942 6.42864 8.42815 7.57991 8.42815 9.00007C8.42815 10.4202 9.57942 11.5715 10.9996 11.5715Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Low vision</span>
                <span class="option-desc">Enable profile for low vision users</span>
              </span>
            </button>
            <button id="daccpep" title="Epilepsy" aria-label="Epilepsy" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.36759 2.11745C4.74027 2.11745 2.60283 4.2549 2.60283 6.88222C2.60283 9.50953 4.74027 11.647 7.36759 11.647C9.99491 11.647 12.1324 9.50953 12.1324 6.88222C12.1324 4.2549 9.99491 2.11745 7.36759 2.11745ZM7.36759 3.17651C9.23111 3.17651 10.778 4.55948 11.0353 6.35302H8.79522L7.89679 6.9522V4.83475L5.61871 6.35369H3.69921C3.95714 4.56015 5.50408 3.17651 7.36759 3.17651ZM7.36759 10.5886C5.50408 10.5886 3.95714 9.20561 3.69988 7.41208H5.93996L6.8384 6.8129V8.93035L9.11647 7.41208H11.036C10.778 9.20561 9.23111 10.5886 7.36759 10.5886Z" fill="var(--wcag-primary-color)"></path><path d="M14.2505 7.3261V6.88288C14.2505 3.0872 11.1626 0 7.36826 0C3.56658 0 0.496707 3.05921 0.485377 6.86155C0.482044 8.0959 0.808626 9.30825 1.43113 10.3666C2.1976 11.6696 2.60283 13.1393 2.60283 14.6162V18H11.0733V14.2943H13.7206V11.1178H15.5141L14.2505 7.3261ZM12.6622 10.0587V13.2352H7.36826V14.2943H10.0156V16.9416H3.66189V14.6169C3.66189 12.9513 3.206 11.2957 2.34423 9.83012C1.8177 8.93502 1.5411 7.90995 1.54444 6.86489C1.55377 3.66372 4.16642 1.05839 7.36826 1.05906C10.5794 1.05906 13.1921 3.67171 13.1921 6.88288V7.49806L14.0459 10.0594L12.6622 10.0587Z" fill="var(--wcag-primary-color)"></path></svg></span>
              <span class="label-group">
                <span class="label">Epilepsy</span>
                <span class="option-desc">Enable profile for users with epilepsy</span>
              </span>
            </button>
            <button id="daccpad" title="ADHD" aria-label="ADHD" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.36826 2.11745C4.74094 2.11745 2.60349 4.2549 2.60349 6.88222C2.60349 9.50953 4.74094 11.647 7.36826 11.647C9.99558 11.647 12.133 9.50953 12.133 6.88222C12.133 4.2549 9.99491 2.11745 7.36826 2.11745ZM7.36826 10.5886C5.32479 10.5886 3.66255 8.92635 3.66255 6.88288C3.66255 4.83941 5.32479 3.17718 7.36826 3.17718C9.41173 3.17718 11.074 4.83941 11.074 6.88288C11.074 8.92635 9.41173 10.5886 7.36826 10.5886Z" fill="var(--wcag-primary-color)"></path><path d="M9.30909 5.29396H8.25003C8.25003 5.89247 8.54329 6.22172 8.73657 6.43966C8.89186 6.61362 8.95585 6.68627 8.95585 6.88222C8.95585 7.07816 8.89186 7.15015 8.73657 7.32477C8.54262 7.54271 8.25003 7.87196 8.25003 8.47047H9.30909C9.30909 8.27452 9.37307 8.20254 9.52837 8.02792C9.72231 7.80997 10.0149 7.48073 10.0149 6.88222C10.0149 6.2837 9.72231 5.95446 9.52837 5.73651C9.37307 5.56189 9.30909 5.48991 9.30909 5.29396Z" fill="var(--wcag-primary-color)"></path><path d="M6.3092 5.29396H5.25014C5.25014 5.89247 5.5434 6.22172 5.73668 6.43966C5.89198 6.61362 5.95596 6.68627 5.95596 6.88222C5.95596 7.07816 5.89198 7.15015 5.73668 7.32477C5.54273 7.54271 5.25014 7.87196 5.25014 8.47047H6.3092C6.3092 8.27452 6.37318 8.20254 6.52848 8.02792C6.72243 7.80997 7.01502 7.48073 7.01502 6.88222C7.01502 6.2837 6.72243 5.95446 6.52848 5.73651C6.37385 5.56189 6.3092 5.48991 6.3092 5.29396Z" fill="var(--wcag-primary-color)"></path><path d="M14.2505 7.3261V6.88288C14.2505 3.0872 11.1626 0 7.36826 0C3.56658 0 0.496707 3.05921 0.485377 6.86155C0.482044 8.09657 0.808626 9.30825 1.43113 10.3666C2.1976 11.6696 2.60283 13.1393 2.60283 14.6162V18H11.0733V14.2943H13.7206V11.1178H15.5141L14.2505 7.3261ZM12.6622 10.0587V13.2352H7.36826V14.2943H10.0149V16.9416H3.66189V14.6169C3.66189 12.9513 3.206 11.2957 2.34423 9.83012C1.8177 8.93502 1.5411 7.90995 1.54444 6.86489C1.55377 3.66372 4.16642 1.05839 7.36826 1.05906C10.5794 1.05906 13.1921 3.67171 13.1921 6.88288V7.49806L14.0459 10.0594L12.6622 10.0587Z" fill="var(--wcag-primary-color)"></path></svg></span>
              <span class="label-group">
                <span class="label">ADHD</span>
                <span class="option-desc">Enable profile for users with ADHD</span>
              </span>
            </button>
            <button id="daccpcal" title="Cognitive and learning disabilities" aria-label="Cognitive and learning disabilities" type="button" tabindex="0" class="profile-btn">
              <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.3894 7.60128C14.3478 7.60128 14.3088 7.60648 14.2672 7.60648V3.7018H10.4249C10.4249 3.681 10.4275 3.6602 10.4275 3.6394C10.4275 2.05881 9.1485 0.779785 7.56791 0.779785C5.98733 0.779785 4.7083 2.05881 4.7083 3.6394C4.7083 3.6602 4.7109 3.681 4.7109 3.7018H0.749023V7.60128C2.32961 7.60128 3.60864 8.88031 3.60864 10.4609C3.60864 12.0415 2.32961 13.3205 0.749023 13.3205V17.22H4.7135C4.74729 15.668 6.01072 14.4228 7.57051 14.4228C9.13031 14.4228 10.3937 15.6706 10.4275 17.22H14.2698V13.3153C14.3114 13.3153 14.3504 13.3205 14.392 13.3205C15.9726 13.3205 17.2516 12.0415 17.2516 10.4609C17.2516 8.88031 15.9726 7.60128 14.392 7.60128H14.3894Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
              <span class="label-group">
                <span class="label">Cognitive and learning disabilities</span>
                <span class="option-desc">Disables animation and increases text size</span>
              </span>
            </button>
        </div>
      </div>
      <button id="reset-btn" title="Reset to default settings" aria-label="Reset to default settings" type="button" class="reset-btn">
        <span>
          <svg viewBox="0 0 21 18" fill="none" xmlns="http://www.w3.org/2000/svg" width="28" height="24"><path d="M4.69744 13.2072C3.9547 11.9799 3.5253 10.5408 3.5253 9.0002C3.5253 4.51181 7.1636 0.870605 11.6549 0.870605C16.1462 0.870605 19.7845 4.5089 19.7845 9.0002C19.7845 13.4915 16.1462 17.1298 11.6549 17.1298M6.85025 11.1646L4.5988 14.5476L1.21582 12.2932" stroke="#020817" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg>
        </span>
        <span style="margin-left: 12px;">Reset to default settings</span>
      </button>
      <div class="powered-by-verido">
        <span class="verido-logo" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" zoomAndPan="magnify" viewBox="0 0 750 281.25" height="40" preserveAspectRatio="xMidYMid meet" version="1.2"><defs/><g id="7782cc9ea1"><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(136.632957, 216.747651)"><path style="stroke:none" d="M 112.171875 -112.84375 L 71.125 0 L 43.59375 0 L 2.390625 -112.84375 L 27.359375 -112.84375 L 51.125 -41.03125 L 57.625 -18.8125 L 63.953125 -40.859375 L 87.890625 -112.84375 Z M 112.171875 -112.84375 "/></g></g><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(241.96386, 216.747651)"><path style="stroke:none" d="M 51.984375 1.703125 C 42.972656 1.703125 35.132812 -0.0625 28.46875 -3.59375 C 21.800781 -7.125 16.640625 -12.191406 12.984375 -18.796875 C 9.335938 -25.410156 7.515625 -33.394531 7.515625 -42.75 C 7.515625 -52.09375 9.335938 -60.066406 12.984375 -66.671875 C 16.640625 -73.285156 21.742188 -78.359375 28.296875 -81.890625 C 34.847656 -85.429688 42.34375 -87.203125 50.78125 -87.203125 C 59.445312 -87.203125 66.800781 -85.460938 72.84375 -81.984375 C 78.882812 -78.503906 83.5 -73.769531 86.6875 -67.78125 C 89.882812 -61.800781 91.484375 -54.992188 91.484375 -47.359375 C 91.484375 -45.078125 91.425781 -42.910156 91.3125 -40.859375 C 91.195312 -38.804688 91.023438 -36.984375 90.796875 -35.390625 L 22.5625 -35.390625 L 22.5625 -51.640625 L 80.53125 -51.640625 L 69.25 -47.53125 C 69.25 -54.71875 67.625 -60.25 64.375 -64.125 C 61.125 -68 56.535156 -69.9375 50.609375 -69.9375 C 46.273438 -69.9375 42.539062 -68.910156 39.40625 -66.859375 C 36.269531 -64.804688 33.90625 -61.753906 32.3125 -57.703125 C 30.71875 -53.660156 29.921875 -48.5625 29.921875 -42.40625 C 29.921875 -36.363281 30.800781 -31.375 32.5625 -27.4375 C 34.332031 -23.507812 36.84375 -20.578125 40.09375 -18.640625 C 43.34375 -16.703125 47.25 -15.734375 51.8125 -15.734375 C 56.820312 -15.734375 60.863281 -16.703125 63.9375 -18.640625 C 67.019531 -20.578125 69.414062 -23.253906 71.125 -26.671875 L 89.765625 -19.5 C 87.941406 -15.050781 85.175781 -11.226562 81.46875 -8.03125 C 77.769531 -4.84375 73.382812 -2.421875 68.3125 -0.765625 C 63.238281 0.878906 57.796875 1.703125 51.984375 1.703125 Z M 51.984375 1.703125 "/></g></g><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(340.968089, 216.747651)"><path style="stroke:none" d="M 12.3125 0 L 12.3125 -85.484375 L 32.65625 -85.484375 L 34.203125 -68.734375 C 36.472656 -74.660156 39.800781 -79.21875 44.1875 -82.40625 C 48.582031 -85.601562 54.085938 -87.203125 60.703125 -87.203125 C 62.640625 -87.203125 64.40625 -87.03125 66 -86.6875 C 67.59375 -86.34375 68.90625 -85.890625 69.9375 -85.328125 L 67.203125 -65.65625 C 66.054688 -66.113281 64.65625 -66.457031 63 -66.6875 C 61.351562 -66.914062 59.21875 -67.03125 56.59375 -67.03125 C 53.175781 -67.03125 49.867188 -66.203125 46.671875 -64.546875 C 43.484375 -62.890625 40.863281 -60.378906 38.8125 -57.015625 C 36.757812 -53.660156 35.734375 -49.414062 35.734375 -44.28125 L 35.734375 0 Z M 12.3125 0 "/></g></g><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(413.126613, 216.747651)"><path style="stroke:none" d="M 24.109375 -97.796875 C 19.203125 -97.796875 15.550781 -98.847656 13.15625 -100.953125 C 10.769531 -103.066406 9.578125 -106.175781 9.578125 -110.28125 C 9.578125 -114.5 10.769531 -117.660156 13.15625 -119.765625 C 15.550781 -121.878906 19.203125 -122.9375 24.109375 -122.9375 C 29.015625 -122.9375 32.660156 -121.878906 35.046875 -119.765625 C 37.441406 -117.660156 38.640625 -114.5 38.640625 -110.28125 C 38.640625 -106.175781 37.441406 -103.066406 35.046875 -100.953125 C 32.660156 -98.847656 29.015625 -97.796875 24.109375 -97.796875 Z M 35.734375 -85.484375 L 35.734375 0 L 12.3125 0 L 12.3125 -85.484375 Z M 35.734375 -85.484375 "/></g></g><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(461.346297, 216.747651)"><path style="stroke:none" d="M 44.625 1.703125 C 37.5625 1.703125 31.265625 -0.0625 25.734375 -3.59375 C 20.203125 -7.125 15.867188 -12.191406 12.734375 -18.796875 C 9.597656 -25.410156 8.03125 -33.335938 8.03125 -42.578125 C 8.03125 -52.035156 9.679688 -60.097656 12.984375 -66.765625 C 16.296875 -73.429688 20.769531 -78.503906 26.40625 -81.984375 C 32.050781 -85.460938 38.410156 -87.203125 45.484375 -87.203125 C 53.003906 -87.203125 59.210938 -85.035156 64.109375 -80.703125 C 69.015625 -76.367188 72.207031 -70.785156 73.6875 -63.953125 L 71.46875 -61.21875 L 71.46875 -122.9375 L 94.890625 -122.9375 L 94.890625 0 L 73.859375 0 L 72.328125 -25.984375 L 75.0625 -24.625 C 74.375 -19.257812 72.601562 -14.609375 69.75 -10.671875 C 66.90625 -6.742188 63.316406 -3.695312 58.984375 -1.53125 C 54.648438 0.625 49.863281 1.703125 44.625 1.703125 Z M 51.46875 -16.25 C 55.570312 -16.25 59.101562 -17.300781 62.0625 -19.40625 C 65.03125 -21.507812 67.335938 -24.613281 68.984375 -28.71875 C 70.640625 -32.820312 71.46875 -37.726562 71.46875 -43.4375 C 71.46875 -48.90625 70.671875 -53.546875 69.078125 -57.359375 C 67.484375 -61.179688 65.203125 -64.117188 62.234375 -66.171875 C 59.273438 -68.222656 55.800781 -69.25 51.8125 -69.25 C 45.425781 -69.25 40.4375 -66.992188 36.84375 -62.484375 C 33.257812 -57.984375 31.46875 -51.40625 31.46875 -42.75 C 31.46875 -34.082031 33.234375 -27.5 36.765625 -23 C 40.296875 -18.5 45.195312 -16.25 51.46875 -16.25 Z M 51.46875 -16.25 "/></g></g><g style="fill:#ffffff;fill-opacity:1;"><g transform="translate(568.558096, 216.747651)"><path style="stroke:none" d="M 51.296875 -87.203125 C 59.960938 -87.203125 67.570312 -85.429688 74.125 -81.890625 C 80.675781 -78.359375 85.800781 -73.285156 89.5 -66.671875 C 93.207031 -60.066406 95.0625 -52.09375 95.0625 -42.75 C 95.0625 -33.507812 93.207031 -25.554688 89.5 -18.890625 C 85.800781 -12.222656 80.675781 -7.125 74.125 -3.59375 C 67.570312 -0.0625 59.960938 1.703125 51.296875 1.703125 C 42.742188 1.703125 35.160156 -0.0625 28.546875 -3.59375 C 21.941406 -7.125 16.785156 -12.222656 13.078125 -18.890625 C 9.367188 -25.554688 7.515625 -33.507812 7.515625 -42.75 C 7.515625 -52.09375 9.367188 -60.066406 13.078125 -66.671875 C 16.785156 -73.285156 21.941406 -78.359375 28.546875 -81.890625 C 35.160156 -85.429688 42.742188 -87.203125 51.296875 -87.203125 Z M 51.296875 -69.765625 C 46.960938 -69.765625 43.285156 -68.765625 40.265625 -66.765625 C 37.242188 -64.773438 34.9375 -61.785156 33.34375 -57.796875 C 31.75 -53.804688 30.953125 -48.789062 30.953125 -42.75 C 30.953125 -36.707031 31.75 -31.691406 33.34375 -27.703125 C 34.9375 -23.710938 37.242188 -20.71875 40.265625 -18.71875 C 43.285156 -16.726562 46.960938 -15.734375 51.296875 -15.734375 C 55.515625 -15.734375 59.132812 -16.726562 62.15625 -18.71875 C 65.175781 -20.71875 67.484375 -23.710938 69.078125 -27.703125 C 70.671875 -31.691406 71.46875 -36.707031 71.46875 -42.75 C 71.46875 -48.789062 70.671875 -53.804688 69.078125 -57.796875 C 67.484375 -61.785156 65.175781 -64.773438 62.15625 -66.765625 C 59.132812 -68.765625 55.515625 -69.765625 51.296875 -69.765625 Z M 51.296875 -69.765625 "/></g></g><path style="fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke:#0e20c8;stroke-opacity:1;stroke-miterlimit:4;" d="M 1.998753 2.000319 L 38.724162 2.000063 " transform="matrix(0.897489,1.152776,-1.152776,0.897489,94.347998,35.826403)"/><path style="fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke:#0e20c8;stroke-opacity:1;stroke-miterlimit:4;" d="M 2.000793 1.999514 L 38.723023 1.999502 " transform="matrix(-0.180515,1.449756,-1.449756,-0.180515,163.342012,19.858718)"/><path style="fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke:#0e20c8;stroke-opacity:1;stroke-miterlimit:4;" d="M 1.999617 1.999046 L 38.723383 2.0009 " transform="matrix(-1.152776,0.897489,-0.897489,-1.152776,218.923451,54.982475)"/><path style="fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke:#0e20c8;stroke-opacity:1;stroke-miterlimit:4;" d="M 2.000141 2.000363 L 38.72344 1.998464 " transform="matrix(-1.152776,0.897489,-0.897489,-1.152776,124.097112,128.585085)"/><path style="fill:none;stroke-width:4;stroke-linecap:round;stroke-linejoin:miter;stroke:#0e20c8;stroke-opacity:1;stroke-miterlimit:4;" d="M 2.000679 1.999589 L 38.722908 1.999577 " transform="matrix(1.449756,0.180515,-0.180515,1.449756,58.27296,94.314149)"/></g></svg>
        </span>
        <a class="verido-text" href="https://verido.se/" target="_blank" rel="noopener noreferrer" aria-label="Powered by Verido (opens in a new tab)">Powered by Verido</a>
      </div>
    </div>
  </div>
  `;

  // Add translation objects and logic after widgetHTML definition
  const translations = {
    en: {
      accessibilityMenu: "Accessibility menu",
      widgetSettings: "Widget settings",
      language: "Language",
      position: "Position",
      right: "Right",
      left: "Left",
      accessibilityProfiles: "Accessibility profiles",
      motorImpairments: "Motor impairments",
      blindness: "Blindness",
      colorBlindness: "Color blindness",
      dyslexia: "Dyslexia",
      lowVision: "Low vision",
      epilepsy: "Epilepsy",
      adhd: "ADHD",
      cognitive: "Cognitive and learning disabilities",
      content: "Content",
      fontSize: "Font size",
      underlineLinks: "Underline links",
      letterSpacing: "Letter spacing",
      lineHeight: "Line height",
      textToSpeech: "Text to speech",
      color: "Color",
      invertColors: "Invert colors",
      contrast: "Contrast",
      saturation: "Saturation",
      visibility: "Visibility",
      disableAnimations: "Disable animations",
      enlargeCursor: "Enlarge cursor",
      hideMedia: "Hide images and videos",
      showLine: "Show line",
      facilitiesDyslexics: "Facilities for dyslexics",
      reset: "Reset to default settings",
      // Dynamic texts
      openMenu: "Open accessibility menu",
      closeMenu: "Close accessibility menu",
      keyboardShortcut: "[CTRL + U]",
      tooltips: {
        fontSize: "Change text size",
        underlineLinks: "Make links more visible",
        letterSpacing: "Adjust space between letters",
        lineHeight: "Adjust space between lines",
        textToSpeech: "Click on text to hear it read aloud",
        invertColors: "Invert all colors on the page",
        contrast: "Increase contrast between text and background",
        saturation: "Adjust color intensity",
        disableAnimations: "Stop all animations and transitions",
        enlargeCursor: "Make the cursor larger and easier to see",
        hideMedia: "Hide all images and videos",
        showLine: "Show a reading guide line",
        facilitiesDyslexics: "Enable features that help with dyslexia"
      }
    },
    sv: {
      accessibilityMenu: "Tillgänglighetsmeny",
      widgetSettings: "Widgetinställningar",
      language: "Språk",
      position: "Position",
      right: "Höger",
      left: "Vänster",
      accessibilityProfiles: "Tillgänglighetsprofiler",
      motorImpairments: "Motoriska funktionsnedsättningar",
      blindness: "Blindhet",
      colorBlindness: "Färgblindhet",
      dyslexia: "Dyslexi",
      lowVision: "Nedsatt syn",
      epilepsy: "Epilepsi",
      adhd: "ADHD",
      cognitive: "Kognitiva och inlärningssvårigheter",
      content: "Innehåll",
      fontSize: "Textstorlek",
      underlineLinks: "Understryk länkar",
      letterSpacing: "Bokstavsavstånd",
      lineHeight: "Radavstånd",
      textToSpeech: "Text till tal",
      color: "Färg",
      invertColors: "Invertera färger",
      contrast: "Kontrast",
      saturation: "Mättnad",
      visibility: "Synlighet",
      disableAnimations: "Inaktivera animationer",
      enlargeCursor: "Förstora markör",
      hideMedia: "Dölj bilder och videor",
      showLine: "Visa linje",
      facilitiesDyslexics: "Funktioner för dyslektiker",
      reset: "Återställ till standardinställningar",
      // Dynamic texts
      openMenu: "Öppna tillgänglighetsmeny",
      closeMenu: "Stäng tillgänglighetsmeny",
      keyboardShortcut: "[CTRL + U]",
      tooltips: {
        fontSize: "Ändra textstorlek",
        underlineLinks: "Gör länkar mer synliga",
        letterSpacing: "Justera avstånd mellan bokstäver",
        lineHeight: "Justera avstånd mellan rader",
        textToSpeech: "Klicka på text för att höra den uppläst",
        invertColors: "Invertera alla färger på sidan",
        contrast: "Öka kontrasten mellan text och bakgrund",
        saturation: "Justera färgintensitet",
        disableAnimations: "Stoppa alla animationer och övergångar",
        enlargeCursor: "Gör markören större och lättare att se",
        hideMedia: "Dölj alla bilder och videor",
        showLine: "Visa en läsguide",
        facilitiesDyslexics: "Aktivera funktioner som hjälper vid dyslexi"
      }
    }
  };

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
    #accessibility-widget {
      position: fixed;
      bottom: 88px;
      right: 27px;
      z-index: 9999;
    }

    #accessibility-widget.left {
      left: 32px;
      right: auto;
    }

    #accessibility-widget.left #accessibility-panel {
      right: auto;
      left: 0;
      border-radius: 12px;
    }

    #accessibility-widget:not(.left) #accessibility-panel {
      left: auto;
      right: 0;
      border-radius: 12px;
    }

    #accessibility-btn {
      background: #0033cc;
      border: none;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: box-shadow 0.2s;
    }

    #accessibility-btn:focus {
      outline: 2px solid #fff;
      box-shadow: 0 0 0 4px #0033cc;
    }

    #accessibility-panel {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100%;
      max-width: 56rem;
      max-height: 90vh;
      background: #fff;
      color: #020817;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0;
      line-height: 1.2;
      z-index: 10000;
      padding: 0 24px 24px 24px;
      box-sizing: border-box;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      overflow-y: auto;
      overflow-x: hidden;
      border-radius: 12px;
      box-shadow: 0 2px 16px rgba(2,8,23,0.10);
      border: 1px solid #e5e7eb;
      visibility: hidden;
      opacity: 0;
    }

    #accessibility-panel.open {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    /* Panel closed (default) */
    #accessibility-widget:not(.left) #accessibility-panel,
    #accessibility-widget.left #accessibility-panel {
      left: 50%;
      right: auto;
      transform: translate(-50%, -50%);
    }

    /* Add overlay background */
    #accessibility-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 9999;
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.2s ease, visibility 0.2s ease;
      pointer-events: none;
    }

    #accessibility-overlay.open {
      visibility: visible;
      opacity: 1;
      pointer-events: auto;
    }

    #accessibility-panel * {
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 500 !important;
    }

    /* Mobile styles */
    @media (max-width: 600px) {
      #accessibility-panel {
        width: 100% !important;
        max-width: 100% !important;
        height: 100% !important;
        max-height: 100% !important;
        border-radius: 0 !important;
        padding: 0 16px 16px 16px !important;
        top: 0 !important;
        left: 0 !important;
        transform: none !important;
      }
      
      #accessibility-panel.open {
        transform: none !important;
      }
    }

    /* Add more styles for your panel content as needed */

    .section {
      background: #fff;
      border-radius: 12px;
      box-sizing: border-box;
      color: #000;
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }

    .accessibility-header {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: #fff;
      border-radius: 12px 12px 0 0;
      padding: 20px 24px 0 24px;
      margin: 0 -24px;
      min-height: 56px;
      height: 72px;
      position: sticky;
      top: 0;
      z-index: 10;
      width: calc(100% + 48px);
      box-sizing: border-box;
      box-shadow: none;
      flex-shrink: 0;
      border-bottom: 1px solid #e5e7eb;
    }

    .accessibility-header-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #f1f5f9;
      border-radius: 8px;
      padding: 7px;
      width: 32px;
      margin-right: 16px;
    }

    .accessibility-header-icon svg {
      width: 28px;
      height: 28px;
    }

    .accessibility-header-title {
      flex: 1;
      font-size: 18px !important;
      font-weight: 700;
      color: #020817;
      margin-left: 8px;
      letter-spacing: 0.01em;
    }

    .accessibility-close-btn {
      background: #f1f5f9;
      border: 0;
      border-radius: 8px;
      height: 40px;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-left: 16px;
      margin-right: 8px;
      transition: background .2s;
    }

    .accessibility-close-btn:hover,
    .accessibility-close-btn:focus {
      background: #e5e7eb;
    }

    .accessibility-close-btn svg {
      width: 40px;
      height: 40px;
    }

    .section.accordion {
      background: #fff;
      border-radius: 12px;
      box-sizing: border-box;
      color: #000;
      margin-bottom: 20px;
      padding: 20px;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }

    .accordion-toggle {
      align-items: center;
      background: #f0f0f3;
      border: 0;
      border-radius: 12px;
      color: #000;
      display: flex;
      flex-direction: row;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 14px;
      font-weight: 600;
      height: 54px;
      justify-content: space-between;
      line-height: 54px;
      margin: 0;
      padding-block: 0;
      padding-inline: 20px;
      text-transform: none;
      width: 100%;
      cursor: pointer;
      transition: background 0.2s;
      box-shadow: none;
    }

    .accordion-toggle[aria-expanded="true"] {
      background: #ededf5;
    }

    .accordion-content {
      background: #fff;
      color: #000;
      border-radius: 0 0 12px 12px;
      border-top: 1px solid #f0f0f0;
      padding: 20px 0 0 0;
      margin: 0;
      transition: all 0.2s ease;
      display: none;
    }

    /* Show accordion content when hidden attribute is not present */
    .accordion-content:not([hidden]) {
      display: block;
    }

    .gray-box {
      align-items: center;
      background: #f0f0f3;
      border: 0;
      border-radius: 12px;
      color: #000;
      display: flex;
      flex-direction: row;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 14px;
      font-weight: 600;
      height: 54px;
      justify-content: space-between;
      line-height: 54px;
      margin: 0;
      padding-block: 0;
      padding-inline: 20px;
      text-transform: none;
      width: 100%;
    }

    :root {
        --wcag-primary-color: #0033cc;
      }
      
      .reset-btn {
        display: flex;
        align-items: center;
        background: #fff;
        border: 1px solid #e5e7eb;
        border-radius: 8px;
        color: #020817;
        font-size: 15px;
        font-weight: 600;
        min-height: 48px;
        height: 48px;
        flex-shrink: 0;
        justify-content: flex-start;
        letter-spacing: 0;
        text-align: left;
        text-transform: none;
        transition: all .2s;
        width: 100%;
        margin-top: 24px;
        margin-bottom: 8px;
        box-shadow: 0 1px 4px rgba(2,8,23,0.04);
        cursor: pointer;
        padding: 0 20px;
        gap: 12px;
      }
      
      .reset-btn:hover,
      .reset-btn:focus {
        background: #f1f5f9;
        color: #020817;
        border-color: #cbd5e1;
      }

    .settings-cards {
      display: flex;
      gap: 20px;
      justify-content: space-between;
      margin-top: 20px;
    }

    .settings-card {
      background: #f5f6fa;
      border-radius: 16px;
      padding: 24px 20px;
      flex: 1 1 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    }

    .settings-label {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 12px;
      color: #222;
    }

    .settings-card select {
      width: 100%;
      padding: 10px 16px;
      border-radius: 24px;
      border: 1px solid #e0e4f7;
      font-size: 15px;
      background: #fff;
      color: #222;
      font-weight: 500;
      outline: none;
      transition: border 0.2s;
    }

    .settings-card select:focus {
      border: 1.5px solid #0033cc;
    }

    .profiles-grid,
    .settings-cards,
    #daccbxc2,
    #daccbxc3,
    #daccbxc4 {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
      padding: 0;
      width: 100%;
      box-sizing: border-box;
    }

    .profile-btn {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 600;
      height: 80px;
      opacity: 1;
      padding: 16px 20px 12px 20px;
      position: relative;
      text-transform: none;
      transition: border 0.2s, background 0.2s, box-shadow 0.2s;
      white-space: pre-wrap;
      width: 100%;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      margin: 0;
      gap: 0;
    }

    .profile-btn:hover {
      border-color: var(--wcag-primary-color);
      background: #f5f6fa;
    }

    .profile-btn span.label {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    .profile-btn .option-desc {
      margin: 2px 0 0 0;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    .profile-btn svg {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 0;
    }

    .dacctltp {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: help;
    }

    .dacctltp svg {
      width: 14px;
      height: 14px;
    }

    /* Content section styles */
    #daccbxc2 {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
      max-height: none;
      overflow: visible;
      padding-top: 20px;
      transition: all 0.2s ease;
    }

    #daccbxc2 button {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 600;
      height: 80px;
      opacity: 1;
      padding: 16px 20px 12px 20px;
      position: relative;
      text-transform: none;
      transition: border 0.2s, background 0.2s, box-shadow 0.2s;
      white-space: pre-wrap;
      width: 100%;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      margin: 0;
      gap: 0;
    }

    #daccbxc2 button:hover {
      border-color: var(--wcag-primary-color);
      background: #f5f6fa;
    }

    #daccbxc2 button span.label {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc2 button .option-desc {
      margin: 2px 0 0 0;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc2 button svg {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 0;
    }

    #daccbxc2 .daccdts {
      margin-left: auto;
      margin-right: 0;
      display: flex;
      gap: 4px;
      align-items: center;
    }

    #daccbxc2 .daccdts .dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #e5e7eb;
      transition: background 0.2s;
    }

    #daccbxc2 .daccdts .dot.active {
      background: #020817;
    }

    /* Color section styles */
    #daccbxc3 {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
      max-height: none;
      overflow: visible;
      padding-top: 20px;
      transition: all 0.2s ease;
    }

    #daccbxc3 button {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 600;
      height: 80px;
      opacity: 1;
      padding: 16px 20px 12px 20px;
      position: relative;
      text-transform: none;
      transition: border 0.2s, background 0.2s, box-shadow 0.2s;
      white-space: pre-wrap;
      width: 100%;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      margin: 0;
      gap: 0;
    }

    #daccbxc3 button:hover {
      border-color: var(--wcag-primary-color);
      background: #f5f6fa;
    }

    #daccbxc3 button span.label {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc3 button .option-desc {
      margin: 2px 0 0 0;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc3 button svg {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 0;
    }

    #daccbxc3 .dacctltp {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: help;
    }

    #daccbxc3 .dacctltp svg {
      width: 14px;
      height: 14px;
    }

    #daccbxc3 .daccdts {
      margin-left: auto;
      margin-right: 0;
      display: flex;
      gap: 4px;
      align-items: center;
    }

    #daccbxc3 .daccdts span {
      width: 4px;
      height: 4px;
      background: var(--wcag-primary-color);
      border-radius: 50%;
      margin: 0;
    }

    /* Visibility section styles */
    #daccbxc4 {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
      max-height: none;
      overflow: visible;
      padding-top: 20px;
      transition: all 0.2s ease;
    }

    #daccbxc4 button {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 15px;
      font-weight: 600;
      height: 80px;
      opacity: 1;
      padding: 16px 20px 12px 20px;
      position: relative;
      text-transform: none;
      transition: border 0.2s, background 0.2s, box-shadow 0.2s;
      white-space: pre-wrap;
      width: 100%;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      margin: 0;
      gap: 0;
    }

    #daccbxc4 button:hover {
      border-color: var(--wcag-primary-color);
      background: #f5f6fa;
    }

    #daccbxc4 button span.label {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc4 button .option-desc {
      margin: 2px 0 0 0;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    #daccbxc4 button svg {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 0;
    }

    #daccbxc4 .dacctltp {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: help;
    }

    #daccbxc4 .dacctltp svg {
      width: 14px;
      height: 14px;
    }

    #daccbxc4 .daccdts {
      margin-left: auto;
      margin-right: 0;
      display: flex;
      gap: 4px;
      align-items: center;
    }

    #daccbxc4 .daccdts span {
      width: 4px;
      height: 4px;
      background: var(--wcag-primary-color);
      border-radius: 50%;
      margin: 0;
    }

    .chevron svg {
      display: block;
      transition: transform 0.2s;
    }

    .accordion-toggle[aria-expanded="true"] .chevron svg {
      transform: rotate(180deg);
    }

    /* Add margin to the first section to account for sticky header */
    #accessibility-panel .section:first-child {
      margin-top: 16px;
    }

    .profiles-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr 1fr 1fr;
      max-height: 725px;
      overflow: visible;
      padding-top: 20px;
      transition: all .5s ease;
    }

    .profile-btn {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      font-family: PlusJakartaSans,Verdana,sans-serif;
      font-size: 15px;
      font-weight: 600;
      height: 80px;
      opacity: 1;
      padding: 16px 20px 12px 20px;
      position: relative;
      text-transform: none;
      transition: all .2s;
      white-space: pre-wrap;
      width: 100%;
      cursor: pointer;
      text-align: left;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      margin: 0;
      gap: 0;
    }

    .profile-btn:hover {
      border-color: var(--wcag-primary-color);
      background: #f5f6fa;
    }

    .profile-btn span.label {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    .profile-btn .option-desc {
      margin: 2px 0 0 0;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      text-align: left;
      display: block;
      line-height: 1.2;
    }

    .profile-btn svg {
      width: 20px;
      height: 20px;
      margin-bottom: 8px;
      margin-right: 0;
    }

    .dacctltp {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: help;
    }

    .dacctltp svg {
      width: 14px;
      height: 14px;
    } 
    .powered-by-verido {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      text-align: right;
      color: #64748B;
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 4px;
      margin-top: 4px;
      letter-spacing: 0.04em;
      opacity: 0.85;
      user-select: none;
      gap: 4px;
      position: relative;
      min-height: 40px;
    }
    .powered-by-verido .verido-logo {
      display: none;
    }
    .powered-by-verido .verido-text {
      margin: 0;
      display: block;
      width: auto;
      text-align: right;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.04em;
      color: #64748B;
      text-decoration: none;
      outline: none;
      transition: text-decoration 0.2s, color 0.2s;
    }
    .powered-by-verido .verido-text:focus, .powered-by-verido .verido-text:hover {
      text-decoration: underline;
      color: #020817;
    }
    html[data-font-size="1"] { font-size: 1.0556em !important; }
    html[data-font-size="1"] p, 
    html[data-font-size="1"] span, 
    html[data-font-size="1"] div, 
    html[data-font-size="1"] li, 
    html[data-font-size="1"] td, 
    html[data-font-size="1"] th { font-size: 1.0556em !important; }
    
    html[data-font-size="2"] { font-size: 1.0588em !important; }
    html[data-font-size="2"] p, 
    html[data-font-size="2"] span, 
    html[data-font-size="2"] div, 
    html[data-font-size="2"] li, 
    html[data-font-size="2"] td, 
    html[data-font-size="2"] th { font-size: 1.0588em !important; }
    
    html[data-font-size="3"] { font-size: 1.0656em !important; }
    html[data-font-size="3"] p, 
    html[data-font-size="3"] span, 
    html[data-font-size="3"] div, 
    html[data-font-size="3"] li, 
    html[data-font-size="3"] td, 
    html[data-font-size="3"] th { font-size: 1.0656em !important; }

    /* --- MOBILE STYLES --- */
    @media (max-width: 600px) {
      #accessibility-panel {
        width: 100vw !important;
        height: 100dvh !important;
        left: 0 !important;
        right: 0 !important;
        top: 0 !important;
        border-radius: 0 !important;
        padding: 0 8px 16px 8px !important;
        font-size: 16px !important;
        box-sizing: border-box;
        transition: transform 0.3s cubic-bezier(.4,0,.2,1);
        transform: translateY(100%);
        overflow-y: auto !important;
        -webkit-overflow-scrolling: touch !important;
      }
      #accessibility-panel.open {
        transform: translateY(0);
      }
      #accessibility-widget.left #accessibility-panel,
      #accessibility-widget:not(.left) #accessibility-panel {
        left: 0 !important;
        right: 0 !important;
        border-radius: 0 !important;
      }
      .profiles-grid {
        max-height: 785px !important;
      }
      .section,
      .section.accordion {
        padding: 16px 8px !important;
        margin-bottom: 16px !important;
        border-radius: 10px !important;
      }
      .profiles-grid,
      .settings-cards,
      #daccbxc2,
      #daccbxc3,
      #daccbxc4 {
        grid-template-columns: 1fr !important;
        gap: 12px !important;
        padding: 12px 0 !important;
      }
      #accessibility-panel .section:first-child {
        margin-top: 8px !important;
      }
      #accessibility-btn {
        width: 48px !important;
        height: 48px !important;
      }
      .accessibility-header {
        min-height: 56px !important;
        height: 64px !important;
        font-size: 16px !important;
      }
      .accessibility-header-title {
        font-size: 15px !important;
      }
      .accessibility-close-btn {
        width: 40px !important;
        height: 40px !important;
        min-width: 40px !important;
        min-height: 40px !important;
        max-width: 40px !important;
        max-height: 40px !important;
      }
      .profile-btn,
      #daccbxc2 button,
      #daccbxc3 button,
      #daccbxc4 button {
        padding: 12px !important;
        font-size: 15px !important;
      }
      .settings-card {
        padding: 16px 8px !important;
      }
    }
    
    #daccbxc3 .daccdts .dot,
    #daccbxc4 .daccdts .dot {
      width: 8px !important;
      height: 8px !important;
      background: #d3d6e0 !important;
      border-radius: 50% !important;
      margin: 0 !important;
      transition: background 0.2s !important;
      display: inline-block !important;
    }
    #daccbxc3 .daccdts .dot.active,
    #daccbxc4 .daccdts .dot.active {
      background: #0033cc !important;
    }

    .tab-nav {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 8px;
      margin: 24px 0 16px 0;
      background: #f1f5f9;
      border-radius: 8px;
      padding: 4px 8px;
    }
    .tab-btn {
      display: flex;
      flex-direction: row;
      align-items: center;
      background: transparent;
      border: none;
      border-radius: 6px;
      padding: 8px 18px;
      min-width: 0;
      min-height: 40px;
      box-shadow: none;
      cursor: pointer;
      font-size: 15px;
      font-weight: 600;
      color: #64748B;
      outline: none;
      transition: background 0.2s, color 0.2s, font-weight 0.2s;
      position: relative;
    }
    .tab-btn svg {
      width: 20px;
      height: 20px;
      margin-right: 8px;
      margin-bottom: 0;
    }
    .tab-btn.active {
      background: #fff;
      color: #020817;
      font-weight: 700;
      box-shadow: 0 1px 4px rgba(2,8,23,0.04);
      border: 1.5px solid #e5e7eb;
      z-index: 1;
    }
    .tab-btn:not(.active):hover {
      background: #e5e7eb;
      color: #020817;
    }
    @media (max-width: 600px) {
      .tab-nav {
        flex-direction: column;
        gap: 8px;
        margin: 12px 0 16px 0;
      }
      .tab-btn {
        min-width: 0;
        min-height: 64px;
        padding: 8px 8px 4px 8px;
        font-size: 14px;
      }
      .tab-btn svg {
        width: 32px;
        height: 32px;
      }
    }
    #daccbxc2 button#daccfs {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#daccfs .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#daccfs .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#daccls {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#daccls .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#daccls .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#daccls .label {
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#daccls .option-desc {
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#dacclh {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#dacclh .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#dacclh .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#dacclh .label {
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#dacclh .option-desc {
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#dacctts {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#dacctts .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#dacctts .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#dacctts .label {
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#dacctts .option-desc {
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#daccul {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#daccul .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#daccul .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#daccul .label {
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#daccul .option-desc {
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#daccffd {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 16px;
      padding: 16px 20px 12px 20px;
      height: 80px;
    }
    #daccbxc2 button#daccffd .icon {
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
    }
    #daccbxc2 button#daccffd .label-group {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 2px;
    }
    #daccbxc2 button#daccffd .label {
      font-size: 16px;
      font-weight: 600;
      color: #020817;
      line-height: 1.2;
      margin: 0;
    }
    #daccbxc2 button#daccffd .option-desc {
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      line-height: 1.2;
      margin: 0;
    }
#daccbxc3 button#daccic {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#daccic .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#daccic .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#daccic .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccic .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#dacccc {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#dacccc .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#dacccc .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#dacccc .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#dacccc .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
    }

  #daccbxc3 button#daccsat {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#daccsat .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#daccsat .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#daccsat .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccsat .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccda {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#daccda .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#daccda .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#daccda .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccda .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}

#daccbxc3 button#daccec {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#daccec .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#daccec .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#daccec .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccec .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
    }
    #daccbxc3 button#dacchm {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#dacchm .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#dacchm .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#dacchm .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#dacchm .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccsl {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#daccbxc3 button#daccsl .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#daccbxc3 button#daccsl .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#daccbxc3 button#daccsl .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#daccbxc3 button#daccsl .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
    }
    #profiles-content button#daccpmi {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpmi .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpmi .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpmi .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpmi .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
    }
    #profiles-content button#daccpbl {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpbl .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpbl .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpbl .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpbl .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpcb {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpcb .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpcb .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpcb .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpcb .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpds {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpds .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpds .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpds .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpds .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccplv {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccplv .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccplv .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccplv .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccplv .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpep {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpep .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpep .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpep .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpep .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpad {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpad .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpad .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpad .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpad .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpcal {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  padding: 16px 20px 12px 20px;
  height: 80px;
}
#profiles-content button#daccpcal .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
}
#profiles-content button#daccpcal .label-group {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 2px;
}
#profiles-content button#daccpcal .label {
  font-size: 16px;
  font-weight: 600;
  color: #020817;
  line-height: 1.2;
  margin: 0;
}
#profiles-content button#daccpcal .option-desc {
  font-size: 13px;
  font-weight: 400;
  color: #64748B;
  line-height: 1.2;
  margin: 0;
}

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
  style.innerHTML = `
    html[data-invert-colors="true"] {
      filter: invert(100%) !important;
      background: #111 !important;
    }
    html[data-high-contrast="true"] {
      filter: contrast(150%) !important;
      background: #000 !important;
      color: #ff0 !important;
    }
    html[data-saturation="1"] { filter: saturate(150%) !important; }
    html[data-saturation="2"] { filter: saturate(200%) !important; }
    html[data-saturation="3"] { filter: grayscale(100%) !important; }

    html[data-font-size="1"] { font-size: 1.1em !important; }
    html[data-font-size="2"] { font-size: 1.2em !important; }
    html[data-font-size="3"] { font-size: 1.3em !important; }

    html[data-letter-spacing="1"] { letter-spacing: 0.12em !important; }
    html[data-letter-spacing="2"] { letter-spacing: 0.24em !important; }
    html[data-letter-spacing="3"] { letter-spacing: 0.36em !important; }

    html[data-line-height="1"] * { line-height: 1.5 !important; }
    html[data-line-height="2"] * { line-height: 2 !important; }
    html[data-line-height="3"] * { line-height: 2.5 !important; }

    html[data-dyslexic-font="true"] * {
      font-family: 'OpenDyslexic', Arial, sans-serif !important;
    }

    html[data-disable-animations="true"] *,
    html[data-disable-animations="true"] *:before,
    html[data-disable-animations="true"] *:after {
      animation: none !important;
      transition: none !important;
    }

    html[data-enlarge-cursor="true"] * {
      cursor: url('https://nextsolution-ai.github.io/wcag/2b8cb506dac6e94c6406.png') 16 16, auto !important;
    }

    html[data-hide-media="true"] img,
    html[data-hide-media="true"] video,
    html[data-hide-media="true"] iframe {
      visibility: hidden !important;
    }

    .reading-ruler {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,33,200,0.6);
      pointer-events: none;
      z-index: 2147483647;
      transition: clip-path 0s;
    }
    .ruler-strip {
      position: absolute;
      left: 0;
      width: 100vw;
      height: 100px;
      border-top: 5px solid #0021C8;
      border-bottom: 5px solid #0021C8;
      background: transparent;
      pointer-events: none;
      z-index: 2147483648;
      box-sizing: border-box;
    }

    #accessibility-widget [aria-pressed="true"] {
       box-shadow: 0 0 0 3px #0033cc, 0 0 0 6px #e0e4f7;
       outline: none !important;
    }
  `;
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