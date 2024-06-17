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
                                    ${(optionItem.text === `SD 1.6 (legacy)` ||
                                    optionItem.text === `SD XL (legacy)`) && `disabled` }
                                `} 
                            key={optionItem.value}
                            id={optionItem.value}
                            type='button'
                            onClick={() => handleModelClick(optionItem.value,optionItem.value)}
                            disabled={
                                (optionItem.text === `SD 1.6 (legacy)` ||
                                optionItem.text === `SD XL (legacy)`) && true 
                            }
                        >{optionItem.text}</button> 
                    </div>
                )}
        </Fragment>
    );
};

export default Models;