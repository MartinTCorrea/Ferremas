const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usuariosRouter = require('./routes/usuarios');
<<<<<<< HEAD
=======
const indicadoresRoutes = require('./routes/indicadores');
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

app.use(cors());
app.use(bodyParser.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', require('./routes/productos'));
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));
app.use('/api/carrito', require('./routes/carrito'));
app.use('/api/ventas', require('./routes/ventas'));
<<<<<<< HEAD
=======
app.use('/api/indicadores', indicadoresRoutes);
>>>>>>> 373278fd6545070e041e08fd8e3c31dff81e7694

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
