import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import './generator.scss';
import { GenModelsValue, SelectProps } from '../../../types/typesCommon';
import ModelV1Selects from '../ModelV1Selects/ModelV1Selects';
import ModelV2Selects from '../ModelV2Selects/ModelV2Selects';
import { ApiV1ModelParams } from '../../../types/typesV1Model';
import { ApiV2ModelParams } from '../../../types/typesV2Model';
import { generatorCommonPropsForSelect } from '../../../utilities/GeneratorPropsForSelect';

const Generator = () => {

    const prompt = useRef<HTMLInputElement | null>(null);

    const { genModelSelectProps } = generatorCommonPropsForSelect;

    const [genModel, setGenModel] = useState<GenModelsValue>(`core`);
    const [data, setData] = useState<ApiV1ModelParams | ApiV2ModelParams | {}>({});

    useEffect(() => {
        console.log(genModel);
    }, [genModel]);

    return(
        <section className="generator">
            <div className="container">
                <div className="generator__inner">
                    <form action="" method="post" className='generator__form'>
                        <label htmlFor="" className='generator__input-container'>
                            <h1 className="generator__headline">Stable Diffusion</h1>
                            <input type="text" name="input" id="generate-image-prompt" placeholder='image description'  className="generator__input" ref={prompt} />
                        </label>
                        <label htmlFor="" className={genModelSelectProps.className} id={genModelSelectProps.id}>
                            <span className='generator__select-container-headline'>Generation Model</span>
                            <select 
                                className="generator__select" 
                                onChange={(e) => setGenModel(e.target.value as GenModelsValue)}>
                                    {genModelSelectProps.options.map((optionItem) => 
                                        <option 
                                            key={optionItem.text} 
                                            value={optionItem.value}
                                        >{optionItem.text}</option>
                                    )}
                            </select>
                        </label>
                        {genModel === `core` || genModel === `sd3` ? 
                            <ModelV2Selects 
                                data={data as ApiV2ModelParams} 
                                setData={setData as Dispatch<SetStateAction<ApiV2ModelParams | {}>>}
                            />
                            : 
                            <ModelV1Selects 
                                data={data as ApiV1ModelParams} 
                                setData={setData as Dispatch<SetStateAction<ApiV1ModelParams | {}>>}
                            />
                        }
                        <button className='generator__button'>Generate Image</button>
                    </form>
                    <div className="generator__result"></div>
                </div>
            </div>
        </section>
    );
};

export default Generator;