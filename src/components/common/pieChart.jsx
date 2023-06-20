import { Box, Button } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";
import { getElementAtEvent } from "react-chartjs-2";
import { useRef, useState, useEffect } from "react";
import {
  socitiesCountAccToSector,
  stateCountAccToSector,
} from "../../services/chartServices/dataService";

const PieChart = ({ socitiesData }) => {
  const [data, setData] = useState(socitiesData);

  const [ChartData, setChartData] = useState(socitiesCountAccToSector(data));
  const [drill, setDrill] = useState("none");

  const ref = useRef();

  const handleClick = (e, pieData) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(ref.current, e);
      const label = pieData.labels[index];
      if (stateCountAccToSector(label, data)) {
        const districtsData = stateCountAccToSector(label, data);
        setChartData(districtsData);
        setDrill("true");
      }
    }
  };

  const handleDrill = (e) => {
    setChartData(socitiesCountAccToSector(data));
    setDrill("none");
  };

  const getData = () => {
    const originalData = { ...ChartData };
    const type = originalData.type;
    delete originalData.type;
    const dataArray = Object.entries(originalData);
    const Data = Object.fromEntries(dataArray.sort(([, a], [, b]) => b - a));

    const res = {
      labels: Object.keys(Data),
      datasets: [
        {
          label: "No. of Socities of " + type,
          data: Object.values(Data),
          borderWidth: 1,
        },
      ],
      hoverOffset: 1,
    };
    return res;
  };

  useEffect(() => {
    setData(socitiesData);
    setChartData(socitiesCountAccToSector(socitiesData));
    setDrill("none");
  }, [socitiesData]);

  return (
    <Box pos="relative">
      <Button
        size="xs"
        position="absolute"
        right="2%"
        bottom="2%"
        onClick={handleDrill}
        display={drill}
      >
        Drill back
      </Button>
      <Pie
        data={getData()}
        onClick={(e) => handleClick(e, getData())}
        ref={ref}
        options={{
          onHover: (e, chartElement) => {
            if (chartElement[0]) e.native.target.style.cursor = "pointer";
            else e.native.target.style.cursor = "default";
          },
          plugins: {
            legend: {
              display: true,
              position: "left",
            },
            title: {
              display: true,
              text: "Number of socities registered in each sector",
            },
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
