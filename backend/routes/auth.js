const express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const generateToken = require('../utils/generateToken');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  const { nombreCompleto, username, email, password, rol = 'cliente' } = req.body;

  console.log('Intentando registrar usuario con:', req.body);

  // Verificar si el username ya existe
  userModel.findByUsername(username, async (err, userExistente) => {
    if (err) {
      console.error('Error buscando username:', err);
      return res.status(500).json({ message: 'Error de servidor' });
    }
    if (userExistente) {
      console.warn('Username ya existe:', username);
      return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
    }

    // Verificar si el email ya existe
    userModel.findByEmail(email, async (err, emailExistente) => {
      if (err) {
        console.error('Error buscando email:', err);
        return res.status(500).json({ message: 'Error de servidor' });
      }
      if (emailExistente) {
        console.warn('Email ya existe:', email);
        return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const nuevoUsuario = {
        nombre: nombreCompleto,
        username,
        email,
        password: hashedPassword,
        rol
      };

      console.log('Usuario a crear:', nuevoUsuario);

      userModel.create(nuevoUsuario, (err, creado) => {
        if (err) {
          console.error('Error al crear usuario:', err);
          return res.status(500).json({ message: 'Error al registrar usuario' });
        }
        console.log('Usuario creado correctamente:', creado);
        res.json({ message: 'Usuario registrado correctamente', usuario: creado });
      });
    });
  });
});


// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  userModel.findByUsername(username, async (err, user) => {
    if (err || !user) return res.status(401).json({ message: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = generateToken(user);
    res.json({ token, user });
  });
});


const db = require('../database/db');

router.get('/all', (req, res) => {
  db.all("SELECT * FROM usuarios", [], (err, rows) => {
    if (err) return res.status(500).json({ message: 'Error al obtener usuarios' });
    res.json(rows);
  });
});
module.exports = router;
