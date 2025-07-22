type Task = {
    id: number;
    title: string;
    description: string;
    completed: boolean;
};

type FilterType = "completed" | "incomplete";

export function getTasksLength(tasks: Task[], filter: FilterType): number {
    return tasks.filter((task) =>
        filter === "completed" ? task.completed : !task.completed
    ).length;
}
