const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const licenseRoutes = require('./src/routes/license');
const authRoutes = require('./src/routes/auth');

const app = express();

// Middleware
app.use(cors());  // Allow all origins
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/licenses', licenseRoutes);
app.use('/api/auth', authRoutes);

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/wcag-project', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
}); 