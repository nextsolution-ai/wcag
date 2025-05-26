// Accessibility Widget Deployment Script
(function() {
  // Create widget HTML
  const widgetHTML = `
    <div id="accessibility-widget">
      <button id="accessibility-btn" aria-label="Open accessibility menu">
        <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="#fff"/>
        </svg>
      </button>
      <div id="accessibility-panel" aria-hidden="true" class="accessibility-panel">
        <div class="accessibility-header">
          <div class="accessibility-header-left">
            <span class="accessibility-header-icon">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 0C7.17395 0 0 7.17395 0 16C0 24.826 7.17395 32 16 32C24.826 32 32 24.826 32 16C32 7.17395 24.826 0 16 0ZM16 29.7674C8.4093 29.7674 2.23256 23.5907 2.23256 16C2.23256 8.4093 8.4093 2.23256 16 2.23256C23.5907 2.23256 29.7674 8.4093 29.7674 16C29.7674 23.5907 23.5907 29.7674 16 29.7674ZM13.0233 8.55814C13.0233 6.92093 14.3628 5.5814 16 5.5814C17.6372 5.5814 18.9767 6.92093 18.9767 8.55814C18.9767 10.1953 17.6372 11.5349 16 11.5349C14.3628 11.5349 13.0233 10.1953 13.0233 8.55814ZM17.1163 16.8037V18.6047L21.3581 24.2605C21.7302 24.7516 21.626 25.4512 21.1349 25.8233C20.9414 25.9721 20.7033 26.0465 20.4651 26.0465C20.1228 26.0465 19.7953 25.8977 19.5721 25.6L16 20.8372L12.4279 25.6C12.0558 26.0912 11.3563 26.1953 10.8651 25.8233C10.374 25.4512 10.2698 24.7516 10.6419 24.2605L14.8837 18.6047V16.8037L11.1777 15.5684C10.5972 15.3749 10.2698 14.7349 10.4781 14.1544C10.6716 13.574 11.2967 13.2465 11.8921 13.4549L16 14.8242L20.1079 13.4549C20.7033 13.2614 21.3284 13.574 21.5219 14.1544C21.7153 14.7349 21.4028 15.3749 20.8223 15.5684L17.1163 16.8037Z" fill="#0033cc"/>
              </svg>
            </span>
            <span class="accessibility-header-title">Accessibility menu <span style="font-size:0.8em;font-weight:400;">[CTRL + U]</span></span>
          </div>
          <button aria-label="Close accessibility menu" id="daccheac" class="accessibility-close-btn">
            <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M29.9999 29.9999L18 18" stroke="black" stroke-width="2"></path>
              <path d="M18 29.9999L29.9999 18" stroke="black" stroke-width="2"></path>
            </svg>
          </button>
        </div>

        <div class="accessibility-content">
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
            <button class="accordion-toggle" aria-expanded="false" aria-controls="accessibility-profiles">
              <span>Accessibility profiles</span>
              <span class="chevron">
                <svg viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" width="18" height="12">
                  <path d="M0.871545 0.666372L0.871472 0.666291L0.865609 0.671861C0.643507 0.882858 0.651372 1.22597 0.849959 1.43501L0.84995 1.43502L0.851904 1.43704L4.60509 5.31438L4.60506 5.3144L4.60851 5.31786C4.6802 5.38954 4.75985 5.42145 4.81158 5.43801C4.83457 5.44536 4.857 5.45112 4.87048 5.45458L4.87344 5.45534C4.88969 5.45953 4.89477 5.46099 4.89768 5.46196L4.94386 5.47735H4.99254C5.13193 5.47735 5.27099 5.42344 5.37658 5.31786L5.37659 5.31786L5.37844 5.31598L9.14594 1.48162L9.14598 1.48165L9.14946 1.47799C9.35018 1.2667 9.35018 0.937001 9.14946 0.725711L9.14416 0.720134L9.13858 0.714836C8.92729 0.514109 8.59759 0.51411 8.3863 0.714836L8.38618 0.714709L8.37899 0.722027L4.99872 4.16065L1.62657 0.685227L1.62659 0.685203L1.62339 0.682003C1.51781 0.576418 1.37875 0.52251 1.23936 0.52251C1.09574 0.52251 0.968595 0.579026 0.871545 0.666372Z" fill="black" stroke="black" stroke-width="0.6"></path>
                </svg>
              </span>
            </button>
            <div class="accordion-content" id="accessibility-profiles" hidden>
              <div class="profiles-grid">
                <button id="daccpmi" title="Motor impairments" aria-label="Motor impairments" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.0001 17.4999H13L11.5 12H7V6.9999C7 6.4476 6.5524 6 6.0001 6H4L1 9L4 12M10.7002 15.21C10.0003 17.13 8.1601 18.5001 6.0001 18.5001C3.2401 18.5001 1 16.26 1 13.5C1 12.9 1.105 12.3249 1.3 11.79M7.0003 3C7.0003 3.82843 6.32873 4.5 5.5003 4.5C4.67187 4.5 4.0003 3.82843 4.0003 3C4.0003 2.17157 4.67187 1.5 5.5003 1.5C6.32873 1.5 7.0003 2.17157 7.0003 3Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Motor impairments</span>
                </button>
                <button id="daccpbl" title="Blindness" aria-label="Blindness" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.771484 17.2286L17.2286 0.771484M17.2286 9.00006C17.2286 9.00006 13.5438 15.4286 9.00006 15.4286C4.45634 15.4286 0.771484 9.00006 0.771484 9.00006C0.771484 9.00006 4.45634 2.57148 9.00006 2.57148C13.5438 2.57148 17.2286 9.00006 17.2286 9.00006ZM11.0572 9.00006C11.0572 10.1362 10.1362 11.0572 9.00006 11.0572C7.86393 11.0572 6.94291 10.1362 6.94291 9.00006C6.94291 7.86393 7.86393 6.94291 9.00006 6.94291C10.1362 6.94291 11.0572 7.86393 11.0572 9.00006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Blindness</span>
                </button>
                <button id="daccpcb" title="Color blindness" aria-label="Color blindness" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.00006 5.70006V12.4835M17.2286 9.00006C17.2286 13.5446 13.5446 17.2286 9.00006 17.2286C4.45554 17.2286 0.771484 13.5446 0.771484 9.00006C0.771484 4.45554 4.45554 0.771484 9.00006 0.771484C13.5446 0.771484 17.2286 4.45554 17.2286 9.00006ZM12.9858 9.00006C12.9858 11.2013 11.2013 12.9858 9.00006 12.9858C6.79881 12.9858 5.01434 11.2013 5.01434 9.00006C5.01434 6.79881 6.79881 5.01434 9.00006 5.01434C11.2013 5.01434 12.9858 6.79881 12.9858 9.00006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Color blindness</span>
                </button>
                <button id="daccpds" title="Dyslexia" aria-label="Dyslexia" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.91421 0.779785L3.84662 1.55968L1 0.779785M1 17.22L4.06759 16.4401L6.91421 17.22M3.95841 16.4401V1.81965M8.76777 12.681L13.0988 4.98083L17.0009 12.681M16.2574 11.2382H10.0182" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Dyslexia</span>
                </button>
                <button id="daccplv" title="Low vision" aria-label="Low vision" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21.2853 9.00007C21.2853 9.00007 16.6792 17.0358 10.9996 17.0358C5.31994 17.0358 0.713867 9.00007 0.713867 9.00007C0.713867 9.00007 5.31994 0.964355 10.9996 0.964355C16.6792 0.964355 21.2853 9.00007 21.2853 9.00007Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path d="M10.9996 11.5715C12.4197 11.5715 13.571 10.4202 13.571 9.00007C13.571 7.57991 12.4197 6.42864 10.9996 6.42864C9.57942 6.42864 8.42815 7.57991 8.42815 9.00007C8.42815 10.4202 9.57942 11.5715 10.9996 11.5715Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Low vision</span>
                </button>
                <button id="daccpep" title="Epilepsy" aria-label="Epilepsy" type="button" class="profile-btn">
                  <span>
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.00006 0.771484V17.2286M0.771484 9.00006H17.2286" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                  </span>
                  <span>Epilepsy</span>
                </button>
              </div>
            </div>
          </div>

          <button class="reset-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right: 8px;">
              <path d="M1 4V10H7" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M23 20V14H17" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M20.49 9.00001C19.9828 7.56645 19.1209 6.28665 17.9845 5.27573C16.8482 4.26482 15.4745 3.55687 13.9917 3.22239C12.5089 2.8879 10.9652 2.93789 9.50481 3.36673C8.04437 3.79557 6.71475 4.58841 5.64 5.67001L1 10M23 14L18.36 18.33C17.2853 19.4116 15.9556 20.2045 14.4952 20.6333C13.0348 21.0621 11.4911 21.1121 10.0083 20.7776C8.52547 20.4432 7.1518 19.7352 6.01547 18.7243C4.87913 17.7134 4.01717 16.4336 3.51 15" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Reset to default settings
          </button>
        </div>
      </div>
    </div>
  `;

  // Wait for DOM to be ready
  function init() {
    if (document.getElementById('accessibility-widget')) {
      return; // Widget already exists
    }

    // Create and inject styles
    const styles = `
    #accessibility-widget {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 9999;
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

    .accessibility-panel {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      right: -560px;
      width: 560px;
      height: 100vh;
      background: #000243;
      color: #fff;
      border-radius: 24px 0 0 24px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.3);
      font-family: 'Plus Jakarta Sans', Verdana, sans-serif;
      font-size: 14px;
      font-weight: 600;
      letter-spacing: 0;
      line-height: 1;
      z-index: 10000;
      padding: 0;
      box-sizing: border-box;
      transition: right 0.3s ease;
    }

    .accessibility-panel.open {
      right: 0;
    }

    .accessibility-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 24px;
      background: #000243;
      border-radius: 24px 0 0 0;
      min-height: 72px;
      position: sticky;
      top: 0;
      z-index: 1;
    }

    .accessibility-header-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .accessibility-header-icon {
      background: #fff;
      border-radius: 50%;
      padding: 8px;
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .accessibility-header-title {
      font-size: 16px;
      font-weight: 600;
      color: #fff;
    }

    .accessibility-close-btn {
      background: #fff;
      border: none;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: background 0.2s;
    }

    .accessibility-close-btn:hover {
      background: #f0f0f3;
    }

    .accessibility-content {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }

    .section {
      background: #fff;
      border-radius: 12px;
      padding: 20px;
      margin-bottom: 16px;
      color: #000;
    }

    .accordion-toggle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #f0f0f3;
      border: none;
      border-radius: 12px;
      padding: 16px 20px;
      font-size: 14px;
      font-weight: 600;
      color: #000;
      cursor: pointer;
      transition: background 0.2s;
    }

    .accordion-toggle:hover {
      background: #e8e8ec;
    }

    .accordion-content {
      padding: 20px 0 0;
    }

    .settings-cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .settings-card {
      background: #f5f6fa;
      border-radius: 12px;
      padding: 16px;
    }

    .settings-label {
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    select {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #e0e4f7;
      border-radius: 8px;
      font-size: 14px;
      background: #fff;
    }

    .profiles-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .profile-btn {
      background: #fff;
      border: 1px solid #e0e4f7;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .profile-btn:hover {
      background: #f5f6fa;
      border-color: #0033cc;
    }

    .profile-btn.active {
      background: #e0e4f7;
      border-color: #0033cc;
    }

    .reset-btn {
      width: 100%;
      background: #0033cc;
      color: #fff;
      border: none;
      border-radius: 12px;
      padding: 16px;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin-top: 16px;
      transition: background 0.2s;
    }

    .reset-btn:hover {
      background: #002299;
    }
  `;

    // Create style element and append to head
    const styleSheet = document.createElement("style");
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Add Google Font
    if (!document.querySelector('link[href*="Plus Jakarta Sans"]')) {
      const fontLink = document.createElement("link");
      fontLink.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600&display=swap";
      fontLink.rel = "stylesheet";
      document.head.appendChild(fontLink);
    }

    // Create widget container
    const container = document.createElement("div");
    container.innerHTML = widgetHTML;
    
    // Ensure container is added to body
    if (document.body) {
      document.body.appendChild(container);
      initializeWidget();
    } else {
      document.addEventListener('DOMContentLoaded', () => {
        document.body.appendChild(container);
        initializeWidget();
      });
    }
  }

  function initializeWidget() {
    // Initialize widget state
    const panel = document.getElementById('accessibility-panel');
    const btn = document.getElementById('accessibility-btn');
    const closeBtn = document.getElementById('daccheac');
    const accordionToggles = document.querySelectorAll('.accordion-toggle');
    const positionSelect = document.getElementById('position-select');
    const resetBtn = document.querySelector('.reset-btn');
    const profileBtns = document.querySelectorAll('.profile-btn');

    if (!panel || !btn) {
      console.error('Accessibility widget elements not found');
      return;
    }

    panel.setAttribute('aria-hidden', 'true');

    // Set initial state for accordions
    const accordionContents = document.querySelectorAll('.accordion-content');
    accordionContents.forEach(content => {
      content.hidden = true;
    });

    // Toggle panel
    btn.addEventListener('click', () => {
      panel.classList.toggle('open');
      const isOpen = panel.classList.contains('open');
      panel.setAttribute('aria-hidden', !isOpen);
    });

    closeBtn.addEventListener('click', () => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', true);
    });

    // Accordion functionality
    accordionToggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const content = document.getElementById(toggle.getAttribute('aria-controls'));
        const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        toggle.setAttribute('aria-expanded', !isExpanded);
        content.hidden = isExpanded;
      });
    });

    // Position select functionality
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

    // Profile buttons functionality
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
    resetBtn.addEventListener('click', () => {
      resetAccessibilityProfile();
      profileBtns.forEach(btn => btn.classList.remove('active'));
    });

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

  // Call init when script loads
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(); 