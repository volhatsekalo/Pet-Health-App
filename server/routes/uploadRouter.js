import { Router } from 'express';
import multer from 'multer';
const router = Router();
import { verifyToken } from '../middlewares/authMiddleware.js';
import { handleUpload } from '../controllers/UploadController.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.post('/upload', verifyToken, (req, res) => {
    handleUpload(req, res, upload);
});

export default router;