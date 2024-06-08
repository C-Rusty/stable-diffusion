import { Fragment } from "react/jsx-runtime";
import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import Header from "../components/Header/Header";
import Generator from "../components/Content/Generator/Generator";
import Footer from "../components/Footer/Footer";

const Main = () => {
    return(
        <Fragment>
            <Header/>
            <Routes>
                <Route path={urlPaths.home} element={<Generator/>} />
            </Routes>
            <Footer/>
        </Fragment>
    );
};

export default Main;