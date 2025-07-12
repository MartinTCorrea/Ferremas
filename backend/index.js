const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const usuariosRouter = require('./routes/usuarios');

app.use(cors());
app.use(bodyParser.json());

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', require('./routes/productos'));
app.use('/api/auth', require('./routes/auth'));
app.use('/uploads', express.static('uploads'));
app.use('/api/carrito', require('./routes/carrito'));
app.use('/api/ventas', require('./routes/ventas'));

app.listen(PORT, () => {
  console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
});
