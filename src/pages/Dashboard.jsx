import React, { useEffect, useState } from "react";
import DonutChart from "../components/Donut";
import TaskSummaryCard from "../components/TaskSummaryCard";
import axios from "axios";

const Dashboard = () => {
  const [chartShow, setChartShow] = useState(false);
  const [cardData, setCardData] = useState({});
  const [dueToday, setDueToday] = useState(0);
  useEffect(() => {
    axios
      .get("https://task-management-backend-74my.onrender.com/tasks")
      .then((response) => {
        const completedData = response.data.filter(
          (data) => data.checked === true,
        );
        const incompleteData = response.data.filter(
          (data) => data.checked === false,
        );

        const dueToday = response.data.filter(
          (due) => due.finishingTime >= Date.now(),
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
        <div className="p-10 md:p-16 lg:px-10 lg:py-5">
          {" "}
          <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl bg-white p-10 shadow-lg md:flex-row">
            <div className="rounded bg-green-100 p-4 text-center shadow">
              <h3 className="font-bold text-green-700">Tasks Due Today</h3>
              <p className="text-lg font-semibold">{cardData.dueToday || 0}</p>
            </div>
            <div className="rounded bg-red-100 p-4 text-center shadow">
              <h3 className="font-bold text-red-700">Overdue Tasks</h3>
              <p className="text-lg font-semibold">{cardData.overdue || 0}</p>
            </div>
            <div className="rounded bg-yellow-100 p-4 text-center shadow">
              <h3 className="font-bold text-yellow-700">High Priority</h3>
              <p className="text-lg font-semibold">
                {cardData.highPriority || 0}
              </p>
            </div>
          </div>
          <div className="mb-8 flex justify-center">
            <TaskSummaryCard
              completedTasks={cardData.completed}
              incompleteTasks={cardData.incomplete}
            />
          </div>
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <DonutChart />
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Dashboard;
