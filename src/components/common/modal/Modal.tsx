import { useDispatch, useSelector } from "react-redux";
import './modal.scss';
import { setModalContent } from "../../../store/reduxReducers/modalReducer";
import { RootState } from "../../../store/reduxStore";
import { ModalProps } from "../../../types/typesCommon";
import GoToButton from "../go-to-btn/GoToButton";
import { urlPaths } from "../../../routes/urlPaths";

const Modal = () => {

    const dispatch = useDispatch();

    const handleModalBtbClick = () => {
        dispatch(setModalContent({headline: undefined, text: undefined, isModalOpen: false}));
    };

    const modalContent = useSelector<RootState, ModalProps>((state) => state.modalContent);

    return(
        <div className={`modal ${modalContent.isModalOpen ? 'open' : 'hidden'}`}>
            <div className="modal__inner">
                <h2 className="modal__headline">
                    {modalContent.headline ? modalContent.headline : undefined}
                </h2>
                <p className="modal__text">
                    {modalContent.text ? modalContent.text : undefined}
                </p>
                <div className="modal__btn-container">
                    <a 
                        className="modal__btn" 
                        href="#0"
                        title="Close"
                        aria-label="Close"
                        onClick={handleModalBtbClick}
                    >
                        Close
                    </a>
                    {modalContent.event === `img-upload` &&
                        <GoToButton urlPath={urlPaths.gallery} text={"Go to gallery"}/>
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;