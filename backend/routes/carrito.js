const express = require('express');
const router = express.Router();
const carritoModel = require('../models/carritoModel');

// Obtener el carrito de un usuario
router.get('/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;
  carritoModel.obtenerCarritoPorUsuario(usuario_id, (err, carrito) => {
    if (err) return res.status(500).json({ error: 'Error al obtener el carrito' });
    if (!carrito) {
      // Si no existe, lo crea
      carritoModel.crearCarrito(usuario_id, (err, nuevoCarrito) => {
        if (err) return res.status(500).json({ error: 'Error al crear el carrito' });
        return res.json({ carrito: nuevoCarrito, items: [] });
      });
    } else {
      carritoModel.obtenerItems(carrito.id, (err, items) => {
        if (err) return res.status(500).json({ error: 'Error al obtener los items del carrito' });
        return res.json({ carrito, items });
      });
    }
  });
});

// Agregar item al carrito
router.post('/:carrito_id/items', (req, res) => {
  const { carrito_id } = req.params;
  const { producto_id, cantidad } = req.body;
  carritoModel.agregarItem(carrito_id, producto_id, cantidad, (err, item) => {
    if (err) return res.status(500).json({ error: 'Error al agregar el item' });
    return res.json(item);
  });
});

// Actualizar cantidad de un item
router.put('/items/:item_id', (req, res) => {
  const { item_id } = req.params;
  const { cantidad } = req.body;
  carritoModel.actualizarCantidad(item_id, cantidad, (err) => {
    if (err) return res.status(500).json({ error: 'Error al actualizar la cantidad' });
    return res.json({ success: true });
  });
});

// Eliminar un item del carrito
router.delete('/items/:item_id', (req, res) => {
  const { item_id } = req.params;
  carritoModel.eliminarItem(item_id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar el item' });
    return res.json({ success: true });
  });
});

// Vaciar el carrito
router.delete('/:carrito_id/items', (req, res) => {
  const { carrito_id } = req.params;
  carritoModel.vaciarCarrito(carrito_id, (err) => {
    if (err) return res.status(500).json({ error: 'Error al vaciar el carrito' });
    return res.json({ success: true });
  });
});

module.exports = router; 