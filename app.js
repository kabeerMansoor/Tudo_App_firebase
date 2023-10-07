
var screen = document.getElementById("screen");
var list = document.getElementById("list");

function add() {
    if (screen.value.trim() === "") {
        alert("Please enter something to show");
    } else {
        list.innerHTML += `<li class="list-unstyled">${screen.value}<button onclick="update(this)">update</button> <button onclick="remove(this)">Delete</button></li>`;
        screen.value = "";
    }
}

function update(button) {
    var newValue = prompt("Enter new value:");
    if (newValue !== null) {
        button.previousSibling.textContent = newValue;
    }
}

function remove(button) {
    var listItem = button.parentNode;
    listItem.parentNode.removeChild(listItem);
   
}

function deleteAll(){
    list.innerHTML = ` `
}
