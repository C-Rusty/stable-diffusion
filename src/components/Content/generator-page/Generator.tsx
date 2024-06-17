import { useEffect, useState } from 'react';
import './generator.scss';
import Sidebar from '../sidebar/Sidebar';
import GenResult from '../genResult/GenResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../imgs/noise.png';
import { ImageProps } from '../../../types/typesCommon';

const Generator = () => {

    const [imageProps, setImageProps] = useState<ImageProps>({generatedImage: noise, imgName: null, imgFormat: null});
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (imageProps.generatedImage) {
            setIsLoading(false);
        };
    }, [imageProps.generatedImage]);

    return(
        <section className="generator page">
            <div className="container">
                <div className="generator__inner">
                    <div className="generator__main">
                        <Sidebar 
                            setIsLoading={setIsLoading} 
                            setImageProps={setImageProps}
                        />
                        {isLoading ? 
                            <Loader /> 
                            : 
                            <GenResult 
                                imageProps={imageProps}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Generator;