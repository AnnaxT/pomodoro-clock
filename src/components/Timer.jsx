import React from 'react';
import { Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 10,
    },
    label: {
        textTransform: 'uppercase',
        padding: 10,
        letterSpacing: '5px !important',
    }
})
 const Timer = ({ session, length }) => {

    const classes = useStyles();
    const bgColor = session === 'break' ? 'success.main' : 'primary.main';

    return(
        <Box className={classes.root} backgroundColor={bgColor}>
            <Typography
            className={classes.label}
            variant='h3'
            >
                {session}
            </Typography>
            <Typography
            id="time-left"
            variant="h2"
            >
                {length}
            </Typography>
        </Box>
    )
}

export default Timer;