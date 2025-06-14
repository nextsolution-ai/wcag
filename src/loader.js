// Loader script that initializes the widget and injects CSS
(function(d, t) {
    // Inject CSS
    var css = d.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'dist/widget.7855b6efbd48cda117be.css';
    d.head.appendChild(css);

    // Inject JS
    var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
    v.onload = function() {
        window.WCAGWidget.init({
            licenseKey: window.ACCESSIBILITY_CONFIG?.licenseKey,
            version: '1.0.0'
        });
    }
    v.src = "dist/widget.9741ae804de17f38a176.js";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
})(document, 'script'); 