import { Box, Card, Flex, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { socitiesActions } from "../store/socitiesSlice";
import BarChart from "./common/barChart";
import PieChart from "./common/pieChart";
import LineChart from "./common/lineChart";
import { getData } from "../services/chartServices/dataService";
import { useEffect } from "react";

const CrcsCharts = (props) => {
  const { socities, year } = useSelector((state) => state.socities);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(socitiesActions.setSocities(getData()));
    dispatch(socitiesActions.setYear(""));
  }, [dispatch]);
  return (
    <Box>
      <Heading>
        Total Number of Socities
        {year && <span> in the Year {year}</span>}: {socities.length}
      </Heading>
      <Flex justify="center" margin="2rem">
        <Box width={"85%"} borderRadius="xl">
          <Card padding={"1rem"}>
            <BarChart socitiesData={socities} />
          </Card>
        </Box>
      </Flex>
      <Flex margin="2rem" wrap="wrap">
        <Box flexGrow="1" margin="1rem" borderRadius="xl" alignItems="center">
          <Card padding={"1rem"}>
            <LineChart />
          </Card>
        </Box>
        <Box flexGrow="1" margin="1rem" borderRadius="xl">
          <Card padding={"1rem"}>
            <PieChart socitiesData={socities} />
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default CrcsCharts;
