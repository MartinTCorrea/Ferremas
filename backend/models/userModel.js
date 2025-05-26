const db = require('../database/db');

module.exports = {
  findByUsername: (username, cb) => {
    db.get("SELECT * FROM usuarios WHERE username = ?", [username], cb);
  },
  findByEmail: (email, cb) => {
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], cb);
  },
  create: (user, cb) => {
    const { nombre, username, email, password, rol } = user;
    db.run(
      `INSERT INTO usuarios (nombre, username, email, password, rol) VALUES (?, ?, ?, ?, ?)`,
      [nombre, username, email, password, rol],
      function (err) {
        cb(err, { id: this.lastID, ...user });
      }
    );
  },
  getAll: (cb) => {
    db.all("SELECT * FROM usuarios", cb);
  },
  update: (id, user, cb) => {
    const { nombre, username, email, password, rol } = user;
    // Si no se pasa password, no lo actualizamos
    if (password) {
      db.run(
        `UPDATE usuarios SET nombre = ?, username = ?, email = ?, password = ?, rol = ? WHERE id = ?`,
        [nombre, username, email, password, rol, id],
        cb
      );
    } else {
      db.run(
        `UPDATE usuarios SET nombre = ?, username = ?, email = ?, rol = ? WHERE id = ?`,
        [nombre, username, email, rol, id],
        cb
      );
    }
  },
  delete: (id, cb) => {
    db.run("DELETE FROM usuarios WHERE id = ?", [id], cb);
  }
};