import { GenModelsText, GenModelsValue } from "../../types/typesCommon";
import { OutputFormat, PresetStyle } from "../../types/typesV2Model";

const genModelSelectProps: {
    id: string
    options: Array<{
        value: GenModelsValue, 
        text: GenModelsText, 
        tip: {
            description: string,
            imgGenAmount: string,
            price: string
        }
    }>
} = {
    id: 'model-select',
    options: [
        {
            value: `ultra`,
            text: `SI Ultra`,
            tip: {
                description: `Stable Image Ultra. Most advanced text to image generation service, Stable Image Ultra creates the highest quality images with unprecedented prompt understanding. Ultra excels in typography, complex compositions, dynamic lighting, vibrant hues, and overall cohesion and structure of an art piece. Made from the most advanced models, including Stable Diffusion 3, Ultra offers the best of the Stable Diffusion ecosystem.`,
                imgGenAmount: `Generates only 1 image per request.`,
                price: `8 credits per 1MP image.`
            },
        },
        {
            value: `core`, 
            text: `Core`,
            tip: {
                description: `Stable Image Core. Primary service for text-to-image generation, Stable Image Core represents the best quality achievable at high speed. No prompt engineering is required! Try asking for a style, a scene, or a character, and see what you get.`,
                imgGenAmount: `Generates only 1 image per request.`,
                price: `3 credits per 1MP image.`
            }
        },
        {
            value: `sd3-turbo`, 
            text: `SI 3 Turbo`,
            tip: {
                description: `Stable Image 3 Turbo. A bit weaker than core and ultra models.`,
                imgGenAmount: `Generates only 1 image per request.`,
                price: `6.5 credits per 1MP image.`
            }
        },
        {
            value: `sd3`, 
            text: `SI 3`,
            tip: {
                description: `Stable Image 3. Weaker than SI 3 Turbo and Core.`,
                imgGenAmount: `Generates only 1 image per request.`,
                price: `4 credits per 1MP image.`
            }
        },
        {
            value: 'stable-diffusion-xl-1024-v1-0', 
            text: `SD XL (legacy)`,
            tip: {
                description: `Stable Diffusion XL.Legacy model. Stable diffusion. No dimension can be less than 320 pixels and greater than 1536 pixels.`,
                imgGenAmount: `Can generate from 1 to 10 images per request`,
                price: `1 credit or less.`
            }
        },
        {
            value: 'stable-diffusion-v1-6', 
            text: `SD 1.6 (legacy)`,
            tip: {
                description: `Stable Diffusion 1.6. Legacy model. Stable diffusion. No dimension can be less than 320 pixels and greater than 1536 pixels. Can generate from 1 to 10 images per request`,
                imgGenAmount: `Can generate from 1 to 10 images per request`,
                price: `1.5 credits or less.`
            }
        },
    ],
};

const seedInputProps: {
    id: string
    value: number
    placeholder: string,
    inputType: string,
    name: string
} = {
    id: 'seed-select',
    value: 0,
    placeholder: `the 'randomness' of the generation`,
    inputType: 'number',
    name: 'seed',
};

const stylePresetSelectProps: {
    id: string
    options: Array<{value: PresetStyle, text: PresetStyle}>
} = {
    id: 'style-select',
    options: [
        { value: "3d-model", text: "3d-model" },
        { value: "analog-film", text: "analog-film" },
        { value: "anime", text: "anime" },
        { value: "cinematic", text: "cinematic" },
        { value: "comic-book", text: "comic-book" },
        { value: "digital-art", text: "digital-art" },
        { value: "enhance", text: "enhance" },
        { value: "fantasy-art", text: "fantasy-art" },
        { value: "isometric", text: "isometric" },
        { value: "line-art", text: "line-art" },
        { value: "low-poly", text: "low-poly" },
        { value: "modeling-compound", text: "modeling-compound" },
        { value: "neon-punk", text: "neon-punk" },
        { value: "origami", text: "origami" },
        { value: "photographic", text: "photographic" },
        { value: "pixel-art", text: "pixel-art" },
        { value: "tile-texture", text: "tile-texture" }
      ]
      
};

const outputFormatSelectProps: {
    id: string
    options: Array<{value: OutputFormat, text: OutputFormat}>
} = {
    id: 'output-select',
    options: [
        {value: `png`, text: `png`},
        {value: `jpeg`, text: `jpeg`},
        {value: `webp`, text: `webp`},
    ],
};


export const generatorCommonPropsForSelect = {
    genModelSelectProps,
    seedInputProps,
    stylePresetSelectProps,
    outputFormatSelectProps
};