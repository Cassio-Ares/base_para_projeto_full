'use client'
import CategoriaUpdate from '@/components/Categorias/CategoriaUpdate';
import MetaCreate from '@/components/Meta/MetaCreate';
import MetaUpdate from '@/components/Meta/MetaUpdate';
import TrasacoesCreate from '@/components/Transacoes/TransacoesCreate';
import TransacoesUpdate from '@/components/Transacoes/TransacoesUpdate';
import axios from 'axios';
import { useEffect } from "react";

export const Dashboard = () => {
   useEffect(()=>{
     const token = localStorage.getItem('token');
    if(!token) {
        window.location.href = '/login';
    }
   
    axios.get('http://localhost:8080/users/me', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then().catch(()=>{
        window.location.href = '/login';
    });
    
});

   return (
    <div>
        <h1>Dashboard</h1>
        {/* <CategoriaCreate/>  */}
        {/* <CategoriaUpdate categoriaId={1}/> */}
        {/* <MetaCreate/> */}
        {/* <MetaUpdate metaId={ 1 }/>  */}
        {/**<TrasacoesCreate/> */}
        {/* <TransacoesUpdate /> */}
        
    </div>
   )
}

export default Dashboard;