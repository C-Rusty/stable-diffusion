import { useEffect, useRef, useState } from 'react';
import Select from '../../common/Select';
import './generator.scss';
import { SelectProps } from '../../../types/commonTypes';

const Generator = () => {

    const inputValue = useRef<HTMLInputElement | null>(null);

    const genModelOptionsProps: SelectProps = {
        className: 'generator__model-select',
        id: 'model-select',
        options: [
            {value: 'sd3', text: 'SD3 (powerful)'},
            {value: 'core', text: 'Core (fast and stable)'},
            {value: 'stable-diffusion-v1-6', text: 'SD 1.6 (base model)'},
            {value: 'stable-diffusion-xl-1024-v1-0', text: 'SDXL 1.0 (flexible-resolution base)'},
        ],
    };

    const resolutionOptionProps: SelectProps = {
        className: 'generator__resolution-select',
        id: 'resolution-select',
        options: [
            {value: `1024x1024`, text: `1024x1024`},
            {value: `1152x896`, text: `1152x896`},
            {value: `896x1152`, text: `896x1152`},
            {value: `1216x832`, text: `1216x832`},
            {value: `1344x768`, text: `1344x768`},
            {value: `768x1344`, text: `768x1344`},
            {value: `1536x640`, text: `1536x640`},
            {value: `640x1536`, text: `640x1536`},
        ],
    };
    
    const aspectRatioProps: SelectProps = {
        className: 'generator__aspect-ratio-select',
        id: 'aspect-ratio-select',
        options: [
            {value: `16:9`, text: `16:9`},
            {value: `1:1`, text: `1:1`},
            {value: `21:9`, text: `21:9`},
            {value: `2:3`, text: `2:3`},
            {value: `3:2`, text: `3:2`},
            {value: `4:5`, text: `4:5`},
            {value: `5:4`, text: `5:4`},
            {value: `9:16`, text: `9:16`},
            {value: `9:21`, text: `9:21`},
        ],
    };

    const [genModel, setGenModel] = useState<string>(`core`);
    const [resolution, setResolution] = useState<string>(`1024x1024`);
    const [aspectRatio, setAspectRatio] = useState<string>(`16:9`);

    useEffect(() => {
        console.log(genModel, resolution, aspectRatio);
        
    }, [genModel, resolution, aspectRatio]);

    return(
        <section className="generator">
            <div className="container">
                <div className="generator__inner">
                    <label htmlFor="" className='generator__input-container'>
                        <h1 className="generator__headline">Stable Diffusion</h1>
                        <input type="text" name="input" id="generate-image-prompt" placeholder='image description'  className="generator__input" ref={inputValue} />
                    </label>
                    <label htmlFor="" className='generator__select-container'>
                        <span className='generator__select-container-headline'>Generation Model</span>
                        <Select 
                            optionProps={genModelOptionsProps} 
                            defaultValue={genModel} 
                            setSelectValue={setGenModel} 
                        />
                    </label>
                    {genModel === `core` || genModel === `sd3` ? 
                        <label htmlFor="" className='generator__select-container'>
                            <span className='generator__select-container-headline'>Aspect Ratio</span>
                            <Select
                                optionProps={aspectRatioProps}
                                defaultValue={aspectRatio}
                                setSelectValue={setAspectRatio}
                            />
                        </label>
                        : 
                        <label htmlFor="" className='generator__select-container'>
                            <span className='generator__select-container-headline'>Image Resolution </span>
                            <Select
                                optionProps={resolutionOptionProps}
                                defaultValue={resolution}
                                setSelectValue={setResolution}
                            />
                        </label>
                    }
                    <button>Generate Image</button>
                    <div className="generator__generated-image"></div>
                </div>
            </div>
        </section>
    );
};

export default Generator;