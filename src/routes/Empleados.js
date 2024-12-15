const router = require('express').Router();
const sqlserver = require('../db/dbConfig');
const sql = require('mssql');

router.get('/getEmpleados/', async (req,res) => {
    try{
        const idEmp = Number(req.query.id) || "";
        const operacion = idEmp ? 2 : 1;
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, operacion)
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_ConsultarTrabajador');
        
        const Empleados = queryResponse.recordset;
        res.render('verEmp',{ Empleados });
    }catch(err) {
        console.error("Error obteniendo empleados\n",err);
        res.status(500).json({message:"Error obteniendo empleados"});
    }
});

router.delete('/delEmpleados/:id', async (req,res) => {
    try{
        const idEmp = Number(req.params.id);
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_EliminarTrabajador');
        res.status(200).json({message:`Se elimino al Empleado ${idEmp} correctamente`});
    }catch(err) {
        console.error("Error eliminando empleados\n",err);
        res.status(500).json({message:"Error eliminando el empleado"});
    }
});

router.put('/updEmpleados', async (req,res) => {
    try{
        const idEmp = Number(req.body.ID);
        const nombre = req.body.Nombre
        const apellidoP = req.body.Apellido;
        const sexo = req.body.Sexo;
        const fnac = req.body.FechaNacimiento;
        const idBarrio = req.body.Barrio;
        const idPuesto = req.body.Puesto;
        const idTipoTrabajo = req.body.TipoTrabajo;

        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, 2)
            .input('idEmp',sql.SmallInt, idEmp)
            .input('nomEmp',sql.VarChar(20), nombre)
            .input('apaEmp',sql.VarChar(15), apellidoP)
            .input('sexEmp',sql.VarChar(1), sexo)
            .input('fnaEmp',sql.Date, fnac)
            .input('idBarEmp',sql.SmallInt, idBarrio)
            .input('idPueEmp',sql.SmallInt, idPuesto)
            .input('idTipTraEmp',sql.SmallInt, idTipoTrabajo)
            .execute('sp_AdministrarTrabajadores');
        
        res.status(200).json({message:`Trabajador #${idEmp} actualizado correctamente`});
    }catch(err) {
        console.error("Error al actualizar trabajador\n",err);
        res.status(500).json({message:"Error al actualizar trabajador"});
    }
});

router.post('/insertEmpleados', async (req,res) => {
    try{
        const idEmp = Number(req.body.ID);
        const nombre = req.body.Nombre
        const apellidoP = req.body.Apellido;
        const sexo = req.body.Sexo;
        const fnac = req.body.FechaNacimiento;
        const idBarrio = req.body.Barrio;
        const idPuesto = req.body.Puesto;
        const idTipoTrabajo = req.body.TipoTrabajo;
        
        console.log(req.body);

        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, 1)
            .input('idEmp',sql.SmallInt, idEmp)
            .input('nomEmp',sql.VarChar, nombre)
            .input('apaEmp',sql.VarChar, apellidoP)
            .input('sexEmp',sql.VarChar, sexo)
            .input('fnaEmp',sql.Date, fnac)
            .input('idBarEmp',sql.SmallInt, idBarrio)
            .input('idPueEmp',sql.SmallInt, idPuesto)
            .input('idTipTraEmp',sql.SmallInt, idTipoTrabajo)
            .execute('sp_AdministrarTrabajadores');
        res.status(200).json({message:"Trabajador insertado correctamente"});
    }catch(err) {
        console.error("Error al insertar trabajador\n",err);
        res.status(500).json({message:"Error la insertar trabajador"});
    }
});


module.exports = router;