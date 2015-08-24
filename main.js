/*
create functionality to change edit button to "done" when in editMode

create functionality to prevent an empty task from being created
*/


var taskInput = document.getElementById("new-task");
var addButton = document.getElementById("add-button");
var incompleteTaskHolder = document.getElementById("incomplete-tasks");
var completeTaskHolder = document.getElementById("complete-tasks");

//new task list item
var createNewTaskElement = function(taskString){
  //create list item
  var listItem = document.createElement("li");

  //input checkbox
  var checkBox = document.createElement("input"); //checkbox
  //label
  var label = document.createElement("label");
  //input - text
  var editInput = document.createElement("input"); //text
  //button.edit
  var editButton = document.createElement("button");
  //button.delete
  var deleteButton = document.createElement("button");

  //each element to modify

  checkBox.type = "checkbox";
  editInput.type = "text";

  editButton.innerText = "Edit";
  editButton.className = "edit";
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";

  label.innerText = taskString;

  //each element to append
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem
}

//add a new task
var addTask = function(){
  console.log("addTask run");
  //create new list item with text from #new-task
  var listItem = createNewTaskElement(taskInput.value);

  //append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
  taskInput.value = "";
}

//edit existing task
var editTask = function(){
  console.log("editTask run");
  var listItem = this.parentNode;
  var editInput = listItem.querySelector("input[type=text]");
  var label = listItem.querySelector("label");
  //if class of parent = .editMode
  if (listItem.classList.contains("editMode")) {
    console.log("remove editMode");
    //switch from .editMode
    //label text become input's value
    label.innerText = editInput.value;
  } else {
    console.log("add editMode");
    //switch to .editMode
    //input value becomes label text
    editInput.value = label.innerText;
  }
  //toggle .editMode on the parent
  listItem.classList.toggle("editMode");
}

//delete an existing task
var deleteTask = function(){
  console.log("deleteTask run");
  var listItem = this.parentNode;
  var ul = listItem.parentNode;
  //remove parent list item
  ul.removeChild(listItem);
}

//mark exisitng task complete
var taskComplete = function(){
  console.log("taskComplete run");
  //append task list item to #complete-tasks
  var listItem = this.parentNode;
  completeTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

//mark a task an incomplete
var taskIncomplete = function(){
  console.log("taskIncomplete run");
  //append task list item to #incomplete-tasks
  var listItem = this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskComplete);
}

var ajaxRequest = function(){
  console.log("AJAX Reqeust");
}

//set click handler for addTask function
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


var bindTaskEvents = function (taskListItem, checkBoxEventHandler){
  console.log("bindTaskEvents run");
  //select children
  var checkBox = taskListItem.querySelector("input[type=checkbox]");
  var editButton = taskListItem.querySelector("button.edit");
  var deleteButton = taskListItem.querySelector("button.delete");
  //bind editTask to edit button
  editButton.onclick = editTask;
  //bind deleteTask to delete button
  deleteButton.onclick = deleteTask;
  //bind checkboxEventHandler to checkbox
  checkBox.onchange = checkBoxEventHandler;

}

//cycle over incompleteTaskHolder ul li
for(var i = 0; i < incompleteTaskHolder.children.length; i++){
  //bindTaskEvents to li children (taskComplete)
  bindTaskEvents(incompleteTaskHolder.children[i],taskComplete);
}

//cycle over completeTaskHolder ul li
for(var i = 0; i < completeTaskHolder.children.length; i++){
  //bindTaskEvents to li children (taskIncomplete)
  bindTaskEvents(completeTaskHolder.children[i],taskIncomplete);
}