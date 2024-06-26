import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImageItem } from "../../types/typesCommon";
import ImageGallery from "react-image-gallery";
import './gallery.scss';
import DownloadButton from "../common/download-btn/DownloadButton";
import CloseButton from "../common/close-btn/CloseButton";

const Gallery = (
    {
        setIsOpened,
        imgCollection,
        clickedImgIndex
    }
    :
    {
        setIsOpened: Dispatch<SetStateAction<boolean>>,
        imgCollection: Array<ImageItem>,
        clickedImgIndex: number | undefined
    }
) => {

    const [currentImg, setCurrentImg] = useState<{
        name: string,
        url: string
    } | undefined>(undefined);

    const [imgIndex, setImgIndex] = useState<number | undefined>(clickedImgIndex);

    useEffect(() => {
        if (clickedImgIndex) {
            setImgIndex(clickedImgIndex);
        };
    }, [clickedImgIndex]);

    useEffect(() => {
        if (!imgIndex && imgIndex !== 0) return console.log(`imgIndex is undefined!`);
        
        setCurrentImg(imgCollection[imgIndex]);
    }, [imgIndex])

    return(
        <div className="gallery">
            <div className="container">
                <div className="gallery__inner">
                    <div className="gallery__main">
                        <ImageGallery
                            showBullets={true}
                            startIndex={imgIndex}
                            items={imgCollection.map((img) => ({original: img.url}))}
                        />
                    </div>
                    <div className="gallery__action-btn-container">
                        <DownloadButton imgsToDownload={[currentImg!]} text="Download"/>
                        <CloseButton setState={setIsOpened}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;