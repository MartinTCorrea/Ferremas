const db = require('../database/db');

module.exports = {
  getAll: (cb) => {
    db.all("SELECT * FROM productos", cb);
  },
  create: (producto, cb) => {
    const { nombre, descripcion, precio, stock, categoria, imagen } = producto;
    db.run(
      `INSERT INTO productos (nombre, descripcion, precio, stock, categoria, imagen) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, precio, stock, categoria, imagen],
      function (err) {
        cb(err, { id: this.lastID, ...producto });
      }
    );
  },
  update: (id, producto, cb) => {
    const { nombre, descripcion, precio, stock, categoria, imagen } = producto;
    db.run(
      `UPDATE productos SET nombre = ?, descripcion = ?, precio = ?, stock = ?, categoria = ?, imagen = ? WHERE id = ?`,
      [nombre, descripcion, precio, stock, categoria, imagen, id],
      cb
    );
  },
  delete: (id, cb) => {
    db.run("DELETE FROM productos WHERE id = ?", [id], cb);
  }
};
