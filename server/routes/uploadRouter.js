import { Router } from 'express';
import multer from 'multer';
import fs from 'fs';
const router = Router();
import { verifyToken } from '../middlewares/authMiddleware.js';
import { handleUpload } from '../controllers/UploadController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (!fs.existsSync('uploads')) {
            fs.mkdirSync('uploads');
        }
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

router.post('/', verifyToken, upload.single('file'), (req, res) => {
    handleUpload(req, res);
});

export default router;