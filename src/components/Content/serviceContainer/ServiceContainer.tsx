import './serviceContainer.scss';
import { Dispatch, SetStateAction, useContext } from "react";
import { ServiceType } from "../../../types/typesCommon";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reduxStore";
import { switchers } from "../../../types/reducers";
import { Context } from "../../app/App";
import ImgGeneration from "../services/imgGeneration/ImgGeneration";
import ImgEditing from "../services/imgEdit/ImgEditing";
import ImgUpscale from "../services/imgUpscale/ImgUpscale";
import ImgPreciseEdit from "../services/imgPreciseEdit/ImgPreciseEdit";
import { IGenResultItem } from "../../../interface/items/imgItems";
import VideoGenerationItem from '../services/videoGeneration/VideoGeneration';

const ServiceContainer = (
    {
        activeService,
        setGenerationResultItem
    }
    :
    {
        activeService: ServiceType,
        setGenerationResultItem: Dispatch<SetStateAction<IGenResultItem>>
    }) => {

        const switchersStates = useSelector<RootState, switchers>(state => state.switchers);
    
        const {mobxStore} = useContext(Context);
        const apiKey = mobxStore.SDApiKey;
        const userId = mobxStore.userId;

        const services: Array<{name: ServiceType, component: JSX.Element}> = [
            {
                name: `Image Generator`, 
                component: <ImgGeneration 
                    setImageItem={setGenerationResultItem}
                    switchersStates={switchersStates}
                    mobxStore={{apiKey, userId}}
                />
            },
            {
                name: `Upscale Image`, 
                component: <ImgUpscale 
                    setImageItem={setGenerationResultItem}
                    switchersStates={switchersStates}
                    mobxStore={{apiKey, userId}}
                />
            },
            {
                name: `Edit Image`,
                component: <ImgEditing
                    setImageItem={setGenerationResultItem}
                    switchersStates={switchersStates}
                    mobxStore={{apiKey, userId}}
                />
            },
            {
                name: `Precise Image Edit`,
                component: <ImgPreciseEdit
                    setImageItem={setGenerationResultItem}
                    switchersStates={switchersStates}
                    mobxStore={{apiKey, userId}}
                />
            },
            {
                name: `Video Generator`,
                component: <VideoGenerationItem
                    setVideoItem={setGenerationResultItem}
                    switchersStates={switchersStates}
                    mobxStore={{apiKey, userId}}
                />
            }
        ];

    return (
        <div className="service-container">
            <div className="service-container__inner">
                {services.filter(service => service.name === activeService)[0].component}
            </div>
        </div>
    );
};

export default ServiceContainer;