export type PresetStyle =   '3d-model' | 'analog-film' | 'anime' | 'cinematic' | 'comic-book' | 'digital-art' | 'enhance' | 'fantasy-art' | 'isometric' | 'line-art' | 'low-poly' | 'modeling-compound' | 'neon-punk' | 'origami' | 'photographic' | 'pixel-art' | 'tile-texture';

export type OutputFormat = `png` | `jpeg` | `webp`;
export type AspectRatios = `16:9` | `1:1` | `21:9` | `2:3` | `3:2` | `4:5` | `5:4` | `9:16` | `9:21`;

export type AspectRatiosProps = {
    value: AspectRatios,
    text: AspectRatios
};

export type PresetStyleProps = {
    value: PresetStyle,
    text: PresetStyle
};

export type OutputFormatProps = {
    value: OutputFormat,
    text: OutputFormat
};