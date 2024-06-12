import { useDispatch, useSelector } from "react-redux";
import './modal.scss';
import { setModalContent } from "../../../store/reduxReducers/modalReducer";
import { RootState } from "../../../store/reduxStore";
import { ModalProps } from "../../../types/typesCommon";

const Modal = () => {

    const dispatch = useDispatch();

    const handleModalBtbClick = () => {
        dispatch(setModalContent({headline: undefined, text: undefined, isModalOpen: false}));
    };

    const modalContent = useSelector<RootState, ModalProps>((state) => state.modalContent);

    return(
        <div className="modal">
            <div className="modal__inner">
                <h2 className="modal__headline">{modalContent.headline ? modalContent.headline : undefined}</h2>
                <p className="modal__text">{modalContent.text ? modalContent.text : undefined}</p>
                <div className="modal__btn-container">
                    <button className="modal__close-btn" onClick={handleModalBtbClick}>Close</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;