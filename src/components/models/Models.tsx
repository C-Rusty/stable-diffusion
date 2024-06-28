import { Fragment } from "react/jsx-runtime";
import { GenModelsText, GenModelsValue } from "../../types/typesCommon";
import './models.scss';

const Models = (
    {
        genModelSelectProps,
        handleModelClick
    }
    :
    {
        genModelSelectProps: {
            id: string
            options: Array<{
                value: GenModelsValue, 
                text: GenModelsText, 
            }>
        },
        handleModelClick: (value: GenModelsValue, id: string) => void
    }
) => {
    return(
        <Fragment>
            {genModelSelectProps.options.map((optionItem, index) =>  
                    <div className="button-container" key={optionItem.value}>
                        <button 
                            className={
                                    `button-container__btn 
                                    ${index === 0 ? 'active-model-btn' : ""}
                                `} 
                            key={optionItem.value}
                            id={optionItem.value}
                            type='button'
                            onClick={() => handleModelClick(optionItem.value,optionItem.value)}
                        >{optionItem.text}</button> 
                    </div>
                )}
        </Fragment>
    );
};

export default Models;