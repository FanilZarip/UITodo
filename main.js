import {inputTask, inputButton, highListWrapper, lowListWrapper, createTaskBlock, taskList, taskStatus, tasksDeleteButton, tasksBlock} from './view.js';



const UI_ELEMS_ARRAY = {
    inputButtonArray: Array.from(inputButton),
    inputTaskArray: Array.from(inputTask),
}



let idNumber = 0;


UI_ELEMS_ARRAY.inputButtonArray.forEach(function (button) {
    button.addEventListener('click', addTask);
});


function addTask () {

    let buttonPriority = null;
    const emptyInputMessage = 'Please enter some task';    
    buttonPriority = this.dataset.buttonTarget;

    //check that Got correct data-* 
    console.log('click on "', buttonPriority, '" button');
    
    UI_ELEMS_ARRAY.inputTaskArray.forEach(createTask);

    function createTask (inputData) {
        const emptyValue = inputData.value === '';
        const correctInput = inputData.dataset.taskPriority === buttonPriority;

        if (correctInput) {
            if (emptyValue) {
                console.log(emptyInputMessage);
                return;
            }
            else {
                idNumber ++;
                taskList.push({name: inputData.value, priority: buttonPriority, id: idNumber});
                inputData.value = '';
                createTaskBlock(buttonPriority);
                changeStatus ();
                deleteTask ();
            }
        }
    }
    
    console.log(taskList);

}


function changeStatus () {
    
    // как получить обновленную коллекцию без передачи этой функции через addTask()?
    const tasksBlockArray = Array.from(tasksBlock);

    tasksBlockArray.forEach(changeBackground);

    function changeBackground (toDoBlock) {
        
        let priority = toDoBlock.dataset.taskStatus;
        const firstChildElement = toDoBlock.firstElementChild;
        const firstChildElementChild = firstChildElement.firstElementChild;

        firstChildElementChild.addEventListener('click', addClass);

        function addClass () {
            if (firstChildElementChild.checked) {
                toDoBlock.classList.add('todo__List_checked');
                if (priority === taskStatus.high) {
                    highListWrapper.append(toDoBlock);
                } else {
                    lowListWrapper.append(toDoBlock);
                }
            } else {
                    toDoBlock.classList.remove('todo__List_checked');
                }    
            }
            
    }
}

// Удаление через event.currentTarget
// function deleteTask () {
//     const tasksDeleteButtonArray = Array.from(tasksDeleteButton);
//     tasksDeleteButtonArray.forEach(function(delButton){
        // можно ли использовать addEventlistener?
//         delButton.onclick = showButtonList;
//     })
    
//     function showButtonList(event) {
//         console.log(event.currentTarget);
//         event.currentTarget.parentNode.remove();
//     }
// }

// Удаление без привязки к родителю
function deleteTask () {
    const tasksDeleteButtonArray = Array.from(tasksDeleteButton);
    tasksDeleteButtonArray.forEach(function(delButton){
        delButton.onclick = getDeleteElement;
    })
    
    function getDeleteElement(event) {
        
        const buttonId = event.currentTarget.dataset.taskId;
        const deleteElemIndex = taskList.findIndex(function (elem){
           return elem.id == buttonId;
        });
        taskList.splice(deleteElemIndex, 1);
        

        for (const block of tasksBlock) {     
            const blockId = block.dataset.taskId

            const DeletButtonIdEqualBlockId = blockId === buttonId;
            
            if (DeletButtonIdEqualBlockId) {
                block.remove();
            }
        }
        console.log(taskList);
    }
}


console.log(tasksDeleteButton);
