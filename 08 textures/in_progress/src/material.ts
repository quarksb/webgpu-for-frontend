
export class Material {

    texture: GPUTexture

    async initialize(device: GPUDevice, url: string) {
        
        await this.loadImage(device, url);
    }

    async loadImage(device: GPUDevice, url: string) {

        const init: RequestInit = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        const response: Response = await fetch(url, init);
        const blob: Blob = await response.blob();
        const imageData: ImageBitmap = await createImageBitmap(blob);
        
        await this.loadImageBitmap(device, imageData);
        
    }

    async loadImageBitmap(device: GPUDevice, imageData: ImageBitmap) {

        const textureDescriptor: GPUTextureDescriptor = {
            size: {
                width: imageData.width,
                height: imageData.height
            },
            format: "rgba8unorm",
            usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST
        }

        this.texture = device.createTexture(textureDescriptor)

        device.queue.copyExternalImageToTexture(
            {source: imageData}, 
            {texture: this.texture}, 
            textureDescriptor.size
        );

    }
}