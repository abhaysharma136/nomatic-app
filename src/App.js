import "./App.css";
import { Route, Routes } from "react-router-dom";
import { EditTask } from "./EditTask";
import { Todo } from "./Todo";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Todo />} />
        <Route path="/edit/:id" element={<EditTask />} />
      </Routes>
    </div>
  );
}

export default App;
