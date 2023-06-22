import { Flex, useColorModeValue } from "@chakra-ui/react";
import NavBar from "./navBar";

import { Outlet } from "react-router-dom";
import Footer from "./footer";
const Dashboard = (props) => {
  const bg = useColorModeValue("gray.100", "gray.900");
  return (
    <Flex flexDirection="column" backgroundColor={bg}>
      <NavBar />
      <Outlet />
      <Footer />
    </Flex>
  );
};

export default Dashboard;
