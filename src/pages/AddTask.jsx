import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
const AddTask = () => {
  const navigate = useNavigate();
  const [newData, setNewData] = useState({
    taskName: "",
    createdAt: "",
    finishingTime: "",
    checked: "",
  });

  const handleAdd = async () => {
    try {
      await axios.post(
        "https://task-management-backend-74my.onrender.com/tasks",
        newData,
      );
      console.log("Task Added successfully");
      navigate("/");
    } catch (error) {
      console.log("Problem when adding the task", error);
    }
  };

  return (
    <div className="flex justify-center px-4 py-10 max-sm:py-2 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 w-full max-w-md rounded-md bg-gray-700 p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Add New Task
        </h2>
        <form className="space-y-8 max-sm:space-y-4">
          {/* Task Name */}
          <div className="mb-4">
            <label
              htmlFor="taskName"
              className="block text-sm font-medium text-white"
            >
              Task Name
            </label>
            <input
              type="text"
              id="taskName"
              name="taskName"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              placeholder="Enter task name"
              onChange={(e) =>
                setNewData({ ...newData, taskName: e.target.value })
              }
              autoComplete="off"
              required
            />
          </div>

          {/* Task Created At */}
          <div className="mb-4">
            <label
              htmlFor="taskCreatedAt"
              className="block text-sm font-medium text-white"
            >
              Task Created At
            </label>
            <input
              type="datetime-local"
              id="taskCreatedAt"
              name="taskCreatedAt"
              onChange={(e) =>
                setNewData({ ...newData, createdAt: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Expected Finishing Time */}
          <div className="mb-4">
            <label
              htmlFor="expectedFinishTime"
              className="block text-sm font-medium text-white"
            >
              Expected Finishing Time
            </label>
            <input
              type="datetime-local"
              id="expectedFinishTime"
              name="expectedFinishTime"
              onChange={(e) =>
                setNewData({ ...newData, finishingTime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>

          {/* Task Status */}
          <div className="mb-4">
            <label
              htmlFor="taskStatus"
              className="block text-sm font-medium text-white"
            >
              Task Status
            </label>
            <select
              id="taskStatus"
              name="taskStatus"
              onChange={(e) =>
                setNewData({
                  ...newData,
                  checked: e.target.value === "Completed",
                })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
            >
              <option value="--" className="text-center">
                --Select--
              </option>
              <option value="Incomplete">Incomplete</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full rounded-md bg-blue-500 px-4 py-2 text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              onClick={(e) => {
                e.preventDefault();
                handleAdd();
              }}
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
