var screen = document.getElementById("screen");
var list = document.getElementById("list");
var name = document.getElementById("name");
var todo = [];


window.render = function(){
    list.innerHTML=` `
    for(var i=0;i<todo.length;i++){
        list.innerHTML += `<li class="list-unstyled">${todo[i]}<button onclick="update(${i})" class="px-5 py-2 mt-2 btn btn-primary" ><i class="fa-solid fa-pen"></i> update</button> <button onclick="remove(${i})" class="px-5 py-2 mt-2 btn btn-danger " ><i class="fa-solid fa-xmark"></i> remove</button></li>`
    }
}

window.add = function() {
    if (screen.value.trim() === "" ) {
        alert("Please enter something in the input field.");
    } else {
        todo.push(screen.value);
        screen.value = "";
        sendDataToDatabase(); // Call the function to send data to the database
    }
    render();
}


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase , set , ref, onValue,push } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

 var firebaseConfig = {
    apiKey: "AIzaSyBq-0Xgqvr0UNoH0deHXvbc5Ujtz_lmQHY",
    authDomain: "mytudoapp-50a83.firebaseapp.com",
    projectId: "mytudoapp-50a83",
    storageBucket: "mytudoapp-50a83.appspot.com",
    messagingSenderId: "177539787754",
    appId: "1:177539787754:web:1f04f20a842eab11aba093",
    measurementId: "G-Q030KBMVPE"
  };

 // Initialize Firebase
 var app = initializeApp(firebaseConfig);
 var DB = getDatabase(app);




 var tasksRef = ref(DB, 'tasks');

// Add a value event listener to retrieve data from Firebase database
onValue(tasksRef, (snapshot) => {
    todo = []; // Clear the local todo array
    if (snapshot.exists()) {
        todo = snapshot.val(); // Update local todo array with data from Firebase
    }
    render(); 
});



//  Function to send Data to Database:

function generateUniqueId() {
    return new Date().getTime().toString();
}

window.sendDataToDatabase = function() {
    var userId = generateUniqueId();

    var userData = {
        name: name.value,
    };
    var reference = ref(DB, `users/${userData.name}/tasks`);
    set(reference, todo);
    render();
};





window.update = function(indexnumber) {
    var updatedValue = prompt("Enter the updated value:");
    if (updatedValue !== null) {
        todo[indexnumber] = updatedValue;
        updateDataToDatabase(todo); // Update data in the Firebase database
        render();
    }
};

// Function to update data to Database:
window.updateDataToDatabase = function(updatedTodo) {
    sendDataToDatabase();
};



window.removeDataFromDatabase = function(indexnumber) {
  
    todo.splice(indexnumber, 1); 
   sendDataToDatabase();
};

//function to delete data from database:
window.remove = function(indexnumber) {
    removeDataFromDatabase(indexnumber);
};





//function to delete All data:
window.deleteAll = function() {
    deleteAllDataFromDatabase();
};
window.deleteAllDataFromDatabase = function() {
    todo = []; 
    list.innerHTML = ""; 
    sendDataToDatabase();
};