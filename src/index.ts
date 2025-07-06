import App from "./app";

const port = parseInt(process.env.PORT || "3000", 10);

const app = new App(port);

app.start();
