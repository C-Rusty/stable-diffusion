import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import './styles/components/App.scss';
import { Route, Routes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {

  return (
    <div className="Main">
      <Header/>
        <Routes>
          <Route path={`${routes.accounts.path}`} element={routes.accounts.element()} />
          <Route path={`${routes.generator.path}`} element={routes.generator.element()} />
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
