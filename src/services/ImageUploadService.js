import ImageUpload from "~/models/ImageUpload";

class ImageUploadService {
    static async uploadImage(filePath) {
        try {
            const result = await ImageUpload.uploadImageToCloudinary(filePath);
            return result.secure_url; 
        } catch (error) {
            throw new Error('Tải lên ảnh thất bại: ' + error.message);
        }
    }
}

export default ImageUploadService;
