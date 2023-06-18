import { Box, Button } from "@chakra-ui/react";
import { Bar } from "react-chartjs-2";

const BarChart = ({
  chartData,
  chartRef,
  handleClick,
  handleDrill,
  display,
}) => {
  return (
    <Box position="relative">
      <Button
        size="xs"
        position="absolute"
        right="2px"
        top="2px"
        onClick={handleDrill}
        display={display}
      >
        Drill down
      </Button>
      <Bar
        data={chartData}
        onClick={handleClick}
        ref={chartRef}
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
  );
};

export default BarChart;
