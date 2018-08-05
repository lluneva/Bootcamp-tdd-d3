import path from 'path';
import { UPLOAD_FOLDER } from '../consts/webConsts';

const download = async (req, res) => {
  const file = path.join(__dirname, UPLOAD_FOLDER);
  res.download(file);
};

export default download;
