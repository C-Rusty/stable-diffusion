import { Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import SignIn from "../components/Content/signIn/SignIn";
import Header from "../components/Header/Header";
import Generator from "../components/Content/Generator/Generator";
import Footer from "../components/Footer/Footer";
import { urlPaths } from "./urlPaths";

const Main = () => {
    return(
        <Fragment>
            <Header/>
            <Routes>
                <Route path={urlPaths.signIn} element={<SignIn/>} />
                <Route path={urlPaths.home} element={<Generator/>} />
            </Routes>
            <Footer/>
        </Fragment>
    );
};

export default Main;