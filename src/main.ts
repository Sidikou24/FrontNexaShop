import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/pagesRouter";
import '@fortawesome/fontawesome-free/css/all.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./scripts/imports";

const app = createApp(App);

app.use(router);

app.mount("#app");
