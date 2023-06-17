// import { createStandaloneToast } from "@chakra-ui/react";
import axios from "axios";

// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = jwt;
// }

// const { toast } = createStandaloneToast();

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    // console.log(error);
    // toast({
    //   title: "Something went wrong!",
    //   status: "error",
    //   isClosable: true,
    //   duration: 5000,
    // });
  }

  return Promise.reject(error);
});

const module = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt,
};
export default module;
