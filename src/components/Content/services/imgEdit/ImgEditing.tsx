import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { Dispatch, SetStateAction, useState } from 'react';
import { switchers } from '../../../../types/reducers';
import { ImageItem } from '../../../../types/typesCommon';
import './imgEditing.scss';
import { useDispatch } from 'react-redux';
import Textarea from '../../../common/textarea/Textarea';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { CurrentServiceModel } from '../../../../types/services/commonServices';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { ImageEditItem, ImageEditOptions } from '../../../../interface/services/imgEdit';
import Switcher from '../../../common/switcher/Switcher';
import { setIsOptionsShown, setIsSavingHistoryEnabled } from '../../../../store/reduxReducers/switcherReducer';
import { ImageEditServiceModel } from '../../../../types/services/imageEdit';
import InputFile from '../../../common/input-file/InputFile';
import { inputCommonClassName } from '../../../../utilities/constants';
import { imgEditModelSelects } from '../../../../utilities/services/imageEdit';
import Input from '../../../common/input/Input';

const ImgEditing = (
    {
        setImageItem,
        switchersStates,
        mobxStore,
        isLoadingReducer
    } 
    :
    {
        setImageItem: Dispatch<SetStateAction<ImageItem>>,
        switchersStates: switchers,
        mobxStore: {apiKey: string, userId: string},
        isLoadingReducer: {
            isLoadingState: boolean,
            isLoadingAction: ActionCreatorWithPayload<boolean, string>
        }
    }) => {

        const dispatch = useDispatch();

        const [prompt, setPrompt] = useState<string>(``);

        const { promptProps, fileInputProps } = modelSelects;

        const {searchToReplaceInputProps} = imgEditModelSelects;
        const [searchPrompt, setSearchPrompt] = useState<string>(``);

        const [image, setImage] = useState<Blob>(new Blob());

        const [imgEditModel, setImgEditModel] = useState<CurrentServiceModel>(`inpaint`);
        const [imgEditOptions, setImgEditOptions] = useState<ImageEditOptions>({
            search_prompt: ``,
            output_format: `png`,
        });

        const payload: ImageEditItem = {
            prompt,
            image,
            ...imgEditOptions
        };
        
    return (
        <div className='img-editing'>
            <div className="img-editing__inner">
                <form action="submit" method="post" className='img-editing__form'>
                    <div className="img-upscale__mandatory-fields">
                        <InputFile 
                            {...fileInputProps}
                            isRequired={true}
                            className={inputCommonClassName}
                            setImage={setImage}
                        />
                        {(imgEditModel as ImageEditServiceModel === `inpaint` || imgEditModel as ImageEditServiceModel === `search-and-replace`) &&
                            <Textarea
                                {...promptProps}
                                isRequired={true}
                                value={prompt}
                                setValue={setPrompt}
                            />
                        }
                        {imgEditModel as ImageEditServiceModel === `search-and-replace` &&
                            <Input
                                {...searchToReplaceInputProps}
                                isRequired={true}
                                value={searchToReplaceInputProps.value}
                                setValue={setSearchPrompt}
                            />
                        }
                    </div>
                    <ModelsContainer 
                        serviceModelOption={imgEditModel}
                        setServiceModelOption={setImgEditModel}                    
                    />
                    <div className="service-container__switchers">
                        <Switcher
                            headline="Show options"
                            value={switchersStates.isOptionsShown}
                            setValue={setIsOptionsShown}
                        />
                        <Switcher
                            headline="Save generation history"
                            value={switchersStates.isSavingHistoryEnabled}
                            setValue={setIsSavingHistoryEnabled}
                        />
                    </div>
                    <div className="img-editing__btn-container">
                        <button 
                            type="submit" 
                            disabled={isLoadingReducer.isLoadingState} 
                            className={`img-editing__btn-container-btn ${isLoadingReducer.isLoadingState ? 'disabled' : ''}`}
                            title="Edit"
                        >Edit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ImgEditing;