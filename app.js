const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Servidor API corriendo en http://10.214.163.61:${PORT}`); 
});
