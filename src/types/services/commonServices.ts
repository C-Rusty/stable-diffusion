import { ImageControlServiceModel, ImageControlServiceOptions } from "./imageControl";
import { ImageEditServiceModel, ImageEditServiceOptions } from "./imageEdit";
import { ImageGenerationServiceModel, ImageGenerationServiceOptions } from "./imageGeneration";
import { ImageToVideoGenerationServiceModels, ImageToVideoGenerationServiceOptions } from "./imageToVideoGeneration";
import { ImageUpscaleModelOptions, UpscaleServiceModel } from "./imageUpscale";

export type ServiceType = `Image Generator` | `Upscale Image` | `Edit Image` | `Precise Image Edit` | `Video Generator`;

export type ModelServicesOptions = {
    imageGeneration: Array<ImageGenerationServiceModel>,
    upscale: Array<UpscaleServiceModel>,
    imageEdit: Array<ImageEditServiceModel>,
    imageControl: Array<ImageControlServiceModel>,
    imageToVideoGeneration: Array<ImageToVideoGenerationServiceModels>
};

export type CurrentServiceModel = ImageGenerationServiceModel | UpscaleServiceModel | ImageEditServiceModel | ImageControlServiceModel | ImageToVideoGenerationServiceModels;

export type CurrentServiceModels = Array<CurrentServiceModel>;

export type CurrentServiceModelOptions = ImageEditServiceOptions | ImageGenerationServiceOptions | ImageToVideoGenerationServiceOptions | ImageUpscaleModelOptions | ImageControlServiceOptions;