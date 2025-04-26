const express = require('express');
const cors = require('cors');
const app = express();

// Import routes
const centersRoutes = require('./routes/centers');
const userRoutes = require('./routes/user');
const adminRoutes = require('./routes/admin');

app.use(cors());
app.use(express.json());

app.use('/api/centers', centersRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));
