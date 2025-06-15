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
    const { domains, expiresAt, tokens = 0 } = req.body;
    
    const license = new License({
      userId: req.user.userId,
      licenseKey: generateLicenseKey(),
      domains,
      expiresAt: new Date(expiresAt),
      tokens
    });

    await license.save();
    res.status(201).json(license);
  } catch (error) {
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

    // For testing purposes, accept any license key
    if (process.env.NODE_ENV === 'development') {
      return res.json({ valid: true });
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

    if (!license.domains.includes(domain)) {
      return res.status(403).json({ error: 'Domain not authorized' });
    }

    res.json({ valid: true });
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
    const license = await License.findOne({ licenseKey: req.params.licenseKey });

    if (!license) {
      return res.status(404).json({ error: 'License not found' });
    }

    license.tokens = (license.tokens || 0) + tokens;
    await license.save();
    res.json(license);
  } catch (error) {
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

    res.json({ tokens: license.tokens || 0 });
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
    res.json({ tokens: license.tokens });
  } catch (error) {
    res.status(500).json({ error: 'Error using token' });
  }
});

// Get all licenses (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    const licenses = await License.find();
    res.json(licenses);
  } catch (error) {
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

module.exports = router; 