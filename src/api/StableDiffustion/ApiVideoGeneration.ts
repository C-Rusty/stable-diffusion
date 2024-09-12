import axios from "axios";
import { VideoGenerationItem } from "../../interface/sd-request/videoGeneration";
import { API_URL } from "../../utilities/constants";
import { delay } from "../../utilities/functions/common";
import { getImgFromResponse } from "../../utilities/functions/images";

const videoUrlPath = `${API_URL}/v2beta/image-to-video`;

const startVideoGeneration = async (apiKey: string, payload: VideoGenerationItem) => {
    const urlPath = videoUrlPath;

    let video: Blob | string | undefined = undefined;

    try {
        const response = await axios.request({
            url: urlPath,
            method: "post",
            validateStatus: undefined,
            headers: {
                Authorization: `Bearer sk-${apiKey}`,
                "Content-Type": "multipart/form-data",
            },
            data: payload,
        });

        if (response.status === 200) {
            const { id } = response.data;

            console.log(`Video id: ${id}`);
            

            video = await getVideo(id, apiKey, `mp4`); 

            return video;
        };
    } catch (error) {
        console.log(error);
    };
};

const getVideoResponse = async (videoId: string, apiKey: string, output_format: string) => {
    const urlPath = videoUrlPath + "/result/" + videoId;

    const response = await axios.request({
        url: urlPath,
        method: "GET",
        validateStatus: undefined,
        responseType: "arraybuffer",
        headers: {
          Authorization: `Bearer sk-${apiKey}`,
          Accept: "video/*",
        },
    });

        // if 202 - image is still upscaling
    if (response.status === 202) {
        return undefined;
    } else {
        return getImgFromResponse(response.data, `mp4`);
    };
};

const getVideo = async (videoId: string, apiKey: string, output_format: string) => {
    let video: string | undefined = undefined;
    const retryInterval: number = 30000;

    console.log(`Video id: ${videoId}`);
    

    while (!video) {
        video = await getVideoResponse(videoId, apiKey, output_format);
        if (!video) {
            await delay(retryInterval);
        };
    };
    return video;
};

export const ApiVideoGeneration = {
    startVideoGeneration
};
