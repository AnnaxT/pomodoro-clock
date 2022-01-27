import React from 'react';
import { Paper } from '@mui/material';


const containerStyles = {
    display:'grid',
    gridTemplateRows: '1fr 1.75fr 1fr',
    backgroundColor: 'primary.main',
    backgroundImage: 'none',
    '@media screen and (max-width: 414px)': {
        width:'100vw',
    },

}


const Container = ({ children }) => {

    return (

        <Paper square outlined sx={containerStyles} elevation={15}>
            { children }
        </Paper>
    )
}

export default Container;