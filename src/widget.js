// WCAG Accessibility Widget
(function() {
  // Default configuration
  const defaultConfig = {
    position: 'right',
    theme: 'light'
  };

  // Merge user config with defaults
  const config = {
    ...defaultConfig,
    ...(window.WCAGWidgetConfig || {})
  };

  // Load CSS files
  function loadStyles() {
    const styleLink = document.createElement('link');
    styleLink.rel = 'stylesheet';
    styleLink.href = 'https://nextsolution-ai.github.io/wcag/dist/style.min.css';
    document.head.appendChild(styleLink);

    const profilesLink = document.createElement('link');
    profilesLink.rel = 'stylesheet';
    profilesLink.href = 'https://nextsolution-ai.github.io/wcag/dist/profiles.min.css';
    document.head.appendChild(profilesLink);
  }

  // Create and inject the widget HTML structure
  function createAccessibilityWidget() {
    const widgetHTML = `
      <div id="accessibility-widget">
        <button id="accessibility-btn" aria-label="Open accessibility menu">
          <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="#fff"></path></svg>
        </button>
        <div id="accessibility-panel" aria-hidden="true">
          <div class="accessibility-header">
            <span class="accessibility-header-icon">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="#0033cc"></path></svg>
            </span>
            <span class="accessibility-header-title">Accessibility menu <span style="font-size:0.8em;font-weight:400;">[CTRL + U]</span></span>
            <button aria-label="Close accessibility menu" id="daccheac" class="accessibility-close-btn">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.9999 29.9999L18 18" stroke="black" stroke-width="2"></path>
                <path d="M18 29.9999L29.9999 18" stroke="black" stroke-width="2"></path>
              </svg>
            </button>
          </div>
          <div class="section accordion">
            <button class="accordion-toggle" aria-expanded="false" aria-controls="widget-settings-panel">
              <span>Widget settings</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="widget-settings-panel" hidden>
              <div class="settings-cards">
                <div class="settings-card">
                  <div class="settings-label">Language</div>
                  <select id="language-select">
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div class="settings-card">
                  <div class="settings-label">Position</div>
                  <select id="position-select">
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="section accordion">
            <button class="accordion-toggle" aria-expanded="false" aria-controls="profiles-panel">
              <span>Accessibility profiles</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="profiles-panel" hidden>
              <div class="profiles-grid">
                <!-- Profile buttons -->
                <button id="daccpmi" title="Motor impairments" aria-label="Motor impairments" type="button" tabindex="0" class="profile-btn">
                  <span><svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0001 17.4999H13L11.5 12H7V6.9999C7 6.4476 6.5524 6 6.0001 6H4L1 9L4 12M10.7002 15.21C10.0003 17.13 8.1601 18.5001 6.0001 18.5001C3.2401 18.5001 1 16.26 1 13.5C1 12.9 1.105 12.3249 1.3 11.79M7.0003 3C7.0003 3.82843 6.32873 4.5 5.5003 4.5C4.67187 4.5 4.0003 3.82843 4.0003 3C4.0003 2.17157 4.67187 1.5 5.5003 1.5C6.32873 1.5 7.0003 2.17157 7.0003 3Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                  <span>Motor impairments</span>
                </button>
                <!-- Add other profile buttons here -->
              </div>
            </div>
          </div>
          <div class="section accordion">
            <button class="accordion-toggle" aria-expanded="false" aria-controls="content-panel">
              <span>Content</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="content-panel" hidden>
              <div id="daccbxc2">
                <!-- Content adjustment buttons -->
                <button id="daccfs" title="Font size" aria-label="Font size" type="button">
                  <span><svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3826 17.223H6.4879M9.43523 0.776855V17.0934M1.14746 5.27826V0.776965H17.723L17.723 5.27815M12.8021 11.2454L15.2626 8.63736M15.2626 8.63736L17.723 11.2454M15.2626 8.63736L15.2626 14.5035" stroke="var(--wcag-primary-color)" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                  <span>Font size</span>
                </button>
                <!-- Add other content adjustment buttons here -->
              </div>
            </div>
          </div>
          <div class="section accordion">
            <button class="accordion-toggle" aria-expanded="false" aria-controls="color-panel">
              <span>Color</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="color-panel" hidden>
              <div id="daccbxc3">
                <!-- Color adjustment buttons -->
                <button id="daccic" title="Invert colors" aria-label="Invert colors" type="button">
                  <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.54859 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"></path></svg></span>
                  <span>Invert colors</span>
                </button>
                <!-- Add other color adjustment buttons here -->
              </div>
            </div>
          </div>
          <div class="section accordion">
            <button class="accordion-toggle" aria-expanded="false" aria-controls="visibility-panel">
              <span>Visibility</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="visibility-panel" hidden>
              <div id="daccbxc4">
                <!-- Visibility adjustment buttons -->
                <button id="daccda" title="Disable animations" aria-label="Disable animations" type="button">
                  <span><svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M2.4187 1.14636C1.7814 1.14636 1.26477 1.66299 1.26477 2.30029V13.3261C1.26477 13.9634 1.7814 14.48 2.4187 14.48H2.77651C2.79603 14.478 2.81585 14.4769 2.83591 14.4769C2.85597 14.4769 2.87579 14.478 2.89531 14.48H13.4445C14.0818 14.48 14.5984 13.9634 14.5984 13.3261V2.30029C14.5984 1.66299 14.0818 1.14636 13.4445 1.14636H2.4187ZM2.27091 15.6053C1.07841 15.5291 0.134766 14.5378 0.134766 13.3261V2.30029C0.134766 1.03891 1.15732 0.0163574 2.4187 0.0163574H13.4445C14.7059 0.0163574 15.7284 1.03891 15.7284 2.30029V2.39453C16.9209 2.4707 17.8646 3.46207 17.8646 4.67376V15.2809C17.8646 16.7734 16.6547 17.9832 15.1622 17.9832H4.55484C3.29351 17.9832 2.27091 16.9606 2.27091 15.6993V15.6053ZM15.7284 3.5292C16.2959 3.60176 16.7346 4.08657 16.7346 4.67376V15.2809C16.7346 16.1493 16.0306 16.8532 15.1622 16.8532H4.55484C3.91759 16.8532 3.40091 16.3366 3.40091 15.6993V15.61H13.4445C14.7059 15.61 15.7284 14.5875 15.7284 13.3261V3.5292Z" fill="var(--wcag-primary-color)"></path></svg></span>
                  <span>Disable animations</span>
                </button>
                <!-- Add other visibility adjustment buttons here -->
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML('beforeend', widgetHTML);
  }

  // Initialize widget functionality
  function initializeWidget() {
    // Create the widget if it doesn't exist
    if (!document.getElementById('accessibility-widget')) {
      createAccessibilityWidget();
    }

    // Get references to elements
    const btn = document.getElementById('accessibility-btn');
    const panel = document.getElementById('accessibility-panel');
    const closeBtn = document.getElementById('daccheac');
    const widget = document.getElementById('accessibility-widget');
    const languageSelect = document.getElementById('language-select');
    const positionSelect = document.getElementById('position-select');

    if (!btn || !panel || !closeBtn || !widget) {
      console.error('WCAG Widget: Required elements not found');
      return;
    }

    // Apply initial position from config
    if (config.position === 'left') {
      widget.style.right = '';
      widget.style.left = '32px';
      positionSelect.value = 'left';
    } else {
      widget.style.left = '';
      widget.style.right = '32px';
      positionSelect.value = 'right';
    }

    // Toggle panel
    btn.addEventListener('click', () => {
      const isOpen = panel.classList.toggle('open');
      panel.setAttribute('aria-hidden', !isOpen);
    });

    // Close panel
    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    });

    // Accordion toggle logic
    document.querySelectorAll('.accordion-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const content = document.getElementById(this.getAttribute('aria-controls'));
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        content.hidden = expanded;
      });
    });

    // Position change handler
    positionSelect.addEventListener('change', function() {
      if (this.value === 'left') {
        widget.style.right = '';
        widget.style.left = '32px';
      } else {
        widget.style.left = '';
        widget.style.right = '32px';
      }
    });

    // Profile buttons
    document.querySelectorAll('.profile-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const profile = this.getAttribute('id');
        switch(profile) {
          case 'daccpmi': // Motor impairments
            document.body.style.animation = 'none';
            break;
          case 'daccpbl': // Blindness
            // Enable text-to-speech functionality
            break;
          case 'daccpcb': // Color blindness
            document.body.style.filter = 'saturate(150%)';
            break;
          case 'daccpds': // Dyslexia
            document.body.style.fontFamily = 'OpenDyslexic, Arial, sans-serif';
            document.body.style.lineHeight = '1.5';
            break;
          case 'daccplv': // Low vision
            document.body.style.fontSize = '120%';
            document.body.style.filter = 'saturate(150%)';
            break;
          case 'daccpep': // Epilepsy
            document.body.style.animation = 'none';
            document.body.style.filter = 'saturate(50%)';
            break;
          case 'daccpad': // ADHD
            document.body.style.animation = 'none';
            document.body.style.filter = 'saturate(50%)';
            break;
          case 'daccpcal': // Cognitive and learning
            document.body.style.fontSize = '110%';
            document.body.style.animation = 'none';
            break;
        }
      });
    });

    // Content adjustment buttons
    document.querySelectorAll('#daccbxc2 button').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.getAttribute('id');
        switch(action) {
          case 'daccfs': // Font size
            const currentSize = parseFloat(getComputedStyle(document.body).fontSize);
            document.body.style.fontSize = (currentSize + 2) + 'px';
            break;
          case 'daccul': // Underline links
            document.querySelectorAll('a').forEach(a => a.style.textDecoration = 'underline');
            break;
          case 'daccls': // Letter spacing
            document.body.style.letterSpacing = '1px';
            break;
          case 'dacclh': // Line height
            document.body.style.lineHeight = '1.5';
            break;
          case 'dacctts': // Text to speech
            // Enable text-to-speech functionality
            break;
        }
      });
    });

    // Color adjustment buttons
    document.querySelectorAll('#daccbxc3 button').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.getAttribute('id');
        switch(action) {
          case 'daccic': // Invert colors
            document.body.style.filter = 'invert(100%)';
            break;
          case 'dacccc': // Contrast
            document.body.style.backgroundColor = '#000';
            document.body.style.color = '#ff0';
            break;
          case 'daccsat': // Saturation
            document.body.style.filter = 'saturate(150%)';
            break;
        }
      });
    });

    // Visibility adjustment buttons
    document.querySelectorAll('#daccbxc4 button').forEach(btn => {
      btn.addEventListener('click', function() {
        const action = this.getAttribute('id');
        switch(action) {
          case 'daccda': // Disable animations
            document.body.style.animation = 'none';
            document.body.style.transition = 'none';
            break;
        }
      });
    });
  }

  // Initialize the widget when the script loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      loadStyles();
      createAccessibilityWidget();
      initializeWidget();
    });
  } else {
    loadStyles();
    createAccessibilityWidget();
    initializeWidget();
  }
})();
