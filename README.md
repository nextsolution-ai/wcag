# WCAG Accessibility Widget

A lightweight, customizable accessibility widget that helps websites comply with WCAG guidelines. This widget provides various accessibility features including:

- Font size adjustment
- Color contrast options
- Text spacing controls
- Line height adjustment
- And more...

## Quick Installation

Add the following code snippet just before the closing `</body>` tag of your website:

```html
<link rel="stylesheet" href="https://raw.githubusercontent.com/YOUR_USERNAME/wcag-widget/main/dist/style.min.css">
<script src="https://raw.githubusercontent.com/YOUR_USERNAME/wcag-widget/main/dist/widget.min.js"></script>
```

## Manual Installation

1. Download the files from this repository
2. Copy the `dist` folder to your project
3. Include the CSS and JS files in your HTML:
```html
<link rel="stylesheet" href="path/to/style.min.css">
<script src="path/to/widget.min.js"></script>
```

## Features

- 🎨 Customizable appearance
- 🌐 Works with any website
- 🔒 No dependencies
- 📱 Mobile-friendly
- ♿ WCAG 2.1 compliant

## Configuration

You can customize the widget by adding a configuration object before loading the script:

```html
<script>
  window.WCAGWidgetConfig = {
    position: 'right', // 'left' or 'right'
    theme: 'light',    // 'light' or 'dark'
    // Add more configuration options as needed
  };
</script>
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 