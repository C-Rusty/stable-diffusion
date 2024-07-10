import './downloadButton.scss';
import { ReactComponent as DownloadIcon } from '../../../../imgs/download-icon.svg';
import { saveImageToPC } from '../../../../utilities/functions';
import { DownloadButtonText } from '../../../../types/typesCommon';

const DownloadButton = ( 
    { imgsToDownload, text } 
    : 
    { 
        imgsToDownload: Array<{url: string, name: string}> | undefined, 
        text: DownloadButtonText 
    }) => {

    const handleClick = () => {
        if (!imgsToDownload) return console.log(`currentImg is ${imgsToDownload}!`);
        
        imgsToDownload.forEach((img) => {
            saveImageToPC(img.url, img.name);
        });
    };

    return(
        <a 
            href="#0"
            title="Download"
            aria-label="Download"
            onClick={handleClick}
            className="download-btn"
        >
            <p className='download-btn__text'>{text}</p>
            <DownloadIcon className="download-btn__icon"/>
        </a>
    );
};

export default DownloadButton;