import { useRef, useState, useEffect } from "react";
import { Box, Button, Icon } from "@chakra-ui/react";
import { Pie, getElementAtEvent } from "react-chartjs-2";
import {
  societiesCountAccToSector,
  stateCountAccToSector,
} from "../../services/chartServices/dataService";
import { ArrowUpIcon } from "@chakra-ui/icons";

const PieChart = ({ societiesData }) => {
  const [data, setData] = useState(societiesData);

  const [ChartData, setChartData] = useState(societiesCountAccToSector(data));
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
    setChartData(societiesCountAccToSector(data));
    setDrill("none");
  };

  function getColors(length) {
    let pallet = [
      "#4299e1",
      "#F56565",
      "#ED8936",
      "#FEEBC8",
      "#4FD1C5",
      "#805AD5",
      "#A0AEC0",
      "#4299e1",
      "#D53F8C",
      "#F6E05E",
      "#E53E3E",
      "#2b6cb0",
      "#B83280",
      "#276749",
      "#AAAAAA",
    ];
    let colors = [];

    for (let i = 0; i < length; i++) {
      colors.push(pallet[i % (pallet.length - 1)]);
    }

    return colors;
  }

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
          label: "No. of Societies of " + type,
          data: Object.values(Data),
          borderWidth: 1,
          backgroundColor: getColors(Object.keys(Data).length),
        },
      ],
      hoverOffset: 1,
    };
    return res;
  };

  useEffect(() => {
    setData(societiesData);
    setChartData(societiesCountAccToSector(societiesData));
    setDrill("none");
  }, [societiesData]);

  return (
    <Box pos="relative">
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
              text: "Number of societies registered in each sector",
            },
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
