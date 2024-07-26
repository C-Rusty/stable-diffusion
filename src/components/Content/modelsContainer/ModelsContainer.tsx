import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ServiceType } from "../../../types/typesCommon";
import { CurrentServiceModel, CurrentServiceModels } from "../../../types/services/commonServices";
import { servicesOptions } from "../../../utilities/services/commonServices";

const ModelsContainer = (
    {
        activeService, 
        serviceModelOption,
        setServiceModelOption
    }
    :
    {
        activeService: ServiceType,
        serviceModelOption: CurrentServiceModel | undefined,
        setServiceModelOption: Dispatch<SetStateAction<CurrentServiceModel | undefined>>
    }) => {

    const [currentModels, setCurrentModels] = useState<CurrentServiceModels>(servicesOptions.imageGeneration);

    useEffect(() => {
        switch (activeService) {
            case `Image Generator`: setCurrentModels(servicesOptions.imageGeneration); break;
            case `Upscale Image`: setCurrentModels(servicesOptions.upscale); break;
            case `Edit Image`: setCurrentModels(servicesOptions.imageEdit); break;
            case `Precise Generator`: setCurrentModels(servicesOptions.imageEdit); break;
            case `Video Generator`: setCurrentModels(servicesOptions.imageToVideoGeneration); break;
        
            default: return console.log(`Wrong service type: ${activeService}`);
        }
    }, [activeService]);

    return (
        <div className="service-models">
            <div className="service-modesl__inner">
                <p className="service-models__label">Services</p>
                <div className="service-models__container">
                    {currentModels.map((option) => (
                        <button 
                            className={`generator-page__services-options-container-item ${serviceModelOption === option ? 'active' : ''}`}
                            key={option}
                            type="button"
                            name={option}
                            title={option}
                            disabled={serviceModelOption === option}
                            aria-label={option}
                            onClick={() => setServiceModelOption(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModelsContainer;