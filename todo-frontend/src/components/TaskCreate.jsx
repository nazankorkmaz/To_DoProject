import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TaskApi from '../services/TaskApi';

// Function TaskCreate
function TaskCreate({ props }) {

  // REDIRECT
  const navigate = useNavigate();

  // STATE
  const [taskName, setTaskName] = useState(null);
  const [error, setError] = useState(undefined);
  const [spinner, setSpinner] = useState(false);
  const [multipleRequest, setMultipleRequest] = useState(false);

  // Clear
  const clear = () => {
    setTaskName(null);
  }

  // onChange
  const taskNameOnChange = (event) => {
    const { name, value } = event.target;
    console.log(name + " " + value);
    setTaskName(value);
  }

  // Form Submit 
  const onSubmitForm = (event) => {
    event.preventDefault();
  }

  // Submit
  const TaskCreateSubmit = async (event) => {

    const taskObject = {
      taskName,
      completed: false, // Default value
      createdAt: new Date().toISOString() // Current date and time
    }

    // Hataları Gösterme
    setError(null);

    // Spinner
    setSpinner(true);

    // Çoklu İstek
    setMultipleRequest(true);

    try {
      const response = await TaskApi.taskApiCreate(taskObject);
      if (response.status === 201) {
        setSpinner(false);
        setMultipleRequest(false);

        alert("Kayıt Eklendi")
        console.log("Task Created");
        navigate("/list");
      }
    } catch (err) {
      console.error("TaskEklenmedi !!!");
      console.error("Error Details:", err);
      if (err.response) {
        console.error("Response data:", err.response.data);
        console.error("Response status:", err.response.status);
        console.error("Response headers:", err.response.headers);
        setError(err.response.data.validationErrors);
      }
      setSpinner(false); // burada true yerine false yapın
      setMultipleRequest(false);
    }
  }

  // Spinner
  const spinnerData = () => {
    if (spinner) {
      return (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      )
    } else {
      return "";
    }
  }

  // Error
  const inputInvalidErrorClass = error ? "form-control is-invalid" : "form-control";

  // RETURN
  return (
    <>
      <div className="container mt-5">
        <h1>Task Create</h1>

        <form onSubmit={onSubmitForm}>

          <div className="form-group">
            <label htmlFor="taskName">Task Name</label>
            <input
              type="text"
              className={inputInvalidErrorClass}
              id="taskName"
              name="taskName"
              autoFocus={true}
              placeholder="Enter Task Name"
              required={true}
              onChange={taskNameOnChange} />

            {error ? <div className="invalid-feedback">{error.taskName}</div> : ""}
          </div>

          {/* RESET */}
          <button
            type="reset"
            onClick={clear}
            className="btn btn-danger mt-2 shadow"
          >Temizle</button>

          <button
            type="submit"
            onClick={TaskCreateSubmit}
            className="btn btn-primary mt-2 ms-2 shadow"
            disabled={multipleRequest}

          >
            {spinnerData()}
            Create
          </button>

        </form>

      </div>
    </>
  )
}

// Export
export default TaskCreate
