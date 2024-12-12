require('dotenv').config()
const express = require('express');
const testRoute = require('./src/routes/Empleados'); //Agregar rutas 
const conn = require('./src/db/dbConfig') 

const app = express();



//Handling termination 
process.on('SIGINT', conn.shutdown);
process.on('SIGTERM', conn.shutdown);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/apiTest', testRoute);

//Starting the server
app.listen(3000,()=>{console.log("Listening on port 3000")})

