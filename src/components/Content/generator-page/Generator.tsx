import { useEffect, useState } from 'react';
import './generator.scss';
import Sidebar from '../sidebar/Sidebar';
import GenResult from '../genResult/GenResult';
import Loader from '../../common/loader/Loader';

const Generator = () => {

    const [generatedImage, setGeneratedImage] = useState<string | null>(null);
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
                        />
                        {isLoading ? 
                            <Loader /> 
                            : 
                            <GenResult generatedImage={generatedImage}/>
                        }
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Generator;