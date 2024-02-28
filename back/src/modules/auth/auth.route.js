import { Router } from 'express';
import { save } from '../user/index.js';
import { login, register } from './index.js'


export const routes = Router();

routes.post('/login', async (req, res) => {
   const data = await login(req.body);
   res.status(200).json({ data });
});

routes.post('/register', async (req, res)=>{
   const data = await register(req.body);
   res.status(200).json({ data });
})

export default routes;