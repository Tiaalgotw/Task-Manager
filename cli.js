const readline = require('readline');
const { Task, WorkTask, PersonalTask, TaskManager } = require('./taskmanager.js');

function startCLI() {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout, prompt: '> ' });
    const manager = new TaskManager();

    console.log('Simple Task Manager CLI');
    console.log('Commands: add, list, remove <title>, quit');
    rl.prompt();

    rl.on('line', (line) => {
        const trimmed = line.trim();
        const [cmd, ...rest] = trimmed.split(' ');

        if (cmd === 'add') {
            rl.question('Type (work/personal/general): ', (type) => {
                rl.question('Title: ', (title) => {
                    rl.question('Due date: ', (due) => {
                        if (type === 'work') {
                            rl.question('Project: ', (project) => {
                                const t = new WorkTask(title, due, project);
                                manager.addTask(t);
                                rl.prompt();
                            });
                        } else if (type === 'personal') {
                            rl.question('Goal: ', (goal) => {
                                const t = new PersonalTask(title, due, goal);
                                manager.addTask(t);
                                rl.prompt();
                            });
                        } else {
                            const t = new Task(title, due);
                            manager.addTask(t);
                            rl.prompt();
                        }
                    });
                });
            });
        } else if (cmd === 'list') {
            manager.showAllTasks();
            rl.prompt();
        } else if (cmd === 'remove') {
            const title = rest.join(' ');
            if (!title) {
                console.log('Usage: remove <title>');
            } else {
                manager.removeTask(title);
            }
            rl.prompt();
        } else if (cmd === 'complete') {
            const title = rest.join(' ');
            if (!title) {
                console.log('Usage: complete <title>');
            } else {
                manager.markTaskCompleted(title);
            }
            rl.prompt();
        } else if (cmd === 'quit' || cmd === 'exit') {
            rl.close();
        } else if (trimmed === '') {
            rl.prompt();
        } else {
            console.log('Unknown command');
            rl.prompt();
        }
    }).on('close', () => {
        console.log('Goodbye');
        process.exit(0);
    });
}

if (require.main === module) {
    startCLI();
}

module.exports = { startCLI };
