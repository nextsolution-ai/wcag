export async function validateLicense(licenseKey) {
    if (!licenseKey) {
        console.error('No license key provided');
        return false;
    }

    if (!/^[0-9a-f]{32}$/.test(licenseKey)) {
        console.error('Invalid license key format');
        return false;
    }

    const domain = window.location.hostname;
    if (!domain) {
        console.error('No domain provided');
        return false;
    }

    try {
        const response = await fetch('https://wcag-g2za.onrender.com/api/licenses/verify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                licenseKey,
                domain
            })
        });

        if (!response.ok) {
            throw new Error('License validation failed');
        }

        const data = await response.json();
        return data.valid;
    } catch (error) {
        console.error('License validation error:', error);
        return false;
    }
} 