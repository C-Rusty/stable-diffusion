import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import './imgEditOptions.scss';
import InputFile from '../../../common/input-file/InputFile';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { inputCommonClassName, selectCommonClassName } from '../../../../utilities/constants';
import Input from '../../../common/input/Input';
import { imgEditModelSelects } from '../../../../utilities/services/imageEdit';
import { OutputFormat } from '../../../../types/typesGeneratorOptions';
import Select from '../../../common/select/Select';
import Textarea from '../../../common/textarea/Textarea';
import { ImageEditServiceOptionErase, ImageEditServiceOptionInpaint, ImageEditServiceOptionOutpaint, ImageEditServiceOptionSearchAndReplace } from '../../../../interface/services/imgEdit';
import { ImageEditServiceModel } from '../../../../types/services/imageEdit';

const ImgEditOptions = (
    {
        setOptions, 
        serviceModelOptionModel 
    }
    :
    {
        setOptions: Dispatch<SetStateAction<ImageEditServiceModel | {}>>,
        serviceModelOptionModel: ImageEditServiceModel
    }) => {

        const { 
            negativeInputProps,
            outputFormmatSelectProps,
            fileInputProps,
            seedInputProps,
        } = modelSelects;

        let {creativityInputProps} = modelSelects;
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

    const [image, setImage] = useState<Blob>(new Blob());
    const [seed, setSeed] = useState<number>(seedInputProps.value); 
    const [output_format, setOutputFormat] = useState<OutputFormat>(`png`);
    const [mask, setMask] = useState<Blob>(new Blob());
    const [grow_mask, setGrowMask] = useState<number>(growMaskInputProps.value);
    const [negative_prompt, setNegativePrompt] = useState<string>(``);
    const [creativity, setCreativity] = useState<number>(creativityInputProps.value);

    const [left, setLeft] = useState<number>(pixelsAmountInputProps.value);
    const [right, setRight] = useState<number>(pixelsAmountInputProps.value);
    const [up, setUp] = useState<number>(pixelsAmountInputProps.value);
    const [down, setDown] = useState<number>(pixelsAmountInputProps.value);

    const [search_prompt, setSearchPrompt] = useState<string>(searchToReplaceInputProps.value);

    useEffect(() => {
        let options: ImageEditServiceChosenOptions | undefined = undefined;

        switch (serviceModelOptionModel) {
            case `erase`:
                options = {
                    image: image as Blob,
                    mask,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionErase;
            break;
            case `inpaint`:
                options = {
                    image: image as Blob,
                    negative_prompt,
                    mask,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionInpaint;
            break;
            case `outpaint`:
                options = {
                    image: image as Blob,
                    left,
                    right,
                    up,
                    down,
                    creativity,
                    seed,
                    output_format
                } as ImageEditServiceOptionOutpaint;
                console.log(options);
                
            break;
            case `search-and-replace`:
                options = {
                    image: image as Blob,
                    search_prompt,
                    grow_mask,
                    seed,
                    output_format
                } as ImageEditServiceOptionSearchAndReplace;
            break;
            case `remove-background`:
                options = {
                    image: image as Blob,
                    output_format
                } as ImageEditServiceOptionErase;
            break;
        
            default: return console.log(`serviceModelOptionModel not found`);
        };

        setOptions(options);

    }, [image, seed, output_format, mask, grow_mask, negative_prompt, creativity, left, right, up, down, search_prompt]);

    return (
        <div className='img-edit-options'>
            <div className="img-edit-options__inner">
                {(serviceModelOptionModel === `inpaint` || serviceModelOptionModel === `outpaint` || serviceModelOptionModel === `search-and-replace`) &&
                    <InputFile 
                        {...fileInputProps}
                        isRequired={true}
                        label={`Image to edit`}
                        className={inputCommonClassName}
                        setImage={setImage}
                    />
                }
                {serviceModelOptionModel !== `remove-background` && 
                    <Input 
                        {...seedInputProps}
                        value={seed}
                        setValue={setSeed}
                    />
                }
                {(serviceModelOptionModel === `erase` || serviceModelOptionModel === `inpaint`) &&
                    <InputFile 
                        {...maskFileInputProps}
                        className={inputCommonClassName}
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
                    </Fragment>
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