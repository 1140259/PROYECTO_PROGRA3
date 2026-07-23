const express = require('express');
const morgan = require('morgan');
const mysql = require('mysql');
const cors = require('cors');
const myConnection = require('express-myconnection');
const bodyParser = require('body-parser');

const app = express();

// Configuración CORS
app.use(cors({ origin: "http://localhost:4300", credentials: true })); // Angular usa 4200

app.set('port', process.env.PORT || 4000);
app.use(morgan('dev'));

// Conexión MySQL
app.use(myConnection(mysql, {
  host: 'localhost',
  user: 'root',
  password: 'COMERCIAL900',   // 
  port: 3306,
  database: 'PROYECTO'     // 
}, 'single'));

app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
const empleadoRoutes = require('./rutas/empleado');
app.use('/empleados', empleadoRoutes);

// Inicializar servidor
app.listen(app.get('port'), () => {
  console.log("Servidor corriendo en puerto 4000 ");
});
