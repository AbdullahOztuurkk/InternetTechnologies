let pending_tasks;
let ongoing_tasks;
let completed_tasks;
let deleted_area;
let dragged;

window.onload = function () {
	pending_tasks = document.getElementById("pending-task");
	ongoing_tasks = document.getElementById("ongoing-task");
	completed_tasks = document.getElementById("completed-task");
	deleted_area = document.getElementById('deleted-area');
	
    getTasksFromLocalStorage();
	var existed_task=document.getElementsByClassName("task");
	for(let i=0;i<existed_task.length;i++){
		existed_task[i].addEventListener("dragstart", taskDragStart,false);
		existed_task[i].addEventListener('dragover',taskDragOver,false);
		existed_task[i].addEventListener('drop',taskDrop,false);
		existed_task[i].addEventListener('dragend',taskDrop,false);
	}
};

function deleteTasks() {
	pending_tasks.innerHTML = "";
	ongoing_tasks.innerHTML = "";
	completed_tasks.innerHTML = "";
    localStorage.clear();
}

function addTask() {
	var title = document.getElementById("task-title").value;
	var description = document.getElementById("task-description").value;
	var date = document.getElementById("task-date").value;

	if (title === "") {
		alert("Lütfen başlık ekleyiniz. Başlık boş geçilemez.");
	} else {
		var li = document.createElement("li");

		var paragraph_title = document.createElement("p");
		paragraph_title.appendChild(document.createTextNode(title));
		var paragraph_desc = document.createElement("p");
		paragraph_desc.appendChild(document.createTextNode(description));
		var paragraph_date = document.createElement("p");
		paragraph_date.appendChild(document.createTextNode(date));

		li.className = "task";
		li.draggable = "true";
		li.appendChild(paragraph_title);
		li.appendChild(paragraph_desc);
		li.appendChild(paragraph_date);
		li.addEventListener("dragstart", taskDragStart,false);
		li.addEventListener('dragover',taskDragOver,false);
		li.addEventListener('drop',taskDrop,false);
		li.addEventListener('dragend',taskDrop,false);
		pending_tasks.appendChild(li);
        deployTasktoLocalStorage();

		document.getElementById("task-title").value='';
        document.getElementById("task-description").value='';
        document.getElementById("task-date").value='';
	}
}

function dropTask(e) {
	e.preventDefault();
	e.target.appendChild(dragged);
    deployTasktoLocalStorage();
}

function deleteTask(event){
	event.preventDefault();
	console.log(dragged +" | "+ dragged.parentNode.id)
	document.getElementById(dragged.parentNode.id).removeChild(dragged);
	deployTasktoLocalStorage();
	deleted_area.style.display = 'none';
}

function deployTasktoLocalStorage(){
    localStorage.setItem('pending-task',pending_tasks.innerHTML);
    localStorage.setItem('ongoing-task',ongoing_tasks.innerHTML);
    localStorage.setItem('completed-task',completed_tasks.innerHTML);
}

function getTasksFromLocalStorage(){
    pending_tasks.innerHTML = localStorage.getItem('pending-task');
    ongoing_tasks.innerHTML = localStorage.getItem('ongoing-task');
    completed_tasks.innerHTML = localStorage.getItem('completed-task');
}

function taskDragStart(e){
	dragged = e.target;
}

function taskDragOver(){
	deleted_area.style.display = 'block';
}

function taskDrop(){
	deleted_area.style.display = 'none';
}