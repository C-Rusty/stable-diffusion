import { Fragment } from "react/jsx-runtime";
import InputFile from "../../../common/input-file/InputFile";
import Input from "../../../common/input/Input";
import Select from "../../../common/select/Select";
import Textarea from "../../../common/textarea/Textarea";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { OutputFormat } from "../../../../types/typesGeneratorOptions";
import { modelSelects } from "../../../../utilities/generatorOptions";
import { inputCommonClassName, selectCommonClassName } from "../../../../utilities/vars";
import { ImageUpscaleModelOptions } from "../../../../types/services/imageUpscale";

const ImgUpscaleOptions = (
    { setOptions }
    : 
    { setOptions: Dispatch<SetStateAction<ImageUpscaleModelOptions | {}>>}) => {

    const { 
        promptProps,
        negativeInputProps,
        outputFormmatSelectProps,
        fileInputProps,
        seedInputProps,
        creativityInputProps
    } = modelSelects;

    const [prompt, setPrompt] = useState<string>(``);
    const [outputFormat, setOutputFormat] = useState<OutputFormat>(`png`);
    const [seed, setSeed] = useState<number>(0); 
    const [image, setImage] = useState<Blob | undefined>(undefined);
    const [creativity, setCreativity] = useState<number | undefined>(undefined);
    const [negativePrompt, setNegativePrompt] = useState<string>(``);

    useEffect(() => {
        setOptions(modelSelects);
    }, [prompt, image, seed, outputFormat, creativity, negativePrompt]);

    return (
        <Fragment>
            <Textarea
                {...promptProps}
                value={prompt}
                setValue={setPrompt}
            />
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
        </Fragment>
    );
};

export default ImgUpscaleOptions;