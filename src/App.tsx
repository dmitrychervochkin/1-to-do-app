import { useEffect, useState } from "react";
import "./App.scss";
import { Header, TasksList } from "./components";
import { getTasksLength } from "./utils";

function App() {
    const [tasks, setTasks] = useState([]);
    const [isSave, setIsSave] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("tasks")) {
            setTasks(JSON.parse(localStorage.getItem("tasks") || "[]"));
        }
    }, [isSave]);

    return (
        <div className="app">
            <Header
                incomplete={getTasksLength(tasks, "incomplete")}
                completed={getTasksLength(tasks, "completed")}
                setIsSave={setIsSave}
            />
            <TasksList tasks={tasks} setIsSave={setIsSave} />
        </div>
    );
}

export default App;
