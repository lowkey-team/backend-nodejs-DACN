import express from 'express';
import multer from 'multer';
import { uploadImage } from '~/controllers/ImageUploadController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/upload-image', upload.single('image'), uploadImage);

export const UploadImageRoute = router;