import InputFile from "../../../common/input-file/InputFile";
import Input from "../../../common/input/Input";
import Select from "../../../common/select/Select";
import Textarea from "../../../common/textarea/Textarea";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OutputFormat } from "../../../../types/typesGeneratorOptions";
import { modelSelects } from "../../../../utilities/generatorOptions";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/constants";
import { UpscaleServiceModel } from "../../../../types/services/imageUpscale";
import './imgUpscaleOptions.scss';
import { ImageUpscaleModelOptions } from "../../../../interface/services/imageUpscale";

const ImgUpscaleOptions = (
    { 
        setOptions, 
        upscaleModel 
    }
    : 
    { 
        setOptions: Dispatch<SetStateAction<ImageUpscaleModelOptions>>,
        upscaleModel: UpscaleServiceModel
    }) => {

    const { 
        negativeInputProps,
        outputFormmatSelectProps,
        fileInputProps,
        seedInputProps,
    } = modelSelects;
    
    let { creativityInputProps } = modelSelects;

    useEffect(() => {
        switch (upscaleModel) {
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
    }, [creativityInputProps, upscaleModel]);

    const [output_format, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(seedInputProps.value); 
    const [image, setImage] = useState<Blob>(new Blob());
    const [creativity, setCreativity] = useState<number | undefined>(creativityInputProps.value);
    const [negative_prompt, setNegativePrompt] = useState<string>(``);

    const upscaleOptions = {
        image,
        seed,
        negative_prompt,
        output_format,
        creativity,
    };

    useEffect(() => {
        setOptions(upscaleOptions);
    }, [image, seed, output_format, creativity, negative_prompt]);

    return (
        <div className="img-upscale-options">
            <div className="img-upscale-options__inner">
                <InputFile 
                    {...fileInputProps}
                    isRequired={true}
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
                    value={output_format}
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
                    value={negative_prompt}
                    setValue={setNegativePrompt}
                />
            </div>
        </div>
    );
};

export default ImgUpscaleOptions;