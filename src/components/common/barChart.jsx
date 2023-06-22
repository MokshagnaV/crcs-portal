import { Box, Button, Icon, Select } from "@chakra-ui/react";
import { Bar, getElementAtEvent } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import {
  societiesCountAccToStates,
  societiesCountAccToDistrict,
} from "../../services/chartServices/dataService";
import { ArrowUpIcon } from "@chakra-ui/icons";

const BarChart = ({ societiesData }) => {
  const [data, setData] = useState(societiesData);

  const [ChartData, setChartData] = useState(societiesCountAccToStates(data));
  const [drill, setDrill] = useState("none");
  const [order, setOrder] = useState(0);

  const ref = useRef();

  const handleClick = (e, barData) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(ref.current, e);
      const label = barData.labels[index];
      if (societiesCountAccToDistrict(label, data)) {
        const districtsData = societiesCountAccToDistrict(label, data);
        setChartData(districtsData);
        setDrill("true");
      }
    }
  };

  const handleChange = (e) => {
    setOrder(parseInt(e.currentTarget.value));
  };
  const handleDrill = () => {
    setChartData(societiesCountAccToStates(data));
    setDrill("none");
  };

  const getData = (sortOrder) => {
    const originalData = { ...ChartData };
    const type = originalData.type;
    delete originalData.type;
    const dataArray = Object.entries(originalData);
    let data;
    if (sortOrder !== 0) {
      data = Object.fromEntries(
        dataArray.sort(([, a], [, b]) => {
          return sortOrder === 1 ? a - b : b - a;
        })
      );
    } else {
      data = Object.fromEntries(dataArray);
    }
    const res = {
      labels: Object.keys(data),
      datasets: [
        {
          label: "No. of Societies in each " + type,
          data: Object.values(data),
          borderWidth: 1,
        },
      ],
    };
    return res;
  };

  useEffect(() => {
    setData(societiesData);
    setChartData(societiesCountAccToStates(societiesData));
    setDrill("none");
  }, [societiesData]);

  return (
    <Box position="relative">
      <Select
        onChange={handleChange}
        value={order}
        w="fit-content"
        position="absolute"
        left="2%"
        top="2%"
        variant="filled"
      >
        <option value="0">Select Order</option>
        <option value="1">Ascending Order</option>
        <option value="-1">Descending order</option>
      </Select>
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
      <Bar
        data={getData(order)}
        onClick={(e) => handleClick(e, getData(order))}
        ref={ref}
        options={{
          onHover: (e, chartElement) => {
            if (chartElement[0]) e.native.target.style.cursor = "pointer";
            else e.native.target.style.cursor = "default";
          },
          plugins: {
            title: {
              display: true,
              text: "Number of societies registered in each State/Districts",
            },
          },
        }}
      />
    </Box>
  );
};

export default BarChart;
