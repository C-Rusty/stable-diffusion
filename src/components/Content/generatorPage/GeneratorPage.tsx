import { useEffect, useState } from 'react';
import './generatorPage.scss';
import GeneratorOptions from '../generatorOptions/GeneratorOptions';
import GenerationResult from '../generationResult/GenerationResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../imgs/noise.png';
import { ImageProps } from '../../../types/typesCommon';

const GeneratorPage = () => {

    const [imageProps, setImageProps] = useState<ImageProps>({generatedImage: noise, imgName: null, imgFormat: null});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (imageProps.generatedImage) {
            setIsLoading(false);
        };
    }, [imageProps.generatedImage]);

    return(
        <section className="generator-page">
            <div className="container">
                <div className="generator-page__inner">
                    <div className="generator-page__main">
                        <GeneratorOptions 
                            setIsLoading={setIsLoading} 
                            setImageProps={setImageProps}
                        />
                        {isLoading ? 
                            <Loader className="loader-generator-page" /> 
                            : 
                            <GenerationResult 
                                imageProps={imageProps}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GeneratorPage;