# WCAG Accessibility Widget (Paid Version)

A modern, customizable accessibility widget for websites, now available as a paid, license-based service. The widget provides various accessibility features and profiles to enhance user experience and meet WCAG standards.

## How It Works

- **Paid Service**: Each client receives a unique license key.
- **License Validation**: The widget validates the license key with a secure backend before loading.
- **Usage Tracking**: All usage is tracked for analytics and billing.
- **Domain Whitelisting**: Licenses are restricted to specified domains.

## Features

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

## Client Integration
Add the following to your website (replace `YOUR-LICENSE-KEY`):

```html
<script>
  window.ACCESSIBILITY_CONFIG = {
    licenseKey: 'YOUR-LICENSE-KEY',
    domain: window.location.hostname
  };
</script>
<script src="https://your-cdn.com/widget.min.js"></script>
```

## Server/API Setup

### Requirements
- Node.js
- MongoDB (Atlas or self-hosted)
- Render.com (or similar) for deployment

### Environment Variables
- `MONGODB_URI` - Your MongoDB connection string
- `JWT_SECRET` - Secret for JWT tokens
- `NODE_ENV` - `production` or `development`

### Running Locally
```bash
npm install
npm run dev
```

### API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive JWT
- `POST /api/licenses` - Create a new license (auth required)
- `GET /api/licenses` - List your licenses (auth required)
- `POST /api/licenses/verify` - Validate a license key (used by widget)
- `POST /api/usage/track` - Track widget usage
- `GET /api/usage/stats` - Get usage statistics

### Deployment
1. Push your code to GitHub
2. Connect your repo to Render.com
3. Set environment variables in Render
4. Deploy

## Security
- All endpoints require authentication except license verification and usage tracking.
- License keys are unique and securely generated.
- Usage is tracked for analytics and billing.

## License
This project is proprietary. Contact us for pricing and licensing.

## Installation

Add the following script to your HTML file before the closing `</body>` tag:

```html
<script src="https://nextsolution-ai.github.io/wcag/widget-deploy.min.js"></script>
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. 