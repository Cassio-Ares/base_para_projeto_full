import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { save, getByEmail } from '../user/index.js'


export const login = async (params) =>{
    const user = await getByEmail(params.email)

    if(!user){
        return { error: "E-mail ou senha invalido"}
    };

    const passwordOk = bcrypt.compareSync(params.password, user.password);

    if(!passwordOk){
        return { error: "E-mail ou senha invalido"}
    };

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1d'} );

    return { token }
};

export const register = async (params) => {
    const user = await getByEmail(params.email);

    if(user){
        return { error: "E-mail já esta cadastrado"}
    };
    
    const userCreated = await save(params);
    
    const token = jwt.sign({id: userCreated[0]}, process.env.JWT_SECRET, {expiresIn: '1d'})
    return {token}
};