import { ServiceType, upscaleServiceOption } from "../types/typesCommon";

export const ServiceTypes: Array<ServiceType> = [
    `Image Generator`,
    `Upscale Image`,
    `Edit Image`,
    `Precise Generator`,
    `Video Generator`,
];

export const upscaleServicesOptions: Array<upscaleServiceOption> = [
    `conservative`, 
    `creative`
];