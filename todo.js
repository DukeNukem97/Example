const btn = document.querySelector("#submit");
document.addEventListener("DOMContentLoaded", getFromLocal);
btn.addEventListener("click", addItem);
const itemContainer = document.querySelector(".theListContainer");
function addItem(event) {
  event.preventDefault();

  const todoName = document.querySelector("#todos");

  let finalName = valueChecking(todoName.value);
  if (finalName != "") {
    storeItLocal(finalName);
    const newItem = document.createElement("div");
    newItem.classList.add("todoList");

    const theItem = document.createElement("li");
    theItem.classList.add("the-list");
    theItem.innerText = finalName;
    newItem.appendChild(theItem);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';
    newItem.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = '<i class="fas fa-trash fa-lg"></i>';
    newItem.appendChild(trashBtn);

    itemContainer.appendChild(newItem);
    todoName.value = "";
  }
}

function valueChecking(name) {
  let finalName = name.trim();
  if (finalName.length > 50) {
    let theFinal = "";
    let count = 0;
    for (let i = 0; i < finalName.length; i++) {
      theFinal += finalName.charAt(i);
      if (count == 27) {
        console.log(count);
        theFinal += " ";
        count = 0;
        continue;
      }
      count++;
    }
    return theFinal;
  }
  return finalName;
}

const del = document.querySelector(".theListContainer");

del.addEventListener("click", deleteIt);

function deleteIt(event) {
  const item = event.target;
  if (item.classList[0] === "trash-btn") {
    const deleteItem = item.parentElement;
    deleteItem.classList.add("deleteIt");
    deleteFromLocal(deleteItem.childNodes[0].innerText);
    deleteItem.addEventListener("transitionend", function () {
      deleteItem.remove();
    });
  }
}

const complete = document.querySelector(".theListContainer");

complete.addEventListener("click", completed);

function completed(event) {
  const item = event.target;

  if (item.classList[0] === "complete-btn") {
    const completedItem = item.parentElement;
    completedItem.classList.toggle("completeIt");
  }
}

const filterItem = document.querySelector("#filter");

filterItem.addEventListener("click", filterItems);

function filterItems(event) {
  const todo = itemContainer.childNodes;
  todo.forEach(function (e) {
    switch (event.target.value) {
      case "all":
        e.style.display = "flex";
        break;
      case "completed":
        if (e.classList.contains("completeIt")) {
          e.style.display = "flex";
        } else {
          e.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!e.classList.contains("completeIt")) {
          e.style.display = "flex";
        } else {
          e.style.display = "none";
        }
        break;
    }
  });
}

function storeItLocal(name) {
  let localStore;
  if (localStorage.getItem("localStore") == null) localStore = [];
  else localStore = JSON.parse(localStorage.getItem("localStore"));
  localStore.push(name);
  localStorage.setItem("localStore", JSON.stringify(localStore));
}

function getFromLocal() {
  let localStore;
  if (localStorage.getItem("localStore") == null) localStore = [];
  else localStore = JSON.parse(localStorage.getItem("localStore"));
  localStore.forEach(function (local) {
    const newItem = document.createElement("div");
    newItem.classList.add("todoList");

    const theItem = document.createElement("li");
    theItem.classList.add("the-list");
    theItem.innerText = local;
    newItem.appendChild(theItem);

    const completeBtn = document.createElement("button");
    completeBtn.classList.add("complete-btn");
    completeBtn.innerHTML = '<i class="fas fa-check fa-lg"></i>';
    newItem.appendChild(completeBtn);

    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = '<i class="fas fa-trash fa-lg"></i>';
    newItem.appendChild(trashBtn);

    itemContainer.appendChild(newItem);
  });
}

function deleteFromLocal(name) {
  let localStore;
  if (localStorage.getItem("localStore") == null) localStore = [];
  else localStore = JSON.parse(localStorage.getItem("localStore"));
  const index = localStore.indexOf(name);
  localStore.splice(index, 1);
  localStorage.setItem("localStore", JSON.stringify(localStore));
}
