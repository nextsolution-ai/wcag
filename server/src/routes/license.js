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
    const { domains, expiresAt } = req.body;
    
    const license = new License({
      userId: req.user.userId,
      licenseKey: generateLicenseKey(),
      domains,
      expiresAt: new Date(expiresAt)
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

module.exports = router; 