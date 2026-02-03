# 03. CLI based todo App 

A simple, fast, and lightweight command-line todo list manager.

Store your tasks in a `task.json` file — no database needed.

## Features

- Add new tasks
- List all tasks
- Mark tasks as done / undone
- Edit / update existing tasks
- Delete tasks
- Clear all completed tasks

## Example :

# Add tasks
node todo.js add "Finish report"
node todo.js add "Call mom"

# List tasks
node todo.js list or ls

# Mark as done or check
node todo.js done 1

# Fix a typo/update
node todo.js edit 2 "Add updated Task"

# Delete a task
node todo.js remove or rm or delete  3

# Clean up
node todo.js clear or clr