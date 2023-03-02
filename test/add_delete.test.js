/**
 * @jest-environment jsdom
 */

import { addTask, deleteTask } from './addTasktest';

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




