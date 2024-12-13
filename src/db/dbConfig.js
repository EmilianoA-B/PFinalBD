//Configuracion de parametros para conexion a base de datos
const sql = require("mssql");

const configBD = 
{
    user:process.env.DBUSER,
    password: process.env.DBPSSWRD,
    database:process.env.DBDATABASE,
    server:'localhost',
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
}
let pool;

async function connectionDB() {
    if(!pool){
        try{
            pool = await sql.connect(configBD);
            console.log(`Connection SUCCESS - ${process.env.DBDATABASE}`);
            
        }catch{
            console.error(`Connection FAILED - ${process.env.DBDATABASE}`);
            throw new Error("Database connection failed");
        }
    }
    return pool;
}

async function shutdown(){
    if(pool){
        await pool.close();
        console.log(`Graceful shutdown - ${process.env.DBDATABASE}`)
    }
    process.exit(0);
}

module.exports = {
    connectionDB,
    shutdown
}