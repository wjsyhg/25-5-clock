import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faPlay, faRefresh, faPause} from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const App = () => {
  const BREAK_DECREMENT = 'break-decrement';
  const BREAK_INCREMENT = 'break-increment';
  const SESSION_DECREMENT = 'session-decrement';
  const SESSION_INCREMENT = 'session-increment';

  const [breakLength, setBreakLength] = useState('5');
  const [sessionLength, setSessionLength] = useState('25');

  const handleClick = (value) => {
    
    switch(value) {
      case BREAK_DECREMENT:
        setBreakLength(prevLength => {
          const length = parseInt(prevLength) - 1;
          return length.toString();
        });
        break;
      case BREAK_INCREMENT:
        setBreakLength(prevLength => {
          const length = parseInt(prevLength) + 1;
          return length.toString();
        });
        break;
      case SESSION_DECREMENT:
        setSessionLength(prevLength => {
          const length = parseInt(prevLength) - 1;
          return length.toString();
        });
        break;
      case SESSION_INCREMENT:
        setSessionLength(prevLength => {
          const length = parseInt(prevLength) + 1;
          return length.toString();
        });
        break;
      default:
        break;
    }
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
          <div id="timer-label">Session</div>
          <div id="timer-left">25:00</div>
        </div>
      </div>
      <div id="time-control">
        <button id="start_stop"><FontAwesomeIcon icon={faPlay} /><FontAwesomeIcon icon={faPause} /></button>
        <button id="reset"><FontAwesomeIcon icon={faRefresh} /></button>
      </div>
    </div>
  );
}

export default App;
