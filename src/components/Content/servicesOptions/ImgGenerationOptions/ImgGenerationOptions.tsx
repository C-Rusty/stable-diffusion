import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AspectRatios, OutputFormat, PresetStyle } from "../../../../types/typesGeneratorOptions";
import './imgGenerationOptions.scss';
import Select from "../../../common/select/Select";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/vars";
import Input from "../../../common/input/Input";
import { GenModelsValue } from "../../../../types/typesCommon";
import InputFile from "../../../common/input-file/InputFile";
import { modelSelects } from "../../../../utilities/generatorOptions";
import Textarea from "../../../common/textarea/Textarea";
import { coreModelOptions, sd3ModelOptions, sd3ModelOptionsImgToImg, SDModelParams, ultraModelOptions } from "../../../../types/models";
import { createOptionsOfModel } from "../../../../utilities/functions";

const ImgGenerationOptions = (
    {
        setOptions, 
        genModel,
        isImgToImgModeEnabled
    } 
    : 
    {
        setOptions: Dispatch<SetStateAction<SDModelParams | {}>>,
        genModel: GenModelsValue,
        isImgToImgModeEnabled: boolean
    }
) => {

    const { 
        aspectRatiSelectProps,
        negativeInputProps,
        outputFormmatSelectProps,
        stylePresetSelectProps,
        fileInputProps,
        seedInputProps,
        imageStrengthInputProps
    } = modelSelects;

    const [aspectRatio, setAspectRatio] = useState<AspectRatios>(`1:1`);
    const [stylePreset, setStylePreset] = useState<PresetStyle | undefined>(undefined);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(0); 
    const [image, setImage] = useState<Blob | undefined>(undefined);
    const [imageStrength, setImageStrength] = useState<number | undefined>(undefined);
    const [negativePrompt, setNegativePrompt] = useState<string | undefined>(undefined);

    const options: SDModelParams = {
        aspect_ratio: aspectRatio,
        style_preset: stylePreset,
        output_format: outputFormat,
        seed: seed,
        image: image,
        strength: imageStrength,
        negative_prompt: negativePrompt,
    };

    useEffect(() => {
        if (!genModel.includes(`sd3`)) setImage(undefined);

        if (genModel.includes(`sd3`) && outputFormat !== `png`) setOutputFormat(`png`);
    }, [genModel]);

    useEffect(() => {
        
        switch(genModel) {
            case `core`:
                const optionsCore: coreModelOptions | void = createOptionsOfModel(options, genModel);
                if (!optionsCore) return console.log(`optionsCore is ${optionsCore}!`);
                
                setOptions(optionsCore); 
            break;
            
            case `ultra`:
                const optionsUltra: ultraModelOptions | void = createOptionsOfModel(options, genModel);
                if (!optionsUltra) return console.log(`optionsUltra is ${optionsUltra}!`);

                setOptions(optionsUltra); 
            break;

            case (`sd3-large` || `sd3-large-turbo` || `sd3-medium`):
                const optionsSD3: sd3ModelOptions | sd3ModelOptionsImgToImg | void = createOptionsOfModel(options, genModel, isImgToImgModeEnabled);
                if (!optionsSD3) return console.log(`optionsSD3 is ${optionsSD3}!`);

                setOptions(optionsSD3);
            break;
        };
    }, [aspectRatio, stylePreset, outputFormat, seed, image, imageStrength, negativePrompt, genModel, isImgToImgModeEnabled]);

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                {isImgToImgModeEnabled && genModel.includes(`sd3`) ? 
                    <Input 
                        {...imageStrengthInputProps}
                        value={imageStrength}
                        setValue={setImageStrength}
                    />
                    :
                    <Select 
                        {...aspectRatiSelectProps}
                        value={aspectRatio}
                        setValue={setAspectRatio} 
                        className={selectCommonClassName} 
                    />
                }
                {genModel === `core` &&
                    <Select
                        {...stylePresetSelectProps}
                        value={stylePreset}
                        setValue={setStylePreset} 
                        className={selectCommonClassName} 
                    />
                }
                {isImgToImgModeEnabled && genModel.includes(`sd3`) &&
                    <InputFile 
                        {...fileInputProps}
                        className={inputCommonClassName}
                        setImage={setImage}
                    />
                }
                <Input 
                    {...seedInputProps}
                    value={seed}
                    setValue={setSeed}
                />
                <Select 
                    {...outputFormmatSelectProps}
                    value={outputFormat}
                    setValue={setOutputFormat} 
                    options={genModel !== `core` && genModel !== `ultra` 
                        ? outputFormmatSelectProps.options.filter((option) => option.value !== `webp`) 
                        : 
                        outputFormmatSelectProps.options} 
                    className={selectCommonClassName} 
                />
                {genModel !== `sd3-large-turbo` &&
                    <Textarea
                        {...negativeInputProps}
                        value={negativePrompt}
                        setValue={setNegativePrompt}
                    />
                }
            </div>
        </div>
    );
};

export default ImgGenerationOptions;