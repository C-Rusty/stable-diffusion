import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AspectRatios, OutputFormat, PresetStyle } from "../../../../types/typesGeneratorOptions";
import './imgGenerationOptions.scss';
import Select from "../../../common/select/Select";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/constants";
import Input from "../../../common/input/Input";
import InputFile from "../../../common/input-file/InputFile";
import { modelSelects } from "../../../../utilities/generatorOptions";
import Textarea from "../../../common/textarea/Textarea";
import { coreModelOptions, ImageGenerationOptions, sd3ModelOptions, sd3ModelOptionsImgToImg, ultraModelOptions } from "../../../../interface/services/imageGeneration";
import { ImageGenerationServiceModel } from "../../../../types/services/imageGeneration";

const ImgGenerationOptions = (
    {
        setOptions,
        serviceModelOptionModel, 
        isImgToImgModeEnabled
    } 
    : 
    {
        setOptions: Dispatch<SetStateAction<ImageGenerationOptions>>,
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

    const [aspect_ratio, setAspectRatio] = useState<AspectRatios>(`1:1`);
    const [style_preset, setStylePreset] = useState<PresetStyle | undefined>(undefined);
    const [output_format, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(seedInputProps.value); 
    const [image, setImage] = useState<Blob>(new Blob());
    const [strength, setStrength] = useState<number | undefined>(imageStrengthInputProps.value);
    const [negative_prompt, setNegativePrompt] = useState<string>(``);

    useEffect(() => {
        if (!serviceModelOptionModel.includes(`sd3`)) setImage(new Blob());

        if (serviceModelOptionModel.includes(`sd3`) && output_format !== `png`) setOutputFormat(`png`);
    }, [output_format, serviceModelOptionModel]);

    useEffect(() => {

        let options: coreModelOptions | sd3ModelOptions | sd3ModelOptionsImgToImg | ultraModelOptions | undefined = undefined;  
        
        switch(serviceModelOptionModel) {
            case `core`:
                options = {
                    aspect_ratio,
                    negative_prompt,
                    seed,
                    style_preset,
                    output_format: "png"
                } as coreModelOptions;
            break;
            
            case `ultra`:
                options = {
                    aspect_ratio,
                    negative_prompt,
                    seed,
                    output_format
                } as ultraModelOptions;
            break;

            case (`sd3-large` || `sd3-large-turbo` || `sd3-medium`):
                switch (isImgToImgModeEnabled) {
                    case true:
                        options = {
                            mode: `image-to-image`,
                            image,
                            strength,
                            aspect_ratio,
                            seed,
                            output_format,
                            negative_prompt,
                        } as sd3ModelOptionsImgToImg;
                    break;

                    case false:
                        options = {
                            mode: `text-to-image`,
                            aspect_ratio,
                            seed,
                            output_format,
                            negative_prompt
                        } as sd3ModelOptions;

                    break;
                
                    default: break;
                };

            break;

            default: break;
        };

        setOptions(options as ImageGenerationOptions);

    }, [aspect_ratio, style_preset, output_format, seed, image, strength, negative_prompt, serviceModelOptionModel, isImgToImgModeEnabled]);

    return(
        <div className="generator-v2">
            <div className='generator-v2__inner'>
                {isImgToImgModeEnabled && serviceModelOptionModel.includes(`sd3`) ? 
                    <Input 
                        {...imageStrengthInputProps}
                        value={strength}
                        setValue={setStrength}
                    />
                    :
                    <Select 
                        {...aspectRatiSelectProps}
                        value={aspect_ratio}
                        setValue={setAspectRatio} 
                        className={selectCommonClassName} 
                    />
                }
                {serviceModelOptionModel === `core` &&
                    <Select
                        {...stylePresetSelectProps}
                        value={style_preset}
                        setValue={setStylePreset} 
                        className={selectCommonClassName} 
                    />
                }
                {isImgToImgModeEnabled && serviceModelOptionModel.includes(`sd3`) &&
                    <InputFile 
                        {...fileInputProps}
                        isRequired={true}
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
                    value={output_format}
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
                        value={negative_prompt}
                        setValue={setNegativePrompt}
                    />
                }
            </div>
        </div>
    );
};

export default ImgGenerationOptions;