const db = require('../database/db');

module.exports = {
  createVenta: (usuario_id, total, estado, confirmado, productos, cb) => {
    db.run(
      `INSERT INTO ventas (usuario_id, total, estado, confirmado) VALUES (?, ?, ?, ?)`,
      [usuario_id, total, estado, confirmado ? 1 : 0],
      function (err) {
        if (err) return cb(err);
        const venta_id = this.lastID;
        const stmt = db.prepare(
          `INSERT INTO venta_items (venta_id, producto_id, cantidad, precio) VALUES (?, ?, ?, ?)`
        );
        for (const prod of productos) {
          stmt.run(venta_id, prod.producto_id, prod.cantidad, prod.precio);
        }
        stmt.finalize((err2) => {
          if (err2) return cb(err2);
          cb(null, { id: venta_id, usuario_id, total, estado, confirmado, productos });
        });
      }
    );
  },
  getAll: (cb) => {
    db.all(
      `SELECT v.*, u.nombre as usuario_nombre FROM ventas v JOIN usuarios u ON v.usuario_id = u.id ORDER BY v.fecha DESC`,
      cb
    );
  },
  getById: (id, cb) => {
    db.get(
      `SELECT v.*, u.nombre as usuario_nombre FROM ventas v JOIN usuarios u ON v.usuario_id = u.id WHERE v.id = ?`,
      [id],
      cb
    );
  },
  getItems: (venta_id, cb) => {
    db.all(
      `SELECT vi.*, p.nombre FROM venta_items vi JOIN productos p ON vi.producto_id = p.id WHERE vi.venta_id = ?`,
      [venta_id],
      cb
    );
  },
  confirmarVenta: (id, cb) => {
    db.run(
      `UPDATE ventas SET confirmado = 1 WHERE id = ?`,
      [id],
      cb
    );
  },
  marcarPagada: (id, cb) => {
    db.run(
      `UPDATE ventas SET estado = 'pagada' WHERE id = ?`,
      [id],
      cb
    );
  }
}; 