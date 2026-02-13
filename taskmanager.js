class Task {
    constructor(title, dueDate) {
        this.title = title;
        this.dueDate = dueDate;
        this.completed = false;
    }

    markCompleted() {
        this.completed = true;
    }
    display() {
        return `${this.title} - Due: ${this.dueDate} - Completed: ${this.completed}`;
    }
}
class WorkTask extends Task {
    constructor(title, dueDate, project) {
        super(title, dueDate);
        this.project = project;
    }

    display() {
        return `${super.display()} - Project: ${this.project}`;
    }
}

class PersonalTask extends Task {
constructor(title, dueDate, goal) {
    super(title, dueDate);
    this.goal = goal;
}
    display() {
        return `${super.display()} - Goal: ${this.goal}`;
    }

}

class TaskManager {
    constructor() {
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
        console.log(`Task added successfully: ${task.title}`);
    }
    showAllTasks() {
        console.log("All Tasks:");
        this.tasks.forEach(task => {
            console.log(task.display());
        });
    }
    
    removeTask(title) {
        const indexTask = this.tasks.findIndex(task => task.title === title);
        if (indexTask !== -1) {
            this.tasks.splice(indexTask, 1);
            console.log(`Task removed successfully: ${title}`);
        } else {
            console.log(`Task not found: ${title}`);
        }
    }

    markTaskCompleted(title) {
        const taskMarked = this.tasks.find(t => t.title === title);
        if (taskMarked) {
            taskMarked.markCompleted();
            console.log(`Task marked completed: ${title}`);
        } else {
            console.log(`Task not found: ${title}`);
        }
    }
}

module.exports = {
    Task,
    WorkTask,
    PersonalTask,
    TaskManager
};
