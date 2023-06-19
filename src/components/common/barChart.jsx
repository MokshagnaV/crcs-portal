import { Box, Button, Select } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";
import { getElementAtEvent } from "react-chartjs-2";
import { useEffect, useRef, useState } from "react";
import {
  socitiesCountAccToStates,
  socitiesCountAccToDistrict,
} from "../../services/chartServices/dataService";

const BarChart = ({ socitiesData }) => {
  const [data, setData] = useState(socitiesData);

  const [ChartData, setChartData] = useState(socitiesCountAccToStates(data));
  const [drill, setDrill] = useState("none");
  const [order, setOrder] = useState(0);

  const ref = useRef();

  const handleClick = (e, data) => {
    if (getElementAtEvent(ref.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(ref.current, e);
      const label = data.labels[index];
      if (socitiesCountAccToDistrict(label)) {
        const districtsData = socitiesCountAccToDistrict(label);
        setChartData(districtsData);
        setDrill("true");
      }
    }
  };

  const handleChange = (e) => {
    setOrder(parseInt(e.currentTarget.value));
  };
  const handleDrill = () => {
    setChartData(socitiesCountAccToStates(data));
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
          label: "No. of Socities in each " + type,
          data: Object.values(data),
          borderWidth: 1,
        },
      ],
    };
    return res;
  };

  useEffect(() => {
    setData(socitiesData);
    setChartData(socitiesCountAccToStates(socitiesData));
    setDrill("none");
  }, [socitiesData]);

  return (
    <Box>
      <Select onChange={handleChange} value={order} w="300px">
        <option value={0}>Select Options</option>
        <option value="1">Ascending Order</option>
        <option value="-1">Descending order</option>
      </Select>
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
                text: "Number of socities registered in each State/Districts",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default BarChart;
