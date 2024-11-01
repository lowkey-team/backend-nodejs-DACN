import cloudinary from '~/config/cloudinaryConfig';

class ImageUpload {
    static async uploadImageToCloudinary(filePath) {
        return await cloudinary.uploader.upload(filePath, {
            folder: 'descriptionProductDACN', 
        });
    }
}

export default ImageUpload;