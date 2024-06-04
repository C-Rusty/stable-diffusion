import { Dispatch, SetStateAction, useState } from "react";
import { ApiV2ModelParams } from "../../../types/typesV2Model";
import { v2ModelCommonPropsForSelect } from "../../../utilities/V2ModelPropsForSelect";
import { generatorCommonPropsForSelect } from "../../../utilities/GeneratorPropsForSelect";
import './modelV2Selects.scss';


const ModelV2Selects = (
    {
        data,
        setData
    } 
    :
    {
        data: ApiV2ModelParams | {},
        setData: Dispatch<SetStateAction<ApiV2ModelParams | {}>>
    }
) => {

    const dataDefaltValue: ApiV2ModelParams = {
        aspect_ratio: `16:9`,
        negative_prompt: ``, 
        seed: 0, 
        style_preset: `digital-art`,
        output_format: `png`
    };

    const [options, selectedOptions] = useState<ApiV2ModelParams>(dataDefaltValue);

    const { aspectRatiSelectProps, negativeInputProps, outputFormmatSelectProps } = v2ModelCommonPropsForSelect;
    const { stylePresetSelectProps, seedInputProps, outputFormatSelectProps } = generatorCommonPropsForSelect;

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                <label htmlFor="" className="generator-v2__label">
                    <span className='generator-v2__headline'>
                        Aspect Ratio
                    </span>
                    <select name="aspect_ratio" id="aspect_ratio" className="generator-v2__select">
                        {aspectRatiSelectProps.options.map((optionItem) => 
                            <option key={optionItem.text} value={optionItem.value}>
                                {optionItem.text}
                            </option>
                        )}
                    </select>
                </label>
                <label htmlFor="" className="generator-v2__label">
                    <span className="generator-v2__headline">
                        Seed
                    </span>
                    <input type="number" name="seed" id="seed" className="generator-v2__input" />
                </label>
                <label htmlFor="" className="generator-v2__label">
                    <span className="generator-v2__headline">
                        Style Preset
                    </span>
                    <select name="style_preset" id="style_preset" className="generator-v2__select">
                        {stylePresetSelectProps.options.map((optionItem) => 
                            <option key={optionItem.text} value={optionItem.value}>
                                {optionItem.text}
                            </option>
                        )}
                    </select>
                </label>
                <label htmlFor="" className="generator-v2__label">
                    <span className="generator-v2__headline">
                        Output Format
                    </span>
                    <select name="output_format" id="output_format" className="generator-v2__select">
                        {outputFormmatSelectProps.options.map((optionItem) => 
                            <option key={optionItem.text} value={optionItem.value}>
                                {optionItem.text}
                            </option>
                        )}  
                    </select>
                </label>
                <label htmlFor="" className="generator-v2__label">
                    <span className="generator-v2__headline">
                        Negative Prompt
                    </span>
                    <input type="text" name="negative_prompt" id="negative_prompt" className="generator-v2__input" />
                </label>
            </div>
        </div>
    );
};

export default ModelV2Selects;