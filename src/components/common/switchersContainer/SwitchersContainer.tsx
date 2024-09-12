import './switchersContainer.scss';
import { useSelector } from 'react-redux';
import { setIsOptionsShown, setIsSavingHistoryEnabled, setIsImgToImgModeEnabled } from '../../../store/reduxReducers/switcherReducer';
import Switcher from '../switcher/Switcher';
import { RootState } from '../../../store/reduxStore';
import { switchers } from '../../../types/reducers';
import { ServiceType } from '../../../types/typesCommon';

const SwitcherContainer = () => {

    const switchersStates = useSelector<RootState, switchers>((state) => state.switchers);
    const CurrentServiceModel = useSelector<RootState, ServiceType>((state) => state.service.currentService);

    return (
        <div className="switchers-container">
            <Switcher
                headline="Show options"
                value={switchersStates.isOptionsShown}
                setValue={setIsOptionsShown}
            />
            <Switcher
                headline="Save generation history"
                value={switchersStates.isSavingHistoryEnabled}
                setValue={setIsSavingHistoryEnabled}
            />
            {CurrentServiceModel === `Image Generator` &&
                <Switcher
                    headline="Image to Image mode"
                    value={switchersStates.isImgToImgModeEnabled}
                    setValue={setIsImgToImgModeEnabled}
                />
            }
        </div>
    );
};

export default SwitcherContainer;