import { Flex } from "@chakra-ui/react";
import SideBar from "./sideBar";

import { Outlet } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <Flex flexDirection="column">
      <SideBar />
      <Outlet />
    </Flex>
  );
};

export default Dashboard;
