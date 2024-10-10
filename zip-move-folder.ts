import archiver from 'archiver';
import fs from 'fs';

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
export const zipDirectory = (sourceDir, outPath) => {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    console.log('Zipping ' + sourceDir + ' to ' + outPath);
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .on('warning', err => console.warn(err))
      .on('entry', entry => console.log('Added ' + entry.name))
      .on('progress', progress => console.log('Progress: ' + progress.entries.processed + ' / ' + progress.entries.total))  
      .on('finish', () => console.log('Finished zipping ' + sourceDir + ' to ' + outPath))
      .pipe(stream);

    stream.on('close', () => resolve(undefined));
    archive.finalize();
  });
}