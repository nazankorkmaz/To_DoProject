import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom';
import TaskList from "./components/TaskList";

function TodoRouter() {
  return (
    <React.Fragment>
        <div className="container">
            <Routes>
            <Route path={"/"} element={<TaskList/>} />
            <Route path={"/index"} element={<TaskList/>} />
                {/* List */}
                        <Route path={"/list"} element={<TaskList/>} />
                        <Route path={"*"} element={<Navigate to={"/"} />} />
            </Routes>
        </div>
    </React.Fragment>
    //<div>TodoRouter</div>
  )
}
export default TodoRouter;




