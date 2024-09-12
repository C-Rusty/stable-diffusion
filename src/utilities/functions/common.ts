import { Dispatch, SetStateAction } from "react";
import { ApiSDGetInfo } from "../../api/StableDiffustion/Api.SDGetInfo";
import { setCreditsAmount } from "../../store/reduxReducers/creditsReducer";
import { CreditsAmount } from "../../types/typesCommon";

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const scrollToBlock = (block: HTMLElement) => {
    block.scrollIntoView({behavior: 'smooth'});
};

export const resetGeneratorFields = (setPrompt?: Dispatch<SetStateAction<string>>, setImage?: Dispatch<SetStateAction<Blob  | null>>) => {
    if (setPrompt) setPrompt(``);
    if (setImage) setImage(null);
};

export const resetImageLabel = (setImageName: Dispatch<SetStateAction<string | undefined>>) => {
    setImageName(undefined);
};

export const updateCreditsAmount = async (dispatch: Dispatch<any>, SDApiKey: string, creditsAmount: CreditsAmount) => {

    dispatch(setCreditsAmount({ balance: `Loading...` }));

    setTimeout( async () => {
        const response = await ApiSDGetInfo.getBalance(SDApiKey);

        if (response) dispatch(setCreditsAmount({
            balance: response.credits
        }));
    }, Number(creditsAmount.balance) ? 8000 : 0);
};