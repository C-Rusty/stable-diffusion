import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ServiceType } from "../../../types/typesCommon";
import { CurrentServiceModel, CurrentServiceModels } from "../../../types/services/commonServices";
import { servicesOptions } from "../../../utilities/services/commonServices";
import './modelsContainer.scss';

const ModelsContainer = (
    {
        activeService, 
        serviceModelOption,
        setServiceModelOption,
        isImgToImgModeEnabled
    }
    :
    {
        activeService: ServiceType,
        serviceModelOption: CurrentServiceModel,
        setServiceModelOption: Dispatch<SetStateAction<CurrentServiceModel>>,
        isImgToImgModeEnabled: boolean
    }) => {

    const [currentModels, setCurrentModels] = useState<CurrentServiceModels>(servicesOptions.imageGeneration);

    useEffect(() => {
        switch (activeService) {
            case `Image Generator`: setCurrentModels(servicesOptions.imageGeneration); break;
            case `Upscale Image`: setCurrentModels(servicesOptions.upscale); break;
            case `Edit Image`: setCurrentModels(servicesOptions.imageEdit); break;
            case `Precise Image Edit`: setCurrentModels(servicesOptions.imageControl); break;
            case `Video Generator`: setCurrentModels(servicesOptions.imageToVideoGeneration); break;
        
            default: return console.log(`Wrong service type: ${activeService}`);
        }
    }, [activeService]);

    useEffect(() => {
        setServiceModelOption(currentModels[0]);
    }, [currentModels, setServiceModelOption]);

    function removeSymbols(string: string, stringToRemove: `-` | `sd3-`) {
        switch (stringToRemove) {
            case `-`: string = string.split(stringToRemove).join(` `); break;

            case `sd3-`: return string.replace(stringToRemove, ``).split(`-`).join(` `);
        };

        return string;
    };

    useEffect(() => {
        if (isImgToImgModeEnabled && currentModels.includes(`ultra`)) {
            setCurrentModels(currentModels.filter(model => model.includes(`sd3`)));
        } else if (!isImgToImgModeEnabled  && currentModels.includes(`sd3-large`)) {
            setCurrentModels(servicesOptions.imageGeneration);
        };
    }, [isImgToImgModeEnabled, currentModels]);

    return (
        <div className="service-models">
            <div className="service-models__inner">
                <p className="service-models__label">Models</p>
                <div className="service-models__items-container">
                    {currentModels.map((option) => (
                        <button 
                            className={`
                                service-models__items-container-item 
                                ${serviceModelOption === option ? 'active' : ''}
                            `}
                            key={option}
                            type="button"
                            name={option}
                            title={option}
                            disabled={serviceModelOption === option}
                            aria-label={option}
                            onClick={() => setServiceModelOption(option)}
                        >
                            {
                                currentModels.includes(`sd3-large`) ?
                                    option.includes(`sd3`) ? 
                                        removeSymbols(option, `sd3-`)
                                    : 
                                        removeSymbols(option, `-`)
                                :
                                removeSymbols(option, `-`)
                            }
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ModelsContainer;