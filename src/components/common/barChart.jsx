import { Bar } from "react-chartjs-2";

const BarChart = (props) => {
  return (
    <Bar
      data={props.chartData}
      onClick={props.handleClick}
      ref={props.chartRef}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Number of socities registered in each state",
          },
        },
      }}
    />
  );
};

export default BarChart;
