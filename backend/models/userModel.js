const db = require('../database/db');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
=======
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

module.exports = {
  findByUsername: (username, cb) => {
    db.get("SELECT * FROM usuarios WHERE username = ?", [username], cb);
  },
  findByEmail: (email, cb) => {
    db.get("SELECT * FROM usuarios WHERE email = ?", [email], cb);
  },
  create: (user, cb) => {
    const { nombre, username, email, password, rol } = user;
<<<<<<< HEAD
    // Validar campos obligatorios
    if (!nombre || !username || !email || !password || !rol) {
      return cb(new Error('Faltan campos obligatorios para crear el usuario.'));
    }
    // Hashear la contraseña antes de guardar
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) return cb(err);
      db.run(
        `INSERT INTO usuarios (nombre, username, email, password, rol) VALUES (?, ?, ?, ?, ?)`,
        [nombre, username, email, hash, rol],
        function (err) {
          // No devuelvas el hash en la respuesta
          const userResponse = { id: this.lastID, nombre, username, email, rol };
          cb(err, userResponse);
        }
      );
    });
=======
    db.run(
      `INSERT INTO usuarios (nombre, username, email, password, rol) VALUES (?, ?, ?, ?, ?)`,
      [nombre, username, email, password, rol],
      function (err) {
        cb(err, { id: this.lastID, ...user });
      }
    );
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694
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