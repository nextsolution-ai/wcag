# WCAG Accessibility Widget

A modern, customizable accessibility widget that helps make websites more accessible to users with different needs. The widget provides various accessibility features and profiles to enhance the user experience.

## Features

- Easy to deploy
- Keyboard shortcut support (CTRL + U)
- Modern and clean design
- Customizable styles
- Responsive layout
- WCAG compliant
- Multiple accessibility profiles:
  - Motor impairments
  - Blindness
  - Color blindness
  - Dyslexia
  - Low vision
  - Epilepsy

## Installation

Add the following script to your HTML file before the closing `</body>` tag:

```html
  <script>
    window.ACCESSIBILITY_CONFIG = {
      licenseKey: 'licensekey'
    };
  </script>
  <script src="dist/loader.6fe6055abc7952e95f87.js"></script> 
```

## Usage

The widget will automatically initialize when the page loads. Users can:

1. Click the accessibility button in the bottom-right corner
2. Use the keyboard shortcut CTRL + U to open/close the widget
3. Select different accessibility profiles
4. Customize widget settings (language and position)
5. Reset to default settings

## Customization

The widget can be customized by modifying the CSS variables in your stylesheet:

```css
:root {
  --wcag-primary-color: #0033cc;
  --wcag-background-color: #000243;
  --wcag-text-color: #ffffff;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)