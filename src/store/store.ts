import {makeAutoObservable} from "mobx";
import {  cookieNameUser, cookieNameSD } from "../utilities/commonVars";
import { getApiKeyFromFirebase } from "../api/Api.Firebase.Generator";
import { DocumentData } from "firebase/firestore";

export default class Store {
    isAuth = false;
    SDApiKey: string = ``;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    async login(result: boolean) {
        this.setAuth(result);
    };

    async checkAuth() {
        let decodedCookies = decodeURIComponent(document.cookie);
        let splittedCookies = decodedCookies.split(';');
        
        const cookieUser = splittedCookies.find(cookie => cookie.includes(cookieNameUser));
        
        if(cookieUser) {
            this.isAuth = true;
            this.getApiKey();
        };
    };

    async getApiKey() {
        let decodedCookies = decodeURIComponent(document.cookie);
        let splittedCookies = decodedCookies.split(';');
        
        const SDCookie = splittedCookies.find(cookie => cookie.includes(`SD`));

        if(SDCookie) {
            this.SDApiKey = SDCookie;
        } else {
            const apiKey = await getApiKeyFromFirebase();
            this.SDApiKey = apiKey.apiKey;

            document.cookie = cookieNameSD + "=" + this.SDApiKey + ";path=/";
        };
    };
};