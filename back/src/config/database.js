
const knexConfig ={
    client: 'mysql2',
    connection:{
        host: process.env.DB_HOST || 'localhost',
        port: 3306,
        user: process.env.DB_USER || 'cassio',
        password: process.env.DB_PASSWORD || '46590710',
        database: process.env.DB_NAME || 'db'
    }
}


export default knexConfig;