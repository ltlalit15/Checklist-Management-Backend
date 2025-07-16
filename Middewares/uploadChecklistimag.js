import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './ChecklistImg.js';

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'checklist_images',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  },
});

export const upload = multer({ storage });

