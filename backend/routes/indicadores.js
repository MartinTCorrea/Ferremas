const express = require('express');
const router = express.Router();
const https = require('https');

router.get('/dolar', (req, res) => {
    https.get('https://mindicador.cl/api', function(apiRes) {
        apiRes.setEncoding('utf-8');
        let data = '';
        apiRes.on('data', function(chunk) {
            data += chunk;
        });
        apiRes.on('end', function() {
            try {
                const dailyIndicators = JSON.parse(data);
                res.json({ valor: dailyIndicators.dolar.valor });
            } catch (e) {
                res.status(500).json({ error: 'Error al procesar la respuesta de la API' });
            }
        });
    }).on('error', function(err) {
        res.status(500).json({ error: 'Error al consumir la API' });
    });
});

module.exports = router;
