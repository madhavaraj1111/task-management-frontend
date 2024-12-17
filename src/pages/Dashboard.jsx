import React, { useEffect, useState } from "react";
import DonutChart from "../components/Donut";
import TaskSummaryCard from "../components/TaskSummaryCard";
import axios from "axios";

const Dashboard = () => {
  const [chartShow, setChartShow] = useState(false);
  const [cardData, setCardData] = useState({});

  useEffect(() => {
    axios.get("https://task-management-backend-74my.onrender.com/tasks").then((response) => {
      const completedData = response.data.filter(
        (data) => data.checked === true,
      );
      const incompleteData = response.data.filter(
        (data) => data.checked === false,
      );
      setCardData({
        completed: completedData.length,
        incomplete: incompleteData.length,
      });
    });
    const timer = setTimeout(() => {
      setChartShow(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div>
      {" "}
      {!chartShow ? (
        <div className="flex h-screen items-center justify-center bg-gray-100 text-center">
          <div className="flex flex-col items-center">
            {/* Loading Text */}
            <div className="mb-4 animate-pulse text-xl font-semibold text-gray-700">
              Loading...
            </div>
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-4 border-blue-500 border-b-gray-500 border-l-transparent border-r-transparent"></div>
          </div>
        </div>
      ) : (
        ""
      )}
      {chartShow ? (
        <div className="bg-slate-200 p-10">
          <div>
            <TaskSummaryCard
              completedTasks={cardData.completed}
              incompleteTasks={cardData.incomplete}
            />
          </div>
          <div>
            <DonutChart />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
