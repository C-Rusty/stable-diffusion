import { useContext, useEffect, useState } from 'react';
import './imgCollection.scss';
import { Context } from '../../app/App';
import { getImagesFromFireStorage } from '../../../api/Api.Firebase.Storage';
import { getDownloadURL } from 'firebase/storage';

const ImgCollection = () => {

    const [imgCollection, setImgCollection] = useState<Array<string>>([]);

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

    return(
        <div className="collection">
            <div className="container">
                <div className="collection__inner">
                    <h1 className='collection__headline'>My collection</h1>
                    <div className="collection__main">
                        {imgCollection.map((item, index) => (
                            <div 
                                key={index}        className="collection__img-container"
                            >
                                <img 
                                    src={item} 
                                    alt="img" 
                                    className="collection__img"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImgCollection;