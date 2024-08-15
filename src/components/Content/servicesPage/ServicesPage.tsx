import { useContext, useEffect, useState } from 'react';
import './servicesPage.scss';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../images/noise.png';
import { CreditsAmount, ImageItem, ServiceType } from '../../../types/typesCommon';
import { v4 as uuidv4 } from 'uuid';
import { ApiSDGetInfo } from '../../../api/StableDiffustion/Api.SDGetInfo';
import { Context } from '../../app/App';
import { setCreditsAmount } from '../../../store/reduxReducers/creditsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reduxStore';
import { ServiceTypes } from '../../../utilities/operatorOptions';
import ServiceContainer from '../serviceContainer/ServiceContainer';
import { setIsLoading } from '../../../store/reduxReducers/commonsReducer';
import { setService } from '../../../store/reduxReducers/serviceReducer';

const ServicesPage = () => {

    const { mobxStore } = useContext(Context);
    const dispatch = useDispatch();

    const id = uuidv4();

    const isLoading = useSelector<RootState, boolean>((state) => state.commonStates.isLoading);

    const [imageItem, setImageItem] = useState<ImageItem>(
        {
            id: id,
            prompt: `noise`, 
            format: `png`,
            url: noise,
            storagePath: `${id}.noise.png`,
            timestamp: new Date().getTime().toString(),
        }
    );

    useEffect(() => {
        if (imageItem.url) {
            dispatch(setIsLoading(false));
        };

        if (mobxStore.SDApiKey && mobxStore.isAuth) {
            updateBalance(mobxStore.SDApiKey!)
        };
    }, [imageItem.url]);

    useEffect(() => {
        if (mobxStore.isAuth) updateBalance(mobxStore.SDApiKey!);
    }, [mobxStore.isAuth]);

    const creditsAmount = useSelector<RootState, CreditsAmount>((state) => state.creditsAmount);

    const updateBalance = async (SDApiKey: string) => {

        dispatch(setCreditsAmount({ balance: `Loading...` }));

        setTimeout( async () => {
            const response = await ApiSDGetInfo.getBalance(SDApiKey);
    
            if (response) dispatch(setCreditsAmount({
                balance: response.credits
            }));
        }, Number(creditsAmount.balance) ? 5000 : 0);
    };

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
                            setImageItem={setImageItem}
                        />
                        {isLoading ? 
                            <Loader className="generator-page" /> 
                            : 
                            <GenerationResult image={imageItem} />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;