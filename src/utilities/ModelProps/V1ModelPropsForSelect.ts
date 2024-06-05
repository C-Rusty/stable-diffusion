import { Resolutions, ResolutionsProps } from "../../types/typesV1Model";

const resolutionSelectProps: {
    className: string
    id: string
    options: Array<{value: Resolutions, text: Resolutions}>
} = {
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
