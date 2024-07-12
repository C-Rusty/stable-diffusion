import { useContext, useEffect, useState } from 'react';
import './generatorPage.scss';
import GeneratorOptions from '../generatorOptions/GeneratorOptions';
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
        if (SDApiKey) updateBalance(SDApiKey);
    }, [image.url]);

    const { mobxStore } = useContext(Context);
    const SDApiKey = mobxStore.SDApiKey;

    const dispatch = useDispatch();
    const creditsAmount = useSelector<RootState, CreditsAmount>((state) => state.creditsAmount);

    const updateBalance = async (SDApiKey: string) => {
        const response = await apiStableDiffusion.getBalance(SDApiKey);
        
        if (response) dispatch(CreditsReducer.actions.setCreditsAmount({
            balance: response.credits
        }));
    };

    useEffect(() => {
        if (SDApiKey) updateBalance(SDApiKey);
    }, []);

    return(
        <section className="generator-page">
            <div className="container">
                <div className="generator-page__inner">
                    <div className="generator-page__main">
                        <div className='generator-page__balance'>
                            <p className='generator-page__balance-text'>Credits: {creditsAmount.balance}</p>
                        </div>
                        <GeneratorOptions 
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