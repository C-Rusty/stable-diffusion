import { IInputNumberProps } from '../../interface/fields';
import { ImageToVideoGenerationServiceModels } from '../../types/services/imageToVideoGeneration';

export const ImageToVideoGenerationServiceModel: Array<ImageToVideoGenerationServiceModels> = [
    `image-to-video`,
];

const cfgScaleInputProps: IInputNumberProps = {
    id: 'cfg-scale',
    value: 1.8,
    min: 0,
    max: 10,
    step: .1,
    className: 'cfg-scale-input',
    placeholder: `How strongly the video sticks to the original image`,
    name: 'cfg-scale',
    required: true,
    label: 'CFG Scale',
    type: 'number'
};

const motionBucketInputProps: IInputNumberProps = {
    id: 'motion-bucket',
    value: 127,
    min: 1,
    max: 255,
    step: 1,
    className: 'motion-bucket-input',
    placeholder: `How much motion is in the video`,
    name: 'motion-bucket',
    label: 'Motion Bucket',
    type: 'number',
    required: true,
};

export const imageToVideoGenerationOptions = {
    motionBucketInputProps,
    cfgScaleInputProps
};