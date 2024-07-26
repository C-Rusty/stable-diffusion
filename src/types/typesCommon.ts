import { Dispatch } from "react";
import { AspectRatios, AspectRatiosProps, OutputFormatProps, PresetStyleProps } from "./typesGeneratorOptions";
import { SDModelParams } from "./models";

export type SelectProps = {
    className: string, 
    id: string,
    options: Array<GenModelsProps |  AspectRatiosProps | PresetStyleProps | OutputFormatProps>
};

export type InputProps = {
    className: string,
    type: `number` | `text`,
    label: string,
    id: string
    value: number | string,
    min?: number,
    max?: number,
    step?: number,
    placeholder: string,
    name: string,
    required: boolean
};

export type GenModelsValue =  `ultra` | `sd3-large-turbo` | `sd3-large` | `sd3-medium` | `core`;
export type GenModelsText = `Ultra` |`3 Large Turbo` | `3 Large` | `3 Medium` | `Core`;

export type GenModelsProps = {
    value: GenModelsValue,
    text: GenModelsText
};

export type MyState = AspectRatios;

export type SetStateAction<T> = Dispatch<React.SetStateAction<T>>;

export type ModalProps = {
    headline: string | undefined,
    text: string | undefined,
    isModalOpen: boolean,
    event: `img-delete` | `img-upload` | undefined
};

export type ImageItem = {
    id: string,
    prompt: string,
    format: string,
    url: string,
    storagePath: string
    timestamp: string,
};

export type GalleryItem = {
    id: string, 
    prompt: string,
    format: string,
    url: string,
    storagePath: string,
    timestamp: string,
    index?: number
};

export type generationHistoryItem = {
    generalInfo: ImageItem,
    options: SDModelParams,
    isFavourite: boolean
};

export type UploadImgProps = {
    userId: string | undefined,
    base64String: string | undefined,
    imgName: string | null,
};

export type DeleteImgProps = {
    userId: string | undefined,
    imgsToDelete: Array<{
        storagePath: string,
    }>,
};

export type GetAllImgsProps = {
    userId: string | undefined,
};

export type GetImgProps = {
    userId: string | undefined,
    storagePath: string
};

export type updateImgItemFavouriteProps = {
    userId: string | undefined,
    storagePath: string,
    id: string
};

export type LoaderClassName = undefined | `generator-page` | `component-loading` | `log-in` | `img-loading` | `balance-loading`;

export type GoToButtonText = `Go to favourites` | `Go to documentation` | `Go to generator`;

export type DownloadButtonText = `Download` | `Download selected images`;

export type DeleteButtonText = `Delete` | `Delete selected images`;

export type CreditsAmount = {
    balance: number | `No-data` | `Loading...`
};

export type ServiceType = `Image Generator` | `Upscale Image` | `Edit Image` | `Precise Generator` | `Video Generator`;

export type upscaleServiceOption = `conservative` | `creative`;