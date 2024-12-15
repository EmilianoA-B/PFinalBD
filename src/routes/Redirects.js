const router = require("express").Router();
const sqlserver = require('../db/dbConfig');
const sql = require('mssql');

router.get('/editarEmp/:id', async (req,res) => {
    try{
        const idEmp = Number(req.params.id);
        const operacion = 2
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, operacion)
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_ConsultarTrabajador');
        
        const Empleado = queryResponse.recordset;
        res.render('editarEmp', {Empleado: Empleado[0]});
    }catch(err) {
        console.error("Error obteniendo empleado para editar\n",err);
        res.status(500).json({message:"Error obteniendo empleado para editar"});
    }
    
});


router.get('/elimEmp/:id', async (req,res) => {
    try{
        const idEmp = Number(req.params.id);
        const operacion = 2
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, operacion)
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_ConsultarTrabajador');
        
        const Empleado = queryResponse.recordset;
        res.render('eliminarEmp', {Empleado: Empleado[0]});
    }catch(err) {
        console.error("Error obteniendo empleado para eliminar\n",err);
        res.status(500).json({message:"Error obteniendo empleado para eliminar"});
    }
});


router.get('/regEmp',(req,res) => {
    res.render('guardarEmp');
});


module.exports = router;