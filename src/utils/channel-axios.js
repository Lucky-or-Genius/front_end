import axios from "axios";

const instance = axios.create({
  baseURL: "https://add-channel-19ab823888a2.herokuapp.com/",
});

// instance.defaults.headers.common["Content-Type"] = "application/json";
// instance.defaults.headers.common["Content-Type"] = "multipart/form-data";
// instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

instance.interceptors.request.use(
  (request) => {
    // const token = localStorage.getItem("token");
    // if (
    //   token &&
    //   request?.url !==
    //     "http://restcountries.eu/rest/v2/all?fields=name;flag;callingCodes;"
    // ) {
    //   request.headers.common["Authorization"] = "Bearer " + token;
    // }

    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
