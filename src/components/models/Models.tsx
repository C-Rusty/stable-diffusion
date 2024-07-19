import { Fragment } from "react/jsx-runtime";
import { GenModelsValue } from "../../types/typesCommon";
import './models.scss';
import { Dispatch, SetStateAction } from "react";
import { modelSelects } from "../../utilities/generatorOptionProps";

const Models = (
    {
        setGenModel
    }
    :
    {
        setGenModel: Dispatch<SetStateAction<GenModelsValue>>,
    }
) => {

    const { genModelSelectProps } = modelSelects;

    const handleModelClick = (value: GenModelsValue, id: string) => {
        setGenModel(() => value as GenModelsValue);

        const activeModelBtn = document.querySelector('.active-model-btn');
        if (!activeModelBtn) throw new Error(`Model btn not found`);
        activeModelBtn.classList.remove(`active-model-btn`);

        document.getElementById(id)?.classList.add(`active-model-btn`);
    };

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
                            value={optionItem.value}
                            name={optionItem.text}
                            id={optionItem.value}
                            type='button'
                            onClick={() => handleModelClick(optionItem.value, optionItem.value)}
                        >{optionItem.text}</button> 
                    </div>
                )}
        </Fragment>
    );
};

export default Models;