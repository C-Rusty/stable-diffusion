import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import './imgCollectionPage.scss';
import { Context } from '../../app/App';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import ImgCollectionItem from '../imgColletionItem/ImgCollectionItem';
import DownloadButton from '../../common/download-btn/DownloadButton';
import DeleteButton from '../../common/delete-img-btn/DeleteImgButton';
import Loader from '../../common/loader/Loader';

const ImgCollectionPage = () => {

    const Gallery = lazy(() => import('../../gallery/Gallery'));

    const [imgCollection, setImgCollection] = useState<Array<{
        name: string,
        url: string
    }>>([]);

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const getUserImgCollection = async () => {
        if (userId) {
            const response = await apiFirebaseStorage.getImages(userId);
            const imgsSortedByDate = response.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            
            setImgCollection(imgsSortedByDate);
        };
    };

    useEffect(() => {
        getUserImgCollection();
    }, []);

    const [isGalleryOpened, setIsGalleryOpened] = useState(false);
    const [clickedImgIndex, setClickedImg] = useState<number | undefined>(undefined);

    const handleImgClick = (imgIndex: number) => {
        switch (isSelectMultipleImagesModeOn) {
            case true:
                if (!selectedImgs.find(img => img.index === imgIndex)) {
                    setSelectedImgs(prev => [...prev, {
                        img: imgCollection[imgIndex].url,
                        name: imgCollection[imgIndex].name,
                        format: imgCollection[imgIndex].name.split(".").slice(-1)[0],
                        index: imgIndex
                    }]);
                };
            break;

            case false:
                setClickedImg(imgIndex);
                setIsGalleryOpened(true);
            break;
        
            default: break;
        }
    };

    const handleDeleteImgClick = (imgIndex: number) => {
        setImgCollection(prev => prev.filter((img, index) => index !== imgIndex));
    };

    const [isSelectMultipleImagesModeOn, setSelectMultipleImagesModeOn] = useState(false);
    const [selectedImgs, setSelectedImgs] = useState<Array<{
        img: string,
        name: string,
        format: string,
        index: number
    }>>([]);

    const handleSelectMultipleImagesClick = () => {
        setSelectMultipleImagesModeOn(!isSelectMultipleImagesModeOn);
    };

    return(
        <Suspense fallback={<Loader className="component-loading" />}>
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
                            <div className="collection__action-btns">
                                <a 
                                    href="#0" 
                                    className="select-btn"
                                    onClick={handleSelectMultipleImagesClick}
                                >
                                    {isSelectMultipleImagesModeOn ? 'Cancel' : 'Select multiple images'}
                                </a>
                                <div className="main-bnts">
                                    <DownloadButton 
                                        imgsToDownload={selectedImgs.map(img => ({name: img.name, url: img.img}))}
                                        text="Download selected images"
                                    />
                                    <DeleteButton 
                                        userId={userId} 
                                        imgsToDelete={
                                            selectedImgs.map(img => ({
                                                name: img.name, 
                                                format: img.name.split(".").slice(-1)[0],
                                                index: img.index
                                            }))
                                        } 
                                        handleDeleteImgClick={handleDeleteImgClick}
                                        text="Delete selected images"
                                    />
                                </div>
                            </div>
                            <div className="collection__main">
                                {imgCollection.map((img, index) => (
                                    <ImgCollectionItem
                                        key={index}
                                        index={index}
                                        img={img}
                                        userId={userId}
                                        handleImgClick={handleImgClick}
                                        handleDeleteImgClick={handleDeleteImgClick}
                                        isSelectMultipleImagesModeOn={isSelectMultipleImagesModeOn}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            }

        </Suspense>
    );
};

export default ImgCollectionPage;