import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import Modal from "../components/Modal";

const TaskTable = () => {
  const [taskData, setTaskData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewID, setViewID] = useState();
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const fetchTasks = () => {
    setLoading(true);
    try {
      setInterval(() => {
        axios
          .get("https://task-management-backend-74my.onrender.com/tasks/")
          .then((response) => {
            setTaskData(response.data);
          });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.log("Error while getting data from the server", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggle = async (toggleId, checked) => {
    const updatedTaskData = taskData.map((task) => {
      return task._id === toggleId ? { ...task, checked: !checked } : task;
    });
    setTaskData(updatedTaskData);
    try {
      await axios.put(
        `https://task-management-backend-74my.onrender.com/tasks/${toggleId}`,
        {
          checked: !checked,
        },
      );
    } catch (error) {
      console.log("Error happened in the toggle function", error);
      const revertedTaskData = taskData.map((task) => {
        return task._id === toggleId ? { ...task, checked: checked } : task;
      });
      setTaskData(revertedTaskData);
    }
  };

  const handleView = (id) => {
    setViewID(id);
    setIsModalOpen(!isModalOpen);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://task-management-backend-74my.onrender.com/tasks/${id}`,
      );
    } catch (error) {
      console.log("Error when deleting the data", error);
    }
  };

  const handleEdit = (id) => {
    navigate("/edit-task", { state: id });
  };

  const viewData = taskData.find((task) => {
    return task._id == viewID;
  });

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleSearch = (searchData) => {
    setSearchValue(searchData);
  };

  return (
    <div className="mx-5 mt-16 h-screen">
      <div className="relative">
        {isModalOpen ? (
          <div className="absolute inset-0 z-50 flex items-center justify-center rounded-lg bg-black/50">
            <Modal
              taskName={viewData.taskName}
              createdAt={viewData.create}
              finishingTime={viewData.finishingTime}
              checked={viewData.checked}
              onClick={handleClose}
            />
          </div>
        ) : (
          ""
        )}{" "}
        <div className="relative overflow-x-auto bg-gray-500 p-5 shadow-md sm:rounded-lg">
          {" "}
          <button
            className="mb-2 flex items-center rounded border-b-4 border-blue-700 bg-blue-500 px-2 py-1 font-bold text-white hover:border-blue-500 hover:bg-blue-400"
            onClick={() => {
              navigate("/add-task");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              className="w-6"
            >
              <path fill="currentColor" d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
            </svg>{" "}
            Add Task
          </button>
          <div className="bg-slate-400 p-5 pb-4 dark:bg-gray-900">
            <label htmlFor="table-search" className="sr-only">
              Search
            </label>
            <div className="relative mt-1">
              <div className="rtl:inset-r-0 pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                <svg
                  className="h-4 w-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="table-search"
                className="block w-80 rounded-lg border border-gray-300 bg-gray-50 pb-2 ps-10 pt-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Search for items"
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <table className="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
            <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="p-4 text-center">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="dark:ring-offset-green-800-800 h-4 w-4 rounded border-green-300 bg-green-100 text-green-200 focus:ring-2 focus:ring-green-300 dark:border-green-600 dark:bg-green-700 dark:focus:ring-green-300 dark:focus:ring-offset-green-800"
                    />
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  TaskName
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Task Created at
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Expected finishing time
                </th>
                <th className="px-6 py-3 text-center">Task status</th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr className="bg-red-400">
                  <td
                    colSpan={6}
                    className="border-b bg-white p-10 transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900"
                  >
                    <div role="status" className="">
                      <svg
                        aria-hidden="true"
                        className="mx-auto h-8 w-8 animate-spin fill-sky-600 text-gray-200 dark:text-zinc-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                      <span className="sr-only">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : (
                taskData.map((data) => {
                  return (
                    <tr
                      className="border-b bg-white transition-all hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900"
                      key={data._id}
                    >
                      <td className="w-4 p-4 text-center">
                        <div className="flex items-center">
                          <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            checked={data.checked}
                            onChange={() => {
                              handleToggle(data._id, data.checked);
                            }}
                            className={`h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800`}
                          />
                          <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <th
                        scope="row"
                        className="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                      >
                        {data.taskName}
                      </th>
                      <td className="px-6 py-4 text-center">
                        {dayjs(data.createdAt).format("DD-MM-YYYY,HH:mm")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {dayjs(data.finishingTime).format("DD-MM-YYYY,HH:mm")}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <label className="me-5 inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            value={data.checked}
                            className="peer sr-only"
                            checked={data.checked}
                            onChange={() => {
                              handleToggle(data._id, data.checked);
                            }}
                          />
                          <div className="peer relative h-6 w-11 rounded-full bg-red-500 after:absolute after:start-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:ring-2 peer-focus:ring-gray-300 rtl:peer-checked:after:-translate-x-full"></div>
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {data.checked ? "Completed" : "Incomplete"}
                          </span>
                        </label>
                      </td>
                      <td className="mx-10 grid py-3 text-center lg:grid-cols-3">
                        <button
                          className="flex w-fit justify-center rounded border border-blue-400 bg-slate-800 px-2 py-1 font-semibold text-blue-400 transition-all hover:border hover:border-transparent hover:bg-blue-500 hover:text-white"
                          onClick={() => {
                            handleView(data._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M6 23H3q-.825 0-1.412-.587T1 21v-3h2v3h3zm12 0v-2h3v-3h2v3q0 .825-.587 1.413T21 23zm-6-4.5q-3 0-5.437-1.775T3 12q1.125-2.95 3.563-4.725T12 5.5t5.438 1.775T21 12q-1.125 2.95-3.562 4.725T12 18.5m0-2q2.2 0 4.025-1.2t2.8-3.3q-.975-2.1-2.8-3.3T12 7.5T7.975 8.7t-2.8 3.3q.975 2.1 2.8 3.3T12 16.5m0-1q1.45 0 2.475-1.025T15.5 12t-1.025-2.475T12 8.5T9.525 9.525T8.5 12t1.025 2.475T12 15.5m0-2q-.625 0-1.063-.437T10.5 12t.438-1.062T12 10.5t1.063.438T13.5 12t-.437 1.063T12 13.5M1 6V3q0-.825.588-1.412T3 1h3v2H3v3zm20 0V3h-3V1h3q.825 0 1.413.588T23 3v3zm-9 6"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-fit rounded border border-green-500 bg-slate-800 px-2 py-1 font-semibold text-green-500 transition-all hover:border hover:border-transparent hover:bg-green-500 hover:text-white"
                          onClick={() => {
                            handleEdit(data._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h8.925l-2 2H5v14h14v-6.95l2-2V19q0 .825-.587 1.413T19 21zm4-6v-4.25l9.175-9.175q.3-.3.675-.45t.75-.15q.4 0 .763.15t.662.45L22.425 3q.275.3.425.663T23 4.4t-.137.738t-.438.662L13.25 15zM21.025 4.4l-1.4-1.4zM11 13h1.4l5.8-5.8l-.7-.7l-.725-.7L11 11.575zm6.5-6.5l-.725-.7zl.7.7z"
                            />
                          </svg>
                        </button>
                        <button
                          className="w-fit rounded border border-red-400 bg-slate-800 px-2 py-1 font-semibold text-red-400 transition-all hover:border hover:border-transparent hover:bg-red-500 hover:text-white"
                          onClick={() => {
                            handleDelete(data._id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTable;
