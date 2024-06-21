import './downloadButton.scss';
import { ReactComponent as DownloadIcon } from '../../../imgs/download-icon.svg';
import { saveImageToPC } from '../../../utilities/functions';
import { ImageItem } from '../../../types/typesCommon';

const DownloadButton = ( { currentImg } : { currentImg: ImageItem | undefined } ) => {

    const handleClick = () => {
        if (!currentImg) return console.log(`currentImg is ${currentImg}!`);
        saveImageToPC(currentImg.url, currentImg.name);
    };

    return(
        <a 
            href="#0"
            title="Download"
            aria-label="Download"
            onClick={handleClick}
            className="download-btn"
        >
            <p className='download-btn__text'>Download</p>
            <DownloadIcon className="download-btn__icon"/>
        </a>
    );
};

export default DownloadButton;