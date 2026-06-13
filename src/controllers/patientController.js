const db = require('../config/db');

// Create a new patient
exports.createPatient = async (req, res) => {
  const { dni, firstName, lastName, medicalInsurance, phone, email } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO pacientes (dni, nombre, apellido, obra_social, telefono, email) VALUES (?, ?, ?, ?, ?, ?)',
      [dni, firstName, lastName, medicalInsurance, phone, email],
    );
    res.status(201).json({ id: result.insertId, message: 'Patient created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pacientes');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
