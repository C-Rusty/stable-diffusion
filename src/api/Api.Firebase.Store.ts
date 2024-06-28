import { GenerationHistoryItemType, updateImgItemFavouriteProps } from "../types/typesCommon";
import { db } from "../utilities/firebaseConfig";
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"; 

const imgItemHistoryStoragePath = `GenerationHistory`;

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

const getGenerationHistory = async (userId: string) => {

    try {
        const generationHistoryResponse = await getDocs(collection(db, `users/${userId}/${imgItemHistoryStoragePath}`));

        if (!generationHistoryResponse) console.log(`generationHistory get error...`);
        
        let generationHistory: Array<GenerationHistoryItemType> = [];

        generationHistoryResponse.forEach((doc) => {
            generationHistory.push(doc.data() as GenerationHistoryItemType);
        });
        
        return generationHistory;
        
    } catch (error) {
        console.log(`Error with getting generation history: ${error}`);
    };
};

const uploadGenerationHistoryItem = async (generationHistoryItem: GenerationHistoryItemType) => {

    const { timestamp, userId } = generationHistoryItem;

    try {
        await setDoc(doc(db, `users/${userId}/${imgItemHistoryStoragePath}/`, timestamp), generationHistoryItem);
    } catch (error) {
        console.log(`Error with uploading generation history: ${error}`);
    };
};

const updateGenerationHistoryItem = async (userId: string, timestamp: string, prop: {
    field: `prompt` | `isSuccessfull`,
    value: string | boolean
}) => {

    const docRef = doc(db, `users/${userId}/${imgItemHistoryStoragePath}/`, timestamp);

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
        await deleteDoc(doc(db, `users/${userId}/${imgItemHistoryStoragePath}/`, timestamp));
    } catch (error) {
        console.log(`Error with deleting generation history: ${error}`);
    };
};

const getFavouritesImgsPaths = async (userId: string) => {
    try {
        const imgsRef = collection(db, `users/${userId}/${imgItemHistoryStoragePath}`);
        const favouritesImgsQuery = query(imgsRef, where(`isFavourite`, `==`, true));

        const favouritesImgsDocs = await getDocs(favouritesImgsQuery);

        if (!favouritesImgsDocs) return console.log(`favouritesImgs get error...`);

        let favouritesImgsItemProps: Array<GenerationHistoryItemType> = [];

        favouritesImgsDocs.forEach((doc) => {
            favouritesImgsItemProps.push(doc.data() as GenerationHistoryItemType);
        });

        return favouritesImgsItemProps.map((item) => {
            return { name: item.prompt.split(` `).join(`_`), format: item.options.output_format, createdAt: item.timestamp };
        });

    } catch (error) {
        console.log(`Error with getting favourites imgs: ${error}`);
    };
};

const addImgToFavourites = async (imgsToUploadProps: updateImgItemFavouriteProps) => {

    const { userId, timestamp } = imgsToUploadProps;

    try {
        const imgRef = doc(db, `users/${userId}/${imgItemHistoryStoragePath}/`, timestamp);

        await updateDoc(imgRef, {isFavourite: true});

        return true;
    } catch (error) {
        console.log(`Error with setting img as favourite: ${error}`);
        return false;
    };
};

export const ApiFirebaseStore = {
    getSDApiKey,
    getGenerationHistory,
    uploadGenerationHistoryItem,
    updateGenerationHistoryItem,
    deleteGenerationHistoryItem,
    getFavouritesImgsPaths,
    addImgToFavourites
};