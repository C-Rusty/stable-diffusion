import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ApiV2ModelParams, AspectRatios, OutputFormat, PresetStyle } from "../../../types/typesV2Model";
import { v2ModelCommonPropsForSelect } from "../../../utilities/ModelProps/V2ModelPropsForSelect";
import { generatorCommonPropsForSelect } from "../../../utilities/ModelProps/GeneralPropsForSelect";
import './modelV2Selects.scss';
import Select from "../../common/select/Select";
import { inputCommonClassName, selectCommonClassName } from "../../../utilities/commonVars";
import Input from "../../common/Input";


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

    const { 
        stylePresetSelectProps, 
        seedInputProps, 
    } = generatorCommonPropsForSelect;

    const { 
        aspectRatiSelectProps, 
        negativeInputProps, 
        outputFormmatSelectProps 
    } = v2ModelCommonPropsForSelect;

    const [aspectRatio, setAspectRatio] = useState<AspectRatios>(`1:1`);
    const [stylePreset, setStylePreset] = useState<PresetStyle>(`3d-model`);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(0);    
    const [negativePrompt, setNegativePrompt] = useState<string | null>(null);

    useEffect(() => {
        setData({
            aspect_ratio: aspectRatio,
            negative_prompt: negativePrompt,
            seed: seed,
            style_preset: stylePreset,
            output_format: outputFormat
        });
    }, [aspectRatio, negativePrompt, seed, stylePreset, outputFormat]);

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                <div className="generator-v2__select-component">
                    <Select 
                        setValue={setAspectRatio} 
                        options={aspectRatiSelectProps.options} 
                        className={selectCommonClassName} 
                    />
                    <label className="select-label">Aspect Ratio</label>
                </div>
                <div className="generator-v2__input-component">
                    <Input 
                        type={seedInputProps.inputType} 
                        name={seedInputProps.name} 
                        id={seedInputProps.id} 
                        className={inputCommonClassName} 
                        value={seed}
                        setValue={setSeed}
                    />
                    <label className="input-label">Seed</label>
                </div>
                <div className="generator-v2__select-component">
                    <Select 
                        setValue={setStylePreset} 
                        options={stylePresetSelectProps.options} 
                        className={selectCommonClassName} 
                    />
                    <label className="select-label">Style Preset</label>
                </div>
                <div className="generator-v2__select-component">
                    <Select 
                        setValue={setOutputFormat} 
                        options={outputFormmatSelectProps.options} 
                        className={selectCommonClassName} 
                    />
                    <label className="select-label">Output Format</label>
                </div>
                <div className="generator-v2__input-component">
                    <Input 
                        type={negativeInputProps.inputType} 
                        name={negativeInputProps.name} 
                        className={inputCommonClassName} 
                        placeholder={negativeInputProps.placeholder}
                        value={negativePrompt}
                        setValue={setNegativePrompt}
                    />
                    <label className="input-label">Negative Prompt</label>
                </div>
            </div>
        </div>
    );
};

export default ModelV2Selects;