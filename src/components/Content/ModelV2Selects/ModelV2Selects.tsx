import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { ApiV2ModelParams, AspectRatios, OutputFormat, PresetStyle } from "../../../types/typesV2Model";
import { v2ModelCommonPropsForSelect } from "../../../utilities/ModelProps/V2ModelPropsForSelect";
import { generatorCommonPropsForSelect } from "../../../utilities/ModelProps/GeneralPropsForSelect";
import './modelV2Selects.scss';
import Select from "../../common/select/Select";
import { inputCommonClassName, selectCommonClassName, textAreaCommonClassName } from "../../../utilities/commonVars";
import Input from "../../common/input/Input";

const ModelV2Selects = (
    {setData} : 
    {setData: Dispatch<SetStateAction<ApiV2ModelParams | {}>>}
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
    const negativePrompt = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        setData({
            aspect_ratio: aspectRatio,
            negative_prompt: negativePrompt.current?.value,
            seed: seed,
            style_preset: stylePreset,
            output_format: outputFormat
        });
    }, [aspectRatio, negativePrompt, seed, stylePreset, outputFormat]);

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                <div className="generator-v2__select-component">
                <label className="select-label">Aspect Ratio</label>
                    <Select 
                        setValue={setAspectRatio} 
                        options={aspectRatiSelectProps.options} 
                        className={selectCommonClassName} 
                        id={aspectRatiSelectProps.id}
                    />
                </div>
                <div className="generator-v2__input-component">
                    <label className="input-label">Seed (radnomness)</label>
                    <Input 
                        type={seedInputProps.inputType} 
                        name={seedInputProps.name} 
                        id={seedInputProps.id} 
                        className={inputCommonClassName} 
                        value={seed}
                        setValue={setSeed}
                    />
                </div>
                <div className="generator-v2__select-component">
                    <label className="select-label">Style Preset</label>
                    <Select 
                        setValue={setStylePreset} 
                        options={stylePresetSelectProps.options} 
                        className={selectCommonClassName} 
                        id={stylePresetSelectProps.id}
                    />
                </div>
                <div className="generator-v2__select-component">
                    <label className="select-label">Output Format</label>
                    <Select 
                        setValue={setOutputFormat} 
                        options={outputFormmatSelectProps.options} 
                        className={selectCommonClassName} 
                        id={outputFormmatSelectProps.id}
                    />
                </div>
                <div className="generator-v2__textarea-component">
                    <label className="textarea-label">Negative Prompt</label>
                    <textarea
                        name={negativeInputProps.name} 
                        className={textAreaCommonClassName} 
                        placeholder={negativeInputProps.placeholder}
                        ref={negativePrompt}
                        required={false}
                        id={negativeInputProps.id}
                        rows={1}
                    />
                </div>
            </div>
        </div>
    );
};

export default ModelV2Selects;