import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AspectRatios, OutputFormat, PresetStyle } from "../../../../types/typesGeneratorOptions";
import './imgGenerationOptions.scss';
import Select from "../../../common/select/Select";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/constants";
import Input from "../../../common/input/Input";
import InputFile from "../../../common/input-file/InputFile";
import { modelSelects } from "../../../../utilities/generatorOptions";
import Textarea from "../../../common/textarea/Textarea";
import { createOptionsOfModel } from "../../../../utilities/functions/modelOptions";
import { coreModelOptions, ImageGenerationServiceModel, sd3ModelOptions, sd3ModelOptionsImgToImg, ImageGenerationServiceOptions, ultraModelOptions } from "../../../../types/services/imageGeneration";

const ImgGenerationOptions = (
    {
        setOptions,
        serviceModelOptionModel, 
        isImgToImgModeEnabled
    } 
    : 
    {
        setOptions: Dispatch<SetStateAction<ImageGenerationServiceOptions | {}>>,
        serviceModelOptionModel: ImageGenerationServiceModel,
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
    const [negativePrompt, setNegativePrompt] = useState<string>(``);

    const options: ImageGenerationServiceOptions = {
        aspect_ratio: aspectRatio,
        style_preset: stylePreset,
        output_format: outputFormat,
        seed: seed,
        image: image,
        strength: imageStrength,
        negative_prompt: negativePrompt,
    };

    useEffect(() => {
        if (!serviceModelOptionModel.includes(`sd3`)) setImage(undefined);

        if (serviceModelOptionModel.includes(`sd3`) && outputFormat !== `png`) setOutputFormat(`png`);
    }, [serviceModelOptionModel]);

    useEffect(() => {
        
        switch(serviceModelOptionModel) {
            case `core`:
                const optionsCore: coreModelOptions | void = createOptionsOfModel(options, serviceModelOptionModel);
                if (!optionsCore) return console.log(`optionsCore is ${optionsCore}!`);
                
                setOptions(optionsCore); 
            break;
            
            case `ultra`:
                const optionsUltra: ultraModelOptions | void = createOptionsOfModel(options, serviceModelOptionModel);
                if (!optionsUltra) return console.log(`optionsUltra is ${optionsUltra}!`);

                setOptions(optionsUltra); 
            break;

            case (`sd3-large` || `sd3-large-turbo` || `sd3-medium`):
                const optionsSD3: sd3ModelOptions | sd3ModelOptionsImgToImg | void = createOptionsOfModel(options, serviceModelOptionModel, isImgToImgModeEnabled);
                if (!optionsSD3) return console.log(`optionsSD3 is ${optionsSD3}!`);

                setOptions(optionsSD3);
            break;
        };
    }, [aspectRatio, stylePreset, outputFormat, seed, image, imageStrength, negativePrompt, serviceModelOptionModel, isImgToImgModeEnabled]);

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                {isImgToImgModeEnabled && serviceModelOptionModel.includes(`sd3`) ? 
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
                {serviceModelOptionModel === `core` &&
                    <Select
                        {...stylePresetSelectProps}
                        value={stylePreset}
                        setValue={setStylePreset} 
                        className={selectCommonClassName} 
                    />
                }
                {isImgToImgModeEnabled && serviceModelOptionModel.includes(`sd3`) &&
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
                    options={serviceModelOptionModel !== `core` && serviceModelOptionModel !== `ultra` 
                        ? outputFormmatSelectProps.options.filter((option) => option.value !== `webp`) 
                        : 
                        outputFormmatSelectProps.options} 
                    className={selectCommonClassName} 
                />
                {serviceModelOptionModel !== `sd3-large-turbo` &&
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