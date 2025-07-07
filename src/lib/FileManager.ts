import * as fs from "fs";
import * as path from "path";

class FileManager {
  /**
   * Reads the content of a file at the specified path.
   *
   * @param filePath The full path to the file, including its name.
   * @returns A Promise that resolves with the file's content as a string if successful,
   * or rejects with an error if a problem occurs during reading.
   */
  public async readFile(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, "utf8", (err, data) => {
        if (err) {
          return reject(
            new Error(`Error reading file ${filePath}: ${err.message}`)
          );
        }
        resolve(data);
      });
    });
  }

  /**
   * Writes content to a file in the specified path.
   * If the file's parent directory does not exist, it will be created recursively.
   *
   * @param filePath The full path, including the filename, where the content will be written.
   * @param content The content (string) to be written to the file.
   * @returns A Promise that resolves with no value (void) if the write is successful,
   * or rejects with an error if a problem occurs.
   */
  public async writeFile(filePath: string, content: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const dir = path.dirname(filePath);
      fs.mkdir(dir, { recursive: true }, (err) => {
        if (err) {
          return reject(
            new Error(`Error creating directory ${dir}: ${err.message}`)
          );
        }
        fs.writeFile(filePath, content, "utf8", (err) => {
          if (err) {
            return reject(
              new Error(`Error writing to file ${filePath}: ${err.message}`)
            );
          }
          resolve();
        });
      });
    });
  }
}

export default FileManager;
