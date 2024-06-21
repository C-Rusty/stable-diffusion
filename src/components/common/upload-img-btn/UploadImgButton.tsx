import './uploadImgButton.scss';
import { ReactComponent as UploadIcon } from '../../../imgs/upload-icon.svg';
import { saveImageToFireStorage } from '../../../api/Api.Firebase.Storage';
import { useDispatch } from 'react-redux';
import { ImgInfoForUpload } from '../../../types/typesCommon';
import { setModalContent } from '../../../store/reduxReducers/modalReducer';

const UploadImgButton = ( { imgInfo } : { imgInfo: ImgInfoForUpload }) => {

    const dispatch = useDispatch();
    
    const handleClick = async (imgInfo: ImgInfoForUpload) => {

        const { base64String, userId, imageProps } = imgInfo;

        if (!base64String || !userId || !imageProps) {
            console.log(`Something went wrong with a request: 
                img: ${base64String}.png, 
                userId: ${userId}, 
                imgName: ${imageProps}`
            );

            return;
        };

        const isUploaded: boolean = await saveImageToFireStorage(base64String, userId, imageProps.imgName!.split(` `).join(`_`) + `.${imageProps.imgFormat}`);

        if (isUploaded) {
            dispatch(setModalContent({headline: `Image has been saved`, text: ``, isModalOpen: true}));
        };
    };

    return(
        <a 
            href="#0"
            title="Upload"
            aria-label="Upload"
            onClick={() => handleClick(imgInfo)}
            className="upload-btn"
        >
            <p className="upload-btn__text">Save to gallery</p>
            <UploadIcon className="upload-btn__icon"/>
        </a>
    );
};

export default UploadImgButton;