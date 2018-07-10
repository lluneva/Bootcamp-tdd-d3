import multer from 'multer';
import path from 'path';
import * as fsHandler from '../utils/fsHandler';

const storage = multer.diskStorage({
  async destination(req, file, cb) {
    const uploadDirName = req.url.split('/')[2];
    const pathToDir = path.join(__dirname, `../uploads/${uploadDirName}`);
    await fsHandler.createFolderIfNotExists(pathToDir);
    cb(null, pathToDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export const diskStorageSingle = upload.single('media');
