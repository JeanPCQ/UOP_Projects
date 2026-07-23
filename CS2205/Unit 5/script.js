// Get DOM elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const errorMessage = document.getElementById('errorMessage');
const emptyMessage = document.getElementById('emptyMessage');

// Array to store tasks
let tasks = [];
let taskIdCounter = 1;

// Event listener for Add Task button
addTaskBtn.addEventListener('click', addTask);

// Event listener for Enter key in input field
taskInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        addTask();
    }
});

// Event delegation for task buttons
taskList.addEventListener('click', handleTaskAction);

// Add new task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    // Clear previous error
    errorMessage.classList.remove('show');
    
    // Validate input
    if (taskText === '') {
        displayError('Please enter a task');
        return;
    }
    
    // Create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        editing: false
    };
    
    // Add task to array
    tasks.push(task);
    
    // Add task to DOM
    renderTask(task);
    
    // Clear input field
    taskInput.value = '';
    taskInput.focus();
    
    // Update empty message
    updateEmptyMessage();
}

// Render task to DOM
function renderTask(task) {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.id = `task-${task.id}`;
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-checkbox';
    checkbox.checked = task.completed;
    
    const taskSpan = document.createElement('span');
    taskSpan.className = `task-text ${task.completed ? 'completed' : ''}`;
    taskSpan.textContent = task.text;
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'task-buttons';
    
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.dataset.taskId = task.id;
    
    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.dataset.taskId = task.id;
    
    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(removeBtn);
    
    li.appendChild(checkbox);
    li.appendChild(taskSpan);
    li.appendChild(buttonContainer);
    
    taskList.appendChild(li);
}

// Handle task actions (Edit, Remove, Complete)
function handleTaskAction(event) {
    const target = event.target;
    const taskItem = target.closest('.task-item');
    
    if (!taskItem) return;
    
    const taskId = parseInt(taskItem.id.split('-')[1]);
    const task = tasks.find(t => t.id === taskId);
    
    // Handle checkbox (Mark Complete/Incomplete)
    if (target.classList.contains('task-checkbox')) {
        toggleComplete(task, taskItem);
    }
    
    // Handle Edit button
    if (target.classList.contains('edit-btn')) {
        startEdit(task, taskItem);
    }
    
    // Handle Remove button
    if (target.classList.contains('remove-btn')) {
        removeTask(task, taskItem);
    }
    
    // Handle Save button
    if (target.classList.contains('save-btn')) {
        saveEdit(task, taskItem);
    }
    
    // Handle Cancel button
    if (target.classList.contains('cancel-btn')) {
        cancelEdit(task, taskItem);
    }
}

// Toggle task completion
function toggleComplete(task, taskItem) {
    task.completed = !task.completed;
    
    const taskSpan = taskItem.querySelector('.task-text');
    if (task.completed) {
        taskSpan.classList.add('completed');
    } else {
        taskSpan.classList.remove('completed');
    }
}

// Start editing task
function startEdit(task, taskItem) {
    task.editing = true;
    
    const taskSpan = taskItem.querySelector('.task-text');
    const buttonContainer = taskItem.querySelector('.task-buttons');
    
    // Create edit input
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.className = 'edit-input';
    editInput.value = task.text;
    
    // Create save button
    const saveBtn = document.createElement('button');
    saveBtn.className = 'save-btn';
    saveBtn.textContent = 'Save';
    saveBtn.dataset.taskId = task.id;
    
    // Create cancel button
    const cancelBtn = document.createElement('button');
    cancelBtn.className = 'cancel-btn';
    cancelBtn.textContent = 'Cancel';
    cancelBtn.dataset.taskId = task.id;
    
    // Replace task text with input
    taskSpan.replaceWith(editInput);
    
    // Replace buttons with Save and Cancel
    buttonContainer.innerHTML = '';
    buttonContainer.appendChild(saveBtn);
    buttonContainer.appendChild(cancelBtn);
    
    // Focus on input
    editInput.focus();
}

// Save edited task
function saveEdit(task, taskItem) {
    const editInput = taskItem.querySelector('.edit-input');
    const newText = editInput.value.trim();
    
    // Validate new text
    if (newText === '') {
        displayError('Task cannot be empty');
        return;
    }
    
    // Update task
    task.text = newText;
    task.editing = false;
    
    // Re-render task
    taskItem.remove();
    renderTask(task);
}

// Cancel editing
function cancelEdit(task, taskItem) {
    task.editing = false;
    
    // Re-render task
    taskItem.remove();
    renderTask(task);
}

// Remove task
function removeTask(task, taskItem) {
    // Remove from array
    tasks = tasks.filter(t => t.id !== task.id);
    
    // Remove from DOM with animation
    taskItem.remove();
    
    // Update empty message
    updateEmptyMessage();
}

// Display error message
function displayError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.add('show');
    
    setTimeout(() => {
        errorMessage.classList.remove('show');
    }, 3000);
}

// Update empty message visibility
function updateEmptyMessage() {
    if (tasks.length === 0) {
        emptyMessage.classList.add('show');
    } else {
        emptyMessage.classList.remove('show');
    }
}

// Initialize
updateEmptyMessage();