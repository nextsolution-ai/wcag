const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const License = require('../models/License');
const auth = require('../middleware/auth');

// Generate license key
function generateLicenseKey() {
  return crypto.randomBytes(16).toString('hex');
}

// Create new license
router.post('/', auth, async (req, res) => {
  try {
    const { domains, expiresAt, tokens = 0, email } = req.body;
    
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }

    if (tokens < 0) {
      return res.status(400).json({ error: 'Initial tokens cannot be negative' });
    }

    const license = new License({
      userId: req.user.userId,
      licenseKey: generateLicenseKey(),
      email,
      domains,
      tokens: parseInt(tokens) || 0,
      expiresAt: new Date(expiresAt)
    });

    await license.save();
    res.status(201).json({
      message: 'License created successfully',
      license: {
        licenseKey: license.licenseKey,
        email: license.email,
        domains: license.domains,
        tokens: license.tokens,
        expiresAt: license.expiresAt,
        status: license.status
      }
    });
  } catch (error) {
    console.error('License creation error:', error);
    res.status(500).json({ error: 'Error creating license' });
  }
});

// Get user's licenses
router.get('/', auth, async (req, res) => {
  try {
    const licenses = await License.find({ userId: req.user.userId });
    res.json(licenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching licenses' });
  }
});

// Verify license
router.post('/verify', async (req, res) => {
  try {
    const { licenseKey, domain } = req.body;

    if (!licenseKey || !domain) {
      return res.status(400).json({ error: 'License key and domain are required' });
    }

    const license = await License.findOne({ licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'Invalid license key' });
    }

    if (license.status !== 'active') {
      return res.status(403).json({ error: 'License is not active' });
    }

    if (license.expiresAt < new Date()) {
      license.status = 'expired';
      await license.save();
      return res.status(403).json({ error: 'License has expired' });
    }

    // Normalize domain for comparison
    const normalizedDomain = domain.toLowerCase().trim();
    const normalizedDomains = license.domains.map(d => d.toLowerCase().trim());
    
    if (!normalizedDomains.includes(normalizedDomain)) {
      return res.status(403).json({ 
        error: 'Domain not authorized',
        details: {
          providedDomain: domain,
          authorizedDomains: license.domains
        }
      });
    }

    res.json({ 
      valid: true,
      license: {
        email: license.email,
        domains: license.domains,
        expiresAt: license.expiresAt,
        tokens: license.tokens
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error verifying license' });
  }
});

// Update license
router.put('/:id', auth, async (req, res) => {
  try {
    const { domains, status, expiresAt } = req.body;
    const license = await License.findOne({
      _id: req.params.id,
      userId: req.user.userId
    });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    if (domains) license.domains = domains;
    if (status) license.status = status;
    if (expiresAt) license.expiresAt = new Date(expiresAt);

    await license.save();
    res.json(license);
  } catch (error) {
    res.status(500).json({ error: 'Error updating license' });
  }
});

// Add tokens to license
router.post('/:licenseKey/tokens', auth, async (req, res) => {
  try {
    const { tokens } = req.body;
    
    if (!tokens || tokens <= 0) {
      return res.status(400).json({ error: 'Token amount must be greater than 0' });
    }

    const license = await License.findOne({ licenseKey: req.params.licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    const currentTokens = license.tokens || 0;
    const newTokens = currentTokens + parseInt(tokens);
    
    // Update only the tokens field while preserving other fields
    await License.findOneAndUpdate(
      { licenseKey: req.params.licenseKey },
      { $set: { tokens: newTokens } },
      { new: true }
    );

    res.json({ 
      message: 'Tokens added successfully',
      license: {
        licenseKey: license.licenseKey,
        email: license.email,
        tokens: newTokens,
        status: license.status
      }
    });
  } catch (error) {
    console.error('Token addition error:', error);
    res.status(500).json({ error: 'Error adding tokens' });
  }
});

// Get token balance
router.get('/:licenseKey/tokens', auth, async (req, res) => {
  try {
    const license = await License.findOne({ licenseKey: req.params.licenseKey });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    res.json({ 
      tokens: license.tokens || 0,
      licenseKey: license.licenseKey,
      email: license.email,
      status: license.status
    });
  } catch (error) {
    res.status(500).json({ error: 'Error getting token balance' });
  }
});

// Use token
router.post('/:licenseKey/use-token', auth, async (req, res) => {
  try {
    const license = await License.findOne({ licenseKey: req.params.licenseKey });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    if (!license.tokens || license.tokens <= 0) {
      return res.status(403).json({ error: 'No tokens available' });
    }

    license.tokens -= 1;
    await license.save();
    res.json({ 
      message: 'Token used successfully',
      tokens: license.tokens,
      licenseKey: license.licenseKey
    });
  } catch (error) {
    res.status(500).json({ error: 'Error using token' });
  }
});

// Get all licenses (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    const licenses = await License.find().select('licenseKey email domains tokens status expiresAt createdAt');
    res.json(licenses.map(license => ({
      licenseKey: license.licenseKey,
      email: license.email,
      domains: license.domains,
      tokens: license.tokens,
      status: license.status,
      expiresAt: license.expiresAt,
      createdAt: license.createdAt
    })));
  } catch (error) {
    console.error('Error fetching all licenses:', error);
    res.status(500).json({ error: 'Error fetching licenses' });
  }
});

// Delete license
router.delete('/:licenseKey', auth, async (req, res) => {
  try {
    const license = await License.findOneAndDelete({ licenseKey: req.params.licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }
    res.json({ message: 'License deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting license' });
  }
});

// Add domain to license
router.post('/:licenseKey/domains', auth, async (req, res) => {
  try {
    const { domain } = req.body;
    
    if (!domain) {
      return res.status(400).json({ error: 'Domain is required' });
    }

    const license = await License.findOne({ licenseKey: req.params.licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    // Check if domain already exists
    const normalizedDomain = domain.toLowerCase().trim();
    const normalizedDomains = license.domains.map(d => d.toLowerCase().trim());
    
    if (normalizedDomains.includes(normalizedDomain)) {
      return res.status(400).json({ error: 'Domain already exists for this license' });
    }

    // Add the new domain
    license.domains.push(domain);
    await license.save();

    res.json({ 
      message: 'Domain added successfully',
      license: {
        licenseKey: license.licenseKey,
        email: license.email,
        domains: license.domains,
        status: license.status
      }
    });
  } catch (error) {
    console.error('Domain addition error:', error);
    res.status(500).json({ error: 'Error adding domain' });
  }
});

module.exports = router; 