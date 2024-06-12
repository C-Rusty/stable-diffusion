import {makeAutoObservable} from "mobx";
import {  cookieNameUser, cookieNameSD } from "../utilities/commonVars";
import { getApiKeyFromFirebase } from "../api/Api.Firebase.Store";

export default class mobxStore {
    isAuth = false;
    SDApiKey: string | undefined = undefined;
    userId: string | undefined = undefined;
    isModalOpen = false;

    static SDApiKey: string = ``;
    static userId: string = ``;
    static isModalOpen: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUserId(userId: string) {
        this.userId = userId;
    };

    setModelOpen(bool: boolean) {
        this.isModalOpen = bool;
    };

    async login(result: boolean) {
        this.setAuth(result);
    };

    checkAuth() {
        let decodedCookies = decodeURIComponent(document.cookie);
        let splittedCookies = decodedCookies.split(';');
        
        const cookieUser = splittedCookies.find(cookie => cookie.includes(cookieNameUser) && !cookie.includes(`undefined`));
        
        
        if(cookieUser) {
            this.setAuth(true);
            this.setApiKey();
            this.setUserId(cookieUser.split('=')[1]);
        } else {
            throw new Error(`CookieUser not found`);
        };
    };

    async setApiKey() {
        let decodedCookies = decodeURIComponent(document.cookie);
        let cookiesArr = decodedCookies.split(';');
        
        const SDCookie = cookiesArr.find(cookie => cookie.includes(`SD`) && !cookie.includes(`undefined`));

        if(SDCookie) {
            this.SDApiKey = SDCookie.split('=')[1];
        } else {
            try {
                const { APIKEY } = await getApiKeyFromFirebase();
                
                this.SDApiKey = APIKEY;
    
                document.cookie = cookieNameSD + "=" + this.SDApiKey + ";path=/";
            } catch (error) {
                console.log(error);
            };
        };
    };
};