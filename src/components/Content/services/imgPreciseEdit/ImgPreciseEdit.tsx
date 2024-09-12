import './imgPreciseEdit.scss';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction, useState } from 'react';
import { IGenResultItem } from '../../../../interface/items/imgItems';
import { switchers } from '../../../../types/reducers';
import Textarea from '../../../common/textarea/Textarea';
import InputFile from '../../../common/input-file/InputFile';
import { modelSelects } from '../../../../utilities/generatorOptions';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { CurrentServiceModel, ServiceType } from '../../../../types/services/commonServices';
import SwitchersContainer from '../../../common/switchersContainer/SwitchersContainer';
import ImgPreciseOptions from '../../servicesOptions/ImgPreciseOptions/ImgPreciseOptions';
import { ImageControlServiceModel } from '../../../../types/services/imageControl';
import { IImgPreciseEditOptions } from '../../../../interface/sd-request/imgPreciceEdit';
import { ApiImgControl } from '../../../../api/StableDiffustion/Api.ImgControl';
import { createImageItemInfo } from '../../../../utilities/functions/images';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reduxStore';
import SubmitBtn from '../../../common/buttons/submit-btn/SubmitBtn';
import { setIsLoading } from '../../../../store/reduxReducers/commonsReducer';
import { resetGeneratorFields, scrollToBlock } from '../../../../utilities/functions/common';

const ImagePreciseEdit = (
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

    const [prompt, setPrompt] = useState<string>(``);
    const [image, setImage] = useState<Blob | null>(null);

    const [imgPreciseEditModel, setImgPreciseEditModel] = useState<CurrentServiceModel>(`sketch`);
    const [imgPreciseEditOptions, setImgPreciseEditOptions] = useState<IImgPreciseEditOptions>({
        output_format: `png`,
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            dispatch(setIsLoading(true));
            scrollToBlock(document.querySelector(`.generation-result`) as HTMLElement);

            let response: string | { name: string; errors: string[]; } | undefined = undefined;

            response = await ApiImgControl.getImgControlImage(
                { prompt, image, ...imgPreciseEditOptions },
                imgPreciseEditModel as ImageControlServiceModel,
                mobxStore.apiKey
            );

            if (response) {
                const imgItemInfo = createImageItemInfo(prompt, imgPreciseEditOptions.output_format);

                const imageItem: IGenResultItem = {
                    ...imgItemInfo,
                    prompt,
                    format: imgPreciseEditOptions.output_format,
                    itemUrl: response as string,
                };
                
                setImageItem(imageItem);

                if (switchersStates.isSavingHistoryEnabled) {
                    uploadImageToStorage(mobxStore.userId, imgItemInfo.id, response as string, prompt, imgPreciseEditOptions.output_format);
                    
                    uploadGenerationHistoryItem(mobxStore.userId, {generalInfo: imageItem, options: imgPreciseEditOptions, serviceInfo: {service: currentService, serviceModel: imgPreciseEditModel}})
                };
            }
        } catch (error) {
            console.log(`ImgPreciseEdit handleSubmit error: ${error}`);
        } finally {
            dispatch(setIsLoading(false));
            resetGeneratorFields(setPrompt, setImage);
            setImgPreciseEditOptions({output_format: `png`});
        };
    };

    return (
        <div className='img-precise-edit'>
            <div className="img-precise-edit__inner">
                <form 
                    action="submit" 
                    method='post' 
                    className="img-precise-edit__form" 
                    onSubmit={(e) => {handleSubmit(e)}}
                >
                    <div className="img-precise-edit__mandatory-fields">
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
                        serviceModelOption={imgPreciseEditModel}
                        setServiceModelOption={setImgPreciseEditModel}   
                    />
                    <SwitchersContainer/>
                    {switchersStates.isOptionsShown &&
                        <ImgPreciseOptions
                            setOptions={setImgPreciseEditOptions}
                            serviceModelOption={imgPreciseEditModel as ImageControlServiceModel}
                        />
                    }
                    <div className="img-precise-edit__form-btn-container">
                        <SubmitBtn text={`Generate Image`}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImagePreciseEdit;