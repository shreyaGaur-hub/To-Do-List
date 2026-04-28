const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const congratsMsg = document.getElementById('congrats-msg');


function addTask(){
    if(inputBox.value === ''){
        alert('You must write something!');
    }
    else{
        let li = document.createElement('li');
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = '\u00d7';
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
    checkCompletion(); // Check after adding (it will hide the msg if a new task is added)
}


listContainer.addEventListener('click', function(e){
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        saveData();
        checkCompletion(); // Check after toggling
    }
    else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        saveData();
        checkCompletion(); // Check after deleting
    }
}, false);


function saveData(){
    localStorage.setItem('data', listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
    checkCompletion(); // Check on page load
}

showTask();

function checkCompletion() {
    const allTasks = listContainer.querySelectorAll('li');
    const checkedTasks = listContainer.querySelectorAll('li.checked');

    // Show message if there are tasks AND they are all checked
    if (allTasks.length > 0 && allTasks.length === checkedTasks.length) {
        congratsMsg.style.display = "block";
    } else {
        congratsMsg.style.display = "none";
    }
}