

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const scrollToGenerationResult = () => {
    const imgGenResultBlock = document.querySelector('.generation-result');
    if (imgGenResultBlock) imgGenResultBlock.scrollIntoView({behavior: 'smooth'});
};

// export const checkIsReqiredFiledsFilled = (activeService: ServiceType, serviceModelOptionModel: CurrentServiceModel, isImgToImgModeEnabled: boolean, serviceModelOptions: CurrentServiceModelOptions, prompt: string | undefined, uploadedImage: Blob | undefined) => {

//     let resultCheck: {isOK: boolean | undefined, message: string} = {isOK: undefined, message: `not-checked`};

//     switch (activeService) {

//         case `Image Generator`:
//             let imageGenModels: ImageGenerationServiceModel = serviceModelOptionModel as ImageGenerationServiceModel;

//             if (imageGenModels === `core` || imageGenModels === `ultra`) {

//                 if (!prompt) resultCheck = {isOK: false, message: `Prompt is empty.`};

//             } else if (imageGenModels === `sd3-large` || imageGenModels === `sd3-large-turbo` || imageGenModels === `sd3-medium`) {

//                 switch (isImgToImgModeEnabled) {
//                     case true:
//                         if (!prompt || !Object.values(serviceModelOptions).includes(`image`)) {
//                             resultCheck = {isOK: false, message: `Prompt or image is empty. prompt: ${prompt}, image: ${serviceModelOptions}`};
//                         };
//                     break;

//                     case false:
//                         if (!prompt) resultCheck = {isOK: false, message: `Prompt is empty.`};
//                     break;
                
//                     default: break;
//                 }
//             }

//         break;

//         case `Upscale Image`:
//             if (!prompt || !Object.values(serviceModelOptions).includes(`image`)) {
//                 resultCheck = {isOK: false, message: `Prompt or image is empty. prompt: ${prompt}, image: ${serviceModelOptions}`};
//             };
//         break;

//         case `Edit Image`:
//             let editImageModels: ImageEditServiceModel = serviceModelOptionModel as ImageEditServiceModel;
//             let imageEditModels: ImageEditServiceChosenOptions = serviceModelOptions as ImageEditServiceChosenOptions;

//             if (editImageModels === `erase` || editImageModels === `outpaint` || editImageModels === `remove-background`) {

//                 if (!uploadedImage) resultCheck = {isOK: false, message: `Image is empty.`};

//             } else if (editImageModels === `inpaint`) {

//                 let ff = imageEditModels as ImageEditServiceOptionInpaint;

//                 // console.log(JSON.stringify(ff.image));

//                 if (!prompt || !Object.values(imageEditModels).includes(`image`)) {
//                     resultCheck = {isOK: false, message: `Prompt or image is empty. image: ${prompt}, image: ${serviceModelOptions}`};
//                 };
//             } else if (editImageModels === `search-and-replace`) {

//                 if (!prompt || !Object.values(imageEditModels).includes(`image`) || !Object.values(imageEditModels).includes(`search_prompt`)) {
//                     resultCheck = {isOK: false, message: `Prompt or image or search_prompt is empty. prompt: ${prompt}, image: ${imageEditModels.image}, search_prompt: ${imageEditModels}`};
//                 };
//             }

//         break;

//         case `Precise Image Edit`:
//             if (!prompt || !Object.values(serviceModelOptions).includes(`image`)) {
//                 resultCheck = {isOK: false, message: `Prompt or image is empty. image: ${prompt}, image: ${serviceModelOptions}`};
//             };

//         break;

//         case `Video Generator`: 
//             if (!uploadedImage) resultCheck = {isOK: false, message: `Image is empty.`};
//         break;
            
//         default: break;
//     };

//     if (resultCheck.isOK === undefined) resultCheck = {isOK: true, message: `OK`};

//     return resultCheck;
// };