import App from "./app";
import EjsTemplateRenderer from "./lib/EjsTemplateRenderer";
import FileManager from "./lib/FileManager";
import * as path from "path";

interface GenerationOptions {
  templateName: string;
  outputFileName: string;
  data: { [key: string]: any };
}

const port = parseInt(process.env.PORT || "3000", 10);

const app = new App(port);

app.start();
