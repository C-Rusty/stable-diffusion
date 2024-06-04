import { Dispatch, SetStateAction, useState } from "react";
import { GenModelsValue, SelectProps } from "../../../types/typesCommon";
import Select from "../../common/Select";
import { ApiV2ModelParams, AspectRatios } from "../../../types/typesV2Model";
import { v2ModelCommonPropsForSelect } from "../../../utilities/V2ModelPropsForSelect";

const ModelV2Selects = (
    {
        data,
        setData
    } 
    :
    {
        data: ApiV2ModelParams | {},
        setData: Dispatch<SetStateAction<ApiV2ModelParams | {}>>
    }
) => {

    const dataDefaltValue: ApiV2ModelParams = {
        prompt: ``,
        aspect_ratio: `16:9`,
        negative_prompt: ``, 
        seed: 0, 
        style_preset: `digital-art`,
        output_format: `png`
    };

    const { aspectRatiSelectProps } = v2ModelCommonPropsForSelect;

    const [aspectRatio, setAspectRatio] = useState<AspectRatios>(`16:9`);


    return(
        <div className="generator-v2-options">
            <label htmlFor="" className='generator__select-container'>
                <span className='generator__select-container-headline'>Aspect Ratio</span>
                <Select
                    optionProps={aspectRatiSelectProps}
                    defaultValue={aspectRatio}
                    setSelectValue={setAspectRatio as Dispatch<SetStateAction<AspectRatios>>}
                />
            </label>
        </div>
    );
};

export default ModelV2Selects;