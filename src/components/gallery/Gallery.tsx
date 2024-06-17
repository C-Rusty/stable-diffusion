import { Dispatch, SetStateAction, useEffect, useState } from "react";
import './gallery.scss';
import {ReactComponent as Arrow} from '../../imgs/arrow.svg';

const Gallery = (
    {
        setIsClosed,
        imgCollection,
        clickedImgIndex
    }
    :
    {
        setIsClosed: Dispatch<SetStateAction<boolean>>,
        imgCollection: Array<{
            name: string,
            url: string
        }>,
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
                    {/* <div 
                        className="gallery__cls-btn" 
                        onClick={() => setIsClosed(false)}
                    >X</div> */}
                    <div className="gallery__main">
                        {imgIndex !== 0 ?
                            <div className="gallery__left arrow-container">
                                <Arrow
                                    className="arr-left"
                                    onClick={() => setImgIndex((prev) => prev! - 1)}
                                />
                            </div>
                            :
                            <div className="gallery__left arrow-container"></div>
                        }
                        <div className="gallery__center">
                            <img
                                src={currentImg ? currentImg.url : undefined} 
                                alt={currentImg ? currentImg.name : undefined}
                                className="gallery__img"
                            />
                        </div>
                        {imgIndex !== imgCollection.length - 1 ?
                            <div className="gallery__right arrow-container">
                                <Arrow
                                    className="arr-right"
                                    onClick={() => setImgIndex((prev) => prev! + 1)}
                                />
                            </div>

                            :
                            <div className="gallery__right arrow-container"></div>
                        }
                    </div>
                    <div className="gallery__btns-container">
                        <button 
                            onClick={() => setIsClosed(false)}
                            className="gallery__btn"
                        >Close</button>
                        <button 
                            // onClick={() => setIsClosed(false)}
                            className="gallery__btn"
                        >Download</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;