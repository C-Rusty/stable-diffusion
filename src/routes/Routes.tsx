import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import Home from "../components/Content/home/Home";
import Generator from "../components/Content/generator-page/Generator";
import Documentation from "../components/Content/documentation/Documentation";
import ImgCollection from "../components/Content/imgCollection/ImgCollection";
import NotFound from "../components/notFound/NotFound";

const Main = () => {

    return(
        <Routes>
            <Route path={urlPaths.home} element={<Home/>}>
                <Route index={true} element={<Generator/>} />
                <Route path={urlPaths.generator} element={<Generator/>} />
                <Route path={urlPaths.instructions} element={<Documentation/>} />
                <Route path={urlPaths.myImages} element={<ImgCollection/>}/>
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    );
};

export default Main;