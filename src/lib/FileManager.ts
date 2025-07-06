import * as fs from "fs";
import * as path from "path";

class FileManager {
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
