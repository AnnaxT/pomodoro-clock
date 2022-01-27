import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import PhaseControl from './components/PhaseControl';
import Timer from './components/Timer';
import Buttons from './components/Buttons';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { mmss } from './mmss.js'
import React, { useState, useEffect, useRef } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import gong from './gong_sound.wav'

const mainRed = "#d32f2f";
const mainGreen = '#2e7d32';
const mainGrey = '#102027';
const lightGrey = "#62727b";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: mainGrey,
    },
    secondary: { 
      main: mainRed,
    },
    success: {
      main: mainGreen,
    }
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1000,
      lg: 1200,
      xl: 1536,
    },
  },
});

const useStyles = makeStyles(() => ({

    root: {
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      height: '100vh',
      weight: '100vw',
      backgroundColor: lightGrey,
      [`${theme.breakpoints.down('md')} and (orientation: landscape)`]: {
        height: 'auto',
    },
    },
    layout: {
      display: 'grid',
      gridRowGap: 12.5,
      [`${theme.breakpoints.down('md')} and (orientation: landscape)`]: {
        padding: '25px 0',
    },
      
   },
   phase: {
     display: 'flex',
     flexDirection: 'row',
     justifyContent: 'space-evenly',
     width: '100%',
   },
   components: {
    MuiCssBaseline: {
      styleOverrides: `
        font-weight: 400;
      }
      `,
    }
  }

}));



function App() {


   // Timer
   const [isCountingDown, setIsCountingDown] = useState(false);
   const [timerPhase, setTimerPhase] = useState('session');
   const [timerValue, setTimerValue] = useState(1500);

  // Break
  const [breakLength, setBreakLength] = useState(5);

  const incrementBreakLength = () => {
    if (!isCountingDown && breakLength < 60) {
      setBreakLength(breakLength + 1);

      if (timerPhase==="break") {
        setTimerValue(breakLength*60+60);
      }
      
    }
  }

  const decrementBreakLength = () => {
    if (!isCountingDown && breakLength > 1) {
      setBreakLength(breakLength - 1);

      if (timerPhase==="break") {
        setTimerValue(breakLength*60-60)
      }
     
    }
  }

  //Session
  const [sessionLength, setSessionLength] = useState(25);

  const incrementSessionLength = () => {
    if (!isCountingDown && sessionLength < 60 ) {
      setSessionLength(sessionLength + 1);

      if (timerPhase==="session") {
        setTimerValue(sessionLength* 60 +60)
      }
      
     
    }
  }

  const decrementSessionLength = () => {
    if (!isCountingDown && sessionLength > 1) {
      setSessionLength(sessionLength -1);
        

        if (timerPhase==="session") {
          setTimerValue(sessionLength* 60 -60)
        }
      
    }
  }

 


  const audioEl = useRef(null);

  useEffect(() => {
    const switchPhase = () => {
      if (timerPhase === 'session') {
        setTimerPhase('break');
        setTimerValue(breakLength * 60);
      } else {
        setTimerPhase('session');
        setTimerValue(sessionLength * 60);
      }
    };


    let intervalId;
    if (isCountingDown && timerValue > 1) {
      intervalId = setInterval(() => {
        setTimerValue(timerValue -1);
      }, 1000);

      // console.log(timerValue)

      // The timer has reached zero 
    } else if (isCountingDown && timerValue === 1) {
      // intervalId = setInterval(() => {
      //   setTimerValue(timerValue -1);
      // }, 1000);
      // console.log(timerValue)
      setTimeout(() => {
        setTimerValue(0)
        audioEl.current.play()
      },1000)
      // audioEl.current.currentTime=0;
      setTimeout(() => {
        switchPhase();
      },2000);
     
    } else {
      clearInterval(intervalId);
    } 

      // Clean up before the component unmounts
    return () =>  clearInterval(intervalId);

  }, [isCountingDown,timerValue,breakLength,sessionLength,timerPhase]);

    // Start Timer
    const startTimer = () => {
      setIsCountingDown(true);
    }

    // Stop Timer
    const stopTimer = () => {
      setIsCountingDown(false);

    }

    // Reset
    const resetTimer = () => {
      setIsCountingDown(false);
      setTimerPhase('session');
      setTimerValue(1500);
      setBreakLength(5);
      setSessionLength(25);
      audioEl.current.pause();
      audioEl.current.currentTime=0;

    }



    const classes = useStyles();

  return (
    <ThemeProvider theme={theme} >
       <CssBaseline />
    <div className={classes.root} >
      <div className={classes.layout} >
        <Header />
        <Container>
          <div className={classes.phase}>
            <PhaseControl
            session="break"
            phase={timerPhase}
            length={breakLength}
            onArrowDown={decrementBreakLength}
            onArrowUp={incrementBreakLength}
            />
            <PhaseControl
            session="session"
            phase={timerPhase}
            length={sessionLength}
            onArrowDown={decrementSessionLength}
            onArrowUp={incrementSessionLength}
            />
          </div>
          <Timer
            length = {mmss(timerValue)}
            session = {timerPhase}
            backgroundColor={theme.palette.secondary.main}
          />
          

          <Buttons
          session={timerPhase}
          isCountingDown={isCountingDown}
          onStartStop={isCountingDown ? stopTimer : startTimer}
          onReset={resetTimer}
          />
        </Container>
        <audio ref={audioEl} src={gong} id="beep"></audio>
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
