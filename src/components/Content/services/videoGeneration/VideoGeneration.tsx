import './videoGeneration.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/reduxStore';
import { ServiceType } from '../../../../types/typesCommon';
import InputFile from '../../../common/input-file/InputFile';
import { modelSelects } from '../../../../utilities/generatorOptions';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import ModelsContainer from '../../modelsContainer/ModelsContainer';
import { CurrentServiceModel } from '../../../../types/services/commonServices';
import Input from '../../../common/input/Input';
import { ImageToVideoGenerationServiceModels } from '../../../../types/services/imageToVideoGeneration';
import { imageToVideoGenerationOptions } from '../../../../utilities/services/imageToVideoGeneration';
import { IGenResultItem } from '../../../../interface/items/imgItems';
import { switchers } from '../../../../types/reducers';
import SwitchersContainer from '../../../common/switchersContainer/SwitchersContainer';
import SubmitBtn from '../../../common/buttons/submit-btn/SubmitBtn';
import VideoGenerationOptions from '../../servicesOptions/VideoGenerationOptions/VideoGenerationOptions';
import { VideoGenerationModelOptions } from '../../../../interface/sd-request/videoGeneration';
import { ApiVideoGeneration } from '../../../../api/StableDiffustion/ApiVideoGeneration';
import { createImageItemInfo } from '../../../../utilities/functions/images';
import { uploadGenerationHistoryItem, uploadImageToStorage } from '../../../../utilities/functions/uploadingToFirebase';
import { setIsLoading } from '../../../../store/reduxReducers/commonsReducer';
import { scrollToBlock } from '../../../../utilities/functions/common';

const VideoGenerationItem = (
    {
        setVideoItem,
        switchersStates,
        mobxStore,
    }
    :
    {
        setVideoItem: Dispatch<SetStateAction<IGenResultItem>>,
        switchersStates: switchers,
        mobxStore: {apiKey: string, userId: string},
    }) => {

    const currentService = useSelector<RootState, ServiceType>(state => state.service.currentService);
    const dispatch = useDispatch();

    const { fileInputProps } = modelSelects;

    const { motionBucketInputProps, cfgScaleInputProps } = imageToVideoGenerationOptions;

    const [image, setImage] = useState<Blob | null>(null);
    const [motion_bucket_id, setMotionBucketId] = useState<number>(motionBucketInputProps.value);
    const [cfg_scale, setCfgScale] = useState<number>(cfgScaleInputProps.value);
    
    const [videoGenerationModel, setVideoGenerationModel] = useState<CurrentServiceModel>(`image-to-video`);
    const [videoGenerationOptions, setVideoGenerationOptions] = useState<VideoGenerationModelOptions>({
        seed: 0
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(setIsLoading(true));
        scrollToBlock(document.querySelector(`.generation-result`) as HTMLElement);

        try {
            let response: string | { name: string; errors: string[]; } | undefined = undefined;

            response = await ApiVideoGeneration.startVideoGeneration(
                mobxStore.apiKey,
                {image, motion_bucket_id, cfg_scale, ...videoGenerationOptions},
            );

            if (response) {
                const videoItemInfo = createImageItemInfo(`video`, `mp4`);

                const videoItem: IGenResultItem = {
                    ...videoItemInfo,
                    prompt: `video`,
                    format: `mp4`,
                    itemUrl: response as string,
                };

                setVideoItem(videoItem);
                
                if (switchersStates.isSavingHistoryEnabled) {
                    uploadImageToStorage(
                        mobxStore.userId, 
                        videoItemInfo.id, 
                        response as string, 
                        `none`, `mp4`
                    );
                    
                    uploadGenerationHistoryItem(
                        mobxStore.userId, 
                        {generalInfo: videoItem, options: videoGenerationOptions, serviceInfo: { service: currentService, serviceModel: videoGenerationModel}}
                    );
                }
            };
        } catch (error) {
            console.log(`Error when submitting the form: ${error}`);
        } finally {
            dispatch(setIsLoading(false));
            setVideoGenerationOptions({seed: 0});
            
            setImage(null);
            setMotionBucketId(motionBucketInputProps.value);
            setCfgScale(cfgScaleInputProps.value);
        };
    };

    return (
        <div className='video-generation'>
            <div className='video-generation__inner'>
                <form 
                    action="post" 
                    className='video-generation__form'
                    method='post'
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <div className="video-generation__mandatory-fields">
                        <InputFile 
                            {...fileInputProps}
                            required={true}
                            accept='.png, .jpeg'
                            image={image}
                            setImage={setImage}
                        />
                        {videoGenerationModel as ImageToVideoGenerationServiceModels === `image-to-video` && 
                            <Fragment>
                                <Input
                                    {...motionBucketInputProps}
                                    setValue={setMotionBucketId}
                                />
                                <Input
                                    {...cfgScaleInputProps}
                                    setValue={setCfgScale}
                                />
                            </Fragment>
                        }
                    </div>
                    <ModelsContainer
                        serviceModelOption={videoGenerationModel}
                        setServiceModelOption={setVideoGenerationModel}   
                    />
                    <SwitchersContainer/>
                    {switchersStates.isOptionsShown &&
                        <VideoGenerationOptions
                            setOptions={setVideoGenerationOptions}
                            serviceModelOption={videoGenerationModel as ImageToVideoGenerationServiceModels}
                        />
                    }
                    <div className="video-generation__form-btn-container">
                        <SubmitBtn text={`Generate Video`}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default VideoGenerationItem;