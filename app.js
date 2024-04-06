const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    // Obtener la dirección IP de la interfaz de red
    const interfaces = os.networkInterfaces();
    let ipAddress = null;

    for (const key in interfaces) {
        for (const iface of interfaces[key]) {
            // Verificar si la interfaz de red no es loopback y es IPv4
            if (!iface.internal && iface.family === 'IPv4') {
                ipAddress = iface.address;
                break;
            }
        }
        if (ipAddress) break;
    }

    res.send(`La dirección IP de este servidor es: ${ipAddress}`);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
