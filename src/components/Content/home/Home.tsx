import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { Context } from "../../app/App";
import { observer } from 'mobx-react-lite';
import LoginForm from "../../logInForm/LogInForm";
import Modal from "../../common/modal/Modal";
import { Outlet } from "react-router-dom";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";

const Home = () => {

    const {mobxStore} = useContext(Context);

    useEffect(() => {
        mobxStore.checkAuth();
    }, [mobxStore.isAuth, mobxStore.login]);

    return (
        <Fragment>
            {mobxStore.isAuth ?
                <Fragment>
                    <Header/>
                    <Outlet/>   
                    <Footer/>
                </Fragment>
                :
                <LoginForm/>
            }
            <Modal />
        </Fragment>    
    );
};

export default observer(Home);