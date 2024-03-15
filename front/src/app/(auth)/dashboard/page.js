"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Chart from "@/components/Charts";
import Panel from "@/components/Panel";


export const Dashboard = () => {
    const [user, setUser]= useState({
        id: null
    })

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }

    axios
      .get("http://localhost:8080/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => setUser(response.data.data))
      .catch(() => {
        window.location.href = "/login";
      });
  });

  return (
    <>
      <h1 style={{marginTop: '12px'}}>Olá, {user.name}</h1>
      <Panel/>
     
      <div style={{ marginLeft: "80px" }}> 
        <Chart  />
      </div>
    </>
  );
};

export default Dashboard;
