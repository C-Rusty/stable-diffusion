import './app.scss';
import Routes from "../../routes/Routes";
import { createContext } from 'react';
import Store from '../../store/store';

interface State {
  store: Store;
}

const store = new Store();
export const Context = createContext<State>({
  store
});

function App() {

  return (
    <div className="main">
      <Context.Provider value={{ store }}>
        <Routes/>
      </Context.Provider>
    </div>
  );
}

export default App;