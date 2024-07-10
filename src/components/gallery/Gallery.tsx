import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GalleryItem } from "../../types/typesCommon";
import ImageGallery from "react-image-gallery";
import './gallery.scss';
import DownloadButton from "../common/buttons/download-btn/DownloadButton";
import CloseButton from "../common/buttons/close-btn/CloseButton";
import { getImgNameAndFormat } from "../../utilities/functions";

const Gallery = (
    {
        setIsOpened,
        imgCollection,
        clickedImgIndex
    }
    :
    {
        setIsOpened: Dispatch<SetStateAction<boolean>>,
        imgCollection: Array<GalleryItem>,
        clickedImgIndex: number | undefined
    }
) => {

    const [currentImg, setCurrentImg] = useState<GalleryItem | undefined>(undefined);
    const [imgIndex, setImgIndex] = useState<number | undefined>(clickedImgIndex);

    useEffect(() => {
        if (clickedImgIndex) setImgIndex(clickedImgIndex);
    }, [clickedImgIndex]);

    useEffect(() => {
        if (!imgIndex && imgIndex !== 0) return console.log(`imgIndex is undefined!`);
        if (!imgCollection) return console.log(`imgCollection is undefined!`);
        
        setCurrentImg(imgCollection[imgIndex]);
    }, [imgIndex]);

    return(
        <div className="gallery">
            <div className="container">
                <div className="gallery__inner">
                    <div className="gallery__main">
                        <ImageGallery
                            showBullets={true}
                            startIndex={imgIndex}
                            showIndex={true}
                            onSlide={(index) => setCurrentImg(imgCollection[index])}
                            items={imgCollection.map((img) => ({original: img.url}))}
                        />
                    </div>
                    <div className="gallery__action-btn-container">
                        <DownloadButton 
                            imgsToDownload={[
                                {
                                    url: currentImg ? currentImg.url : '', 
                                    name: currentImg ? getImgNameAndFormat(currentImg.storagePath) : ''
                                }
                            ]} 
                            text="Download"
                        />
                        <CloseButton setState={setIsOpened}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;