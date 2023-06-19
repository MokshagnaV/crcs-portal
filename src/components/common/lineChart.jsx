import { Box, Button } from "@chakra-ui/react";
import { Line } from "react-chartjs-2";
import { getElementAtEvent } from "react-chartjs-2";
import { useRef, useState } from "react";
import {
  getData,
  getDataOfYear,
  noOfRegPerYear,
} from "../../services/chartServices/dataService";

const LineChart = ({ setSocitiesData }) => {
  const [chartData] = useState(noOfRegPerYear());
  const [drill, setDrill] = useState("none");
  const ref = useRef();

  const handleClick = (e, data) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(ref.current, e);
      const label = parseInt(data.labels[index]);
      setSocitiesData(getDataOfYear(label));
      setDrill("true");
    }
  };

  const handleDrill = () => {
    setSocitiesData(getData());
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
        right="2px"
        top="2px"
        onClick={handleDrill}
        display={drill}
      >
        Drill down
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
              text: "Number of socities registered in each year",
            },
          },
        }}
      />
    </Box>
  );
};

export default LineChart;
