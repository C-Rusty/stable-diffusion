import { ImageGenerationOptions } from "../../interface/sd-request/imageGeneration";
import { ImageUpscaleModelOptions } from "../../interface/sd-request/imageUpscale";
import { ImageEditOptions } from "../../interface/sd-request/imgEdit";
import { IImgPreciseEditOptions } from "../../interface/sd-request/imgPreciceEdit";
import { VideoGenerationModelOptions } from "../../interface/sd-request/videoGeneration";
import { ImageControlServiceModel } from "./imageControl";
import { ImageEditServiceModel } from "./imageEdit";
import { ImageGenerationServiceModel } from "./imageGeneration";
import { ImageToVideoGenerationServiceModels } from "./imageToVideoGeneration";
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

export type CurrentServiceModelOptions = ImageEditOptions | ImageGenerationOptions | VideoGenerationModelOptions | ImageUpscaleModelOptions | IImgPreciseEditOptions;