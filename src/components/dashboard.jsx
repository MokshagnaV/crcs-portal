import { Box, Grid, GridItem } from "@chakra-ui/react";
import { useState } from "react";
import { getData } from "../services/chartServices/dataService";
import SideBar from "./sideBar";
import BarChart from "./common/barChart";
import PieChart from "./common/pieChart";
import LineChart from "./common/lineChart";

const Dashboard = (props) => {
  const [socitiesData, setSocitiesData] = useState(getData());

  return (
    <Grid gridTemplateColumns={"repeat(6, 1fr)"}>
      <SideBar />
      <GridItem colSpan="5">
        <Box display="flex" height="fit-content">
          <Box flex={1} maxW="50%">
            <BarChart socitiesData={socitiesData} />
          </Box>
          <Box textAlign="center">
            <PieChart socitiesData={socitiesData} />
          </Box>
        </Box>
        <Box maxW="50%">
          <LineChart setSocitiesData={setSocitiesData} />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
