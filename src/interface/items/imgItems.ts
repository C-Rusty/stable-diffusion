import { CurrentServiceModel, CurrentServiceModelOptions, ServiceType } from "../../types/services/commonServices";
import { OutputFormat } from "../../types/typesGeneratorOptions";

export interface IGenResultItem {
    id: string,
    prompt: string, 
    format: OutputFormat,
    itemUrl: string,
    storagePath: string,
    timestamp: string,
};

export interface IImageHistoryItem {
    generalInfo: IGenResultItem,
    generatedItem?: Blob | string | null,
    options: CurrentServiceModelOptions
    serviceInfo: {
        service: ServiceType,
        serviceModel: CurrentServiceModel,
    }
};

export interface IGalleryImageItem extends IGenResultItem {};

export interface IGenImageItem extends IGenResultItem {
    uploadedImage: Blob | string | null 
};

export interface IUpscaleImageItem extends IGenResultItem {};

export interface IEditImageItem extends IGenResultItem {
    uploadedImage: Blob | string | null
};

export interface IGalleryItem {
    id: string, 
    prompt?: string,
    format: string,
    itemUrl: string,
    storagePath: string,
    timestamp: string,
    index?: number,
    uploadedImage?: Blob | null
};