import { useContext, useEffect, useState } from 'react';
import './genResult.scss';
import { Context } from '../../app/App';
import { saveImageToFireStorage } from '../../../api/Api.Firebase.Storage';
import { useDispatch } from 'react-redux';
import { setModalContent } from '../../../store/reduxReducers/modalReducer';
import { urlPaths } from '../../../routes/urlPaths';
import { Link } from 'react-router-dom';

const GenResult = (
    {generatedImage, imgName} 
    : 
    {
        generatedImage: string | null,
        imgName: string
    }) => {

    const dispatch = useDispatch();

    const {mobxStore} = useContext(Context);
    const userId = mobxStore.userId;

    const [base64String, setBase64String] = useState<string | null>(null);

    const convertImgToBlob = async (img: string) => {
        const base = await (fetch(img));
        const blob = await base.blob();
        
        const reader = new FileReader();

        reader.onloadend = () => {
            setBase64String(reader.result as string);
        };
        reader.readAsDataURL(blob);
    };

    useEffect(() => {
        if (generatedImage) {
            convertImgToBlob(generatedImage);
        };
    }, [generatedImage]);

    const handleSaveImgClick = async (base64String: string | null, userId: string | undefined, imgName: string) => {
        if (!base64String || !userId || !imgName) {
            throw new Error(`Something went wrong with request: img: ${base64String}, userId: ${userId}, imgName: ${imgName}`);
        };

        const isUploaded: boolean = await saveImageToFireStorage(base64String.split(',')[1], userId, imgName.split(` `).join(`_`));

        if (isUploaded) {
            dispatch(setModalContent({headline: `Image has been saved`, text: ``, isModalOpen: true}));
        };
    };

    return(
        <div className="generation-result">
            <div className="generation-result__inner">
                {!generatedImage ? 
                    <h1 className='generation-result__headline'>Waiting for your request</h1>
                    :
                    <div className="generation-result__img-container">
                        <img 
                            src={generatedImage} 
                            alt={generatedImage}
                            className='generation-result__img' 
                        />
                    </div>
                }
                <div className="generation-result__actions-container">
                    <button 
                        className="generation-result__btn" 
                        disabled={!generatedImage}
                        onClick={() => handleSaveImgClick(base64String, userId, imgName!)}
                    >Save image to my collection</button>
                    <Link to={`/` + urlPaths.myImages} 
                        className="generation-result__link" 
                    >Go to my collection</Link>
                </div>
            </div>
        </div>
    );
};

export default GenResult;