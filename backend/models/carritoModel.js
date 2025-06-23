const db = require('../database/db');

module.exports = {
  crearCarrito: (usuario_id, cb) => {
    db.run(
      `INSERT INTO carrito (usuario_id) VALUES (?)`,
      [usuario_id],
      function (err) {
        cb(err, { id: this.lastID, usuario_id });
      }
    );
  },
  obtenerCarritoPorUsuario: (usuario_id, cb) => {
    db.get(
      `SELECT * FROM carrito WHERE usuario_id = ? ORDER BY actualizado_en DESC LIMIT 1`,
      [usuario_id],
      cb
    );
  },
  agregarItem: (carrito_id, producto_id, cantidad, cb) => {
    db.get(
      `SELECT id, cantidad FROM carrito_items WHERE carrito_id = ? AND producto_id = ?`,
      [carrito_id, producto_id],
      (err, row) => {
        if (err) return cb(err);
        if (row) {
          // Ya existe, sumamos la cantidad (máximo 10)
          const nuevaCantidad = Math.min(row.cantidad + cantidad, 10);
          db.run(
            `UPDATE carrito_items SET cantidad = ? WHERE id = ?`,
            [nuevaCantidad, row.id],
            function (err2) {
              cb(err2, { id: row.id, carrito_id, producto_id, cantidad: nuevaCantidad });
            }
          );
        } else {
          db.run(
            `INSERT INTO carrito_items (carrito_id, producto_id, cantidad) VALUES (?, ?, ?)`,
            [carrito_id, producto_id, cantidad],
            function (err2) {
              cb(err2, { id: this.lastID, carrito_id, producto_id, cantidad });
            }
          );
        }
      }
    );
  },
  actualizarCantidad: (item_id, cantidad, cb) => {
    db.run(
      `UPDATE carrito_items SET cantidad = ? WHERE id = ?`,
      [cantidad, item_id],
      cb
    );
  },
  eliminarItem: (item_id, cb) => {
    db.run(
      `DELETE FROM carrito_items WHERE id = ?`,
      [item_id],
      cb
    );
  },
  obtenerItems: (carrito_id, cb) => {
    db.all(
      `SELECT ci.*, p.nombre, p.precio, p.imagen FROM carrito_items ci JOIN productos p ON ci.producto_id = p.id WHERE ci.carrito_id = ?`,
      [carrito_id],
      cb
    );
  },
  vaciarCarrito: (carrito_id, cb) => {
    db.run(
      `DELETE FROM carrito_items WHERE carrito_id = ?`,
      [carrito_id],
      cb
    );
  }
}; 