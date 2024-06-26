import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import Home from "../components/Content/home/Home";
import { Suspense, lazy } from "react";
import Loader from "../components/common/loader/Loader";

const Main = () => {

    const GeneratorPage = lazy(() => import('../components/Content/generatorPage/GeneratorPage'));
    const DocumentationPage = lazy(() => import('../components/Content/documentationPage/DocumentationPage'));
    const ImgCollectionPage = lazy(() => import('../components/Content/imgCollectionPage/ImgCollectionPage'));
    const NotFoundPage = lazy(() => import('../components/notFoundPage/NotFoundPage'));

    return(
        <Suspense fallback={<Loader className="component-loading"/>}>
            <Routes>
                <Route path={urlPaths.home} element={<Home/>}>
                    <Route index={true} element={<GeneratorPage/>} />
                    <Route path={urlPaths.instructions} element={<DocumentationPage/>} />
                    <Route path={urlPaths.gallery} element={<ImgCollectionPage/>}/>
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default Main;