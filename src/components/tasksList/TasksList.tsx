import { Task } from "./components";
import "./tasksList.scss";

export interface TaskI {
    id: number;
    completed: boolean;
    title: string;
    description: string;
}

interface TasksListProps {
    tasks: TaskI[];
    setIsSave: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TasksList = ({ tasks, setIsSave }: TasksListProps) => {
    const incompleteTasks = tasks.filter((task) => !task.completed);
    const completedTasks = tasks.filter((task) => task.completed);

    const toggleTask = (id: number) => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(
                tasks.map((task) =>
                    task.id === id
                        ? { ...task, completed: !task.completed }
                        : task
                )
            )
        );
        setIsSave((prev) => !prev);
    };
    const deleteTask = (id: number) => {
        localStorage.setItem(
            "tasks",
            JSON.stringify(tasks.filter((task) => task.id !== id))
        );
        setIsSave((prev) => !prev);
    };

    return (
        <div className="tasks-list">
            <div className="tasks-list__incomplete">
                <h2>Incomplete</h2>
                <div>
                    {incompleteTasks.map(
                        ({ id, title, description, completed }) => (
                            <Task
                                id={id}
                                title={title}
                                description={description}
                                completed={completed}
                                onToggle={() => toggleTask(id)}
                                setIsSave={setIsSave}
                            />
                        )
                    )}
                    {incompleteTasks.length === 0 && (
                        <p className="tasks-list__empty">No incomplete tasks</p>
                    )}
                </div>
            </div>
            <div className="tasks-list__completed">
                <h2>Completed</h2>
                <div>
                    {completedTasks.map(
                        ({ id, title, description, completed }) => (
                            <Task
                                id={id}
                                title={title}
                                description={description}
                                completed={completed}
                                onToggle={() => toggleTask(id)}
                                onDeleted={() => deleteTask(id)}
                                setIsSave={setIsSave}
                            />
                        )
                    )}
                    {completedTasks.length === 0 && (
                        <p className="tasks-list__empty">No completed tasks</p>
                    )}
                </div>
            </div>
        </div>
    );
};
