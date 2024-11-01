import ImageUploadService from '~/services/ImageUploadService';

export const uploadImage = async (req, res) => {
    const file = req.file;
    try {
        if (!file) {
            return res.status(400).json({ message: 'Vui lòng chọn ảnh để tải lên' });
        }

        const imageUrl = await ImageUploadService.uploadImage(file.path);
        res.status(200).json({ imageUrl });
    } catch (error) {
        res.status(500).json({ message: 'Lỗi khi tải lên ảnh', error: error.message });
    }
};
