import { Box, Heading } from "@chakra-ui/react";
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
      <Box>
        <BarChart socitiesData={socities} />
      </Box>
      <Box display="flex" flexWrap="wrap">
        <Box minW={{ md: "60%" }}>
          <LineChart />
        </Box>
        <Box minW={{ md: "40%" }}>
          <PieChart socitiesData={socities} />
        </Box>
      </Box>
    </Box>
  );
};

export default CrcsCharts;
