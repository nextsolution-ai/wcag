# WCAG Accessibility Widget

A customizable accessibility widget that helps make websites WCAG compliant. This widget provides various accessibility features including:

- Motor impairment support
- Blindness/Screen reader optimization
- Color blindness adjustments
- Dyslexia-friendly mode
- Low vision support
- Epilepsy safe mode
- ADHD friendly mode
- Cognitive disability support

## Quick Start

Add the widget to your website by including these lines in your HTML:

```html
<script>
  window.WCAGWidgetConfig = {
    position: 'right', // 'right' or 'left'
    theme: 'light'    // 'light' or 'dark'
  };
</script>
<script src="https://nextsolution-ai.github.io/wcag/dist/widget.min.js"></script>
```

## Features

### Accessibility Profiles
- Motor Impairments: Disables animations and increases clickable areas
- Blindness: Optimizes for screen readers
- Color Blindness: Adjusts color contrast and saturation
- Dyslexia: Changes font and increases readability
- Low Vision: Increases font size and cursor size
- Epilepsy: Reduces animations and flashing elements
- ADHD: Reduces distractions and improves focus
- Cognitive Disabilities: Simplifies content and improves readability

### Content Adjustments
- Font size adjustment
- Line height control
- Letter spacing control
- Text-to-speech functionality
- Link underlining

### Color Adjustments
- Color inversion
- Contrast adjustment
- Saturation control

### Visibility Settings
- Animation control
- Cursor size adjustment
- Image hiding
- Reading guide

## Configuration

You can configure the widget by setting `window.WCAGWidgetConfig` before loading the script:

```javascript
window.WCAGWidgetConfig = {
  position: 'right', // Widget position: 'right' or 'left'
  theme: 'light'    // Widget theme: 'light' or 'dark'
};
```

## Development

1. Clone the repository:
```bash
git clone https://github.com/nextsolution-ai/wcag.git
```

2. Install dependencies:
```bash
npm install
```

3. Build the minified files:
```bash
npm run build
```

## License

MIT License - feel free to use this in your projects! 