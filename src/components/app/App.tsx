import './app.scss';
import Routes from "../../routes/Routes";
import { createContext } from 'react';
import Store from '../../store/mobxStore';

interface State {
  mobxStore: Store;
}

const mobxStore = new Store();
export const Context = createContext<State>({
  mobxStore
});

function App() {

  return (
    <div className="main">
        <Context.Provider value={{ mobxStore }}>
          <Routes/>
        </Context.Provider>
    </div>
  );
}

export default App;