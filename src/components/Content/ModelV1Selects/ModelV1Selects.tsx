import { Dispatch, SetStateAction, useState } from 'react';
import { SelectProps } from '../../../types/typesCommon';
import './modelV1Selects.scss';
import { ApiV1ModelParams, Resolutions } from '../../../types/typesV1Model';

const ModelV1Selects = (
    {
        data,
        setData
    }
    :
    {
        data: ApiV1ModelParams | {},
        setData: Dispatch<SetStateAction<ApiV1ModelParams | {}>>
    }
) => {
    
    const resolutionOptionProps: SelectProps = {
        className: 'generator__resolution-select',
        id: 'resolution-select',
        options: [
            {value: `1024x1024`, text: `1024x1024`},
            {value: `1152x896`, text: `1152x896`},
            {value: `896x1152`, text: `896x1152`},
            {value: `1216x832`, text: `1216x832`},
            {value: `1344x768`, text: `1344x768`},
            {value: `768x1344`, text: `768x1344`},
            {value: `1536x640`, text: `1536x640`},
            {value: `640x1536`, text: `640x1536`},
        ],
    };

    const [resolution, setResolution] = useState<Resolutions>(`1024x1024`);
    

    return(
        <>
            <label htmlFor="" className='generator__select-container'>
                <span className='generator__select-container-headline'>Image Resolution </span>
                {/* <Select
                    optionProps={resolutionOptionProps}
                    defaultValue={resolution}
                    setSelectValue={setResolution as Dispatch<SetStateAction<Resolutions>>}
                /> */}
            </label>
        </>
    );
};

export default ModelV1Selects;