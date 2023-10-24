const deleteBtn = document.querySelectorAll('.del');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

window.addEventListener('click', e => {
    if (e.target.dataset.delete) {
        deleteTodo(e.target.dataset.delete);
    } else if (e.target.dataset.complete) {
        markComplete(e.target.dataset.complete);
    } else if (e.target.dataset.undo) {
        markIncomplete(e.target.dataset.undo);
    }
})

async function deleteTodo(id){
    console.log(id)
    try{
        const response = await fetch('todos/deleteTodo', {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': id
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err);
    }
}

async function markComplete(id){
    console.log(id)
    try{
        const response = await fetch('todos/markComplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': id
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err);
    }
}

async function markIncomplete(id){
    try{
        const response = await fetch('todos/markIncomplete', {
            method: 'put',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                'todoIdFromJSFile': id
            })
        })
        const data = await response.json();
        console.log(data);
        location.reload();
    }catch(err){
        console.log(err);
    }
}
