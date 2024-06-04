export type presetStyle =   '3d-model' | 'analog-film' | 'anime' | 'cinematic' | 'comic-book' | 'digital-art' | 'enhance' | 'fantasy-art' | 'isometric' | 'line-art' | 'low-poly' | 'modeling-compound' | 'neon-punk' | 'origami' | 'photographic' | 'pixel-art' | 'tile-texture';

export type outputFormat = `png` | `jpeg` | `webp`;
export type AspectRatios = `16:9` | `1:1` | `21:9` | `2:3` | `3:2` | `4:5` | `5:4` | `9:16` | `9:21`;

export type AspectRatiosProps = {
    value: AspectRatios,
    text: AspectRatios
};

export type PresetStyleProps = {
    value: presetStyle,
    text: presetStyle
};

export type OutputFormatProps = {
    value: outputFormat,
    text: outputFormat
};

export type ApiV2ModelParams = {
    prompt?: string,
    aspect_ratio: AspectRatios,
    negative_prompt: string, 
    seed: number, 
    style_preset: presetStyle
    output_format: outputFormat
}