import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import TaskApi from "../services/TaskApi";


function TaskList() {
    const navigate = useNavigate();
    const [taskListData, setTaskListData] = useState([]);
    const [taskName, setTaskName] = useState('');
    const [error, setError] = useState(undefined);
    const [spinner, setSpinner] = useState(false);
    const [multipleRequest, setMultipleRequest] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    useEffect(() => {
        fetchTaskList();
    }, []);

    const fetchTaskList = async () => {
        try {
            const response = await TaskApi.taskApiList();
            setTaskListData(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const setUpdateTask = (task) => {
        setSelectedTask(task);
        setTaskName(task.taskName);
        setShowModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        setTaskName('');
        setSelectedTask(null);
    };

    const handleSaveChanges = async () => {
        if (!selectedTask) return;

        const updatedTask = {
            ...selectedTask,
            taskName,
        };

        setError(null);
        setSpinner(true);
        setMultipleRequest(true);

        try {
            const response = await TaskApi.taskApiUpdateById(selectedTask.taskId, updatedTask);
            if (response.status === 200) {
                setSpinner(false);
                setMultipleRequest(false);
                fetchTaskList();
                handleClose();
            }
        } catch (err) {
            console.error(err, "Task Güncellenemedi !!!");
            setError(err.response.data.validationErrors);
            setSpinner(false);
            setMultipleRequest(false);
        }
    };

    const setDeleteTask = async (taskId) => {
        if (window.confirm(`${taskId} id datayı silmek istiyor musunuz ?`)) {
            try {
                const response = await TaskApi.taskApiDeleteById(taskId);
                if (response.status === 200) {
                    await fetchTaskList();
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
    };

    const toggleTaskCompletion = async (taskId, completed) => {
        const task = taskListData.find(task => task.taskId === taskId);
        if (task) {
            const updatedTask = { ...task, completed: !completed };
            try {
                const response = await TaskApi.taskApiUpdateById(taskId, updatedTask);
                if (response.status === 200) {
                    setTaskListData(prevTaskListData =>
                        prevTaskListData.map(task =>
                            task.taskId === taskId ? { ...task, completed: !completed } : task
                        )
                    );
                }
            } catch (error) {
                console.error('Error updating task:', error);
            }
        }
    };

    const clear = () => {
        setTaskName('');
    };

    const taskNameOnChange = (event) => {
        const { value } = event.target;
        setTaskName(value);
    };

    const onSubmitForm = (event) => {
        event.preventDefault();
    };

    const TaskCreateSubmit = async () => {
        const taskObject = {
            taskName,
            completed: false,
            createdAt: new Date().toISOString()
        };

        setError(null);
        setSpinner(true);
        setMultipleRequest(true);

        try {
            const response = await TaskApi.taskApiCreate(taskObject);
            if (response.status === 201) {
                setSpinner(false);
                setMultipleRequest(false);
                alert("Kayıt Eklendi");
                clear();
                await fetchTaskList(); // Yeni görevleri almak için listeyi güncelle
                navigate("/list");
            }
        } catch (err) {
            console.error("Task Eklenmedi !!!");
            if (err.response) {
                setError(err.response.data.validationErrors);
            }
            setSpinner(false);
            setMultipleRequest(false);
        }
    };

    const spinnerData = () => {
        if (spinner) {
            return (
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            );
        }
        return "";
    };

    const inputInvalidErrorClass = error ? "form-control is-invalid" : "form-control";

    return (
        <div>
            <div className="container mt-5">
            <div className="card" style={{ border: '1px solid #dee2e6', borderRadius: '5px' }}>
                <div className="card-body">
                    <h1 className="text-center display-5 mb-5">TodoInput</h1>
                        <form onSubmit={onSubmitForm}>
                        <div className="form-group" style={{ padding: '8px', borderRadius: '5px', border: '1px solid #dee2e6' }}>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                        <i className="fa-solid fa-book" style={{ marginRight: '8px' }} />
                        <input
                            type="text"
                            className={inputInvalidErrorClass}
                            id="taskName"
                            name="taskName"
                            autoFocus={true}
                            placeholder="New Todo"
                            required={true}
                            onChange={taskNameOnChange}
                            value={taskName}
                            style={{  flex: 1, backgroundColor: 'transparent' }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex' }}>
                    <button type="reset" onClick={clear} className="btn btn-danger mt-2 shadow">Clean</button>
                    <button type="submit" onClick={TaskCreateSubmit} className="btn btn-primary mt-2 ms-2 shadow" style={{ backgroundColor: '#007bff' }} disabled={multipleRequest}>
                        {spinnerData()}
                        Add New Task
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

            


            <br /><br />
            <h1 className="text-center display-5 mb-5">TodoLıst</h1>
            <table className='table table-striped table-responsive mb-5'>
               
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
                                <i onClick={() => setUpdateTask(data)} className="fa-solid fa-pencil" style={{ color: "#FFD43B" }}></i> 
                            </td>
                            <td>
                                <i onClick={() => setDeleteTask(data.taskId)} className="fa-solid fa-trash text-danger"></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Task Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Task Update</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formTaskName">
                            <Form.Label>Task Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Task Name"
                                value={taskName}
                                onChange={taskNameOnChange}
                                isInvalid={!!error}
                            />
                            <Form.Control.Feedback type="invalid">
                                {error?.taskName}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges} disabled={multipleRequest}>
                        {spinner ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default TaskList;
