import App from "./App.js";
import { attach } from "./store.js";

// Đưa app(element) vào thẻ id root
attach(document.getElementById('root'), App)