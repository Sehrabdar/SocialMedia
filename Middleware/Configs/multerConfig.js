import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profilepics');

    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype !== 'image/jpg' && file.mimetype !== 'image/jpeg'){
        cb(new Error('Only JPEG images are allowed'), false);
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    limits: {fileSize: 1*1024*1024},
    fileFilter: fileFilter
});

export default upload;
