import express from 'express';
import userRoute from './modules/user/user.route.js'
const app = express();

app.use(express.json());

app.use('/users', userRoute);

app.get('/health', (_, res)=>{
    return res.send('Servidor rodando, ok')
})



app.listen(8080, ()=>{
   console.log('listening on');
})