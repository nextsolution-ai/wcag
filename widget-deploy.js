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
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15 20H13L11.5 14H7V9C7 8.44772 6.55228 8 6 8H4L1 11L4 14M10.7 17.21C10 19.13 8.16 20.5 6 20.5C3.24 20.5 1 18.26 1 15.5C1 14.9 1.105 13.3249 1.3 12.79M7 5C7 5.82843 6.32843 6.5 5.5 6.5C4.67157 6.5 4 5.82843 4 5C4 4.17157 4.67157 3.5 5.5 3.5C6.32843 3.5 7 4.17157 7 5Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Motor impairments</span>
                </button>
                <button id="daccpbl" title="Blindness" aria-label="Blindness" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M1 23L23 1M23 12C23 12 18.5 20 12 20C5.5 20 1 12 1 12C1 12 5.5 4 12 4C18.5 4 23 12 23 12ZM15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Blindness</span>
                </button>
                <button id="daccpcb" title="Color blindness" aria-label="Color blindness" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 7.5V16.5M23 12C23 17.5228 18.5228 22 13 22C7.47715 22 3 17.5228 3 12C3 6.47715 7.47715 2 13 2C18.5228 2 23 6.47715 23 12ZM17 12C17 14.7614 15.2091 16.5 13 16.5C10.7909 16.5 9 14.7614 9 12C9 9.23858 10.7909 7.5 13 7.5C15.2091 7.5 17 9.23858 17 12Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Color blindness</span>
                </button>
                <button id="daccpds" title="Dyslexia" aria-label="Dyslexia" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9.21895 1.03574L5.12883 1.95961L1.33334 1.03574M1.33334 23.0357L5.27789 22.1881L9.21895 23.0357M5.27789 22.1881V2.18811M11.6904 16.9081L16.1317 6.30811L20.0011 16.9081M21.6767 14.9081H10.0048" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Dyslexia</span>
                </button>
                <button id="daccplv" title="Low vision" aria-label="Low vision" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M23 12C23 12 18.5 20 12 20C5.5 20 1 12 1 12C1 12 5.5 4 12 4C18.5 4 23 12 23 12Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Low vision</span>
                </button>
                <button id="daccpep" title="Epilepsy" aria-label="Epilepsy" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 1V23M1 12H23" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Epilepsy</span>
                </button>
                <button id="daccpco" title="Cognitive" aria-label="Cognitive" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 6V12L16 14" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Cognitive</span>
                </button>
                <button id="daccpad" title="ADHD" aria-label="ADHD" type="button" class="profile-btn">
                  <span class="profile-icon">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                      <path d="M12 8V16M8 12H16" stroke="var(--wcag-primary-color)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>ADHD</span>
                </button>
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
                <button id="daccfs" title="Font size" aria-label="Font size" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.3826 17.223H6.4879M9.43523 0.776855V17.0934M1.14746 5.27826V0.776965H17.723L17.723 5.27815M12.8021 11.2454L15.2626 8.63736M15.2626 8.63736L17.723 11.2454M15.2626 8.63736L15.2626 14.5035" stroke="var(--wcag-primary-color)" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Font size</span>
                  <div data-message="Gradually increase font size on the page. Helps users with visual difficulties." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                  <div class="daccdts"><span></span><span></span><span></span></div>
                </button>
                <button id="daccul" title="Underline links" aria-label="Underline links" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.947 12.8202H6.05235M8.99966 0.776855V12.6905M17.2875 17.2231H0.711914M0.711916 5.27815V0.776855H17.2875L17.2874 5.27815" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Underline links</span>
                  <div data-message="Underline all links and buttons on the page. Helps users with visual difficulties." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="daccls" title="Letter spacing" aria-label="Letter spacing" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 26 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.699219 16.8639L7.6633 1.13232L13.9317 16.8639M12.7408 13.9187H2.71056M23.5159 16.4291H19.5499C18.5366 16.4291 17.754 15.5444 17.875 14.5388L17.9355 14.0359C18.0376 13.189 18.7559 12.5539 19.6104 12.5539H23.5159M18.2115 9.06805C18.7181 8.76559 19.3004 8.6068 19.8977 8.6068H20.9525C22.3741 8.6068 23.5272 9.75992 23.5272 11.1815V16.4556L25.3004 16.8677" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Letter spacing</span>
                  <div data-message="Gradually increase letter spacing on the page. Helps users with visual difficulties." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                  <div class="daccdts"><span></span><span></span><span></span></div>
                </button>
                <button id="dacclh" title="Line height" aria-label="Line height" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.652344 11.739H9.26104M13.9384 11.739H17.348M0.652344 17.2174H3.58974M8.39233 17.2174H17.348M0.652344 0.782471H17.348V6.26073H0.652344V0.782471Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Line height</span>
                  <div data-message="Gradually increase line height on the page. Helps users with visual difficulties." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                  <div class="daccdts"><span></span><span></span><span></span></div>
                </button>
                <button id="dacctts" title="Text to speech" aria-label="Text to speech" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M4.69034 11.5355H2.14463C1.38606 11.5355 0.771484 10.9209 0.771484 10.1623V7.84034C0.771484 7.08177 1.38606 6.4672 2.14463 6.4672H4.69034V11.5381V11.5355ZM4.69034 11.5355L17.2286 17.2286V0.771484L4.69034 6.46463L4.69034 11.5355ZM5.20206 11.7669L4.88577 13.4795C4.77006 14.1043 5.08377 14.7266 5.65463 15.0069L8.1952 16.2566C8.8252 16.5652 9.58634 16.3698 9.98491 15.7912L10.9621 14.3795" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Text to speech</span>
                  <div data-message="Read aloud the text on the entire page. Helps blind users." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
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
                <button id="daccic" title="Invert colors" aria-label="Invert colors" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.54859 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"/>
                      <path d="M9.45 17.37C7.2035 17.37 5.04726 16.4858 3.44746 14.9087C1.84767 13.3315 0.932879 11.1881 0.900869 8.94183C0.868859 6.69556 1.72221 4.52693 3.27641 2.90483C4.83061 1.28273 6.96078 0.337485 9.20637 0.273472L9.45 8.82V17.37Z" fill="var(--wcag-primary-color)"/>
                    </svg>
                  </span>
                  <span>Invert colors</span>
                  <div data-message="Invert colors on the page to improve contrast and readability for users with color perception difficulties. Helps users with dyslexia, light sensitivity, or other visual impairments." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="dacccc" title="Contrast" aria-label="Contrast" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 18C4.03735 18 0 13.9626 0 9C0 4.03735 4.03735 0 9 0C13.9626 0 18 4.03735 18 9C18 13.9626 13.9626 18 9 18ZM2.28942 13.1088C3.58215 15.2137 5.83736 16.6656 8.4362 16.8516V15.962L2.28942 13.1088ZM9.56529 1.14843V16.8516C13.6428 16.5615 16.8724 13.1504 16.8724 9C16.8724 4.84959 13.6428 1.43851 9.56529 1.14843ZM1.54116 11.5185L8.4362 14.7183V12.3724L1.12909 8.98066V9.00149C1.12909 9.88215 1.27488 10.7286 1.54116 11.5185ZM1.22281 7.77868L8.43471 11.1273V8.78132L1.84463 5.72132C1.5486 6.36545 1.33587 7.0557 1.22281 7.77868ZM2.39058 4.73058L8.4362 7.5362V5.19025L3.84397 3.05851C3.28463 3.54347 2.79521 4.10727 2.39058 4.73058ZM4.88083 2.29537L8.4362 3.94512V1.14843C7.13901 1.24066 5.92959 1.64826 4.88083 2.29537Z" fill="var(--wcag-primary-color)"/>
                    </svg>
                  </span>
                  <span>Contrast</span>
                  <div data-message="Increase page contrast by changing the background to black and text and borders to yellow. This helps users with weak vision or difficulty distinguishing colors by providing clear contrast and greater visibility." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="daccsat" title="Saturation" aria-label="Saturation" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8.00012 0.770996L3.17869 5.59242C0.51726 8.25385 0.51726 12.5687 3.17869 15.2327H3.18126C5.84269 17.8941 10.1601 17.8941 12.8215 15.2327C15.483 12.5713 15.483 8.25385 12.8215 5.59242C11.2864 4.05728 8.00012 0.770996 8.00012 0.770996ZM8.00012 0.770996L8.00012 17.2281" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Saturation</span>
                  <div data-message="Change the color saturation on the page, reducing intensity with the first click, then increasing it with the second. The third click removes saturation completely, transitioning to grayscale for better readability and reduced visual strain." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                  <div class="daccdts"><span></span><span></span><span></span></div>
                </button>
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
                <button id="daccda" title="Disable animations" aria-label="Disable animations" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M2.4187 1.14636C1.7814 1.14636 1.26477 1.66299 1.26477 2.30029V13.3261C1.26477 13.9634 1.7814 14.48 2.4187 14.48H2.77651C2.79603 14.478 2.81585 14.4769 2.83591 14.4769C2.85597 14.4769 2.87579 14.478 2.89531 14.48H13.4445C14.0818 14.48 14.5984 13.9634 14.5984 13.3261V2.30029C14.5984 1.66299 14.0818 1.14636 13.4445 1.14636H2.4187ZM2.27091 15.6053C1.07841 15.5291 0.134766 14.5378 0.134766 13.3261V2.30029C0.134766 1.03891 1.15732 0.0163574 2.4187 0.0163574H13.4445C14.7059 0.0163574 15.7284 1.03891 15.7284 2.30029V2.39453C16.9209 2.4707 17.8646 3.46207 17.8646 4.67376V15.2809C17.8646 16.7734 16.6547 17.9832 15.1622 17.9832H4.55484C3.29351 17.9832 2.27091 16.9606 2.27091 15.6993V15.6053ZM15.7284 3.5292C16.2959 3.60176 16.7346 4.08657 16.7346 4.67376V15.2809C16.7346 16.1493 16.0306 16.8532 15.1622 16.8532H4.55484C3.91759 16.8532 3.40091 16.3366 3.40091 15.6993V15.61H13.4445C14.7059 15.61 15.7284 14.5875 15.7284 13.3261V3.5292ZM4.53853 5.23692C4.53853 4.34234 5.50672 3.7833 6.2814 4.23046L10.7438 6.80684C10.7438 6.80683 10.7438 6.80685 10.7438 6.80684C11.5185 7.25405 11.5185 8.37258 10.7438 8.81976L6.28145 11.3961C5.50677 11.8433 4.53853 11.2843 4.53853 10.3897V5.23692ZM5.67179 5.22084C5.6708 5.22249 5.66853 5.2263 5.66853 5.23692V10.3897C5.66853 10.4003 5.6708 10.4041 5.67179 10.4058C5.67367 10.4089 5.6777 10.4136 5.68453 10.4175C5.69135 10.4214 5.6974 10.4226 5.70104 10.4227C5.70295 10.4227 5.70733 10.4228 5.71645 10.4175C5.71643 10.4175 5.71646 10.4175 5.71645 10.4175L10.1788 7.84112C10.1879 7.83589 10.1901 7.83207 10.191 7.83037C10.1928 7.82717 10.1948 7.82128 10.1948 7.8133C10.1948 7.80532 10.1928 7.79944 10.191 7.79623C10.1901 7.79454 10.1879 7.79074 10.1789 7.78551L5.7165 5.20913C5.71648 5.20912 5.71651 5.20914 5.7165 5.20913C5.70738 5.20388 5.70295 5.20392 5.70104 5.20395C5.6974 5.20401 5.69135 5.20517 5.68453 5.20911C5.6777 5.21305 5.67367 5.21771 5.67179 5.22084Z" fill="var(--wcag-primary-color)"/>
                    </svg>
                  </span>
                  <span>Disable animations</span>
                  <div data-message="Disable all CSS animations on the page to provide static visual content and improve accessibility for users with motor impairments. This eliminates potential distractions and makes interaction with the site easier." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="daccec" title="Enlarge cursor" aria-label="Enlarge cursor" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.51606 11.0366L1.1932 16.3595M0.771484 5.29206L17.2286 0.771484L12.7081 17.2286L0.771484 5.29206Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Enlarge cursor</span>
                  <div data-message="Enlarge the cursor on the page to make it easier to spot and accurately use the interface. This function supports users with vision or coordination difficulties." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="dacchm" title="Hide images and videos" aria-label="Hide images and videos" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.4272 0.771484H17.2286V7.57291M7.57291 17.2286H0.771484V10.4272M5.28434 5.51577H12.4843V12.7158H5.28434V5.51577Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Hide images and videos</span>
                  <div data-message="Hide images and videos on the page to eliminate visual elements that may be distracting or hard to perceive. This helps users who prefer a more readable, text-based layout." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="daccsl" title="Show line" aria-label="Show line" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.771484 0.771484H17.2286M17.2286 17.2286H0.771484M5.40006 12.7158V5.51577H12.6001V12.7158H5.40006Z" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Show line</span>
                  <div data-message="Display a ruler to help users focus on a specific section of the content." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
                </button>
                <button id="daccffd" title="Facilities for dyslexics" aria-label="Facilities for dyslexics" type="button" class="content-btn">
                  <span class="content-icon">
                    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.91421 0.779785L3.84662 1.55968L1 0.779785M1 17.22L4.06759 16.4401L6.91421 17.22M3.95841 16.4401V1.81965M8.76777 12.681L13.0988 4.98083L17.0009 12.681M16.2574 11.2382H10.0182" stroke="var(--wcag-primary-color)" stroke-width="1.13" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </span>
                  <span>Facilities for dyslexics</span>
                  <div data-message="Change the default font to one designed for dyslexic users, improving text readability. This feature supports users with reading difficulties by adjusting the page appearance to their needs." class="dacctltp">
                    <svg viewBox="0 0 2 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0.357422 8.85714C0.357422 9.21218 0.645239 9.5 1.00028 9.5C1.35532 9.5 1.64314 9.21218 1.64314 8.85714V3.71429C1.64314 3.35925 1.35532 3.07143 1.00028 3.07143C0.645239 3.07143 0.357422 3.35925 0.357422 3.71429V8.85714Z" fill="white"/>
                      <path d="M0.357422 1.14279C0.357422 1.49783 0.645239 1.78564 1.00028 1.78564C1.35532 1.78564 1.64314 1.49783 1.64314 1.14279C1.64314 0.787747 1.35532 0.49993 1.00028 0.49993C0.645239 0.49993 0.357422 0.787747 0.357422 1.14279Z" fill="white"/>
                    </svg>
                  </div>
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
      gap: 12px;
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

    .profile-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }

    .profile-icon svg {
      width: 24px;
      height: 24px;
    }

    .profile-btn span:not(.profile-icon) {
      font-size: 14px;
      font-weight: 600;
      text-align: center;
      line-height: 1.2;
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

    // Add new styles for content buttons
    .content-btn {
      background: #fff;
      border: 1px solid #e0e4f7;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      transition: all 0.2s;
      width: 100%;
      margin-bottom: 8px;
      position: relative;
    }

    .content-btn:hover {
      background: #f5f6fa;
      border-color: #0033cc;
    }

    .content-btn.active {
      background: #e0e4f7;
      border-color: #0033cc;
    }

    .content-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 32px;
      height: 32px;
    }

    .content-icon svg {
      width: 24px;
      height: 24px;
    }

    .dacctltp {
      position: absolute;
      top: 8px;
      right: 8px;
      cursor: help;
    }

    .dacctltp svg {
      width: 16px;
      height: 16px;
    }

    .daccdts {
      display: flex;
      gap: 4px;
      margin-left: auto;
    }

    .daccdts span {
      width: 4px;
      height: 4px;
      background: var(--wcag-primary-color);
      border-radius: 50%;
      opacity: 0.3;
    }

    .daccdts span.active {
      opacity: 1;
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
      case 'daccpco':
        // Cognitive
        root.style.setProperty('--contrast', 'high');
        break;
      case 'daccpad':
        // ADHD
        root.style.setProperty('--contrast', 'high');
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