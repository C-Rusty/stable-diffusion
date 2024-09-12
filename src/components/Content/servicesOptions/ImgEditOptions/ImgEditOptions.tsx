import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import './imgEditOptions.scss';
import InputFile from '../../../common/input-file/InputFile';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { selectCommonClassName } from '../../../../utilities/constants';
import Input from '../../../common/input/Input';
import { imgEditModelSelects } from '../../../../utilities/services/imageEdit';
import { OutputFormat } from '../../../../types/typesGeneratorOptions';
import Select from '../../../common/select/Select';
import Textarea from '../../../common/textarea/Textarea';
import { ImageEditServiceModel } from '../../../../types/services/imageEdit';
import { ImageEditOptions, ImageEditServiceOptionErase, ImageEditServiceOptionInpaint, ImageEditServiceOptionOutpaint, ImageEditServiceOptionSearchAndReplace, ImageEditServiceOptionRemoveBackground } from '../../../../interface/sd-request/imgEdit';

const ImgEditOptions = (
    {
        setOptions, 
        serviceModelOptionModel 
    }
    :
    {
        setOptions: Dispatch<SetStateAction<ImageEditOptions>>,
        serviceModelOptionModel: ImageEditServiceModel
    }) => {

        const { 
            negativeInputProps,
            outputFormmatSelectProps,
            promptProps,
            seedInputProps,
        } = modelSelects;

        let { creativityInputProps } = modelSelects;
        creativityInputProps.value = .5;
        creativityInputProps.min = 0;
        creativityInputProps.max = 1;
        creativityInputProps.step = .1;

        const {
            maskFileInputProps,
            growMaskInputProps,
            pixelsAmountInputProps,
            searchToReplaceInputProps
        } = imgEditModelSelects;

    const [prompt, setPrompt] = useState<string>(promptProps.value);
    const [seed, setSeed] = useState<number>(seedInputProps.value); 
    const [output_format, setOutputFormat] = useState<OutputFormat>(outputFormmatSelectProps.options[0].value);
    const [mask, setMask] = useState<Blob | null>(null);
    const [grow_mask, setGrowMask] = useState<number>(growMaskInputProps.value);
    const [negative_prompt, setNegativePrompt] = useState<string>(negativeInputProps.value);
    const [creativity, setCreativity] = useState<number>(creativityInputProps.value);

    const [left, setLeft] = useState<number>(pixelsAmountInputProps.value);
    const [right, setRight] = useState<number>(pixelsAmountInputProps.value);
    const [up, setUp] = useState<number>(pixelsAmountInputProps.value);
    const [down, setDown] = useState<number>(pixelsAmountInputProps.value);

    const [search_prompt, setSearchPrompt] = useState<string>(searchToReplaceInputProps.value);

    useEffect(() => {
        // SD API docs: at least one side must be greater than 0
        if (left === 0 && right === 0 && up === 0 && down === 0) {
            setLeft(1);
        };
    }, [left, right, up, down]);

    useEffect(() => {
        let options: ImageEditOptions | undefined = undefined;

        switch (serviceModelOptionModel) {
            case `erase`:
                options = {
                    mask,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionErase;
            break;
            case `inpaint`:
                options = {
                    negative_prompt,
                    mask,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionInpaint;
            break;
            case `outpaint`:
                options = {
                    left,
                    right,
                    up,
                    down,
                    creativity,
                    prompt,
                    seed,
                    output_format
                } as ImageEditServiceOptionOutpaint;
            break;
            case `search-and-replace`:
                options = {
                    negative_prompt,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionSearchAndReplace;
            break;
            case `remove-background`:
                options = {
                    output_format
                } as ImageEditServiceOptionRemoveBackground;
            break;
        
            default: return console.log(`serviceModelOption not found: ${serviceModelOptionModel}`);
        };

        setOptions(options);

    }, [seed, output_format, mask, grow_mask, negative_prompt, creativity, left, right, up, down, search_prompt, prompt, serviceModelOptionModel, setOptions]);

    return (
        <div className='img-edit-options'>
            <div className="img-edit-options__inner">
                {(serviceModelOptionModel === `erase` || serviceModelOptionModel === `inpaint`) &&
                    <InputFile 
                        {...maskFileInputProps}
                        image={mask}
                        setImage={setMask}
                    />
                }
                {(serviceModelOptionModel === `erase` || serviceModelOptionModel === `inpaint` || serviceModelOptionModel === `search-and-replace`) &&
                    <Input 
                        {...growMaskInputProps}
                        value={grow_mask}
                        setValue={setGrowMask}
                    />
                }
                {serviceModelOptionModel === `outpaint` &&
                    <Fragment>
                        <Input
                            {...pixelsAmountInputProps}
                            label={`Left`}
                            value={left}
                            setValue={setLeft}
                        />
                        <Input
                            {...pixelsAmountInputProps}
                            label={`Right`}
                            value={right}
                            setValue={setRight}
                        />
                        <Input
                            {...pixelsAmountInputProps}
                            label={`Up`}
                            value={up}
                            setValue={setUp}
                        />
                        <Input
                            {...pixelsAmountInputProps}
                            label={`Down`}
                            value={down}
                            setValue={setDown}
                        />
                        <Input 
                            {...creativityInputProps}
                            value={creativity}
                            setValue={setCreativity}
                        />
                        <Input
                            {...promptProps}
                            value={prompt}
                            setValue={setPrompt}
                        />
                    </Fragment>
                }
                {serviceModelOptionModel !== `remove-background` && 
                    <Input 
                        {...seedInputProps}
                        value={seed}
                        setValue={setSeed}
                    />
                }
                <Select 
                    {...outputFormmatSelectProps}
                    value={output_format}
                    setValue={setOutputFormat} 
                    options={serviceModelOptionModel === `remove-background`?          
                        outputFormmatSelectProps.options.filter((option) => option.value !== `jpeg`) 
                        : 
                        outputFormmatSelectProps.options} 
                    className={selectCommonClassName} 
                />
                {serviceModelOptionModel === `search-and-replace` &&
                    <Input
                        {...searchToReplaceInputProps}
                        value={search_prompt}
                        setValue={setSearchPrompt}
                    />
                }
                {(serviceModelOptionModel === `inpaint` || serviceModelOptionModel === `search-and-replace`) &&
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

export default ImgEditOptions;