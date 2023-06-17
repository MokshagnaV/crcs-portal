import authServices from "../services/authServices";

const Logout = (props) => {
  authServices.logout();
  window.location = "/";
  return null;
};

export default Logout;
