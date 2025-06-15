const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const licenseRoutes = require('./server/src/routes/license');
const authRoutes = require('./server/src/routes/auth');

const app = express();

// Middleware
app.use(cors());  // Allow all origins
app.use(express.json());

// API Routes - These must come BEFORE static file serving
app.use('/api/licenses', licenseRoutes);
app.use('/api/auth', authRoutes);

// Serve static files - This must come AFTER API routes
app.use(express.static(path.join(__dirname, 'server/public')));

// Serve index.html for the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'server/public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/wcag-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 