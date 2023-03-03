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

const changeTask = (task, editInput) => {
  task.description = editInput.value;
  storeTask();
  const newLabel = document.createElement('label');
  newLabel.setAttribute('id', task.index);
  newLabel.textContent = task.description;
  editInput.parentNode.replaceChild(newLabel, editInput);
};

const editTask = (e, tasks) => {
  if (e.target.nodeName === 'LABEL') {
    const taskDiv = e.target.parentNode.parentNode;
    const task = tasks[taskDiv.getAttribute('id') - 1];
    const editInput = document.createElement('input');
    editInput.value = task.description;
    editInput.classList.add('er');
    e.target.parentNode.replaceChild(editInput, e.target);
    editInput.focus();

    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        changeTask(task, editInput);
        console.log('here')
      }
    });
    editInput.addEventListener('blur', () => {
      changeTask(task, editInput);
      console.log('here2')
    });
  }
};

const checked = (e, tasks) => {
  if (e.target.matches('input[type="checkbox"]')) {
    const taskDiv = e.target.closest('.task');
    const task = tasks[taskDiv.getAttribute('id') - 1];
    if (e.target.checked) {
      task.completed = true;
    } else {
      task.completed = false;
    }
    storeTask(tasks);
  }
};

const buttonClear = (tasks, clear) => {
  const taskDivs = document.querySelectorAll('.task');
  taskDivs.forEach((taskDiv) => {
    taskDiv.parentNode.removeChild(taskDiv);
  });
  const newTasks = tasks.filter((task) => task.completed === false);
  tasks.splice(0);
  let i = 1;
  newTasks.forEach((task) => {
    task.index = i;
    i += 1;
    tasks.push(task);
  });
  tasks.forEach((task) => {
    addTask(task, clear);
  });
  storeTask(tasks);
};

export { addTask, deleteTask, storeTask, checked, buttonClear, editTask, changeTask };