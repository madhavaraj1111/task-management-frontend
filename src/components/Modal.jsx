import React from "react";
import dayjs from "dayjs";

const Modal = ({ taskName, createdAt, finishingTime, checked, onClick }) => {
  return (
    <div
      className={`absolute z-50 max-w-md rounded-lg border-2 border-gray-200 bg-white px-20 py-8 text-xs shadow-inner shadow-gray-500 transition-all duration-300`}
    >
      <h2 className="mb-4 text-2xl font-bold text-gray-800">Task Details</h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700">Task Name:</h3>
          <p className="text-sm text-gray-600">{taskName}</p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            Task Created At:
          </h3>
          <p className="text-sm text-gray-600">
            {dayjs(createdAt).format("DD-MM-YYYY,HH:MM")}
          </p>
        </div>
        <div>
          <h3 className="text-lg font-medium text-gray-700">
            Expected Finishing Time:
          </h3>
          <p className="text-sm text-gray-600">
            {dayjs(finishingTime).format("DD-MM-YYYY,HH:MM")}
          </p>
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-medium text-gray-700">Task Status:</h3>
          {checked ? (
            <span className="inline-flex items-center rounded-full bg-green-200 px-3 py-1 text-sm font-medium text-green-800">
              Completed
            </span>
          ) : (
            <span className="inline-flex items-center rounded-full bg-red-200 px-3 py-1 text-sm font-medium text-red-800">
              Incomplete
            </span>
          )}
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="rounded border border-transparent bg-blue-500 px-4 py-2 text-white hover:border hover:border-blue-500 hover:bg-white hover:text-blue-500 focus:outline-none focus:ring"
          onClick={onClick}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
