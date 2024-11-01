import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import './videoGenerationOptions.scss';
import { ImageToVideoGenerationServiceModels } from '../../../../types/services/imageToVideoGeneration';
import { modelSelects } from '../../../../utilities/generatorOptions';
import Input from '../../../common/input/Input';
import { VideoGenerationModelOptions } from '../../../../interface/sd-request/videoGeneration';

const VideoGenerationOptions = (
    {
        setOptions,
        serviceModelOption
    }
    :
    {
        setOptions: Dispatch<SetStateAction<VideoGenerationModelOptions>>,
        serviceModelOption: ImageToVideoGenerationServiceModels
    }) => {

        const {seedInputProps } = modelSelects;

        const [seed, setSeed] = useState<number>(seedInputProps.value);

        useEffect(() => {
            switch (serviceModelOption) {
                case `image-to-video`:
                    setOptions({seed});
                break;
            
                default: return console.log(`VideoGenerationOptions error: serviceModelOption is ${serviceModelOption}`);
            };
        }, [seed, setOptions]);

    return (
        <div className='video-generation-options'>
            <div className='video-generation-options__inner'>
                {serviceModelOption === `image-to-video` &&
                    <Input
                        {...seedInputProps}
                        value={seed}
                        setValue={setSeed}
                    />
                }
            </div>
        </div>
    );
};

export default VideoGenerationOptions;