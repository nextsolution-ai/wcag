const mongoose = require('mongoose');

const usageLogSchema = new mongoose.Schema({
  licenseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'License',
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  pageViews: {
    type: Number,
    default: 0
  },
  featuresUsed: {
    type: Map,
    of: Number,
    default: new Map()
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('UsageLog', usageLogSchema); 