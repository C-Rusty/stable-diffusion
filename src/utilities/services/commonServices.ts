import { ModelServicesOptions } from "../../types/services/commonServices";
import { imageControlServiceOptions } from "./ImageControl";
import { imageEditServiceOptions } from "./imageEdit";
import { imageGenerationServiceOptions } from "./imageGeneration";
import { ImageToVideoGenerationServiceModel } from "./imageToVideoGeneration";
import { upscaleServiceOptions } from "./imageUpscale";

export const servicesOptions: ModelServicesOptions = {
    imageGeneration: imageGenerationServiceOptions,
    upscale: upscaleServiceOptions,
    imageEdit: imageEditServiceOptions,
    imageControl: imageControlServiceOptions,
    imageToVideoGeneration: ImageToVideoGenerationServiceModel
};