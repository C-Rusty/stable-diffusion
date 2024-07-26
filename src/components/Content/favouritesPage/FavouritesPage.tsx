import { Fragment, Suspense, lazy, useContext, useEffect, useState } from 'react';
import './favouritesPage.scss';
import { Context } from '../../app/App';
import DownloadButton from '../../common/buttons/download-btn/DownloadButton';
import DeleteButton from '../../common/buttons/delete-img-btn/DeleteImgButton';
import Loader from '../../common/loader/Loader';
import { GalleryItem } from '../../../types/typesCommon';
import { apiFirebaseStorage } from '../../../api/Api.Firebase.Storage';
import ShowMoreButton from '../../common/buttons/show-more-btn/ShowMoreButton';
import { loadFavouriteItemsLimit } from '../../../utilities/vars';
import { ApiFirebaseStore } from '../../../api/Api.Firebase.Store';
import FavouritesItem from '../favouritesItem/FavouritesItem';
import { getImgNameAndFormat } from '../../../utilities/functions';

const FavouritesPage = () => {

    const Gallery = lazy(() => import('../../gallery/Gallery'));

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const [imgCollection, setImgCollection] = useState<Array<GalleryItem>>([]);
    const [memorizedImgCollection, setMemorizedImgCollection] = useState<Array<GalleryItem>>([]);

    const [collectionAmount, setCollectionAmount] = useState<number>(0);
    const [favouriteItemsCounter, setfavouriteItemsCounter] = useState<number>(loadFavouriteItemsLimit);
    const [lastItemTimestamp, setLastItemTimestamp] = useState<string | null>(null);

    const getUserImgCollection = async () => {
        
        const favouritesImgs = await apiFirebaseStorage.getFavouritesImgs(userId!, favouriteItemsCounter, lastItemTimestamp) as Array<GalleryItem>;
    
        if (favouriteItemsCounter === loadFavouriteItemsLimit) {
            setImgCollection(favouritesImgs);
            setMemorizedImgCollection(favouritesImgs);
        } else if (favouriteItemsCounter % loadFavouriteItemsLimit === 0 && favouriteItemsCounter !== loadFavouriteItemsLimit) {
            setImgCollection([...memorizedImgCollection!, ...favouritesImgs]);
            setMemorizedImgCollection([...memorizedImgCollection!, ...favouritesImgs]);
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
        if (imgCollection) setLastItemTimestamp(imgCollection[imgCollection.length - 1]?.timestamp);
        
    }, [favouriteItemsCounter]);

    useEffect(() => {
        if (favouriteItemsCounter !== loadFavouriteItemsLimit) {
            getUserImgCollection();
        };
    }, [lastItemTimestamp]);

    const [isGalleryOpened, setIsGalleryOpened] = useState(false);  
    const [selectedImgIndex, setSelectedImgIndex] = useState<number | undefined>(undefined);

    const handleImgClick = (clickedImgIndex: number, clickedImgId: string) => {
        
        switch (isSelectMultipleImagesModeOn) {
            case true:
                const selectedImg = imgCollection.find(img => img.id === clickedImgId);

                if (selectedImg) {
                    setSelectedImgs(prev => [...prev, selectedImg]);
                };
            break;

            case false:
                setSelectedImgIndex(clickedImgIndex);
                console.log(`selectedImgIndex: ${clickedImgIndex}`);
                
                setIsGalleryOpened(true);
            break;
        
            default: break;
        }
    };

    const handleDeleteImgClick = (imgIndex: number) => {
        setImgCollection(prev => prev!.filter((img) => img.index !== imgIndex));
    };

    const [isSelectMultipleImagesModeOn, setSelectMultipleImagesModeOn] = useState(false);
    const [selectedImgs, setSelectedImgs] = useState<Array<GalleryItem>>([]);

    const handleSelectMultipleImagesClick = () => {
        setSelectMultipleImagesModeOn(!isSelectMultipleImagesModeOn);
    };

    return(
        <Suspense fallback={<Loader className="component-loading" />}>
            {isGalleryOpened ? 
                <Gallery
                    setIsOpened={setIsGalleryOpened}
                    imgCollection={imgCollection}
                    clickedImgIndex={selectedImgIndex}
                />
                :
                <div className="collection">
                    <div className="container">
                        <div className="collection__inner">
                            <h1 className='collection__headline'>Favourites</h1>
                            {imgCollection &&   
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
                                            imgsToDownload={selectedImgs.map(img => (
                                                {
                                                    name: getImgNameAndFormat(img.storagePath), 
                                                    url: img.url
                                                })
                                            )}
                                            text="Download selected images"
                                        />
                                        <DeleteButton 
                                            userId={userId} 
                                            imgsToDelete={selectedImgs.map(img => {
                                                return {
                                                    storagePath: img.storagePath,
                                                    index: img.index
                                                }
                                            })} 
                                            handleDeleteImgClick={handleDeleteImgClick}
                                            text="Delete selected images"
                                        />
                                    </div>
                                </div>
                            }
                            <div className="collection__main">
                                {imgCollection ?
                                    <Fragment>
                                            {imgCollection.map((img, index) => (
                                            <FavouritesItem
                                                key={index}
                                                index={index}
                                                img={{
                                                    prompt: img.prompt,
                                                    format: img.format,
                                                    url: img.url,
                                                    id: img.id,
                                                    storagePath: img.storagePath
                                                }}
                                                userId={userId}
                                                handleImgClick={handleImgClick}
                                                handleDeleteImgClick={handleDeleteImgClick}
                                                isSelectMultipleImagesModeOn={isSelectMultipleImagesModeOn}
                                            />
                                        ))}
                                    </Fragment>
                                    :
                                    <Loader className="component-loading" />
                                }

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