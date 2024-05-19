import React from 'react'
import { Route, Routes } from 'react-router-dom'

import MainComponent from './components/MainComponent';

import TaskList from "./components/TaskList";
import TaskCreate from "./components/TaskCreate";
import TaskUpdate from "./components/TaskUpdate";

import { Navigate } from 'react-router-dom';

function TodoRouter() {
  return (

    <React.Fragment>
        <div className="container">
            <Routes>

            <Route path={"/"} element={<MainComponent />} />
            <Route path={"/index"} element={<MainComponent />} />
                {/* Blog Categories */}
                        <Route path={"/list"} element={<TaskList/>} />
                        <Route path={"/create"} element={<TaskCreate/>} />
                        <Route path={"/update/:id"} element={<TaskUpdate/>} />

                        <Route path={"*"} element={<Navigate to={"/"} />} />

            </Routes>

        </div>
    </React.Fragment>
    //<div>TodoRouter</div>
  )
}

export default TodoRouter;




