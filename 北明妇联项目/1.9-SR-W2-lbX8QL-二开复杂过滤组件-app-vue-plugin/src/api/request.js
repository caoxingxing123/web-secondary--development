import axios from "axios";
import qs from "querystringify";

let apiContextPath = "";
if (process.env.NODE_ENV === "development") {
   document.cookie = "token=eyJhbGciOiJIUzI1NiJ9.eyJsb2dpblRpbWVzdGFtcCI6MTY3MzQ5Mzk3NzQ1NCwidXNlcklkIjoiMTIzNDU2Nzg5MCJ9.DPA_8HIUHS0hIyl9ofwfZwhqjQ_hFJgwVkebB-djdqA";
   apiContextPath = "/api";
}

const instance = axios.create({
   baseURL: `${apiContextPath}/sdata/rest`,
   timeout: 60000,
   validateStatus: function (status) {
      return status >= 200 && status < 300; // default
   },
   headers: (window.location.search && qs.parse(window.location.search).token) || window.token ? { token: qs.parse(window.location.search).token || window.token } : {},
});

instance.defaults.headers.post["Content-Type"] = "application/json";

instance.interceptors.response.use(
   (response) => {
      let { data } = response;
      if (typeof data === "string") {
         data = JSON.parse(data);
      }
      if (data && data.status !== 200 && data.status !== 0 && !(data instanceof Blob)) {
         return Promise.reject(response);
      }
      if (data instanceof Blob) {
         response.data = data;
         return response;
      }

      response.data = data && data.result;
      return response;
   },
   (error) => {
      if (error.response && error.response.status === 401) {
         return;
      }
      return Promise.reject(error.response);
   }
);

export default instance;
