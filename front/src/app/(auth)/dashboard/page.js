'use client'

import axios from 'axios';
import { useEffect } from "react";
import Chart from '@/components/Charts';

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
        <Chart/>
        
    </div>
   )
}

export default Dashboard;