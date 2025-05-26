const express = require('express');
const router = express.Router();
const ventaModel = require('../models/ventaModel');
const PDFDocument = require('pdfkit');

// Crear una venta (estado inicial: pendiente)
router.post('/', (req, res) => {
  const { usuario_id, total, productos } = req.body;
  if (!usuario_id || !total || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Datos incompletos para la venta' });
  }
  ventaModel.createVenta(
    usuario_id,
    total,
    'pendiente', // estado inicial
    false,
    productos,
    (err, venta) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ venta });
    }
  );
});

// Endpoint para que contabilidad marque la venta como pagada
router.put('/:id/pagar', (req, res) => {
  ventaModel.marcarPagada(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

// Endpoint para descargar PDF de ventas del mes actual (debe ir antes de /:id)
router.get('/pdf-mes', (req, res) => {
  ventaModel.getAll((err, ventas) => {
    if (err) return res.status(500).json({ error: err.message });
    // Filtrar ventas del mes actual
    const now = new Date();
    const mes = now.getMonth();
    const anio = now.getFullYear();
    const ventasMes = ventas.filter(v => {
      const fecha = new Date(v.fecha);
      return fecha.getMonth() === mes && fecha.getFullYear() === anio;
    });
    // Calcular total
    const totalMes = ventasMes.reduce((acc, v) => acc + v.total, 0);
    // Generar PDF
    const doc = new PDFDocument({ margin: 30, size: 'A4' });
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="ventas_mes.pdf"');
    doc.fontSize(18).text('Reporte de Ventas del Mes', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12);
    doc.text(`Fecha de generación: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`);
    doc.moveDown();
    // Tabla
    doc.font('Helvetica-Bold').text('ID', 30, doc.y, { continued: true });
    doc.text('Cliente', 70, doc.y, { continued: true });
    doc.text('Fecha', 200, doc.y, { continued: true });
    doc.text('Total', 350, doc.y);
    doc.font('Helvetica');
    ventasMes.forEach(v => {
      doc.text(v.id.toString(), 30, doc.y, { continued: true });
      doc.text(v.usuario_nombre, 70, doc.y, { continued: true });
      doc.text(new Date(v.fecha).toLocaleDateString(), 200, doc.y, { continued: true });
      doc.text(`$${v.total.toFixed(2)}`, 350, doc.y);
    });
    doc.moveDown();
    doc.font('Helvetica-Bold').text(`Total de ventas del mes: $${totalMes.toFixed(2)}`, { align: 'right' });
    doc.end();
    doc.pipe(res);
  });
});

// Obtener todas las ventas
router.get('/', (req, res) => {
  ventaModel.getAll((err, ventas) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(ventas);
  });
});

// Obtener una venta por id (con sus productos)
router.get('/:id', (req, res) => {
  ventaModel.getById(req.params.id, (err, venta) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!venta) return res.status(404).json({ error: 'Venta no encontrada' });
    ventaModel.getItems(req.params.id, (err2, items) => {
      if (err2) return res.status(500).json({ error: err2.message });
      res.json({ ...venta, items });
    });
  });
});

// Confirmar una venta (vendedor)
router.put('/:id/confirmar', (req, res) => {
  ventaModel.confirmarVenta(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true });
  });
});

module.exports = router; 