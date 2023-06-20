import { Grid, GridItem } from "@chakra-ui/react";
import SideBar from "./sideBar";

import { Outlet } from "react-router-dom";

const Dashboard = (props) => {
  return (
    <Grid templateColumns={"repeat(6, 1fr)"}>
      <SideBar />
      <GridItem colSpan="5">
        <Outlet />
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
