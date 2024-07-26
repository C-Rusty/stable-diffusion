import { ImageControlServiceOption, ImageControlServiceOptions } from "./imageControl";
import { ImageEditServiceOption, ImageEditServiceOptions } from "./imageEdit";
import { ImageGenerationServiceOption } from "./imageGeneration";
import { ImageToVideoGenerationServiceOption, ImageToVideoGenerationServiceOptions } from "./imageToVideoGeneration";
import { ImageUpscaleModelParams, UpscaleServiceOption } from "./imageUpscale";

export type ServiceType = `Image Generator` | `Upscale Image` | `Edit Image` | `Precise Generator` | `Video Generator`;

export type ModelServicesOptions = {
    imageGeneration: Array<ImageGenerationServiceOption>,
    upscale: Array<UpscaleServiceOption>,
    imageEdit: Array<ImageEditServiceOption>,
    imageControl: Array<ImageControlServiceOption>,
    imageToVideoGeneration: Array<ImageToVideoGenerationServiceOption>
};

export type CurrentServiceModel = ImageGenerationServiceOption | UpscaleServiceOption | ImageEditServiceOption | ImageControlServiceOption | ImageToVideoGenerationServiceOption;

export type CurrentServiceModels = Array<CurrentServiceModel>;

export type CurrentServiceModelOptions = ImageEditServiceOptions | ImageGenerationServiceOption | ImageToVideoGenerationServiceOptions | ImageUpscaleModelParams | ImageControlServiceOptions;