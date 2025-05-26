const express = require('express');
const router = express.Router();
const productoModel = require('../models/productoModel');

router.get('/', (req, res) => {
  productoModel.getAll((err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

router.post('/', (req, res) => {
  productoModel.create(req.body, (err, producto) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(producto);
  });
});

router.put('/:id', (req, res) => {
  productoModel.update(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto actualizado' });
  });
});

router.delete('/:id', (req, res) => {
  productoModel.delete(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Producto eliminado' });
  });
});

router.get('/:id', (req, res) => {
  productoModel.getById(req.params.id, (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(row);
  });
});

module.exports = router;
