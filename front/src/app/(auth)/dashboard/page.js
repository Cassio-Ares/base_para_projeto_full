'use client'
import axios from 'axios';
import { useEffect } from "react";

export const Dashboard = () => {
   useEffect(()=>{
     const token = localStorage.getItem('token');
    if(!token) {
        window.location.href = '/login';
    }

    axios.get('http://localhost:8080/user/me', {
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
    </div>
   )
}

export default Dashboard;