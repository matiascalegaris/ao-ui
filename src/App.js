import './App.scss';
import Loading from './Components/Dialogs/Loading/loading';
import LogInFlow from './Components/Login-flow/login-flow';

function App() {
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
