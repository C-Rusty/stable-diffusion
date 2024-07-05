import { Suspense, lazy, useContext, useEffect, useState } from 'react';
import './favouritesPage.scss';
import { Context } from '../../app/App';
import ImgCollectionItem from '../imgColletionItem/ImgCollectionItem';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import DeleteButton from '../../common/buttons/delete-img-btn/DeleteImgButton';
import Loader from '../../common/loader/Loader';
import { ImageItemGallery } from '../../../types/typesCommon';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import ShowMoreButton from '../../common/buttons/show-more-btn/ShowMoreButton';
import { loadFavouriteItemsLimit } from '../../../utilities/commonVars';
import { ApiFirebaseStore } from '../../../api/Api.Firebase.Store';

const FavouritesPage = () => {

    const Gallery = lazy(() => import('../../gallery/Gallery'));

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const [imgCollection, setImgCollection] = useState<Array<ImageItemGallery>>([]);
    const [memorizedImgCollection, setMemorizedImgCollection] = useState<Array<ImageItemGallery>>([]);

    const [collectionAmount, setCollectionAmount] = useState<number>(0);
    const [favouriteItemsCounter, setfavouriteItemsCounter] = useState<number>(loadFavouriteItemsLimit);
    const [lastItemTimestamp, setLastItemTimestamp] = useState<string | null>(null);

    const getUserImgCollection = async () => {
        
        const favouritesImgs = await apiFirebaseStorage.getFavouritesImgs(userId!, favouriteItemsCounter, lastItemTimestamp) as Array<ImageItemGallery>;
    
        if (favouriteItemsCounter === loadFavouriteItemsLimit) {
            setImgCollection(favouritesImgs);
            setMemorizedImgCollection(favouritesImgs);
        } else if (favouriteItemsCounter % loadFavouriteItemsLimit === 0 && favouriteItemsCounter !== loadFavouriteItemsLimit) {
            setImgCollection([...memorizedImgCollection, ...favouritesImgs]);
            setMemorizedImgCollection([...memorizedImgCollection, ...favouritesImgs]);
        } else {
            console.log(`genHistoryItemCounter error. genHistoryItemCounter: ${favouriteItemsCounter}`);
        };
    };

    const getCollectionAmount = async () => {
        const response = await ApiFirebaseStore.getCollectionAmount(userId!, `favourites`); 
        if (!response) return console.log(`getCollectionAmount response error. Response: ${response}`);

        setCollectionAmount(response); 
    };

    useEffect(() => {
        if (userId) {
            getCollectionAmount();
            getUserImgCollection();
        };
    }, []);

    useEffect(() => {
        setLastItemTimestamp(imgCollection[imgCollection.length - 1]?.timestamp!);
    }, [favouriteItemsCounter]);

    useEffect(() => {
        if (favouriteItemsCounter !== loadFavouriteItemsLimit) {
            getUserImgCollection();
        };
    }, [lastItemTimestamp]);

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
                            <h1 className='collection__headline'>Favourites</h1>
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
                            {collectionAmount > favouriteItemsCounter && 
                                <div className="collection__action-btn-container">
                                    <p className="collection__action-btn-container-text">
                                    {favouriteItemsCounter} of {collectionAmount} loaded
                                </p>
                                    <ShowMoreButton 
                                        page="favourites" 
                                        setItemsCounter={setfavouriteItemsCounter} />
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </Suspense>
    );
};

export default FavouritesPage;