import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import Home from "../components/Content/home/Home";
import { Suspense, lazy } from "react";
import Loader from "../components/common/loader/Loader";

const Main = () => {

    const GeneratorPage = lazy(() => import('../components/Content/generatorPage/GeneratorPage'));
    const GenerationHistoryPage = lazy(() => import('../components/Content/generationHistoryPage/GenerationHistoryPage'));
    const FavouritesPage = lazy(() => import('../components/Content/favouritesPage/FavouritesPage'));
    const DocumentationPage = lazy(() => import('../components/Content/documentationPage/DocumentationPage'));
    const NotFoundPage = lazy(() => import('../components/notFoundPage/NotFoundPage'));

    return(
        <Suspense fallback={<Loader className="component-loading"/>}>
            <Routes>
                <Route path={urlPaths.home} element={<Home/>}>
                    <Route index={true} element={<GeneratorPage/>} />
                    <Route path={urlPaths.generationHistory} element={<GenerationHistoryPage/>} />
                    <Route path={urlPaths.favourites} element={<FavouritesPage/>}/>
                    <Route path={urlPaths.documentation} element={<DocumentationPage/>} />
                    <Route path="*" element={<NotFoundPage/>}/>
                </Route>
            </Routes>
        </Suspense>
    );
};

export default Main;