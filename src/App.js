import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Logout from "./components/logout";
import Registration from "./components/registration";
import Dashboard from "./components/dashboard";
import Socities from "./components/socities";
import CrcsCharts from "./components/crcsCharts";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard}>
            <Route path="/socities" Component={Socities} />
            <Route path="/" Component={CrcsCharts} />
          </Route>
          <Route path="/login" Component={Login} />
          <Route path="/logout" Component={Logout} />
          <Route path="/registration" Component={Registration} />
        </Routes>
      </Router>
    </>
  );
}
export default App;
