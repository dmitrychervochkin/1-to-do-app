import { useState } from "react";
import "./task.scss";
import { Square, SquareCheckBig, X } from "lucide-react";
import type { TaskI } from "../../TasksList";

interface TaskProps {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    onToggle: () => void;
    onDeleted?: () => void;
    setIsSave: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Task = ({
    id,
    title,
    description,
    completed,
    onToggle,
    onDeleted,
    setIsSave,
}: TaskProps) => {
    const [isAnimating, setIsAnimating] = useState(false);
    const [isTitleEdit, setIsTitleEdit] = useState(false);
    const [isDescEdit, setIsDescEdit] = useState(false);
    const displayCompleted = isAnimating ? !completed : completed;

    const onCheckboxClick = () => {
        setIsAnimating(true);

        setTimeout(() => {
            onToggle();
            setIsAnimating(false);
        }, 500);
    };
    const onDeleteClicked = () => {
        if (onDeleted) {
            onDeleted();
        }
    };

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;

        localStorage.setItem(
            "tasks",
            JSON.stringify(
                JSON.parse(localStorage.getItem("tasks") || "[]").map(
                    (task: TaskI) =>
                        task.id === id ? { ...task, title: newTitle } : task
                )
            )
        );
        setIsSave((prev) => !prev);
    };
    const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDescription = e.target.value;

        localStorage.setItem(
            "tasks",
            JSON.stringify(
                JSON.parse(localStorage.getItem("tasks") || "[]").map(
                    (task: TaskI) =>
                        task.id === id
                            ? { ...task, description: newDescription }
                            : task
                )
            )
        );
        setIsSave((prev) => !prev);
    };

    return (
        <div className="task">
            {displayCompleted ? (
                <SquareCheckBig
                    className="checkbox"
                    onClick={onCheckboxClick}
                />
            ) : (
                <Square className="checkbox" onClick={onCheckboxClick} />
            )}

            <div className="task--text">
                <div
                    className="task--text__title"
                    style={{ color: completed ? "#8a8a8a90" : "#8a8a8a" }}
                    onClick={() => !completed && setIsTitleEdit(true)}
                >
                    {isTitleEdit ? (
                        <input
                            value={title}
                            className="task--text__input title-input"
                            onChange={onTitleChange}
                            onBlur={() => setIsTitleEdit(false)}
                            autoFocus
                        />
                    ) : (
                        title
                    )}
                </div>
                {!completed && (
                    <p
                        className="task--text__description"
                        onClick={() => setIsDescEdit(true)}
                    >
                        {isDescEdit ? (
                            <input
                                value={description}
                                className="task--text__input desc-input"
                                onChange={onDescriptionChange}
                                onBlur={() => setIsDescEdit(false)}
                                autoFocus
                            />
                        ) : (
                            description
                        )}
                    </p>
                )}
            </div>
            {completed && <X className="checkbox" onClick={onDeleteClicked} />}
        </div>
    );
};
