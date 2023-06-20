import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useState } from "react";
import { getData } from "../services/chartServices/dataService";
import SideBar from "./sideBar";
import BarChart from "./common/barChart";
import PieChart from "./common/pieChart";
import LineChart from "./common/lineChart";

const Dashboard = (props) => {
  const [socitiesData, setSocitiesData] = useState(getData());
  const [year, setYear] = useState("");

  return (
    <Grid templateColumns={"repeat(6, 1fr)"}>
      <SideBar />
      <GridItem colSpan="5">
        <Heading>
          Total Number of Socities
          {year && <span> in the Year {year}</span>}: {socitiesData.length}
        </Heading>
        <Box>
          <BarChart socitiesData={socitiesData} />
        </Box>
        <Box display="flex" flexWrap="wrap">
          <Box width="60%">
            <LineChart setSocitiesData={setSocitiesData} setYear={setYear} />
          </Box>
          <Box width="40%">
            <PieChart socitiesData={socitiesData} />
          </Box>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
