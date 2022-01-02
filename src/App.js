import './App.css';
import Header from './components/Header';
import Container from './components/Container';
import Footer from './components/Footer';
import PhaseControl from './components/PhaseControl';
import Timer from './components/Timer';
import Buttons from './components/Buttons';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { mmss } from './mmss.js'
import React, { useState, useRef, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';

const mainRed = "#d32f2f";
const mainGrey ="#37474f";
const lightGrey = "#62727b";
const mainGreen = '#2e7d32';
const darkGray = '#102027';

const useStyles = makeStyles(theme => ({

    root: {
      display: 'flex',
      justifyContent:'center',
      alignItems: 'center',
      height: '100vh',
      weight: '100vw',
      backgroundColor: lightGrey,
    },
    layout: {
      display: 'grid',
      gridRowGap: 15,
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

const theme = createTheme({
  palette: {
    primary: {
      main: mainRed,
    },
    secondary: {
      main: mainGrey,
      light: lightGrey,
      dark: darkGray,
    },
    success: {
      main: mainGreen,
    }
  }
});

function App() {

  // Break
  const [breakLength, setBreakLength] = useState(5);

  const incrementBreakLength = () => {
    if (!isCountingDown && breakLength < 60) {
      setBreakLength(breakLength + 1);
    }
  }

  const decrementBreakLength = () => {
    if (!isCountingDown && breakLength > 1) {
      setBreakLength(breakLength - 1);
    }
  }

  //Session
  const [sessionLength, setSessionLength] = useState(25);

  const incrementSessionLength = () => {
    if (!isCountingDown && sessionLength < 60 ) {
      setSessionLength(sessionLength + 1);
      setTimerValue(sessionLength* 60 + 60)
    }
  }

  const decrementSessionLength = () => {
    if (!isCountingDown && sessionLength > 1) {
      setSessionLength(sessionLength -1);
      setTimerValue(sessionLength* 60 -60)
    }
  }

  // Timer
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [timerPhase, setTimerPhase] = useState('session');
  const [timerValue, setTimerValue] = useState(1500);

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

    // Interval - to be checked

    let intervalId;
    if (isCountingDown && timerValue > 0) {
      intervalId = setInterval(() => {
        setTimerValue(timerValue -1);
      }, 1000);

      // The timer has reached zero 
    } else if (isCountingDown && timerValue === 0) {
      intervalId = setInterval(() => {
        setTimerValue(timerValue - 1);
      }, 1000);
      switchPhase();
    } else {
      clearInterval(intervalId);
    } 

      // Clean up

    return () => clearInterval(intervalId);
  });

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
        <Footer />
      </div>
    </div>
    </ThemeProvider>
  );
}

export default App;
