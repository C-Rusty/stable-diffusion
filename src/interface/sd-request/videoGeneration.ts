export interface VideoGenerationItem extends VideoGenerationModelOptions {
    image: Blob | string | null,
};

export interface VideoGenerationModelOptions {
    seed?: number,
    cfg_scale?: number,
    motion_bucket_id?: number
};

export interface VideoGenerationModel extends Pick<VideoGenerationModelOptions, "cfg_scale" | "motion_bucket_id" | "seed"> {};