import { useState } from "react";
import Main from "../../routes/Routes";
import './app.scss';
import AuthModal from "../auth-modal/AuthModal";

function App() {

  const [isAuth, setIsAuth] = useState(false);

  return (
    <div className="main">
      {isAuth ? <Main/> : <AuthModal setIsAuth={setIsAuth}/>}
    </div>
  );
}

export default App;