import { useEffect, useState } from 'react';
import './generatorPage.scss';
import GeneratorOptions from '../generatorOptions/GeneratorOptions';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../imgs/noise.png';
import { generatedImageItem } from '../../../types/typesCommon';

const GeneratorPage = () => {

    const [image, setImage] = useState<generatedImageItem>(
        {
            path: noise, 
            name: `noise`, 
            format: `png`,
            timestamp: new Date().getTime().toString(),
        }
    );
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (image.path) {
            setIsLoading(false);
        };
    }, [image.path]);

    return(
        <section className="generator-page">
            <div className="container">
                <div className="generator-page__inner">
                    <div className="generator-page__main">
                        <GeneratorOptions 
                            setIsLoading={setIsLoading} 
                            setImage={setImage}
                        />
                        {isLoading ? 
                            <Loader className="generator-page" /> 
                            : 
                            <GenerationResult 
                                image={image}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneratorPage;