import React from 'react';
import { Paper, Typography } from '@mui/material';


const footerStyles = {
    textAlign: "center",
    padding: 3,
    backgroundColor: 'primary.main',
    backgroundImage: 'none',
}

const Footer = () => {

    return(
        <Paper sx={footerStyles} square elevation={15} >
            <Typography variant="h6" >
                Coded by Anna Tyrka
            </Typography> 
        </Paper>
    )
}

export default Footer;