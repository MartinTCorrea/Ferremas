const db = require('../database/db');

module.exports = {
  findByUsername: (username, cb) => {
    db.get("SELECT * FROM usuarios WHERE username = ?", [username], cb);
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
  }
};