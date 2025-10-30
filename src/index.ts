import App from "./app";

interface GenerationOptions {
  templateName: string;
  outputFileName: string;
  data: { [key: string]: any };
}

const port = parseInt(process.env.PORT || "3000", 10);

const app = new App(port);

app.start();
