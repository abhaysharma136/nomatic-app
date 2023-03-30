import { IconButton, TextField } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import EditIcon from "@mui/icons-material/Edit";
import { API } from "./global";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Todo() {
  function GetTasks() {
    const res = fetch(`${API}/tasks`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((mvs) => setTaskList(mvs));
  }

  const [taskList, setTaskList] = useState([]);

  // useEffect(() => {
  //   GetTasks();
  // }, []);

  useEffect(() => {
    GetTasks();
  }, [taskList]);
  const [Addtasks, setAddTasks] = useState("");
  const userData = {
    userId: "6364b9539000a8d9476257c6",
    task: Addtasks,
    completed: false,
  };
  const AddTask = async (userData) => {
    try {
      await fetch(`${API}/tasks/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      }).then((response) => {
        response.json().then((data) => {
          alert("Task Succefully Added");
        });
      });
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  function handleSubmit(para1) {
    AddTask(para1);
    setAddTasks("");
  }
  return (
    <div className="todoListContainer">
      <div className="toDoListHeadingContainer">ToDo List</div>
      <div className="addTaskInput">
        <TextField
          id="standard-basic"
          label="Add a Item"
          variant="standard"
          onChange={(event) => setAddTasks(event.target.value)}
          value={Addtasks}
          style={{ width: "70%" }}
        />
        <button className="addButton" onClick={() => handleSubmit(userData)}>
          +
        </button>
      </div>

      <div className="todoTaskDiv">
        {taskList.map((ele, index) => (
          <DisplayTask taskdata={ele} key={index} />
        ))}
      </div>
    </div>
  );
}
function DisplayTask({ taskdata }) {
  const deleteTask = async (taskId) => {
    try {
      await fetch(`${API}/tasks/${taskId}`, {
        method: "DELETE",
      }).then((response) => {
        response.json().then((data) => {
          alert("Task Deleted Successfully");
        });
      });
    } catch (error) {
      alert.alert(error.message);
    }
  };
  const navigate = useNavigate();
  return (
    <div className="task">
      <div>
        <div className="taskInnerDiv">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <IconButton
              color="primary"
              aria-label="add to shopping cart"
              onClick={() => deleteTask(taskdata._id)}
            >
              <HighlightOffIcon />
            </IconButton>
            <p style={{ fontSize: "24px", color: "#8566aa" }}>
              {taskdata.task}
            </p>
          </div>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            onClick={() => navigate(`/edit/${taskdata._id}`)}
          >
            <EditIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
