const conn = '';

const knexService = () =>{
    if(!conn){
        conn = '';
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