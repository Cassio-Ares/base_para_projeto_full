import styled from '@emotion/styled';
import TypographyMUI from '@mui/material/Typography';
import LinkNEXT from "next/link";

export const Typography = styled(TypographyMUI)`
margin: 48px 10px;
 font-size:35px
`

export const Link = styled(LinkNEXT)`
 text-decoration: none;
 color: ${({theme})=> theme.palette.secondary.main}
`
