/**
 * @jest-environment jsdom
 */
import { addTask, deleteTask, storeTask, changeTask, editTask, checked, buttonClear } from './addTask_deletetest.js';

describe('addTask', () => {
  document.body.innerHTML = `
      <div class="tasks"></div>
      <div class="edit"></div>
      <div class="checked"></div>
      <div class="clear"></div>
    `;;
  const divtasks = document.querySelector('.tasks');

  test('creates a new task element and appends it to the tasks div', () => {
    const task = {
      index: 1,
      completed: false,
      description: 'Do laundry',
    };
    addTask(task, divtasks);
    const taskDiv = document.querySelector('.task');
    expect(taskDiv).toBeTruthy();
    expect(taskDiv.getAttribute('id')).toBe('1');
    expect(taskDiv.querySelector('label').textContent).toBe('Do laundry');
    expect(taskDiv.querySelector('input').checked).toBeFalsy();
    expect(divtasks.childNodes.length).toBe(1);
    expect(divtasks.firstChild).toBe(taskDiv);
  });
});

describe('deleteTask', () => {
  const divtasks = document.querySelector('.tasks');
  const tasks = [
    {
      index: 1,
      completed: false,
      description: 'Do laundry',
    },
  ];

  test('deletes the task with the given id', () => {
    const taskDivs = document.querySelectorAll('.task');
    deleteTask(1, taskDivs, tasks);
    expect(tasks.length).toBe(0);
    expect(divtasks.childNodes.length).toBe(0);
  });
});

describe('storeTask', () => {
  const tasks = [
    { index: 1, completed: false, description: 'Do laundry' },
    { index: 2, completed: true, description: 'Buy groceries' },
  ];

  test('stores the tasks in localStorage', () => {
    storeTask(tasks);
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(storedTasks).toEqual(tasks);
    expect(storedTasks[0].index).toBe(1);
    expect(storedTasks[0].completed).toBeFalsy();
    expect(storedTasks[0].description).toBe('Do laundry');
    expect(storedTasks[1].index).toBe(2);
    expect(storedTasks[1].completed).toBeTruthy();
    expect(storedTasks[1].description).toBe('Buy groceries');
  });
});

describe('changeTask', () => {
  const task = {
    index: 1,
    completed: false,
    description: 'Do laundry',
  };
  const editdiv = document.createElement('div');
  const editInput = document.createElement('input');
  editdiv.appendChild(editInput);
  editInput.value = 'Do laundry and clean room';
  test('updates the task description and replaces the edit input with a label', () => {
    changeTask(task, editInput);
    expect(editdiv.firstChild.tagName).toBe('LABEL');
    expect(editdiv.firstChild.textContent).toBe('Do laundry and clean room');
    expect(task.description).toBe('Do laundry and clean room');
    expect(editInput.parentNode).toBeFalsy();
  });
});

describe('editTask', () => {
  const edit = document.querySelector('.edit');
  const tasks = [
    { index: 1, completed: false, description: 'Do laundry' },
  ]
  addTask(tasks[0], edit);
  storeTask(tasks);
  const label = document.querySelector('label');
  const e = new Event('click');
  e.initEvent('click', true, true);
  Object.defineProperty(e, 'target', { value: label });
  editTask(e, tasks);
  const editLabel = edit.querySelector('label');
  const editInput = edit.querySelector('.er');
  test('replaces the label element with an input element', () => {
    expect(editLabel).toBeFalsy();
    expect(editInput).toBeTruthy();
    expect(editInput.value).toBe('Do laundry');
  });
});

describe('checked', () => {
  const divchecked = document.querySelector('.checked');
  const tasks = [
    { index: 1, completed: false, description: 'write a book' },
    { index: 2, completed: true, description: 'Try to read' },
  ]
  addTask(tasks[0], divchecked);
  addTask(tasks[1], divchecked);
  storeTask(tasks);
  const input = divchecked.querySelectorAll('input');
  const event = new Event('click');
  event.initEvent('click', true, true);
  Object.defineProperty(event, 'target', { value: input[0] });
  input[0].checked = true;
  checked(event, tasks)

  const storedTasks = JSON.parse(localStorage.getItem('tasks'))
  test('updates the task completed property to be true', () => {
    expect(tasks[0].completed).toBeTruthy();
    expect(storedTasks[0].completed).toBeTruthy();
  });
  const event2 = new Event('click');
  event2.initEvent('click', true, true);
  Object.defineProperty(event2, 'target', { value: input[1] });
  input[1].checked = false;
  checked(event2, tasks)

  const storedTasks2 = JSON.parse(localStorage.getItem('tasks'))
  test('updates the task completed property to be false', () => {
    expect(tasks[1].completed).toBeFalsy();
    expect(storedTasks2[1].completed).toBeFalsy();
  });
});

describe('buttonClear', () => {
  const clear = document.querySelector('.clear');
  const tasks = [{ index: 1, completed: false, description: 'Do laundry' }, { index: 2, completed: true, description: 'Buy groceries' }]
  addTask(tasks[0], clear);
  addTask(tasks[1], clear);
  storeTask(tasks);

  test('removes completed tasks and updates index', () => {
    buttonClear(tasks, clear);

    const taskDivs = document.querySelectorAll('.task');
    expect(taskDivs.length).toBe(1);

    const storedTasks = JSON.parse(localStorage.getItem('tasks'));
    expect(storedTasks.length).toBe(1);
    expect(storedTasks[0].description).toBe('Do laundry');
  });
})