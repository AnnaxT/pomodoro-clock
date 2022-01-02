import React from 'react';
import { Paper, Typography } from '@mui/material';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles({
    root: {
        textAlign: "center",
        padding: 15,
       backgroundColor: '#102027 !important',
        color: '#fff !important',
    }
})


export default function Header() {

    const classes = useStyles();

    return(
        <Paper className={classes.root} square elevation={15} >
            <Typography variant="h6" component="h5" >
                Coded by Anna Tyrka
            </Typography> 
        </Paper>
    )
}