import jwt from 'jsonwebtoken';
import { get } from '../modules/user/index.js';

export const authMiddleware = async (req, res, next) => {
   try{
     const userId = jwt.verify(req.token, process.env.JWT_SECRET);
     const user = await get(userId.id);
     req.user = user;
     next();
    }
   catch(error){
       return res.status(403).json({message: 'Token inválido'});
   }

}

export default authMiddleware;