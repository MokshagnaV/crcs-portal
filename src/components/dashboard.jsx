import { Box, Grid, GridItem, Select } from "@chakra-ui/react";
import SideBar from "./sideBar";
import {
  socitiesCountAccToStates,
  socitiesCountAccToDistrict,
  socitiesCountAccToSector,
  stateCountAccToSector,
  noOfRegPerYear,
} from "../services/chartServices/dataService";
import BarChart from "./common/barChart";
import { getElementAtEvent } from "react-chartjs-2";
import { useRef, useState } from "react";
import PieChart from "./common/pieChart";
import LineChart from "./common/lineChart";

const Dashboard = (props) => {
  const [barChartData, setBarChartData] = useState(socitiesCountAccToStates());
  const [barDrill, setBarDrill] = useState("none");

  const [pieChartData, setPieChartData] = useState(socitiesCountAccToSector());
  const [pieDrill, setPieDrill] = useState("none");

  const [lineChartData] = useState(noOfRegPerYear());
  const [order, setOrder] = useState(0);

  const barRef = useRef();
  const pieRef = useRef();
  const lineRef = useRef();

  stateCountAccToSector("Agro");

  const handleBarClick = (e, data) => {
    if (getElementAtEvent(barRef.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(barRef.current, e);
      const label = data.labels[index];
      if (socitiesCountAccToDistrict(label)) {
        const districtsData = socitiesCountAccToDistrict(label);
        setBarChartData(districtsData);
        setBarDrill("true");
      }
    }
  };
  const handlePieClick = (e, data) => {
    if (getElementAtEvent(pieRef.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(pieRef.current, e);
      const label = data.labels[index];
      if (stateCountAccToSector(label)) {
        const districtsData = stateCountAccToSector(label);
        setPieChartData(districtsData);
        setPieDrill("true");
      }
    }
  };
  const handleLineClick = (e, data) => {
    if (getElementAtEvent(lineRef.current, e).length > 0) {
      const [{ index }] = getElementAtEvent(lineRef.current, e);
      const label = data.labels[index];
      console.log(label);
    }
  };

  const handleChange = (e) => {
    setOrder(parseInt(e.currentTarget.value));
  };
  const handleBarDrill = () => {
    setBarChartData(socitiesCountAccToStates());
    setBarDrill("none");
  };

  const handlePieDrill = (e) => {
    setPieChartData(socitiesCountAccToSector());
    setPieDrill("none");
  };

  const getBarData = (sortOrder) => {
    const originalBarData = { ...barChartData };
    const type = originalBarData.type;
    delete originalBarData.type;
    const dataArray = Object.entries(originalBarData);
    let barData;
    if (sortOrder !== 0) {
      barData = Object.fromEntries(
        dataArray.sort(([, a], [, b]) => {
          return sortOrder === 1 ? a - b : b - a;
        })
      );
    } else {
      barData = Object.fromEntries(dataArray);
    }
    const res = {
      labels: Object.keys(barData),
      datasets: [
        {
          label: "No. of Socities in each " + type,
          data: Object.values(barData),
          borderWidth: 1,
        },
      ],
    };
    return res;
  };

  const getPieData = () => {
    const originalPieData = { ...pieChartData };
    const type = originalPieData.type;
    delete originalPieData.type;
    const dataArray = Object.entries(originalPieData);
    const pieData = Object.fromEntries(dataArray.sort(([, a], [, b]) => b - a));

    const res = {
      labels: Object.keys(pieData),
      datasets: [
        {
          label: "No. of Socities in " + type,
          data: Object.values(pieData),
          borderWidth: 1,
        },
      ],
      hoverOffset: 1,
    };
    return res;
  };

  const getLineData = () => {
    const res = {
      labels: Object.keys(lineChartData),
      datasets: [
        {
          label: "No. Registrations per year",
          data: Object.values(lineChartData),
          borderWidth: 1,
        },
      ],
      hoverOffset: 1,
    };
    return res;
  };

  return (
    <Grid gridTemplateColumns={"repeat(6, 1fr)"}>
      <SideBar />
      <GridItem colSpan="5">
        <Box display="flex" height="fit-content">
          <Box flex={1} maxW="50%">
            <Select onChange={handleChange} value={order} w="300px">
              <option value={0}>Select Options</option>
              <option value="1">Ascending Order</option>
              <option value="-1">Descending order</option>
            </Select>
            <BarChart
              chartData={getBarData(order)}
              handleClick={(e) => handleBarClick(e, getBarData(order))}
              chartRef={barRef}
              handleDrill={handleBarDrill}
              display={barDrill}
            />
          </Box>
          <Box textAlign="center">
            <PieChart
              chartData={getPieData()}
              handleClick={(e) => handlePieClick(e, getPieData())}
              chartRef={pieRef}
              handleDrill={handlePieDrill}
              display={pieDrill}
            />
          </Box>
        </Box>
        <Box maxW="50%">
          <LineChart
            chartData={getLineData()}
            handleClick={(e) => handleLineClick(e, getLineData())}
            chartRef={lineRef}
          />
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Dashboard;
