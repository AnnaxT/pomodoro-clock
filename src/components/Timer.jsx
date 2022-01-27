import React, {useRef, useEffect} from 'react';
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

    const audioEl = useRef(null);
    const classes = useStyles();
    const bgColor = session === 'break' ? 'success.main' : 'secondary.main';

    
    const playSound = () => {
    
        const audio = audioEl.current;
        if (audio === null) return;
    
        audio.currentTime = 0;
        audio.play();
    }

    const stopSound = () => {
        const audio = audioEl.current;
        if (audio === null) return;
    
        audio.pause();
    }

    return(
        <Box className={classes.root} backgroundColor={bgColor}>
            <Typography
            className={classes.label}
            variant='h3'
            id="timer-label"
            >
                {session}
            </Typography>
            <Typography
            id="time-left"
            variant="h2"
            >
                {length}
            </Typography>
            <audio ref={audioEl} src="src/Bell Sound Ring-SoundBible.com-181681426.mp3" className="beep" id="beep"></audio>
        </Box>
    )
}

export default Timer;