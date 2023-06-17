import jwtDecode from "jwt-decode";
import httpService from "../services/httpService";
import config from "../config.json";

// httpService.setJwt(getJwt());

function getJwt() {
  return localStorage.getItem("token");
}

async function register(regData) {
  const { data } = await httpService.post(
    config.apiEndPoint + "registration/",
    regData
  );
  loginWithJwt(data.access_token);
  return data.name;
}

async function login(regData) {
  const { data } = await httpService.post(
    config.apiEndPoint + "login/",
    regData
  );
  loginWithJwt(data.access_token);
  return data.name;
}

function loginWithJwt(jwt) {
  localStorage.setItem("token", jwt);
}

function getCurrentUser() {
  try {
    const jwt = getJwt();
    return jwtDecode(jwt);
  } catch {
    return null;
  }
}

function logout() {
  localStorage.removeItem("token");
}

const module = {
  register,
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
};
export default module;
