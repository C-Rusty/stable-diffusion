import { ImageGenerationOptions } from "../../interface/services/imageGeneration";
import { ImageUpscaleModelOptions } from "../../interface/services/imageUpscale";
import { ImageEditOptions } from "../../interface/services/imgEdit";
import { ImageControlServiceModel, ImageControlServiceOptions } from "./imageControl";
import { ImageEditServiceModel } from "./imageEdit";
import { ImageGenerationServiceModel } from "./imageGeneration";
import { ImageToVideoGenerationServiceModels, ImageToVideoGenerationServiceOptions } from "./imageToVideoGeneration";
import { UpscaleServiceModel } from "./imageUpscale";

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

export type CurrentServiceModelOptions = ImageEditOptions | ImageGenerationOptions | ImageToVideoGenerationServiceOptions | ImageUpscaleModelOptions | ImageControlServiceOptions;