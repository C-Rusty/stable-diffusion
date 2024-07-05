import { GenerationHistoryItemType, updateImgItemFavouriteProps } from "../types/typesCommon";
import { loadFavouriteItemsLimit, loadGenHistoryItemsLimit } from "../utilities/commonVars";
import { db } from "../utilities/firebaseConfig";
import { DocumentData, QuerySnapshot, collection, deleteDoc, doc, getCountFromServer, getDoc, getDocs, limit, orderBy, query, setDoc, startAfter, updateDoc, where } from "firebase/firestore"; 

const generationHistoryItemsFolder = `GenerationHistory`;

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

        let generationHistory: Array<GenerationHistoryItemType> = [];

        if (genHistoryItemCounter === loadGenHistoryItemsLimit)  {
            const q = query(ref, orderBy(`timestamp`, `desc`), limit(loadGenHistoryItemsLimit));

            const generationHistoryResponse = await getDocs(q);

            if (!generationHistoryResponse) console.log(`generationHistory get error...`);

            generationHistoryResponse.forEach((doc) => {
                generationHistory.push(doc.data() as GenerationHistoryItemType);
            });
            
        } else if (genHistoryItemCounter % loadGenHistoryItemsLimit === 0 && genHistoryItemCounter !== loadGenHistoryItemsLimit) {
            const q = query(ref, orderBy(`timestamp`, `desc`), startAfter(lastTimestamp), limit(loadGenHistoryItemsLimit));

            const generationHistoryResponse = await getDocs(q);

            if (!generationHistoryResponse) console.log(`generationHistory get error...`);

            generationHistoryResponse.forEach((doc) => {
                generationHistory.push(doc.data() as GenerationHistoryItemType);
            });
        };

        return generationHistory;
        
    } catch (error) {
        console.log(`Error with getting generation history: ${error}`);
    };
};

const uploadGenerationHistoryItem = async (generationHistoryItem: GenerationHistoryItemType) => {

    const { timestamp, userId } = generationHistoryItem;

    try {
        await setDoc(doc(db, `users/${userId}/${generationHistoryItemsFolder}/`, timestamp), generationHistoryItem);
    } catch (error) {
        console.log(`Error with uploading generation history: ${error}`);
    };
};

const updateGenerationHistoryItem = async (userId: string, timestamp: string, prop: {
    field: `prompt` | `isSuccessfull`,
    value: string | boolean
}) => {

    const docRef = doc(db, `users/${userId}/${generationHistoryItemsFolder}/`, timestamp);

    try {
        await updateDoc(docRef, {
            [prop.field]: prop.value
        });
    } catch (error) {
        console.log(`Error with updating generation history: ${error}`);
    };
};

const deleteGenerationHistoryItem = async (userId: string, timestamp: string) => {
    try {
        await deleteDoc(doc(db, `users/${userId}/${generationHistoryItemsFolder}/`, timestamp));
    } catch (error) {
        console.log(`Error with deleting generation history: ${error}`);
    };
};

const getFavouritesImgsPaths = async (userId: string, favouritesImgsItemCounter: number, lastItemTimestamp: string | null) => {
    try {
        const imgsRef = collection(db, `users/${userId}/${generationHistoryItemsFolder}`);
        let response: QuerySnapshot<DocumentData, DocumentData> | undefined = undefined;

        if (favouritesImgsItemCounter === loadFavouriteItemsLimit) {
            const favouritesImgsQuery = query(imgsRef, where(`isFavourite`, `==`, true), orderBy(`timestamp`, `desc`), limit(loadFavouriteItemsLimit));

            response = await getDocs(favouritesImgsQuery);
        } else if (favouritesImgsItemCounter % loadFavouriteItemsLimit === 0 && favouritesImgsItemCounter !== loadFavouriteItemsLimit) {

            const favouritesImgsQuery = query(imgsRef, where(`isFavourite`, `==`, true), orderBy(`timestamp`, `desc`), startAfter(lastItemTimestamp), limit(loadFavouriteItemsLimit));

            response = await getDocs(favouritesImgsQuery);
        };

        if (!response) console.log(`favouritesImgs get error...`);

        let favouritesImgsItemProps: Array<GenerationHistoryItemType> = [];

        response!.forEach((doc) => {
            favouritesImgsItemProps.push(doc.data() as GenerationHistoryItemType);
        });

        return favouritesImgsItemProps.map((item) => {
            return { 
                name: item.prompt.split(` `).join(`_`), 
                format: item.options.output_format, 
                timestamp: item.timestamp 
            };
        });

    } catch (error) {
        console.log(`Error with getting favourites imgs: ${error}`);
    };
};

const addImgToFavourites = async (imgsToUploadProps: updateImgItemFavouriteProps) => {

    const { userId, timestamp } = imgsToUploadProps;

    try {
        const imgRef = doc(db, `users/${userId}/${generationHistoryItemsFolder}/`, timestamp);

        await updateDoc(imgRef, {isFavourite: true});

        return true;
    } catch (error) {
        console.log(`Error with setting img as favourite: ${error}`);
        return false;
    };
};

const getCollectionAmount = async (userId: string, page: `generationHistory` | `favourites`) => {
    
    const collectionRef = collection(db, `users/${userId}/${generationHistoryItemsFolder}`);

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