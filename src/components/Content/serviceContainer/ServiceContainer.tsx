import { useEffect, useState } from "react";
import { modelSelects } from "../../../utilities/generatorOptions";
import Textarea from "../../common/textarea/Textarea";
import ModelsContainer from "../modelsContainer/ModelsContainer";
import { ServiceType } from "../../../types/typesCommon";
import { CurrentServiceModel, CurrentServiceModelOptions } from "../../../types/services/commonServices";
import Switcher from "../../common/switcher/Switcher";
import ServiceOptions from "../serviceOptions/ServiceOptions";

const ServiceContainer = (
    {activeService}
    :
    {activeService: ServiceType}
) => {

    const { promptProps } = modelSelects;

    const [prompt, setPrompt] = useState<string | undefined>(undefined);
    const [serviceModelOptionModel, setServiceModelOptionModel] = useState<CurrentServiceModel | undefined>(undefined);

    const [serviceModelOptions, setServiceModelOptions] = useState<CurrentServiceModelOptions | undefined>(undefined);

    const [isOptionsShown, setIsOptionsShown] = useState<boolean>(false);
    const [isGenerationHistorySavingOptionEnabled, setIsGenerationHistorySavingOptionEnabled] = useState<boolean>(true);
    const [isImgToImgModeEnabled, setIsImgToImgModeEnabled] = useState<boolean>(false);


    return (
        <div className="service-container">
            <div className="service-container__inner">
                <form className="service-container__form" method="post">
                    <Textarea
                        {...promptProps}
                        value={prompt}
                        setValue={setPrompt}
                    />
                    <ModelsContainer 
                        activeService={activeService} 
                        serviceModelOption={serviceModelOptionModel}
                        setServiceModelOption={setServiceModelOptionModel} 
                    />
                    <div className="service-container__swtichers">
                        <Switcher
                            headline="Show options"
                            value={isOptionsShown}
                            setValue={setIsOptionsShown}
                        />
                        <Switcher
                            headline="Save generation history"
                            value={isGenerationHistorySavingOptionEnabled}
                            setValue={setIsGenerationHistorySavingOptionEnabled}
                        />
                        <Switcher
                            headline="Imgage to Image mode"
                            value={isImgToImgModeEnabled}
                            setValue={setIsImgToImgModeEnabled}
                        />
                    </div>
                    <ServiceOptions
                        serviceModelOptionModel={serviceModelOptionModel}
                        setServiceModelOptions={setServiceModelOptions}
                        isImgToImgModeEnabled={isImgToImgModeEnabled}
                    />
                </form>
            </div>
        </div>
    );
};

export default ServiceContainer;