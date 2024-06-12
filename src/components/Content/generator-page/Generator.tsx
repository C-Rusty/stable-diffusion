import { useEffect, useState } from 'react';
import './generator.scss';
import Sidebar from '../sidebar/Sidebar';
import GenResult from '../genResult/GenResult';
import Loader from '../../common/loader/Loader';
import noise from '../../../imgs/noise.png';

const Generator = () => {

    const [generatedImage, setGeneratedImage] = useState<string | null>(noise);
    const [imgName, setImgName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if (generatedImage) {
            setIsLoading(false);
        };
    }, [generatedImage]);

    return(
        <section className="generator page">
            <div className="container">
                <div className="generator__inner">
                    <div className="generator__main">
                        <Sidebar 
                            setGeneratedImage={setGeneratedImage}
                            setIsLoading={setIsLoading} 
                            setImgName={setImgName}
                        />
                        {isLoading ? 
                            <Loader /> 
                            : 
                            <GenResult 
                                generatedImage={generatedImage}
                                imgName={imgName}
                            />
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Generator;