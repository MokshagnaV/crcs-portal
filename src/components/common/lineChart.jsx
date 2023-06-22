import { Box, Button, Icon } from "@chakra-ui/react";
import { Line, getElementAtEvent } from "react-chartjs-2";
import { useRef, useState } from "react";
import {
  getData,
  getDataOfYear,
  noOfRegPerYear,
} from "../../services/chartServices/dataService";
import { useDispatch } from "react-redux";
import { societiesActions } from "../../store/societiesSlice";
import { ArrowUpIcon } from "@chakra-ui/icons";

const LineChart = (props) => {
  const [chartData] = useState(noOfRegPerYear());
  const [drill, setDrill] = useState("none");
  const ref = useRef();

  const dispatch = useDispatch();

  // const { societies, year } = useSelector((state) => state.societies);

  const handleClick = (e, data) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(ref.current, e);
      const label = parseInt(data.labels[index]);
      console.log(getDataOfYear(label));
      dispatch(societiesActions.setSocieties(getDataOfYear(label)));
      // setSocietiesData(getDataOfYear(label));
      dispatch(societiesActions.setYear(data.labels[index]));
      // setYear(data.labels[index]);
      setDrill("true");
    }
  };

  const handleDrill = () => {
    dispatch(societiesActions.setSocieties(getData()));
    // setSocietiesData(getData());
    dispatch(societiesActions.setYear(""));
    // setYear("");
    setDrill("none");
  };

  const getLineData = () => {
    const res = {
      labels: Object.keys(chartData),
      datasets: [
        {
          label: "No. Registrations per year",
          data: Object.values(chartData),
          borderWidth: 1,
        },
      ],
      hoverOffset: 1,
    };
    return res;
  };

  return (
    <Box position="relative">
      <Button
        size="xs"
        position="absolute"
        right="2%"
        top="2%"
        onClick={handleDrill}
        display={drill}
        variant="outline"
        colorScheme="blue"
      >
        <Icon as={ArrowUpIcon} boxSize={6}></Icon>
      </Button>
      <Line
        data={getLineData()}
        onClick={(e) => handleClick(e, getLineData())}
        ref={ref}
        options={{
          onHover: (e, chartElement) => {
            if (chartElement[0]) e.native.target.style.cursor = "pointer";
            else e.native.target.style.cursor = "default";
          },
          plugins: {
            title: {
              display: true,
              text: "Number of societies registered in each year",
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
