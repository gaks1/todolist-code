/**
 * @jest-environment jsdom
 */

import { addTask, deleteTask, storeTask} from './addTask_deletetest';

describe('addTask', () => {
    document.body.innerHTML = `
      <div class="tasks"></div>
    `;
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
      }
    ];
  
    test('deletes the task with the given id', () => {
      const taskDivs = document.querySelectorAll('.task');
      deleteTask(1, taskDivs, tasks);
      expect(tasks.length).toBe(0);
      expect(divtasks.childNodes.length).toBe(0);
      
    });
  })

  describe('storeTask', () => {
    const tasks = [
      { index: 1, completed: false, description: 'Do laundry' }, 
      { index: 2, completed: true, description: 'Buy groceries' }
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


  })
