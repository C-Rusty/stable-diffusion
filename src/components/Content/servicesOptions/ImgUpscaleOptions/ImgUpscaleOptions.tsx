import InputFile from "../../../common/input-file/InputFile";
import Input from "../../../common/input/Input";
import Select from "../../../common/select/Select";
import Textarea from "../../../common/textarea/Textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OutputFormat } from "../../../../types/typesGeneratorOptions";
import { modelSelects } from "../../../../utilities/generatorOptions";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/constants";
import { ImageUpscaleModelOptions, UpscaleServiceModel } from "../../../../types/services/imageUpscale";
import './imgUpscaleOptions.scss';

const ImgUpscaleOptions = (
    { 
        setOptions, 
        serviceModelOptionModel 
    }
    : 
    { 
        setOptions: Dispatch<SetStateAction<ImageUpscaleModelOptions | {}>>,
        serviceModelOptionModel: UpscaleServiceModel
    }) => {

    const { 
        negativeInputProps,
        outputFormmatSelectProps,
        fileInputProps,
        seedInputProps,
    } = modelSelects;
    
    let { creativityInputProps } = modelSelects;

    useEffect(() => {
        switch (serviceModelOptionModel) {
            case `conservative`:
                creativityInputProps.min = 0.2;
                creativityInputProps.max = 0.5;
                creativityInputProps.value = 0.35;

                setCreativity(creativityInputProps.value);
            break;

            case `creative`:
                creativityInputProps.min = 0;
                creativityInputProps.max = 0.35;
                creativityInputProps.value = 0.3;

                setCreativity(creativityInputProps.value);
            break;
        
            default: break;
        }
    }, [creativityInputProps, serviceModelOptionModel]);

    const [outputFormat, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(0); 
    const [image, setImage] = useState<Blob | undefined>(undefined);
    const [creativity, setCreativity] = useState<number | undefined>(undefined);
    const [negativePrompt, setNegativePrompt] = useState<string>(``);

    const upscaleOptions = {
        output_format: outputFormat,
        seed: seed,
        image: image,
        creativity: creativity,
        negative_prompt: negativePrompt
    };

    useEffect(() => {
        setOptions(upscaleOptions);
    }, [image, seed, outputFormat, creativity, negativePrompt]);

    return (
        <div className="img-upscale-options">
            <div className="img-upscale-options__inner">
                <InputFile 
                    {...fileInputProps}
                    className={inputCommonClassName}
                    setImage={setImage}
                />
                <Input 
                    {...seedInputProps}
                    value={seed}
                    setValue={setSeed}
                />
                <Select 
                    {...outputFormmatSelectProps}
                    value={outputFormat}
                    setValue={setOutputFormat} 
                    options={outputFormmatSelectProps.options} 
                    className={selectCommonClassName} 
                />
                <Input 
                    {...creativityInputProps}
                    value={creativity}
                    setValue={setCreativity}
                />
                <Textarea
                    {...negativeInputProps}
                    value={negativePrompt}
                    setValue={setNegativePrompt}
                />
            </div>
        </div>
    );
};

export default ImgUpscaleOptions;