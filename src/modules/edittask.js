import storeTask from './storetask.js';
import { tasks } from './selector.js';

const changeTask = (task, editInput) => {
  task.description = editInput.value;
  storeTask();
  const newLabel = document.createElement('label');
  newLabel.setAttribute('for', task.index);
  newLabel.textContent = task.description;
  editInput.parentNode.replaceChild(newLabel, editInput);
};

const editTask = (e) => {
  if (e.target.nodeName === 'LABEL') {
    const taskDiv = e.target.closest('.task');
    const task = tasks[taskDiv.getAttribute('id')];
    const editInput = document.createElement('input');
    editInput.value = task.description;
    e.target.parentNode.replaceChild(editInput, e.target);
    editInput.focus();

    editInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        changeTask(task, editInput);
      }
    });
    editInput.addEventListener('blur', () => {
      changeTask(task, editInput);
    });
  }
};

export default editTask;