//select elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");


//classes names
const check = "fa-check-circle";
const uncheck = "fa-circle-thin";
const line_through = "lineThrough";

//variables
let LIST = [];
id = 0;

//get item from local storage
let data = localStorage.getItem("TODO");


//check id data is not empty
if (data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST); //load the list to the user
} else {
    // if data is not empty
    LIST = [];
    id = 0;
}

//load items to the user's interface
function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//clear the local storage
clear.addEventListener("click", function() {
        localStorage.clear();
        location.reload();
    })
    //show todays date list
const options = {
    weekday: "long",
    month: "short",
    day: "numeric",
};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//add to do function
function addToDo(toDo, id, done, trash) {

    if (trash) { return; }

    const DONE = done ? check : uncheck;
    const line = done ? line_through : "";

    const item = `
    <li class="item">
    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
    <p class="text ${line}">${toDo}</p>
    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
    </li>
    `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//add an item to the list user the enter key
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        const toDo = input.value;

        //if the inputis not empty
        if (toDo) {
            addToDo(toDo);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            //add items to local storage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++
        }
        input.value = "";
    }
});

//complete to do
function completeToDo(element) {
    element.classList.toggle(check);
    element.classList.toggle(uncheck);
    element.parentNode.querySelector(
        ".text").classList.toggle(line_through);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//remove to do 
function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}

//target the items created dynamically
list.addEventListener("click", function(event) {
    const element = event.target; //return the clicked element inside list
    const elementJob = element.attributes.job.value; //complete or delete

    if (elementJob === "complete") {
        completeToDo(element);
    } else if (elementJob === "delete") {
        removeToDo(element);
    }
    //add items to local storage
    localStorage.setItem("TODO", JSON.stringify(LIST));
})