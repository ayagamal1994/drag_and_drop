var inputElement = document.querySelector("#textVal");
var addButton = document.querySelector(".add-project-btn");
var progress = document.querySelector('[data-type="progress"]');
var tasksSection = document.querySelectorAll(".tasksSection");
var id = 0;
var allElements = [];



addButton.addEventListener("click", addElement);

//add element function
function addElement(e) {
    e.preventDefault();
    
    var regEx = /[a-z0-9]{1,40}/gi;
    
    if(regEx.test(inputElement.value)){
        var elementData = {
        title: inputElement.value,
        type: "progress",
        id: ++id
        }

        allElements.push(elementData);
        console.log(allElements);
        displayElements();
        inputElement.value="";
    }
    
    

}

//display function
function displayElements(){
    for(var i =0; i<tasksSection.length; i++){
        tasksSection[i].innerHTML = "";
    }
    tasksSection.innerHTML="";
    for(var i =0; i<allElements.length; i++){
        //create element
        var element = document.createElement("li");
        element.innerHTML = `${allElements[i].title}`;
        element.setAttribute("data-type", `${allElements[i].type}`);
        element.setAttribute("draggable", "true");
        element.setAttribute("id", `${allElements[i].id}`);
        element.classList.add("task");
        element.addEventListener("dragstart", dragStart);

        var sectionContainer = document.querySelector(`.tasksSection[data-type='${allElements[i].type}']`)
        if(sectionContainer){
            sectionContainer.append(element);
        }     
    }
    setLocalStorage();
}



//drag and drop functions
for (var i = 0; i < tasksSection.length; i++) {
    tasksSection[i].addEventListener("drop", dropHandler);
    tasksSection[i].addEventListener("dragover", dragOver);
}

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
    console.log("dragstart");
}

function dragOver(e) {
    e.preventDefault();
    console.log("over");
}

function dropHandler(e) {
    e.preventDefault();
    var dragedItem = document.getElementById(e.dataTransfer.getData('text'));
    newType = e.currentTarget.getAttribute("data-type");
    var itemIndex = allElements.findIndex(function(item){
        return item.id == dragedItem.id;
    })
    if(itemIndex !== -1){
        allElements[itemIndex].type = newType;
        setLocalStorage();
    }
    this.append(dragedItem);
    console.log("drop");
}


//local storage
function setLocalStorage(){
    localStorage.setItem("elements", JSON.stringify(allElements));
}

function getLocalStorage(){
    
    const storedElements = localStorage.getItem('elements');
    if (storedElements) {
        var elementsValues = JSON.parse(storedElements);
        allElements = elementsValues;
        if (allElements.length > 0) {
            var lastElementId = allElements[allElements.length - 1].id;
            id = lastElementId;
        }
        displayElements();
        
    }
}


getLocalStorage();
