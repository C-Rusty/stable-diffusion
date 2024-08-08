export type ImageToVideoGenerationServiceModels = `image-to-video`;

export type ImageToVideoGenerationServiceOptions = {
    image: Blob,
    cfg_scale?: number,
    motion_bucket_id: number,
    seed?: number,
};