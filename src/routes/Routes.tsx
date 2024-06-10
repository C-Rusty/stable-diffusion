import { Route, Routes } from "react-router-dom";
import { urlPaths } from "./urlPaths";
import { Suspense, lazy  } from "react";
import Loader from "../components/common/loader/Loader";

const Main = () => {

    const Home = lazy(() => import('../components/Content/home/Home'));
    const Generator = lazy(() => import('../components/Content/generator-page/Generator'));
    const Documentation = lazy(() => import('../components/Content/documentation/Documentation'));
    const MyImages = lazy(() => import('../components/Content/myImages/ImgCollection'));
    const NotFound = lazy(() => import('../components/notFound/NotFound'));

    return(
        <Suspense fallback={<Loader/>}>
            <Routes>
                <Route path={urlPaths.home} element={<Home/>}>
                    <Route path={urlPaths.generator} element={<Generator/>} />
                    <Route path={urlPaths.instructions} element={<Documentation/>} />
                    <Route path={urlPaths.myImages} element={<MyImages/>}/>
                </Route>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Suspense>
    );
};

export default Main;