import { useContext, useEffect, useState } from 'react';
import './generationHistoryPage.scss';
import { ApiFirebaseStore } from '../../../api/Firebase/Api.Firebase.Store';
import { Context } from '../../app/App';
import GenerationHistoryItem from '../generationHistoryItem/GenerationHistoryItem';
import { loadGenHistoryItemsLimit } from '../../../utilities/constants';
import ShowMoreButton from '../../common/buttons/show-more-btn/ShowMoreButton';
import { IImageHistoryItem } from '../../../interface/items/imgItems';

const GenerationHistoryPage = () => {

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const [generationHistory, setGenerationHistory] = useState<Array<IImageHistoryItem>>([]);
    const [memorizedGenerationHistory, setMemorizedGenerationHistory] = useState<Array<IImageHistoryItem>>([]);
    const [collectionAmount, setCollectionAmount] = useState<number>(0);

    const getCollectionLength = async () => {
        if (!userId) return console.log(`userId is empty. UserId is ${userId}`);

        const response = await ApiFirebaseStore.getCollectionAmount(userId, `generationHistory`);

        if (!response) return console.log(`getCollectionLength response error. Response: ${response}`);
        
        setCollectionAmount(response);
    };

    const getGenerationHistory = async() => {

        if (!userId) return console.log(`userId is empty. UserId is ${userId}`);

        const generationHistoryData = await ApiFirebaseStore.getGenerationHistory(userId, genHistoryItemCounter, lastItemTimestamp);

        if (!generationHistoryData) return console.log(`generationHistoryData response error. Response: ${generationHistoryData}`);
        
        if (genHistoryItemCounter === loadGenHistoryItemsLimit) {
            setGenerationHistory(generationHistoryData);
            setMemorizedGenerationHistory(generationHistoryData);
        } else if (genHistoryItemCounter % loadGenHistoryItemsLimit === 0 && genHistoryItemCounter !== loadGenHistoryItemsLimit) {
            setGenerationHistory([...memorizedGenerationHistory, ...generationHistoryData]);
            setMemorizedGenerationHistory([...memorizedGenerationHistory, ...generationHistoryData]);
        } else {
            console.log(`genHistoryItemCounter error. genHistoryItemCounter: ${genHistoryItemCounter}`);
        };
    };

    useEffect(() => {
        getCollectionLength();
        getGenerationHistory();
    }, []);

    const [genHistoryItemCounter, setGenHistoryItemCounter] = useState<number>(loadGenHistoryItemsLimit);
    const [lastItemTimestamp, setLastItemTimestamp] = useState<string | null>(null);

    useEffect(() => {
        setLastItemTimestamp(generationHistory[generationHistory.length - 1]?.generalInfo.timestamp);
    }, [genHistoryItemCounter]);

    useEffect(() => {
        if (genHistoryItemCounter !== loadGenHistoryItemsLimit) {
            getGenerationHistory();
        };
    }, [lastItemTimestamp]);

    return(
        <div className='generation-history'>
            <div className="container">
                <div className="generation-history__inner">
                    <h1 className="generation-history__headline">Generation History</h1>
                    <div className="generation-history__main">
                        {generationHistory.length > 0 ? generationHistory.map((item) => 
                            <GenerationHistoryItem 
                                key={item.generalInfo.id}
                                userId={userId} 
                                item={item}
                                setGenerationHistory={setGenerationHistory} 
                            />) 
                            : 
                            <h2 className='generation-history__subheadline'>No history yet...</h2>
                        }
                        {collectionAmount > genHistoryItemCounter &&
                            <div className="generation-history__action-btn-container">
                                <p className="generation-history__action-btn-container-text">
                                    {genHistoryItemCounter} of {collectionAmount} loaded
                                </p>
                                <ShowMoreButton 
                                    page={'generationHistory'} 
                                    setItemsCounter={setGenHistoryItemCounter} 
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationHistoryPage