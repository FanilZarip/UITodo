export const inputTask = document.querySelectorAll('.todo__taskText_input');
export const inputButton = document.querySelectorAll('.input__button');
export const highListWrapper = document.querySelector('.high__list_wrapper');
export const lowListWrapper = document.querySelector('.low__list_wrapper');
export const tasksDeleteButton = document.getElementsByClassName('task__delete_button');
export const tasksBlock = document.getElementsByClassName('todo__List');



export const DELETE_BUTTON_SVG = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<line y1="-0.5" x2="20.7803" y2="-0.5" transform="matrix(0.710506 0.703691 -0.65218 0.758064 1 1)" stroke="#998899"/>
<line y1="-0.5" x2="20.8155" y2="-0.5" transform="matrix(0.693335 -0.720616 0.670126 0.742247 1.56787 16)" stroke="#998899"/>
</svg>`;

export const taskList = [];
export const taskStatus = {
    high: 'high',
    low: 'low',
}


export function createTaskBlock (priority) {

    const TASK_UI_ELEMENTS = {
        taskBlockDiv: document.createElement('div'),
        label: document.createElement('label'),
        checkBoxInput: document.createElement('input'),
        checkBoxSpan: document.createElement('span'),
        taskName: document.createElement('p'),
        taskDeleteButton: document.createElement('button'),
    }

    TASK_UI_ELEMENTS.taskBlockDiv.classList.add('todo__List', 'd-flex');
    TASK_UI_ELEMENTS.taskBlockDiv.setAttribute('data-task-status', priority);
    TASK_UI_ELEMENTS.taskBlockDiv.setAttribute('data-task-id', taskList[taskList.length - 1].id);



    if (priority === taskStatus.high) {
        highListWrapper.prepend(TASK_UI_ELEMENTS.taskBlockDiv);    
    } else {
        lowListWrapper.prepend(TASK_UI_ELEMENTS.taskBlockDiv);    
    }

    TASK_UI_ELEMENTS.label.classList.add("todoCheckBox");
    TASK_UI_ELEMENTS.taskBlockDiv.prepend(TASK_UI_ELEMENTS.label);

    TASK_UI_ELEMENTS.checkBoxInput.classList.add('chckbx');
    TASK_UI_ELEMENTS.checkBoxInput.setAttribute('type', 'checkbox');
    TASK_UI_ELEMENTS.label.prepend(TASK_UI_ELEMENTS.checkBoxInput);

    TASK_UI_ELEMENTS.label.append(TASK_UI_ELEMENTS.checkBoxSpan);

    TASK_UI_ELEMENTS.taskName.classList.add('todo__task__name');
    TASK_UI_ELEMENTS.taskName.innerText = taskList[taskList.length - 1].name;
    TASK_UI_ELEMENTS.taskBlockDiv.append(TASK_UI_ELEMENTS.taskName);

    TASK_UI_ELEMENTS.taskDeleteButton.classList.add('button', 'task__delete_button');
    TASK_UI_ELEMENTS.taskDeleteButton.setAttribute('data-task-id', taskList[taskList.length - 1].id);
    TASK_UI_ELEMENTS.taskDeleteButton.innerHTML = DELETE_BUTTON_SVG;
    TASK_UI_ELEMENTS.taskBlockDiv.append(TASK_UI_ELEMENTS.taskDeleteButton);
}