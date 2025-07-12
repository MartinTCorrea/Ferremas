const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol
    },
    'secreto_super_seguro', // reemplaza por un valor seguro en producción
    { expiresIn: '3h' }
  );
};

module.exports = generateToken;
