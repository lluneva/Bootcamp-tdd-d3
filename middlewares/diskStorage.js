import multer from 'multer';
import path from 'path';
import * as fsHandler from '../utils/fsHandler';
import { UPLOAD_FOLDER } from '../consts/paths';

// TODO Study.1

/**
 * Multer library is used to upload media content to the server through http requests.
 * It is used in form of middleware and can be placed behind any other middleware.
 * diskStorage will place file to specific folder and attach metadata (req.file) to request.
 *
 * DOCS: https://www.npmjs.com/package/multer
 */
const storage = multer.diskStorage({
  async destination(req, file, cb) {
    const pathToDir = path.join(__dirname, `../${UPLOAD_FOLDER}`);
    await fsHandler.createFolderIfNotExists(pathToDir);
    cb(null, pathToDir);
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

export const diskStorageSingle = upload.single('media');
