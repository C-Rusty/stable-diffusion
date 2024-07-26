import { Dispatch } from 'react';
import { CurrentServiceModel, CurrentServiceModelOptions } from '../../../types/services/commonServices';
import './serviceOptions.scss';

const ServiceOptions = (
    {
        serviceModelOptionModel,
        setServiceModelOptions, 
        isImgToImgModeEnabled
    }
    :
    {
        serviceModelOptionModel: CurrentServiceModel | undefined,
        setServiceModelOptions: Dispatch<CurrentServiceModelOptions> | undefined,
        isImgToImgModeEnabled: boolean
    }
) => {
    return (
        <div className='service-options-container'>
            <div className="service-options-container__inner">
                <form action="post" method="post" className='service-options-container__form'>
                    
                </form>
            </div>
        </div>
    );
};

export default ServiceOptions;