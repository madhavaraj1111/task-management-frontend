import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

// Load plugins
dayjs.extend(utc);
dayjs.extend(timezone);

const EditTask = () => {
  const [newData, setNewData] = useState({
    taskName: "",
    createdAt: "",
    finishingTime: "",
    checked: "",
  });
  const location = useLocation();
  const id = location?.state;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://task-management-backend-74my.onrender.com/tasks/${id}`)
      .then((response) => {
        setNewData(response.data);
      });
  }, []);

  const handleEdit = (data) => {
    try {
      axios.put(
        `https://task-management-backend-74my.onrender.com/tasks/${id}`,
        data,
      );
      navigate("/");
    } catch (error) {
      console.log("Error from frontend updation", error);
    }
  };

  return (
    <div className="flex justify-center px-4 py-10 max-sm:py-2 sm:px-6 lg:px-8">
      <div className="mx-auto mt-20 w-full max-w-md rounded-md bg-gray-700 p-6 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-semibold text-white">
          Edit Task
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
              value={newData?.taskName}
              onChange={(e) =>
                setNewData({ ...newData, taskName: e.target.value })
              }
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
              value={dayjs.utc(newData?.createdAt).format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewData({ ...newData, createdAt: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
              value={dayjs
                .utc(newData?.finishingTime)
                .format("YYYY-MM-DDTHH:mm")}
              onChange={(e) =>
                setNewData({ ...newData, finishingTime: e.target.value })
              }
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
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
              value={newData?.checked ? "Completed" : "Incomplete"}
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
                handleEdit(newData);
              }}
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
