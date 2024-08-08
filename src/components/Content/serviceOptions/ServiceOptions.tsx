import { Dispatch, SetStateAction } from 'react';
import { CurrentServiceModel, CurrentServiceModelOptions, ServiceType } from '../../../types/services/commonServices';
import './serviceOptions.scss';
import ImgGenerationOptions from '../servicesOptions/ImgGenerationOptions/ImgGenerationOptions';
import ImgUpscaleOptions from '../servicesOptions/ImgUpscaleOptions/ImgUpscaleOptions';
import ImgEditOptions from '../servicesOptions/ImgEditOptions/ImgEditOptions';
import ImgPreciseOptions from '../servicesOptions/ImgPreciseOptions/ImgPreciseOptions';
import VideoGenerationOptions from '../servicesOptions/VideoGenerationOptions/VideoGenerationOptions';
import { ImageGenerationServiceModel, ImageGenerationServiceOptions } from '../../../types/services/imageGeneration';
import { ImageUpscaleModelOptions } from '../../../types/services/imageUpscale';

const ServiceOptions = (
    {
        activeService,
        serviceModelOptionModel,
        setServiceModelOptions, 
        isImgToImgModeEnabled
    }
    :
    {
        activeService: ServiceType,
        serviceModelOptionModel: CurrentServiceModel | undefined,
        setServiceModelOptions: Dispatch<CurrentServiceModelOptions> | undefined,
        isImgToImgModeEnabled: boolean
    }
) => {
    return (
        <div className='service-options-container'>
            <div className="service-options-container__inner">
                {activeService === `Image Generator` ?
                    <ImgGenerationOptions
                        setOptions={
                            setServiceModelOptions as Dispatch<SetStateAction<ImageGenerationServiceOptions | {}>>
                        }
                        serviceModelOptionModel={serviceModelOptionModel as ImageGenerationServiceModel}  
                        isImgToImgModeEnabled={isImgToImgModeEnabled}
                    />
                    :
                    activeService === `Upscale Image`?
                        <ImgUpscaleOptions
                            setOptions={setServiceModelOptions as Dispatch<SetStateAction<ImageUpscaleModelOptions | {}>>}
                        />
                    :
                    activeService === `Edit Image`?
                        <ImgEditOptions/>
                    :
                    activeService === `Precise Image Edit`?
                        <ImgPreciseOptions/>
                    :
                    activeService === `Video Generator`?
                        <VideoGenerationOptions/>
                    :
                    null
                }
            </div>
        </div>
    );
};

export default ServiceOptions;