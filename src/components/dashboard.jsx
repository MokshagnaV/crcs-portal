import { Flex } from "@chakra-ui/react";
import NavBar from "./navBar";

import { Outlet } from "react-router-dom";
const Dashboard = (props) => {
  return (
    <Flex flexDirection="column">
      <NavBar />
      <Outlet />
    </Flex>
  );
};

export default Dashboard;
