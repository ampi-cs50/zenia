const express = require('express');
require('dotenv').config();
const patientRoutes = require('./src/routes/patientRoutes');
const doctorRoutes = require('./src/routes/doctorRoutes');

const app = express();
app.use(express.json());

// Link patient routes
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);

// Basic status route
app.get('/api/status', (req, res) => {
  res.json({ status: 'Zenia API running smoothly' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
