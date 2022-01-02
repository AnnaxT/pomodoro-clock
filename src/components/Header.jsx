import React from 'react';
import { Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const useStyles = makeStyles({
    root: {  
        textAlign: 'center',
        padding: 20,
        backgroundColor: '#102027 !important',
        color: '#fff !important',
        }
    
});

const Header = () => {

    const classes = useStyles();

    return( 
        <Paper
       
        square
        className={classes.root} 
        elevation={15}
        >
            <Typography variant="h2" component="h1"> 
                Pomodoro Cl
                <AccessAlarmIcon sx={{ fontSize: 45, color: 'primary.main', marginBottom: '-5px' }} />
                ck
            </Typography>
        </Paper>
    )
}

export default Header;

