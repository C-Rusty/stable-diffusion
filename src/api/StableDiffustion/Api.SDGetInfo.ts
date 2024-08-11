import axios from "axios";
import { API_URL } from "../../utilities/constants";

interface Balance {
    credits: number;
};

const getBalance = async (apiKey: string) => {
    const urlPath: string = `${API_URL}/v1/user/balance`;

    try {    
        const response = await axios.get(urlPath, {
            headers: { 
                Authorization: `Bearer sk-${apiKey}`, 
                Accept: "application/json",
            },
        });

        return response.data as Balance;
        
    } catch (error) {
        console.log(`Error with getting balance: ${error}`);
    };
};

export const ApiSDGetInfo = {
    getBalance,
};