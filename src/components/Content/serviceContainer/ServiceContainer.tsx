import { Dispatch, SetStateAction, useContext } from "react";
import { ImageItem, ServiceType } from "../../../types/typesCommon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { switchers } from "../../../types/reducers";
import { Context } from "../../app/App";
import { setIsLoading } from "../../../store/reduxReducers/commonsReducer";
import ImgGeneration from "../services/imgGeneration/ImgGeneration";
import ImgEditing from "../services/imgEdit/ImgEditing";
import ImgUpscale from "../services/imgUpscale/ImgUpscale";

const ServiceContainer = (
    {
        activeService,
        setImageItem
    }
    :
    {
        activeService: ServiceType,
        setImageItem: Dispatch<SetStateAction<ImageItem>>
    }) => {

        const isLoading = useSelector<RootState, boolean>((state) => state.commonStates.isLoading);
        const switchersStates = useSelector<RootState, switchers>(state => state.switchers);
    
        const {mobxStore} = useContext(Context);
        const apiKey = mobxStore.SDApiKey;
        const userId = mobxStore.userId;

    return (
        <div className="service-container">
            <div className="service-container__inner">
                {
                    activeService === `Image Generator` ?
                        <ImgGeneration
                            setImageItem={setImageItem}
                            switchersStates={switchersStates}
                            mobxStore={{apiKey, userId}}
                            isLoadingReducer={{isLoadingState: isLoading, isLoadingAction: setIsLoading}}
                        />
                    :
                    activeService === `Upscale Image` ?
                        <ImgUpscale
                            setImageItem={setImageItem}
                            switchersStates={switchersStates}
                            mobxStore={{apiKey, userId}}
                            isLoadingReducer={{isLoadingState: isLoading, isLoadingAction: setIsLoading}}
                        />
                    :
                    activeService === `Edit Image` ?
                        <ImgEditing
                            setImageItem={setImageItem}
                            switchersStates={switchersStates}
                            mobxStore={{apiKey, userId}}
                            isLoadingReducer={{isLoadingState: isLoading, isLoadingAction: setIsLoading}}
                        />
                    :
                    activeService === `Precise Image Edit` ?
                    <></>
                    :
                    activeService === `Video Generator` ?
                    <></>
                    :
                    <></>
                }
            </div>
        </div>
    );
};

export default ServiceContainer;