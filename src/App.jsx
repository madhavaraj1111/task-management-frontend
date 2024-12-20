import React from "react";
import TaskTable from "./pages/TaskTable";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddTask from "./pages/AddTask";
import Layout from "./components/layout/Layout";
import EditTask from "./pages/EditTask";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <div className="font-Nunito">
      <BrowserRouter basename="/task-management-frontend">
        <Routes>
          <Route path="/" element={<Layout />}>
            {" "}
            <Route index element={<TaskTable />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="add-task" element={<AddTask />} />
            <Route path="edit-task" element={<EditTask />} />
          </Route>
        </Routes>
      </BrowserRouter>{" "}
    </div>
  );
};

export default App;
