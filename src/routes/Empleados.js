const router = require('express').Router();
const sqlserver = require('../db/dbConfig');
const sql = require('mssql');

router.get('/getTodosEmpleados/:Oper', async (req,res) => {
    try{
        const operacion = req.params.Oper;
        let idEmp = req.query.empl;
        
        const activeConnection = await sqlserver.connectionDB();
        const queryResponse = await activeConnection.request()
            .input('tipOp',sql.SmallInt, operacion)
            .input('idEmp',sql.SmallInt, idEmp)
            .execute('sp_ConsultarTrabajador');
        res.json(queryResponse.recordset);
        
        
    }catch(err) {
        console.error("Error obteniendo empleados\n",err);
        res.status(500).json({message:"Error obteniendo empleados"});
    }
});



module.exports = router;