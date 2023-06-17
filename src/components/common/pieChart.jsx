import { Pie } from "react-chartjs-2";

const PieChart = (props) => {
  return (
    <Pie
      data={props.chartData}
      onClick={props.handleClick}
      ref={props.chartRef}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Number of socities registered in each sector",
          },
        },
      }}
    />
  );
};

export default PieChart;
