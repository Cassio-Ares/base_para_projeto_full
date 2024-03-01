'use client'

import styled from '@emotion/styled';

import ButtonMUI  from "@mui/material/Button";
import TextFieldMUI from "@mui/material/TextField";
import SnackbarMUI from '@mui/material/Snackbar';
import AlertMui from '@mui/material/Alert';


export const Form = styled.form`
     display: flex;
     flex-direction: column;
     align-items: center;
     justify-content: center;
     gap: 12px;
     width: 400px;
`

export const Button = styled(ButtonMUI)``

export const TextField = styled(TextFieldMUI)``

export const H1 = styled.h1``

export const Snackbar = styled(SnackbarMUI)``

export const Alert = styled(AlertMui)``