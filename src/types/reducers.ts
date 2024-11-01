import { ServiceType } from "./services/commonServices";

export type switchers = {
    isOptionsShown: boolean,
    isSavingHistoryEnabled: boolean,
    isImgToImgModeEnabled: boolean
};

export type service = {
    currentService: ServiceType
}