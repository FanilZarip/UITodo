const inputTask = document.querySelectorAll('.todo__taskText_input');
const inputButton = document.querySelectorAll('.input__button');
const highListWrapper = document.querySelector('.high__list_wrapper');
const lowListWrapper = document.querySelector('.low__list_wrapper');

console.log(inputTask);





// Move to main.js
const taskList = [];

const UI_ELEMS_ARRAY = {
    inputButtonArray: Array.from(inputButton),
    inputTaskArray: Array.from(inputTask),
}

UI_ELEMS_ARRAY.inputButtonArray.forEach(function (button) {
    button.addEventListener('click', addTask);
});

function changeStatus (priority) {
    
    const checkboxButton = document.querySelectorAll('.chckbx');
    const tasksBlock = document.querySelectorAll('.todo__List');
    const checkboxButtonArray = Array.from(checkboxButton);
    const tasksBlockArray = Array.from(tasksBlock);

    tasksBlockArray.forEach(function (background) {
        const firstChildElement = background.firstElementChild;
        const firstChildElementChild = firstChildElement.firstElementChild;
        firstChildElementChild.addEventListener('click', changeBackground);
        function changeBackground () {
            if (firstChildElementChild.checked) {
                background.classList.add('todo__List_checked');
                if (priority === 'high') {
                    highListWrapper.append(background);
                } else {
                    lowListWrapper.append(background);
                }
            } else {
                    background.classList.remove('todo__List_checked');
                }    
            }
            
        })

        // background.classList.add('todo__List_checked');
    console.log(tasksBlockArray);
}


function addTask () {

    let buttonTarget = null;
    const emptyInputMessage = 'Please enter some task';

    
    buttonTarget = this.dataset.buttonTarget;

    //check that Got correct data-* 
    console.log('click on "', buttonTarget, '" button');
    
    UI_ELEMS_ARRAY.inputTaskArray.forEach(function (inputData) {
        const emptyValue = inputData.value === '';
        const correctInput = inputData.dataset.taskPriority === buttonTarget;

        if (correctInput) {
            if (emptyValue) {
                console.log(emptyInputMessage);
                return;
            }
            else {
                taskList.push({name: inputData.value, priority: buttonTarget});
                inputData.value = '';
                createTaskBlock(buttonTarget);
                changeStatus(buttonTarget);
            }
        }
    });

    
    console.log(taskList);

}

function createTaskBlock (priority) {

    const DELETE_BUTTON_SVG = `<svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line y1="-0.5" x2="20.7803" y2="-0.5" transform="matrix(0.710506 0.703691 -0.65218 0.758064 1 1)" stroke="#998899"/>
    <line y1="-0.5" x2="20.8155" y2="-0.5" transform="matrix(0.693335 -0.720616 0.670126 0.742247 1.56787 16)" stroke="#998899"/>
    </svg>`;

    const TASK_UI_ELEMENTS = {
        taskBlockDiv: document.createElement('div'),
        label: document.createElement('label'),
        checkBoxInput: document.createElement('input'),
        checkBoxSpan: document.createElement('span'),
        taskName: document.createElement('p'),
        taskDeleteButton: document.createElement('button'),

    }

    
    TASK_UI_ELEMENTS.taskBlockDiv.classList.add('todo__List', 'd-flex');

    if (priority === 'high') {
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
    TASK_UI_ELEMENTS.taskDeleteButton.innerHTML = DELETE_BUTTON_SVG;
    TASK_UI_ELEMENTS.taskBlockDiv.append(TASK_UI_ELEMENTS.taskDeleteButton);
}
