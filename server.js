 const path = require('path');
 const express = require('express');
 const app = require('./api/index');
 
 // Serve static files from root
 app.use(express.static(path.join(__dirname)));
 
 // Root route
 app.get('/', (req, res) => {
     res.sendFile(path.join(__dirname, 'index.html'));
 });
 
 const PORT = process.env.PORT || 5000;
 
 app.listen(PORT, () => {
     console.log(`\n===============================================`);
     console.log(`🏋️  FUERZA VIVA Server running at: http://localhost:${PORT}`);
     console.log(`📩  API Contact Endpoint: http://localhost:${PORT}/api/contact`);
     console.log(`===============================================\n`);
 });