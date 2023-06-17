import { Line } from "react-chartjs-2";

const LineChart = (props) => {
  return (
    <Line
      data={props.chartData}
      onClick={props.handleClick}
      ref={props.chartRef}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Number of socities registered in each year",
          },
        },
      }}
    />
  );
};

export default LineChart;
