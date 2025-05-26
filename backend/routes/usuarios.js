const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Obtener todos los usuarios
router.get('/', (req, res) => {
  userModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Crear usuario
router.post('/', (req, res) => {
  userModel.create(req.body, (err, usuario) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(usuario);
  });
});

// Actualizar usuario
router.put('/:id', (req, res) => {
  userModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario actualizado' });
  });
});

// Eliminar usuario
router.delete('/:id', (req, res) => {
  userModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Usuario eliminado' });
  });
});

module.exports = router;
