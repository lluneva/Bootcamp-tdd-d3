import fs from 'fs';

// TODO Study.2

/**
 * utility function which is used to create folder if it does not exists
 *
 * DOCS: https://nodejs.org/api/fs.html
 * @param {*} path absolute path to folder
 */
const createFolderIfNotExists = path =>
  new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
      if (err) {
        if (err.code === 'EEXIST') {
          resolve();
        } else {
          reject(err);
        }
      } else {
        resolve();
      }
    });
  });

export { createFolderIfNotExists };
