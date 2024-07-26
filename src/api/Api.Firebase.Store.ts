import { generationHistoryItem, updateImgItemFavouriteProps } from "../types/typesCommon";
import { generationHistoryItemsFolder, loadFavouriteItemsLimit, loadGenHistoryItemsLimit } from "../utilities/vars";
import { db } from "../utilities/firebaseConfig";
import { DocumentData, QuerySnapshot, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore"; 
import { createFullGenHistoryStorePath } from "../utilities/functions";

const getSDApiKey = async () => {
    try {
        const docRef = doc(db, `SD`, `SD`);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
            const response = docSnap.data();
            return response as { APIKEY: string };
        } else {
            return {
                apiKey: `not found!`,
            };
        };
    } catch (error) {
        console.log(`Error with getting SD API key: ${error}`);
    };
};

const getGenerationHistory = async (userId: string, genHistoryItemCounter: number, lastTimestamp: string | null) => {

    try {
        const ref = collection(db, `users`, userId, generationHistoryItemsFolder);

        let generationHistory: Array<generationHistoryItem> = [];

        if (genHistoryItemCounter === loadGenHistoryItemsLimit)  {
            const q = query(ref, orderBy(`generalInfo.timestamp`, `desc`), limit(loadGenHistoryItemsLimit));

            const generationHistoryResponse = await getDocs(q);

            if (!generationHistoryResponse) console.log(`generationHistory get error...`);

            generationHistoryResponse.forEach((doc) => {
                generationHistory.push(doc.data() as generationHistoryItem);
            });
            
        } else if (genHistoryItemCounter % loadGenHistoryItemsLimit === 0 && genHistoryItemCounter !== loadGenHistoryItemsLimit) {
            const q = query(ref, orderBy(`generalInfo.timestamp`, `desc`), startAfter(lastTimestamp), limit(loadGenHistoryItemsLimit));

            const generationHistoryResponse = await getDocs(q);

            if (!generationHistoryResponse) console.log(`generationHistory get error...`);

            generationHistoryResponse.forEach((doc) => {
                generationHistory.push(doc.data() as generationHistoryItem);
            });
        };

        return generationHistory;
        
    } catch (error) {
        console.log(`Error with getting generation history: ${error}`);
    };
};

const uploadGenerationHistoryItem = async (userId: string, generationHistoryItem: generationHistoryItem) => {

    const { id } = generationHistoryItem.generalInfo;

    console.log(generationHistoryItem);

    const genHistoryStorePath = createFullGenHistoryStorePath(userId, null);

    try {
        await setDoc(doc(db, genHistoryStorePath, id), generationHistoryItem);
    } catch (error) {
        console.log(`Error with uploading generation history: ${error}`);
    };
};

const updateGenerationHistoryItem = async (userId: string, id: string, prop: {
    field: `prompt` | `isSuccessfull`,
    value: string | boolean
}) => {

    const genHistoryStorePath = createFullGenHistoryStorePath(userId, null);

    const docRef = doc(db, genHistoryStorePath, id);

    try {
        await updateDoc(docRef, {
            [prop.field]: prop.value
        });
    } catch (error) {
        console.log(`Error with updating generation history: ${error}`);
    };
};

const deleteGenerationHistoryItem = async (userId: string, id: string) => {
    try {
        const genHistoryStorePath = createFullGenHistoryStorePath(userId, null);

        await deleteDoc(doc(db, genHistoryStorePath, id));
    } catch (error) {
        console.log(`Error with deleting generation history: ${error}`);
    };
};

const getFavouritesImgsPaths = async (userId: string, favouritesImgsItemCounter: number, lastItemTimestamp: string | null) => {
    try {
        const genHistoryStorePath = createFullGenHistoryStorePath(userId, null);

        const imgsRef = collection(db, genHistoryStorePath);
        let response: QuerySnapshot<DocumentData, DocumentData> | undefined = undefined;

        if (favouritesImgsItemCounter === loadFavouriteItemsLimit) {
            const favouritesImgsQuery = query(imgsRef, where(`isFavourite`, `==`, true), orderBy(`generalInfo.timestamp`, `desc`), limit(loadFavouriteItemsLimit));

            response = await getDocs(favouritesImgsQuery);

        } else if (favouritesImgsItemCounter % loadFavouriteItemsLimit === 0 && favouritesImgsItemCounter !== loadFavouriteItemsLimit) {

            const favouritesImgsQuery = query(imgsRef, where(`isFavourite`, `==`, true), orderBy(`generalInfo.timestamp`, `desc`), startAfter(lastItemTimestamp), limit(loadFavouriteItemsLimit));

            response = await getDocs(favouritesImgsQuery);
        };

        if (!response) console.log(`favouritesImgs get error...`);

        let favouritesImgItems: Array<generationHistoryItem> = [];

        response!.forEach((doc) => {
            favouritesImgItems.push(doc.data() as generationHistoryItem);
        });

        return favouritesImgItems;

    } catch (error) {
        console.log(`Error with getting favourites imgs: ${error}`);
    };
};

const addImgToFavourites = async (imgsToUploadProps: updateImgItemFavouriteProps) => {

    const { userId, id } = imgsToUploadProps;

    const genHistoryStorePath = createFullGenHistoryStorePath(userId!, null);

    try {
        const imgRef = doc(db, genHistoryStorePath, id);

        await updateDoc(imgRef, {isFavourite: true});

        return true;
    } catch (error) {
        console.log(`Error with setting img as favourite: ${error}`);
        return false;
    };
};

const getCollectionAmount = async (userId: string, page: `generationHistory` | `favourites`) => {
    
    const genHistoryStorePath = createFullGenHistoryStorePath(userId!, null);

    const collectionRef = collection(db, genHistoryStorePath);

    let totalAmount: number | undefined = undefined;

    try {
        switch (page) {
            case `favourites`:
                const q = query(collectionRef, where(`isFavourite`, `==`, true));

                const favouritesImgsAmount = await getCountFromServer(q);
                totalAmount = favouritesImgsAmount.data().count;
            break;

            case `generationHistory`:
                const historyItemsAmount = await getCountFromServer(collectionRef);
                totalAmount = historyItemsAmount.data().count;
            break;
        
            default: break;
        };

        return totalAmount;

    } catch (error) {
        console.log(`Error with getting collection amount: ${error}`);
    };
};

export const ApiFirebaseStore = {
    getSDApiKey,
    getGenerationHistory,
    uploadGenerationHistoryItem,
    updateGenerationHistoryItem,
    deleteGenerationHistoryItem,
    getFavouritesImgsPaths,
    addImgToFavourites,
    getCollectionAmount
};