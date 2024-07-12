import { Dispatch } from "react";
import { SDModelParams, AspectRatios, AspectRatiosProps, OutputFormatProps, PresetStyleProps } from "./typesV2Model";

export type SelectProps = {
    className: string, 
    id: string,
    options: Array<GenModelsProps |  AspectRatiosProps | PresetStyleProps | OutputFormatProps>
};

export type InputProps = {
    className: string,
    id: string,
    inputValue: string | number,
    placeholder: string
};

export type GenModelsValue =  `ultra` | `sd3-large-turbo` | `sd3-large` | `sd3-medium` | `core`;
export type GenModelsText = `Ultra` |`Large Turbo` | `Large` | `Medium` | `Core`;

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

export type LoaderClassName = undefined | `generator-page` | `component-loading` | `log-in` | `img-loading`;

export type GoToButtonText = `Go to favourites` | `Go to documentation` | `Go to generator`;

export type DownloadButtonText = `Download` | `Download selected images`;

export type DeleteButtonText = `Delete` | `Delete selected images`;

export type CreditsAmount = {
    balance: number | `No-data`
}