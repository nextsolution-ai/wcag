# Accessibility Widget

A lightweight, customizable accessibility widget that can be easily added to any website. This widget provides various accessibility features to make your website more accessible to users with different needs.

## Features

- Easy to deploy
- Keyboard shortcut support (CTRL + U)
- Modern and clean design
- Customizable styles
- Responsive layout
- WCAG compliant

## Installation

1. Download the `widget-deploy.js` file
2. Add the script to your HTML file before the closing `</body>` tag:

```html
<script src="path/to/widget-deploy.js"></script>
```

Or use it directly via CDN (replace VERSION with the latest version):

```html
<script src="https://cdn.jsdelivr.net/gh/your-repo/accessibility-widget@VERSION/widget-deploy.js"></script>
```

## Customization

You can customize the widget's appearance by overriding the CSS variables and classes. The main customization points are:

```css
:root {
  --wcag-primary-color: #0033cc; /* Primary color for the widget */
}
```

## Browser Support

The widget supports all modern browsers:

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this in your projects! 