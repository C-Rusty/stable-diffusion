import { useContext, useEffect, useState } from 'react';
import './generatorPage.scss';
import Generator from '../generator/Generator';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../imgs/noise.png';
import { CreditsAmount, ImageItem } from '../../../types/typesCommon';
import { v4 as uuidv4 } from 'uuid';
import { apiStableDiffusion } from '../../../api/Api.StableDiffusion';
import { Context } from '../../app/App';
import { CreditsReducer } from '../../../store/reduxReducers/creditsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/reduxStore';

const GeneratorPage = () => {

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
            setTimeout(() => {
                updateBalance(mobxStore.SDApiKey!)
            }, Number(creditsAmount.balance) ? 8000 : 0);
        };
    }, [image.url]);

    useEffect(() => {
        if (mobxStore.SDApiKey && mobxStore.isAuth) updateBalance(mobxStore.SDApiKey!);
    }, [mobxStore.login])

    const dispatch = useDispatch();
    const creditsAmount = useSelector<RootState, CreditsAmount>((state) => state.creditsAmount);

    const updateBalance = async (SDApiKey: string) => {

        dispatch(CreditsReducer.actions.setCreditsAmount({ balance: `Loading...` }));

        const response = await apiStableDiffusion.getBalance(SDApiKey);
    
        if (response) dispatch(CreditsReducer.actions.setCreditsAmount({
            balance: response.credits
        }));
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
                        <Generator
                            setIsLoading={setIsLoading} 
                            setImage={setImage}
                        />
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

export default GeneratorPage;