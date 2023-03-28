import { Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Edittask.css";
import { API } from "./global";

export function EditTask() {
  const { id } = useParams();
  const [taskData, setTaskData] = useState();
  function GetTasks() {
    const res = fetch(`${API}/todoItem/${id}`, {
      method: "GET",
    });
    res.then((data) => data.json()).then((mvs) => setTaskData(mvs));
  }

  useEffect(() => {
    GetTasks();
  }, []);

  return (
    <div className="editTaskContainer">
      {taskData ? <DisplayEditForm taskData={taskData} /> : "....."}
    </div>
  );
}

function DisplayEditForm({ taskData }) {
  console.log(taskData);
  const [name, setName] = useState(taskData.task);
  const navigate = useNavigate();
  const newtask = {
    userId: "6364b9539000a8d9476257c6",
    task: name,
    completed: false,
  };
  function updateTask(newtask) {
    fetch(`${API}/todoItem/${taskData._id}`, {
      method: "PUT",
      body: JSON.stringify(newtask),
      headers: {
        "content-Type": "application/json",
      },
    }).then((data) => manageAlert());
  }

  function manageAlert() {
    alert("Task updated");
    navigate("/");
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
      <h2>Edit Task</h2>
      <TextField
        id="outlined-basic"
        label="Task"
        variant="outlined"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <Button variant="outlined" onClick={() => updateTask(newtask)}>
        Update
      </Button>
    </div>
  );
}
