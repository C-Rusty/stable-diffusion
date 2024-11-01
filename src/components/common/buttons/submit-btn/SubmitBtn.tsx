import { useSelector } from 'react-redux';
import './submitBtn.scss';
import { RootState } from '../../../../store/reduxStore';

const SubmitBtn = (
    {
        text
    }
    :
    {
        text: string
    }) => {

    const isLoading = useSelector<RootState, boolean>((state) => state.commonStates.isLoading);

    return (
        <div className="submit-btn-container">
            <button
                type="submit"
                disabled={isLoading} 
                className={`submit-btn-container__btn ${isLoading ? 'disabled' : ''}`}
                title={text}
                aria-label={text}
            >
                {text}
            </button>
        </div>
    );
};

export default SubmitBtn;