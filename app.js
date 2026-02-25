const express = require('express');
const authRoutes = require('./api/auth');

module.exports = function createApp() {
    const app = express();
    
    app.use(express.json());
    app.use('/auth', authRoutes);
    return app;
};