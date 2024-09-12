import { useContext, useEffect, useState } from 'react';
import './servicesPage.scss';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../images/noise.png';
import { CreditsAmount, ServiceType } from '../../../types/typesCommon';
import { Context } from '../../app/App';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reduxStore';
import { ServiceTypes } from '../../../utilities/services';
import ServiceContainer from '../serviceContainer/ServiceContainer';
import { setIsLoading } from '../../../store/reduxReducers/commonsReducer';
import { setService } from '../../../store/reduxReducers/serviceReducer';
import { IGenResultItem } from '../../../interface/items/imgItems';
import { createImageId } from '../../../utilities/functions/images';
import { updateCreditsAmount } from '../../../utilities/functions/common';

const ServicesPage = () => {

    const { mobxStore } = useContext(Context);
    const dispatch = useDispatch();

    const id = createImageId();

    const isLoading = useSelector<RootState, boolean>((state) => state.commonStates.isLoading);

    const [generationResultItem, setGenerationResultItem] = useState<IGenResultItem>(
        {
            id: createImageId(),
            prompt: `noise`, 
            format: `png`,
            itemUrl: noise,
            storagePath: `${id}.noise.png`,
            timestamp: new Date().getTime().toString(),
        }
    );

    useEffect(() => {
        if (generationResultItem.itemUrl) {
            dispatch(setIsLoading(false));

            if (mobxStore.SDApiKey && mobxStore.isAuth) updateCreditsAmount(dispatch, mobxStore.SDApiKey, creditsAmount);
        };
    }, [generationResultItem.itemUrl]);

    const creditsAmount = useSelector<RootState, CreditsAmount>((state) => state.creditsAmount);
    const activeService = useSelector<RootState, ServiceType>((state) => state.service.currentService);

    const changeActiveService = (option: ServiceType) => {
        dispatch(setService(option));
    };

    return(
        <section className="generator-page">
            <div className="container">
                <div className="generator-page__inner">
                    <div className="generator-page__main">
                        <div className='generator-page__balance'>
                            <p className="generator-page__balance-label">Credits:</p>
                            <div className="generator-page__balance-text">
                                {creditsAmount.balance === `Loading...` ? 
                                    <Loader className="balance-loading" /> 
                                    : 
                                    creditsAmount.balance.toString().slice(0, 8)
                                }
                            </div>
                        </div>
                        <div className="generator-page__services">
                            <p className="generator-page__services-label">Services</p>
                            <div className="generator-page__services-options-container">
                                {ServiceTypes.map((option) => (
                                    <button 
                                        className={`generator-page__services-options-container-item ${activeService === option ? 'active' : ''}`}
                                        key={option}
                                        type="button"
                                        name={option}
                                        title={option}
                                        disabled={activeService === option}
                                        aria-label={option}
                                        onClick={() => changeActiveService(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <ServiceContainer 
                            activeService={activeService}
                            setGenerationResultItem={setGenerationResultItem}
                        />
                        {isLoading ? 
                            <Loader className="generator-page" /> 
                            : 
                            <GenerationResult genResultItem={generationResultItem} />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;