import "./app.css";
import App from "./App.svelte";
import "./decss/utils/allStyles";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
