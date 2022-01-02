import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: 'grid',
        gridTemplateColumns: 'repeat(1, 1fr)',
        backgroundColor: '#102027 !important',
        color: '#fff !important',
        justifyItems: 'center',
    },

});


const Container = ({ children }) => {
    const classes = useStyles();

    return (

        <Paper square outlined className = {classes.root} elevation={15}>
            { children }
        </Paper>
    )
}

export default Container;