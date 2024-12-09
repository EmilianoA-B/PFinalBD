const router = require('express').Router();
const sqlserver = require('../db/dbConfig');

router.get('/test', async (req,res) => {
    try{
        const activeConnection = await sqlserver.connectionDB();
        const response = await activeConnection.request().query('select * from cat_Puestos');
        res.json(response.recordset);
    }catch(err) {
        console.error("Error in test query",err);
        res.status(500).json({message:"Error retrieving test query"});
    }
});

module.exports = router;