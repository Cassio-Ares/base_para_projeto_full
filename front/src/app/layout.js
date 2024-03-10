"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const inter = Inter({ subsets: ["latin"] });

const theme = createTheme({
  palette: {
    primary: {
      main: "#299D91",
    },
    background:{
      default: "#F4F5F7"
    },
    secondary:{
      main: "#f5f5f5"
    }
  },

  typography: {
    fontFamily: [ "Poppins", "sans-serif", ].join(","),
    h1:{
      fontFamily: 'Poppins',
      fontSize:'40px',
      fontWeight:'bold',
      lineHeight:'32px',
      letterSpacing:'0,08em'
    }, 
    h2:{
      fontFamily: 'Poppins',
      fontSize:'25px',
      fontWeight:'bold',
      lineHeight:'32px',
      letterSpacing:'0,08em'

    }
  },
});

export default function RootLayout({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ThemeProvider>
  );
}
