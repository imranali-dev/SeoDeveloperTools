const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // for windows khrki
        const dir = path.join(__dirname, 'uploading');
        // const dir = 'uploads/'; 
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); 
    }
});
const upload = multer({ storage: storage });
const uploadMiddleware = (req, res, next) => {
    upload.array('screenshots', 5)(req, res, (err) => {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        const files = req.files;
        console.log(req.files);
        const errors = [];
        files.forEach((file) => {
            const allowedTypes = ['image/jpeg', 'image/png'];
            const maxSize = 5 * 1024 * 1024;

            if (!allowedTypes.includes(file.mimetype)) {
                errors.push(`Invalid file type: ${file.originalname}`);
            }

            if (file.size > maxSize) {
                errors.push(`File too large: ${file.originalname}`);
            }
        });
        if (errors.length > 0) {
            files.forEach((file) => {
                fs.unlinkSync(file.path);
            });

            return res.status(400).json({ errors });
        }
    req.files = files;
        next();
    });
};

module.exports = uploadMiddleware;
