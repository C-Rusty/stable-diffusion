import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import Home from "../components/Content/home/Home";
import GeneratorPage from "../components/Content/generatorPage/GeneratorPage";
import DocumentationPage from "../components/Content/documentationPage/DocumentationPage";
import ImgCollectionPage from "../components/Content/imgCollectionPage/ImgCollectionPage";
import NotFoundPage from "../components/notFoundPage/NotFoundPage";

const Main = () => {

    return(
        <Routes>
            <Route path={urlPaths.home} element={<Home/>}>
                <Route index={true} element={<GeneratorPage/>} />
                <Route path={urlPaths.instructions} element={<DocumentationPage/>} />
                <Route path={urlPaths.gallery} element={<ImgCollectionPage/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default Main;