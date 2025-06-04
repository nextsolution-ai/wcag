const express = require('express');
const router = express.Router();
const UsageLog = require('../models/UsageLog');
const License = require('../models/License');

// Track usage
router.post('/track', async (req, res) => {
  try {
    const { licenseKey, domain, featuresUsed } = req.body;

    const license = await License.findOne({ licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'Invalid license key' });
    }

    const usageLog = new UsageLog({
      licenseId: license._id,
      domain,
      pageViews: 1
    });

    await usageLog.save();
    res.status(201).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Error tracking usage' });
  }
});

// Get usage statistics
router.get('/stats', async (req, res) => {
  try {
    const { licenseKey, startDate, endDate } = req.query;

    const license = await License.findOne({ licenseKey });
    if (!license) {
      return res.status(404).json({ error: 'Invalid license key' });
    }

    const query = {
      licenseId: license._id
    };

    if (startDate && endDate) {
      query.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const stats = await UsageLog.aggregate([
    { $match: query },
        { $group: {
                        _id: '$domain',
                        totalPageViews: { $sum: '$pageViews' }
                    }
                    }
                ]);
                

                res.json(stats);
            } catch (error) {
                res.status(500).json({ error: 'Error fetching usage statistics' });
            }
            });

module.exports = router; 