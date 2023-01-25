import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';
import React, { useEffect } from 'react';

function App() {
  useEffect(() => {
    console.log(`app loaded`);
    window.parent.APicallbacks = {
      ErrorMessage: (msg, msgType, action) => {
        console.log("got a message: " + msg + ", msg type: " + msgType + " and action: " + action)
      }
    }
  },[]);
  return (
    <div className='app'>
      <LogInFlow/>
      { false &&
        <div class='popups'>
          <Loading styles='centered'>Loading</Loading>
        </div>
      }
    </div>
  );
}

export default App;
