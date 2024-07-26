import { useContext, useEffect, useState } from 'react';
import './servicesPage.scss';
import ImgGenerator from '../services/imgGenerator/ImgGenerator';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../images/noise.png';
import { CreditsAmount, ImageItem, ServiceType } from '../../../types/typesCommon';
import { v4 as uuidv4 } from 'uuid';
import { apiStableDiffusion } from '../../../api/Api.StableDiffusion';
import { Context } from '../../app/App';
import { CreditsReducer } from '../../../store/reduxReducers/creditsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reduxStore';
import { ServiceTypes } from '../../../utilities/operatorOptions';
import ImgUpscale from '../services/imgUpscale/ImgUpscale';

const ServicesPage = () => {

    const { mobxStore } = useContext(Context);

    const id = uuidv4();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [image, setImage] = useState<ImageItem>(
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
        if (image.url) {
            setIsLoading(false);
        };

        if (mobxStore.SDApiKey && mobxStore.isAuth) {
                updateBalance(mobxStore.SDApiKey!)
        };
    }, [image.url]);

    useEffect(() => {
        if (mobxStore.isAuth) updateBalance(mobxStore.SDApiKey!);
    }, [mobxStore.isAuth]);

    const dispatch = useDispatch();
    const creditsAmount = useSelector<RootState, CreditsAmount>((state) => state.creditsAmount);

    const updateBalance = async (SDApiKey: string) => {

        dispatch(CreditsReducer.actions.setCreditsAmount({ balance: `Loading...` }));

        setTimeout( async () => {
            const response = await apiStableDiffusion.getBalance(SDApiKey);
    
            if (response) dispatch(CreditsReducer.actions.setCreditsAmount({
                balance: response.credits
            }));
        }, Number(creditsAmount.balance) ? 5000 : 0);
    };

    const [activeService, setActiveService] = useState<ServiceType>(ServiceTypes[0]);

    const changeActiveService = (option: ServiceType) => {
        setActiveService(option);
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
                        <div className="service-container">
                            {/* {activeService === `Image Generator` ?
                                <ImgGenerator
                                    setIsLoading={setIsLoading} 
                                    setImage={setImage}
                                /> 
                                : 
                                <ImgUpscale
                                    setIsLoading={setIsLoading} 
                                    setImage={setImage}
                                />
                            } */}
                        </div>
                        {isLoading ? 
                            <Loader className="generator-page" /> 
                            : 
                            <GenerationResult image={image} />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesPage;