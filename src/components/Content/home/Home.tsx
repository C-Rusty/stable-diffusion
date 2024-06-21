import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { Context } from "../../app/App";
import { observer } from 'mobx-react-lite';
import LoginForm from "../../logInForm/LogInForm";
import Modal from "../../common/modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { Outlet } from "react-router-dom";
import Header from "../../header/Header";
import Footer from "../../footer/Footer";

const Home = () => {

    const {mobxStore} = useContext(Context);
    const isModalOpen = useSelector<RootState, boolean>((state) => state.modalContent.isModalOpen)

    useEffect(() => {
        mobxStore.checkAuth();
    }, [mobxStore.isAuth, mobxStore]);

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
            {isModalOpen && <Modal/>}
        </Fragment>    
    );
};

export default observer(Home);