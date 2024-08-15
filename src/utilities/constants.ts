import { CurrentServiceModel } from "../types/services/commonServices";

export const selectCommonClassName: string = `option-select`;
export const inputCommonClassName: string = `option-input`;
export const textAreaCommonClassName: string = `option-textarea`;
export const cookieNameUser: string = `isUser`;
export const cookieNameSD: string = `SD`;
export const loadGenHistoryItemsLimit: number = 20;
export const loadFavouriteItemsLimit: number = 6;
export const generationHistoryItemsFolder: string = `generationHistory`;

export const API_URL: string = `https://api.stability.ai`;

export const modelsFileInputToShow: Array<CurrentServiceModel> = [`image-to-video`, `erase`, `remove-background`];