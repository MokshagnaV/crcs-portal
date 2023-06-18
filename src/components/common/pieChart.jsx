import { Box, Button } from "@chakra-ui/react";
import { Pie } from "react-chartjs-2";

const PieChart = ({
  handleClick,
  handleDrill,
  display,
  chartData,
  chartRef,
}) => {
  return (
    <Box pos="relative">
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
      <Pie
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
              text: "Number of socities registered in each sector",
            },
          },
        }}
      />
    </Box>
  );
};

export default PieChart;
