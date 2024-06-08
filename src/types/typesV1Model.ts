export type Resolutions = `1024x1024` | `1152x896` | `896x1152` | `1216x832` | `1344x768` | `768x1344` | `1536x640` | `640x1536`;

export type Sampler = `DDIM` | `DDPM` | `K_DPMPP_2M` | `K_DPMPP_2S_ANCESTRAL` | `K_DPM_2` | `K_DPM_2_ANCESTRAL` | `K_EULER` | `K_EULER_ANCESTRAL` | `K_HEUN` | `K_LMS`;

export type ResolutionsProps = {
    value: Resolutions,
    text: Resolutions
};

export type ApiV1ModelParams = {
    text: {
        text_prompts: [
            {
                text: string
            }
        ]
    },
    height?: number,
    width?: number,
    cfg_scale?: number,
    steps?: number,
    sampler?: Sampler,
    samples: number,
    seed?: number,
    style_preset?: string
};