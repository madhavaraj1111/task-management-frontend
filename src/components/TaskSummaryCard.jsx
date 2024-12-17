import React from "react";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

const TaskSummaryCard = ({ completedTasks, incompleteTasks }) => {
  return (
    <div className="relative w-full max-w-sm overflow-hidden rounded-lg bg-white p-6 shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white opacity-50"></div>

      <h3 className="relative z-10 mb-4 text-lg font-semibold text-gray-700">
        Task Summary
      </h3>
      <div className="relative z-10 mb-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaCheckCircle className="text-2xl text-[#10b981]" />
          <div className="text-sm font-medium text-gray-500">
            Completed Tasks
          </div>
        </div>
        <div className="text-xl font-bold text-[#10b981]">{completedTasks}</div>
      </div>
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <FaExclamationCircle className="text-2xl text-[#f87171]" />
          <div className="text-sm font-medium text-gray-500">
            Incomplete Tasks
          </div>
        </div>
        <div className="text-xl font-bold text-[#f87171]">
          {incompleteTasks}
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryCard;
