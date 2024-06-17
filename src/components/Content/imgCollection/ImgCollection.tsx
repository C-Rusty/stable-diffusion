import { Fragment, useContext, useEffect, useState } from 'react';
import './imgCollection.scss';
import { Context } from '../../app/App';
import { getImagesFromFireStorage } from '../../../api/Api.Firebase.Storage';
import { saveAs } from 'file-saver'
import Gallery from '../../gallery/Gallery';

const ImgCollection = () => {

    const [imgCollection, setImgCollection] = useState<Array<{
        name: string,
        url: string
    }>>([]);

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const getUserImgCollection = async () => {
        if (userId) {
            const response = await getImagesFromFireStorage(userId);
            setImgCollection(response);
        };
    };

    useEffect(() => {
        getUserImgCollection();
    }, []);

    const downloadImg = async (url: string, name: string) => {
        const image = await fetch(url)
        const imageBlog = await image.blob();
        const imageURL = URL.createObjectURL(imageBlog);

        saveAs(imageURL, name);
    };

    const [isGalleryOpened, setIsGalleryOpened] = useState(false);
    const [clickedImgIndex, setClickedImg] = useState<number | undefined>(undefined);

    const handleImgClick = (imgIndex: number) => {
        setIsGalleryOpened(true);
        setClickedImg(imgIndex);
    };

    return(
        <Fragment>
            {isGalleryOpened ? 
                <Gallery
                    setIsClosed={setIsGalleryOpened}
                    imgCollection={imgCollection}
                    clickedImgIndex={clickedImgIndex}
                />
                :
                <div className="collection">
                    <div className="container">
                        <div className="collection__inner">
                            <h1 className='collection__headline'>My collection</h1>
                            <div className="collection__main">
                                {imgCollection.map((img, index) => (
                                    <div 
                                        key={index}
                                        className="collection__item-container"
                                    >
                                        <img 
                                            src={img.url} 
                                            alt={img.name} 
                                            onClick={() => handleImgClick(index)}
                                            className="collection__img"
                                            loading="lazy"
                                        />
                                        <div className="collection__btn-container">
                                            <button 
                                                className="collection__download-btn"
                                                onClick={() => downloadImg(img.url, img.name)}
                                            >Download</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Fragment>

    );
};

export default ImgCollection;