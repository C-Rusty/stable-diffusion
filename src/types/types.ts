export type SelectProps = {
    className: string, 
    id: string,
    options: Array<GenModelsProps | ResolutionsProps | AspectRatiosProps>
};

export type GenModelsValue = `sd3` | `core` | `stable-diffusion-v1-6` | `stable-diffusion-xl-1024-v1-0`;
export type GenModelsText = `SD3 (powerful)` | `Core (fast and stable)` | `SD 1.6 (base model)` | `SDXL 1.0 (flexible-resolution base)`;

export type Resolutions = `1024x1024` | `1152x896` | `896x1152` | `1216x832` | `1344x768` | `768x1344` | `1536x640` | `640x1536`;
export type AspectRatios = `16:9` | `1:1` | `21:9` | `2:3` | `3:2` | `4:5` | `5:4` | `9:16` | `9:21`;

export type GenModelsProps = {
    value: GenModelsValue,
    text: GenModelsText
};

export type ResolutionsProps = {
    value: Resolutions,
    text: Resolutions
};

export type AspectRatiosProps = {
    value: AspectRatios,
    text: AspectRatios
};