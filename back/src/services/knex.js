import knex from 'knex';
import knexConfig from '../config/database.js'
let conn;

const knexService = () =>{
    if(!conn){
        conn = knex(knexConfig);
    }

    return conn;
}



export default knexService;

/**
 * padrão basico para montar conexão
 *  * 
 * const conn = '';

const singleton = () =>{
    if(!conn){    se não tiver nada na variavel conn coloque 
        conn = '';
    }

    return conn;
}
 */