import './imgUpscale.scss';
import { Dispatch, SetStateAction, useState } from 'react';
import { ApiImgUpscale } from '../../../../api/StableDiffustion/Api.ImgUpscale';
import { switchers } from '../../../../types/reducers';
import { useDispatch, useSelector } from 'react-redux';
import ImgUpscaleOptions from '../../servicesOptions/ImgUpscaleOptions/ImgUpscaleOptions';
import { modelSelects } from '../../../../utilities/generatorOptions';
import Textarea from '../../../common/textarea/Textarea';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { CurrentServiceModel, ServiceType } from '../../../../types/services/commonServices';
import { UpscaleServiceModel } from '../../../../types/services/imageUpscale';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import SubmitBtn from '../../../common/buttons/submit-btn/SubmitBtn';
import { RootState } from '../../../../store/reduxStore';
import { createImageItemInfo, getImgFromResponse } from '../../../../utilities/functions/images';
import { IGenResultItem, IUpscaleImageItem } from '../../../../interface/items/imgItems';
import { ImageUpscaleModelOptions, ImageUpscaleItem } from '../../../../interface/sd-request/imageUpscale';
import SwitchersContainer from '../../../common/switchersContainer/SwitchersContainer';
import InputFile from '../../../common/input-file/InputFile';
import { resetGeneratorFields, scrollToBlock } from '../../../../utilities/functions/common';
import { setIsLoading } from '../../../../store/reduxReducers/commonsReducer';


const ImgUpscale = (
    {
        setImageItem,
        switchersStates,
        mobxStore,
    } 
    :
    {
        setImageItem: Dispatch<SetStateAction<IGenResultItem>>,
        switchersStates: switchers,
        mobxStore: {apiKey: string, userId: string},
    }) => {

    const currentService = useSelector<RootState, ServiceType>(state => state.service.currentService);
    const dispatch = useDispatch();

    const { promptProps, fileInputProps } = modelSelects;

    const [prompt, setPrompt] = useState<string>(promptProps.value);
    const [image, setImage] = useState<Blob | null>(null);

    const [upscaleModel, setUpscaleModel] = useState<CurrentServiceModel>(`conservative`);
    const [upsacleOptions, setUpsacleOptions] = useState<ImageUpscaleModelOptions>({
        output_format: `png`,
    });

    const payload: ImageUpscaleItem = {
        prompt,
        image,
        ...upsacleOptions
    };

    const submitUpscaleForm = async (event: React.FormEvent) => {
        event.preventDefault();

        dispatch(setIsLoading(true));
        scrollToBlock(document.querySelector(`.generation-result`) as HTMLElement);

        try {
            const response = await ApiImgUpscale.getUpscaledImage(payload, upscaleModel as UpscaleServiceModel, mobxStore.apiKey);

            if (response) {
                const imgItemInfo = createImageItemInfo(prompt, upsacleOptions.output_format);

                const imageItem: IUpscaleImageItem = {
                    ...imgItemInfo,
                    prompt,
                    format: upsacleOptions.output_format,
                    itemUrl: response as string,
                };

                setImageItem(imageItem);

                if (switchersStates.isSavingHistoryEnabled) {
                    if (payload.image) payload.image = getImgFromResponse(payload.image as string, upsacleOptions.output_format);
                    
                    uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, upsacleOptions.output_format);
                    uploadGenerationHistoryItem(mobxStore.userId, {generalInfo: imageItem, generatedItem: payload.image, options: upsacleOptions, serviceInfo: {service: currentService, serviceModel: upscaleModel}})
                };
            };
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setIsLoading(false));

            setUpsacleOptions({
                output_format: `png`,
            });
            resetGeneratorFields(setPrompt, setImage);
        };
    };

    return(
        <div className='img-upscale'>
            <div className="img-upscale__inner">
                <form 
                    action="submit" 
                    method="post" 
                    onSubmit={(event) => submitUpscaleForm(event)} 
                    className='img-upscale__form'
                >
                    <div className="img-upscale__mandatory-fields">
                        <Textarea
                            {...promptProps}
                            required={true}
                            value={prompt}
                            setValue={setPrompt}
                        />
                        <InputFile 
                            {...fileInputProps}
                            required={true}
                            image={image}
                            setImage={setImage}
                        />
                    </div>
                    <ModelsContainer 
                        serviceModelOption={upscaleModel}
                        setServiceModelOption={setUpscaleModel}                    
                    />
                    <SwitchersContainer/>
                    {switchersStates.isOptionsShown && 
                        <ImgUpscaleOptions 
                            setOptions={setUpsacleOptions}
                            upscaleModel={upscaleModel as UpscaleServiceModel}
                        />
                    }
                    <div className="img-upscale__form-btn-container">
                        <SubmitBtn text={`Upscale`}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImgUpscale;