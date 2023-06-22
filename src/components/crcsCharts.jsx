import { Box, Card, Flex, Heading } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { societiesActions } from "../store/societiesSlice";
import BarChart from "./common/barChart";
import PieChart from "./common/pieChart";
import LineChart from "./common/lineChart";
import { getData } from "../services/chartServices/dataService";
import { useEffect } from "react";

const CrcsCharts = (props) => {
  const { societies, year } = useSelector((state) => state.societies);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(societiesActions.setSocieties(getData()));
    dispatch(societiesActions.setYear(""));
  }, [dispatch]);
  return (
    <Box id="main">
      <Heading textAlign="center" margin="1rem">
        Total Number of Societies
        {year && <span> in the Year {year}</span>}: {societies.length}
      </Heading>
      <Flex justify="center" margin={{ md: "2rem" }}>
        <Box width={"85%"} borderRadius="xl">
          <Card padding={"1rem"}>
            <BarChart societiesData={societies} />
          </Card>
        </Box>
      </Flex>
      <Flex margin={{ md: "2rem" }} wrap="wrap">
        <Box flexGrow="1" margin="1rem" borderRadius="xl" alignItems="center">
          <Card padding={"1rem"}>
            <LineChart />
          </Card>
        </Box>
        <Box flexGrow="1" margin="1rem" borderRadius="xl">
          <Card padding={"1rem"}>
            <PieChart societiesData={societies} />
          </Card>
        </Box>
      </Flex>
    </Box>
  );
};

export default CrcsCharts;
