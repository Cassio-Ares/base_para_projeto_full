import dotenv from 'dotenv';

dotenv.config();


const knexConfig ={
    client: 'mysql2',
    connection:{
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'password',
        database: process.env.DB_NAME || 'database'
    }
}


export default knexConfig;