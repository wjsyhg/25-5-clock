import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faRefresh, faPause} from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';

const App = () => {
  const BREAK_DECREMENT = 'break-decrement';
  const BREAK_INCREMENT = 'break-increment';
  const SESSION_DECREMENT = 'session-decrement';
  const SESSION_INCREMENT = 'session-increment';

  const [breakLength, setBreakLength] = useState('5');
  const [sessionLength, setSessionLength] = useState('25');
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [timeRunning, setTimeRunning] = useState(false);
  const [timeLabel, setTimeLabel] = useState('Session');


  useEffect(() => {
    setTimeLeft(sessionLength * 60);
  }, [sessionLength]);

  useEffect(() => {
    if (timeLeft === 0) {
        const audio = document.getElementById('beep');
        audio.play();

        setTimeout(() => {
          if (timeLabel === 'Session') {
            setTimeLabel('Break');
            setTimeLeft(breakLength * 60);
          } else {
            setTimeLabel('Session');
            setTimeLeft(sessionLength * 60);
          }     
        }, 1000);
        
      }

      
    }, [timeLeft, timeLabel, breakLength, sessionLength]);

  useEffect(() => {
    let interval;

    if (timeRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timeLeft, timeRunning]);

  

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleClick = (value) => {
    if (!timeRunning) {
      switch(value) {
        case BREAK_DECREMENT:
          if (breakLength > 1) {
            setBreakLength(prevLength => {
              const length = parseInt(prevLength) - 1;
              return length.toString();
            });
            break;
          } else {
            setBreakLength('1');
            break;
          }
        case BREAK_INCREMENT:
          if (breakLength < 60) {
            setBreakLength(prevLength => {
              const length = parseInt(prevLength) + 1;
              return length.toString();
            });
            break;
          } else {
            setBreakLength('60');
            break;
          }
        case SESSION_DECREMENT:
          if (sessionLength > 1) {
            setSessionLength(prevLength => {
              const length = parseInt(prevLength) - 1;
              return length.toString();
            });
            break;
          } else {
            setSessionLength('1');
            break;
          }
        case SESSION_INCREMENT:
          if (sessionLength < 60) {
            setSessionLength(prevLength => {
              const length = parseInt(prevLength) + 1;
              return length.toString();
            });
            break;
          } else {
            setSessionLength('60');
            break;
          }      
        default:
          break;
      }
    }
    
  };

  const toggleTimer = () => {
    setTimeRunning(prevRunning => !prevRunning);
  };

  const reset = () => {
    setBreakLength('5');
    setSessionLength('25');
    setTimeLeft(25 * 60);
    setTimeRunning(false);
    setTimeLabel('Session')

    const audio = document.getElementById('beep');
    audio.load();
  };

  return (
    <div className="App">
      <div id="break-zone">
        <div id="break-label">Break Length</div>
        <button id="break-decrement" onClick={() => handleClick(BREAK_DECREMENT)}><FontAwesomeIcon icon={faArrowDown} /></button>
        <div id="break-length">{breakLength}</div>
        <button id="break-increment" onClick={() => handleClick(BREAK_INCREMENT)}><FontAwesomeIcon icon={faArrowUp} /></button>
      </div>
      <div id="session-zone">
        <div id="session-label">Session Length</div>
        <button id="session-decrement" onClick={() => handleClick(SESSION_DECREMENT)}><FontAwesomeIcon icon={faArrowDown} /></button>
        <div id="session-length">{sessionLength}</div>
        <button id="session-increment" onClick={() => handleClick(SESSION_INCREMENT)}><FontAwesomeIcon icon={faArrowUp} /></button>
      </div>
      <div id="time-display">
        <div id='wrapper'>
          <div id="timer-label">{timeLabel}</div>
          <div id="time-left">{formatTime(timeLeft)}</div>
        </div>
      </div>
      <div id="time-control">
        <audio id="beep" src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav'></audio>
        <button id="start_stop" onClick={toggleTimer}><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
        <button id="reset" onClick={reset}><FontAwesomeIcon icon={faRefresh} /></button>
      </div>
    </div>
  );
}

export default App;
