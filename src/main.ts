import App from "./App.svelte";
import "./decss/utils/allStyles";
import "./app.css";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
