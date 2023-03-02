const addTask = (task, divtasks) => {
  const div = document.createElement('div');
  div.classList.add('task');
  div.setAttribute('id', task.index);
  div.innerHTML = `<div class = "task-check margin" id="${task.index}">
                    <input type="checkbox" id="${task.index}" ${task.completed ? 'checked' : ''}>
                    <label for="${task.index}">${task.description}</label>
                    </div>
                    <button class="material-symbols-outlined margin dot" id="${task.index}">more_vert</button>`;
  divtasks.appendChild(div);
};

const storeTask = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const deleteTask = (id, taskDivs, tasks) => {
  if (tasks.length === 1) {
    tasks.pop();
  }
  tasks.splice(id - 1, 1);
  taskDivs.forEach((taskDiv) => {
    taskDiv.parentNode.removeChild(taskDiv);
  });
  let i = 1;
  tasks.forEach((task) => {
    task.index = i;
    i += 1;
    addTask(task);
    storeTask();
  });
};

export { addTask, deleteTask, storeTask };