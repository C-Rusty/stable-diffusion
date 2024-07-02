import { useContext, useEffect, useState } from 'react';
import './generationHistoryPage.scss';
import { GenerationHistoryItemType } from '../../../types/typesCommon';
import { ApiFirebaseStore } from '../../../api/Api.Firebase.Store';
import { Context } from '../../app/App';
import GenerationHistoryItem from '../generationHistoryItem/GenerationHistoryItem';
import { loadItemsLimit } from '../../../utilities/commonVars';

const GenerationHistoryPage = () => {

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const [generationHistory, setGenerationHistory] = useState<Array<GenerationHistoryItemType>>([]);
    const [memorizedGenerationHistory, setMemorizedGenerationHistory] = useState<Array<GenerationHistoryItemType>>([]);
    const [collectionAmount, setCollectionAmount] = useState<number>(0);

    const getCollectionLength = async () => {
        if (!userId) return console.log(`userId is empty. UserId is ${userId}`);

        const response = await ApiFirebaseStore.getCollectionAmount(userId);

        if (!response) return console.log(`getCollectionLength response error. Response: ${response}`);
        
        setCollectionAmount(response);
    };

    const getGenerationHistory = async() => {

        if (!userId) return console.log(`userId is empty. UserId is ${userId}`);

        const generationHistoryData = await ApiFirebaseStore.getGenerationHistory(userId, genHistoryItemCounter, lastItemTimestamp);

        if (!generationHistoryData) return console.log(`generationHistoryData response error. Response: ${generationHistoryData}`);

        
        if (genHistoryItemCounter === loadItemsLimit) {
            setGenerationHistory(generationHistoryData);
            setMemorizedGenerationHistory(generationHistoryData);
        } else if (genHistoryItemCounter % loadItemsLimit === 0 && genHistoryItemCounter !== loadItemsLimit) {
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

    const [genHistoryItemCounter, setGenHistoryItemCounter] = useState<number>(loadItemsLimit);
    const [lastItemTimestamp, setLastItemTimestamp] = useState<string | null>(null);

    const showMoreClick = () => {
        setGenHistoryItemCounter((prev) => prev + genHistoryItemCounter);
    };

    useEffect(() => {
        setLastItemTimestamp(generationHistory[generationHistory.length - 1]?.timestamp);
    }, [genHistoryItemCounter]);

    useEffect(() => {
        getGenerationHistory();
    }, [lastItemTimestamp]);

    return(
        <div className='generation-history'>
            <div className="container">
                <div className="generation-history__inner">
                    <h1 className="generation-history__headline">Generation History</h1>
                    <div className="generation-history__main">
                        {
                            generationHistory ? generationHistory.map((item) => <GenerationHistoryItem 
                                key={item.timestamp} 
                                item={item}
                                setGenerationHistory={setGenerationHistory} 
                            />) 
                            : 
                            <h2 className='generation-history__subheadline'>No history yet...</h2>
                        }
                        {collectionAmount > genHistoryItemCounter &&
                            <div className="generation-history__load-more">
                                <a 
                                    href="#0" 
                                    className="generation-history__load-more-btn"
                                    onClick={showMoreClick}
                                >
                                    Load more
                                </a>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationHistoryPage