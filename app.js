require('dotenv').config();
const express = require('express');
const RutaEmpleado = require('./src/routes/Empleados'); //Agregar rutas 
const RutaRedireccion = require('./src/routes/Redirects');
const path = require('path');
const conn = require('./src/db/dbConfig');
const app = express();



//Handling termination 
process.on('SIGINT', conn.shutdown);
process.on('SIGTERM', conn.shutdown);

//Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Logs routing
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();});

//Routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/Empleados', RutaEmpleado);
app.use('/red', RutaRedireccion);
app.get('/', (req,res) => {
    res.redirect('/Empleados/getEmpleados');
})

//Starting the server
app.listen(3000,()=>{console.log("Listening on port 3000")});

