const todoList = [{
    name: 'Make Dinner',
    dueDate: '2024-03-21' 
},{
    name: 'Clean Dishes',
    dueDate: '2024-03-21' 
},{
    name: 'Go Jog',
    dueDate: '2024-03-21'
}];

renderTodoList();

function renderTodoList() {

    let todoListHTML = '';

    for(let i = 0; i < todoList.length; i++){
        const todoObject = todoList[i];
        // const name = todoObject.name;
        // const { dueDate } = todoObject; // destructuring
        const {name, dueDate} = todoObject; // destructuring
        const html = `
        <div>${name}</div>
        <div>${dueDate}</div>
            <button onclick="
            todoList.splice(${i},1);
            renderTodoList();
            " class="delete-button">Delete</button>
        
        
        `;
        todoListHTML += html;
    }
    
    // console.log(todoListHTML);
    
    document.querySelector('.js-todo-list').innerHTML = todoListHTML;
    
}

function addTodo(){
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;
    // console.log(name);
    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;
    // console.log(dueDate);
    if(name != '' && dueDate != ''){

        todoList.push({
            // name: name,
            // dueDate: dueDate
            name,
            dueDate
        });
        // console.log(todoList);
        inputElement.value = '';
        dateInputElement.value = '';
        renderTodoList();
    }
}