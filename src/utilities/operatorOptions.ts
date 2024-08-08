import { ServiceType, UpscaleServiceModel } from "../types/typesCommon";

export const ServiceTypes: Array<ServiceType> = [
    `Image Generator`,
    `Upscale Image`,
    `Edit Image`,
    `Precise Image Edit`,
    `Video Generator`,
];

export const upscaleServicesOptions: Array<UpscaleServiceModel> = [
    `conservative`, 
    `creative`
];