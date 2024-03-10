"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import GridViewIcon from "@mui/icons-material/GridView";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import LogoutIcon from "@mui/icons-material/Logout";

import {useRouter} from 'next/navigation'

import * as S from "./style.jsx";

const drawerWidth = 280;

export const Menu = ({ children }) => {
  const router = useRouter()
  const logout = () => {
    localStorage.removeItem("token");
    router.push('/login')
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      ></AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            background: "#000",
            color: "#f5f5f5",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <S.Typography variant="h1" color="primary">
          YOURfinance.IO
        </S.Typography>
        <List>
          <S.Link href="/dashboard">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <GridViewIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Meu Painel" />
              </ListItemButton>
            </ListItem>
          </S.Link>

          <S.Link href="/categoria">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountBalanceWalletIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Categoria" />
              </ListItemButton>
            </ListItem>
          </S.Link>

          <S.Link href="/extrato">
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <SwapHorizIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Extrato" />
              </ListItemButton>
            </ListItem>
          </S.Link>

        
           <ListItem disablePadding>
              <ListItemButton onClick={ logout }>
                <ListItemIcon>
                  <LogoutIcon color="secondary" />
                </ListItemIcon>
                <ListItemText primary="Sair" />
              </ListItemButton>
            </ListItem>
         
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Menu;
