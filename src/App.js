import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import Logout from "./components/logout";
import Registration from "./components/registration";
import Dashboard from "./components/dashboard";
import Societies from "./components/societies";
import CrcsCharts from "./components/crcsCharts";
import AnnualReturns from "./components/annualReturns";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" Component={Dashboard}>
            <Route path="/societies" Component={Societies} />
            <Route path="/annual-returns" Component={AnnualReturns} />
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
