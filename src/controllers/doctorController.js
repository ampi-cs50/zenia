const db = require('../config/db');

// Create a new doctor
exports.createDoctor = async (req, res) => {
  const { firstName, lastName, specialty, acceptedInsurances } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO medicos (nombre, apellido, especialidad, obras_sociales_aceptadas) VALUES (?, ?, ?, ?)',
      [firstName, lastName, specialty, acceptedInsurances],
    );
    res.status(201).json({ id: result.insertId, message: 'Doctor created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all doctors
exports.getAllDoctors = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM medicos');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
