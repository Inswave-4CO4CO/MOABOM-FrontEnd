import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChartComponent = () => {
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
    datasets: [
      {
        label: "수치",
        data: [20, 30, 15, 10, 25],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 206, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <h2>Pie Chart</h2>
      <Pie data={data} />
    </div>
  );
};

export default PieChartComponent;
