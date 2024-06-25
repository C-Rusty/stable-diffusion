import { Fragment, useContext, useEffect, useState } from 'react';
import './imgCollectionPage.scss';
import { Context } from '../../app/App';
import Gallery from '../../gallery/Gallery';
import DownloadButton from '../../common/download-btn/DownloadButton';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import DeleteButton from '../../common/delete-img-btn/DeleteImgButton';

const ImgCollectionPage = () => {

    const [imgCollection, setImgCollection] = useState<Array<{
        name: string,
        url: string
    }>>([]);

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const getUserImgCollection = async () => {
        if (userId) {
            const response = await apiFirebaseStorage.getImages(userId);
            setImgCollection(response);
        };
    };

    useEffect(() => {
        getUserImgCollection();
    }, []);

    const [isGalleryOpened, setIsGalleryOpened] = useState(false);
    const [clickedImgIndex, setClickedImg] = useState<number | undefined>(undefined);

    const handleImgClick = (imgIndex: number) => {
        setIsGalleryOpened(true);
        setClickedImg(imgIndex);
    };

    const handleDeleteImgClick = (imgIndex: number) => {
        setImgCollection(prev => prev.filter((img, index) => index !== imgIndex));
    };

    return(
        <Fragment>
            {isGalleryOpened ? 
                <Gallery
                    setIsOpened={setIsGalleryOpened}
                    imgCollection={imgCollection}
                    clickedImgIndex={clickedImgIndex}
                />
                :
                <div className="collection">
                    <div className="container">
                        <div className="collection__inner">
                            <h1 className='collection__headline'>My Gallery</h1>
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
                                        <div className="collection__img-btns-container">
                                        <DownloadButton currentImg={img}/>
                                        <DeleteButton
                                            userId={userId}
                                            imageProps={{
                                                    name: img.name, 
                                                    format: img.name.split(".").slice(-1)[0],
                                                    index: index
                                                }
                                            }
                                            handleDeleteImgClick={handleDeleteImgClick}
                                        />
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

export default ImgCollectionPage;