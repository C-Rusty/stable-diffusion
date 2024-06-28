import { useContext, useEffect, useState } from 'react';
import './generationHistoryPage.scss';
import { GenerationHistoryItemType } from '../../../types/typesCommon';
import { ApiFirebaseStore } from '../../../api/Api.Firebase.Store';
import { Context } from '../../app/App';
import GenerationHistoryItem from '../generationHistoryItem/GenerationHistoryItem';

const GenerationHistoryPage = () => {

    const { mobxStore } = useContext(Context);
    const userId = mobxStore.userId;

    const [generationHistory, setGenerationHistory] = useState<Array<GenerationHistoryItemType>>([]);

    const getGenerationHistory = async(userId: string) => {
        const generationHistoryData = await ApiFirebaseStore.getGenerationHistory(userId);
        if (!generationHistoryData) return console.log(`generationHistoryData response error. Response: ${generationHistoryData}`);

        setGenerationHistory(generationHistoryData);
    };

    useEffect(() => {
        if (!userId) return console.log(`userId is empty. UserId is ${userId}`);
        getGenerationHistory(userId);
    }, []);

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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GenerationHistoryPage