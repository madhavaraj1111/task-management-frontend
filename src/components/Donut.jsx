import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import axios from "axios";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = () => {
  const [chartData, setChartData] = useState({ completed: 0, incomplete: 0 });

  useEffect(() => {
    axios
      .get(`https://task-management-backend-74my.onrender.com/tasks/`)
      .then((response) => {
        const completedData = response.data.filter(
          (data) => data.checked === true,
        );
        const incompleteData = response.data.filter(
          (data) => data.checked === false,
        );
        setChartData({
          completed: completedData.length,
          incomplete: incompleteData.length,
        });
      })
      .catch((err) => {
        console.log("Failed to fetch tasks", error);
      });
  }, []);

  const data = {
    labels: ["Completed", "Incomplete"],
    datasets: [
      {
        label: "Tasks",
        data: [chartData.completed, chartData.incomplete],
        backgroundColor: ["#10b981", "#f87171"],
        hoverBackgroundColor: ["#059669", "#dc2626"],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          color: "gray",
          font: {
            size: 16,
          },
        },
      },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw}`,
        },
      },
    },
  };

  return (
    <div className="flex justify-center">
      <div className="border-gray-1200 z-50 rounded-2xl border bg-white p-10 shadow-xl">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default DonutChart;
