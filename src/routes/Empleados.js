const router = require('express').Router();
const sqlserver = require('../db/dbConfig');
const sql = require('mssql');

router.get('/getEmpleados/:id?', async (req,res) => {
    try{
        const idEmp = Number(req.params.id) || "";
        const operacion = idEmp ? 2 : 1;
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, operacion)
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_ConsultarTrabajador');
        res.json(queryResponse.recordset)
        
        
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
        const idEmp = req.body.ID_Empleado;
        const nombre = req.body.Nombre
        const apellidoP = req.body.Apellido;
        const sexo = req.body.Sexo;
        const fnac = req.body.F_Nacimiento;
        const idBarrio = req.body.ID_Barrio;
        const idPuesto = req.body.ID_Puesto;
        const idTipoTrabajo = req.body.ID_TipoTrabajo;
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, 2)
            .input('idEmp',sql.SmallInt, idEmp)
            .input('nomEmp',sql.VarChar, nombre)
            .input('apaEmp',sql.VarChar, apellidoP)
            .input('sexEmp',sql.VarChar, sexo)
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
        const idEmp = req.body.ID_Empleado;
        const nombre = req.body.Nombre
        const apellidoP = req.body.Apellido;
        const sexo = req.body.Sexo;
        const fnac = req.body.F_Nacimiento;
        const idBarrio = req.body.ID_Barrio;
        const idPuesto = req.body.ID_Puesto;
        const idTipoTrabajo = req.body.ID_TipoTrabajo;
        
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