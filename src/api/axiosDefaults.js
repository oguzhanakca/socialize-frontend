import axios from "axios";

axios.defaults.baseURL =
  "https://socialize-backend-app-9beed826b5f2.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
