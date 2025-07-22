import { Plus } from "lucide-react";
import { formatDate } from "../../utils";
import "./header.scss";

interface HeaderProps {
    incomplete: number;
    completed: number;

    setIsSave: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header = ({
    incomplete = 0,
    completed = 0,
    setIsSave,
}: HeaderProps) => {
    const handleAddTask = () => {
        localStorage.setItem(
            "tasks",
            JSON.stringify([
                ...JSON.parse(localStorage.getItem("tasks") || "[]"),
                {
                    id: Date.now(),
                    completed: false,
                    title: "New Task",
                    description: "No description",
                },
            ])
        );
        setIsSave((prev) => !prev);
    };

    return (
        <div className="header">
            <h2 className="header--date">{formatDate(new Date())}</h2>
            <div className="header--status">{`${incomplete} incomplete, ${completed} completed `}</div>
            <div className="header--add-btn" onClick={handleAddTask}>
                <Plus />
            </div>
        </div>
    );
};
