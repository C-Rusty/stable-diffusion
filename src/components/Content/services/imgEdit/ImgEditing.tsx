import './imgEditing.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { switchers } from '../../../../types/reducers';
import { ServiceType } from '../../../../types/typesCommon';
import { useDispatch, useSelector } from 'react-redux';
import Textarea from '../../../common/textarea/Textarea';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { CurrentServiceModel } from '../../../../types/services/commonServices';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { ImageEditServiceModel } from '../../../../types/services/imageEdit';
import InputFile from '../../../common/input-file/InputFile';
import { imgEditModelSelects } from '../../../../utilities/services/imageEdit';
import Input from '../../../common/input/Input';
import ImgEditOptions from '../../servicesOptions/ImgEditOptions/ImgEditOptions';
import SubmitBtn from '../../../common/buttons/submit-btn/SubmitBtn';
import { RootState } from '../../../../store/reduxStore';
import { ApiImgEdit } from '../../../../api/StableDiffustion/Api.ImgEdit';
import { createImageItemInfo } from '../../../../utilities/functions/images';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import { IGenResultItem } from '../../../../interface/items/imgItems';
import { ImageEditItem, ImageEditOptions } from '../../../../interface/sd-request/imgEdit';
import SwitchersContainer from '../../../common/switchersContainer/SwitchersContainer';
import { setIsLoading } from '../../../../store/reduxReducers/commonsReducer';
import { scrollToBlock } from '../../../../utilities/functions/common';

const ImgEditing = (
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
        const {searchToReplaceInputProps} = imgEditModelSelects;

        const [prompt, setPrompt] = useState<string>(promptProps.value);
        const [image, setImage] = useState<Blob | null>(null);
        const [search_prompt, setSearchPrompt] = useState<string>(searchToReplaceInputProps.value);

        const [imgEditModel, setImgEditModel] = useState<CurrentServiceModel>(`inpaint`);
        const [imgEditOptions, setImgEditOptions] = useState<ImageEditOptions>({
            output_format: `png`,
        });

        useEffect(() => {
            if (imgEditModel as ImageEditServiceModel === `outpaint`) {
                setImgEditOptions({
                    ...imgEditOptions,
                    left: 1
                });
            } else {
                setImgEditOptions({
                    output_format: `png`,
                });
            };
        }, [imgEditModel]);

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();

            dispatch(setIsLoading(true));
            scrollToBlock(document.querySelector(`.generation-result`) as HTMLElement);

            try {
                let response: string | { name: string; errors: string[]; } | undefined = undefined;
                let payload: ImageEditItem | undefined = undefined;

                switch (imgEditModel as ImageEditServiceModel) {
                    case `erase`:
                        payload = { image, ...imgEditOptions };
                    break;
                    case `inpaint`:
                        payload = { image: image, prompt, ...imgEditOptions };
                    break;
                    case `outpaint`:
                        payload = { image, ...imgEditOptions };
                    break;
                    case `search-and-replace`:
                        payload = { image, prompt, search_prompt, ...imgEditOptions };
                    break;
                    case `remove-background`:
                        payload = { image, ...imgEditOptions };
                    break;

                    default: return console.log(`ImgEditing handleSubmit error: unknown model: ${imgEditModel}`);
                };

                response = await ApiImgEdit.getEditedImage(payload, imgEditModel as ImageEditServiceModel, mobxStore.apiKey);

                const imgItemInfo = createImageItemInfo(prompt, payload.output_format);

                const imageItem: IGenResultItem = {
                    ...imgItemInfo,
                    prompt,
                    format: payload.output_format,
                    itemUrl: response as string,
                };

                setImageItem(imageItem);

                if (switchersStates.isSavingHistoryEnabled) {
                    uploadGenerationHistoryItem(mobxStore.userId, {generalInfo: imageItem, options: imgEditOptions, serviceInfo: {service: currentService, serviceModel: imgEditModel}});
                    uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, payload.output_format);
                };
            } catch (error) {
                console.log(`ImgEditing handleSubmit error: ${error}`);
            } finally {
                dispatch(setIsLoading(false));
                
                setImgEditOptions({output_format: `png`});
                if (image) setImage(null);
                if (prompt) setPrompt('');
                if (search_prompt) setSearchPrompt('');
            };
        };
        
    return (
        <div className='img-editing'>
            <div className="img-editing__inner">
                <form action="submit" method="post" className='img-editing__form' onSubmit={(e) => handleSubmit(e)}>
                    <div className="img-editing__mandatory-fields">
                        <InputFile 
                            {...fileInputProps}
                            required={true}
                            image={image}
                            setImage={setImage}
                        />
                        {imgEditModel as ImageEditServiceModel === `search-and-replace` &&
                            <Input
                                {...searchToReplaceInputProps}
                                required={true}
                                value={search_prompt}
                                setValue={setSearchPrompt}
                            />
                        }
                        {(imgEditModel as ImageEditServiceModel === `inpaint` || imgEditModel as ImageEditServiceModel === `search-and-replace`) &&
                            <Textarea
                                {...promptProps}
                                required={true}
                                value={prompt}
                                setValue={setPrompt}
                            />
                        }
                    </div>
                    <ModelsContainer 
                        serviceModelOption={imgEditModel}
                        setServiceModelOption={setImgEditModel}                    
                    />
                    <SwitchersContainer/>
                    {switchersStates.isOptionsShown &&
                        <ImgEditOptions
                            setOptions={setImgEditOptions}
                            serviceModelOptionModel={imgEditModel as ImageEditServiceModel}
                        />
                    }
                    <SubmitBtn text="Edit Image"/>
                </form>
            </div>
        </div>
    );
};

export default ImgEditing;