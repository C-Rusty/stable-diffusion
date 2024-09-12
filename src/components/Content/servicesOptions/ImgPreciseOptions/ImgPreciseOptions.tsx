import './imgPreciseOptions.scss';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import { ImageControlServiceModel } from '../../../../types/services/imageControl';
import Input from '../../../common/input/Input';
import { imageControlServiceInputProps } from '../../../../utilities/services/ImageControl';
import { modelSelects } from '../../../../utilities/generatorOptions';
import Select from '../../../common/select/Select';
import { AspectRatios, OutputFormat } from '../../../../types/typesGeneratorOptions';
import Textarea from '../../../common/textarea/Textarea';
import { selectCommonClassName } from '../../../../utilities/constants';
import { IImgPreciseEditOptions } from '../../../../interface/sd-request/imgPreciceEdit';

const ImgPreciseOptions = (
    {
        setOptions,
        serviceModelOption
    }
    :
    {
        setOptions: Dispatch<SetStateAction<IImgPreciseEditOptions>>,
        serviceModelOption: ImageControlServiceModel
    }) => {

    const { controlStrengthInnputProps, fidelityInputProps} = imageControlServiceInputProps;

    const {seedInputProps, negativeInputProps, outputFormmatSelectProps, aspectRatioSelectProps } = modelSelects;

    const [aspect_ratio, setAspectRatio] = useState<AspectRatios>(aspectRatioSelectProps.options[0].text);
    const [output_format, setOutputFormat] = useState<OutputFormat>(outputFormmatSelectProps.options[0].text);
    const [negative_prompt, setNegativePrompt] = useState<string>(negativeInputProps.value);
    const [seed, setSeed] = useState<number>(seedInputProps.value);
    const [fidelity, setFidelity] = useState<number>(fidelityInputProps.value);
    const [control_strength, setControlStrength] = useState<number>(controlStrengthInnputProps.value);

    useEffect(() => {
        if (serviceModelOption === `style`) {
            setOptions({
                aspect_ratio,
                output_format,
                negative_prompt,
                seed,
                fidelity,
            });
        } else {
            setOptions({
                output_format,
                negative_prompt,
                seed,
                control_strength
            });
        };
    }, [aspect_ratio, output_format, negative_prompt, seed, fidelity, control_strength]);

    return (
        <div className="img-precise-options">
            <div className="img-precise-options__inner">
                {serviceModelOption === `style` && 
                    <Fragment>
                        <Input
                            {...fidelityInputProps}
                            setValue={setFidelity}
                        />
                        <Select
                            {...aspectRatioSelectProps}
                            value={aspect_ratio}
                            setValue={setAspectRatio}
                            className={selectCommonClassName}
                        />
                    </Fragment>
                }
                {serviceModelOption !== `style` &&
                    <Input
                        {...controlStrengthInnputProps}
                        setValue={setControlStrength}
                    />
                }
                <Input
                    {...seedInputProps}
                    setValue={setSeed}
                />
                <Select
                    {...outputFormmatSelectProps}
                    value={output_format}
                    setValue={setOutputFormat}
                    className={selectCommonClassName}
                />
                <Textarea
                    {...negativeInputProps}
                    setValue={setNegativePrompt}
                />
            </div>
        </div>
    );
};

export default ImgPreciseOptions;