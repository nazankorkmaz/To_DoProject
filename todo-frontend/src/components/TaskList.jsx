import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import TaskApi from "../services/TaskApi";

function TaskList({ props }) {
    let navigate = useNavigate();
    const [taskListData, setTaskListData] = useState([]);

    /*
    useEffect(() => {
        fetchTaskList();
    }, []);
*/
useEffect(() => {
    const fetchTasks = async () => {
        try {
            const response = await TaskApi.taskApiList();
            setTaskListData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    fetchTasks();
}, []);


    const fetchTaskList = async () => {
        try {
            const response = await TaskApi.taskApiList();
            setTaskListData(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const listManipulationAfter = async () => {
        try {
            const response = await TaskApi.taskApiList();
            console.log('Updated task list:', response.data);
            if (response.status === 200) {
                setTaskListData(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    };
    
    

    const setUpdateTask = (data) => {
        let { taskId, taskName ,completed} = data;
        localStorage.setItem("taskId", taskId);
        localStorage.setItem("Task", taskName);
        localStorage.setItem("completed",completed);

    }

    const setDeleteTask = async (taskId) => {
        if (window.confirm(`${taskId} id datayı silmek istiyor musunuz ?`)) {
            try {
                const response = await TaskApi.taskApiDeleteById(taskId);
                if (response.status === 200) {
                    listManipulationAfter();
                    navigate('/list');
                }
            } catch (error) {
                console.error(error);
                navigate('/list');
            }
        } else {
            alert(`${taskId} nolu data silinmedi !!!`);
            window.location = "/list";
        }
    }
/*
    const toggleTaskCompletion = async (taskId, completed) => {
        console.log('toggleTaskCompletion called with:', taskId, completed);
        const task = taskListData.find(task => task.taskId === taskId);
        if (task) {
            const updatedTask = { ...task, completed: !task.completed };
            try {
                console.log('Attempting to update task:', updatedTask);
                const response = await TaskApi.taskApiUpdateById(taskId, updatedTask);
                console.log('API response:', response);
                if (response.status === 200) {
                    setTaskListData(prevTaskListData =>
                        prevTaskListData.map(task =>
                            task.taskId === taskId ? { ...task, completed: !task.completed } : task
                        )
                    );
                    listManipulationAfter();  // Listeyi yeniden çek ve güncelle
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    }; */
    
    const toggleTaskCompletion = async (taskId, completed) => {
        console.log('toggleTaskCompletion called with:', taskId, completed);
        const task = taskListData.find(task => task.taskId === taskId);
        if (task) {
            const updatedTask = { ...task, completed: !completed };
            try {
                console.log('Attempting to update task:', updatedTask);
                const response = await TaskApi.taskApiUpdateById(taskId, updatedTask);
                console.log('API response:', response);
                if (response.status === 200) {
                    setTaskListData(prevTaskListData =>
                        prevTaskListData.map(task =>
                            task.taskId === taskId ? { ...task, completed: !completed } : task
                        )
                    );
                    console.log('Updated task list:', taskListData);
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    /*
    return (
        <React.Fragment>
            <br /><br /><br /><br />
            <h1 className="text-center display-5 mb-5">Task List</h1>
            <Link className='btn btn-primary me-2' to="/create">Create</Link>
            <table className='table table-striped table-responsive mb-5'>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Date</th>
                        <th>Completed</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        taskListData.map((data) =>
                            <tr key={data.taskId}>
                                <td>{data.taskId}</td>
                                <td style={{ textDecoration: data.isCompleted ? 'line-through' : 'none' }}>
                                    {data.taskName}
                                </td>
                                
                                <td>{data.systemCreatedDate}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={data.isCompleted}
                                        onChange={() => toggleTaskCompletion(data.taskId, data.isCompleted)}
                                    />
                                </td>
                                <td>
                                    <Link to={`/update/${data.taskId}`}>
                                        <i onClick={() => setUpdateTask(data)} className="fa-solid fa-pen-nib text-primary"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link>
                                        <i onClick={() => setDeleteTask(data.taskId)} className="fa-solid fa-trash text-danger"></i>
                                    </Link>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </React.Fragment>
    ); */

    return (
        <div>
            <h1>Task List</h1>
            
            <br /><br /><br /><br />
            <h1 className="text-center display-5 mb-5">Task List</h1>
            <Link className='btn btn-primary me-2' to="/create">Create</Link>
            <table className='table table-striped table-responsive mb-5'>
                <thead>
                    <tr>
                        <th>Task ID</th>
                        <th>Task</th>
                        <th>Date</th>
                        <th>Completed</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {taskListData.map(data => (
                        <tr key={data.taskId}>
                            <td>{data.taskId}</td>
                            <td style={{ textDecoration: data.completed ? 'line-through' : 'none' }}>
                                {data.taskName}
                            </td>
                            <td>{data.systemCreatedDate}</td>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={data.completed}
                                    onChange={() => toggleTaskCompletion(data.taskId, data.completed)}
                                />
                            </td>
                            <td>
                                <Link to={`/update/${data.taskId}`}>
                                    <i onClick={() => setUpdateTask(data)} className="fa-solid fa-pen-nib text-primary"></i>
                                </Link>
                            </td>
                            <td>
                                <Link>
                                    <i onClick={() => setDeleteTask(data.taskId)} className="fa-solid fa-trash text-danger"></i>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}

export default TaskList;
