import { Fragment } from "react/jsx-runtime";
import Header from "../../Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { useContext, useEffect } from "react";
import { Context } from "../../app/App";
import { observer } from 'mobx-react-lite';
import AuthModal from "../../auth-modal/AuthModal";

const Home = () => {

    const {store} = useContext(Context);

    useEffect(() => {
        store.checkAuth();
    }, [store.isAuth, store]);

    return (
        <Fragment>
            {store.isAuth ?
                <Fragment>
                    <Header/>
                    <Outlet/>   
                    <Footer/>
                </Fragment>
                :
                <AuthModal/>
            }
        </Fragment>    
    );
};

export default observer(Home);