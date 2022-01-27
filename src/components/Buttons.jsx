import React from 'react';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'space-evenly',
        alignItems: 'center',
        width: '85%',
        margin: 'auto',
    }
})

const Buttons = ({ isCountingDown, onStartStop, onReset, session }) => {

    const classes = useStyles();
    const bgColor = session === 'break' ? 'success' : 'secondary';

    
    return(
        <div className = {classes.root}>
            <IconButton
            id="start_stop"
            onClick={() => onStartStop()}
            >
                {/* Change icon accordingly to timer state */}
                {isCountingDown ? (
                    <PauseCircleOutlineIcon fontSize="large" color={bgColor}/>
                ) : (
                    <PlayCircleOutlineIcon fontSize='large' color={bgColor}/>
                )}
            </IconButton>

            <IconButton
            id="reset"
            onClick={()=> onReset()}
            >
                <AutorenewIcon
                    fontSize="large"
                    color={bgColor}
                />
            </IconButton>
        </div>
);
}

export default Buttons;

Buttons.propTypes = {
    isCountingDown: PropTypes.bool.isRequired,
    onStartStop: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
}