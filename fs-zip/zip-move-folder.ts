import archiver from "archiver";
import * as fs from "fs";
import * as path from "path";

/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/
 * @param {String} archiveName: created.zip
 * @returns {Promise}
 */
export const zipDirectory = (sourceDir: string, outPath: string, archiveName: string): Promise<string> => {
  if (!fs.existsSync(sourceDir)) {
    return Promise.reject("Source directory does not exist");
  }

  const pathToZip = path.join(outPath, `${archiveName}_${new Date().getTime()}.zip`);
  const archive = archiver("zip", { zlib: { level: 9 } });
  const stream = fs.createWriteStream(pathToZip);

  return new Promise((resolve, reject) => {
    console.log("Zipping " + sourceDir + " to " + pathToZip);
    archive
      .directory(sourceDir, false)
      .on("error", (err) => reject(err))
      .on("warning", (err) => console.warn(err))
      .on("entry", (entry) => console.log("Added " + entry.name))
      .on("progress", (progress) =>
        console.log(
          "Progress: " +
            progress.entries.processed +
            " / " +
            progress.entries.total
        )
      )
      .on("finish", () =>
        console.log("Finished zipping " + sourceDir + " to " + pathToZip)
      )
      .pipe(stream);

    stream.on("close", () => resolve("success"));
    archive.finalize();
  });
};
