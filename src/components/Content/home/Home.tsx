import { Fragment } from "react/jsx-runtime";
import { useContext, useEffect } from "react";
import { Context } from "../../app/App";
import { observer } from 'mobx-react-lite';
import AuthModal from "../../auth-modal/AuthModal";
import Modal from "../../common/modal/Modal";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import Header from "../../Header/Header";
import Footer from "../../Footer/Footer";
import { Outlet } from "react-router-dom";

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
                <AuthModal/>
            }
            {isModalOpen && <Modal/>}
        </Fragment>    
    );
};

export default observer(Home);