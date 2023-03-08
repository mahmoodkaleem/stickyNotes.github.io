const main = document.getElementById("main");

//add note button
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", () => {
  addNote();
});
let notesIndex=0;
//add new notes box
const addNote = (localData = "") => {
  notesIndex++;
  const box = document.createElement("div");
  box.classList.add("box");

  box.innerHTML = `<div id="tool-bar">
  <h1 class="name">Notes-${notesIndex}</h1>
  <h1 id="tool-icon">
    <i class="font-color fa-solid fa-pen" title="font-color"></i>
    <i class="color fa-sharp fa-solid fa-paintbrush" title="bg-color"></i>
    <i class="save fa-solid fa-floppy-disk" title="save"></i>
    <i class="trash fa-solid fa-trash" title="delete"></i>
  </h1>
</div>
  <textarea name="Title" id="textarea">${localData}</textarea>`;
  main.appendChild(box);

  //delete notes box
  const trashBtn = box.querySelector(".trash");
  trashBtn.addEventListener("click", () => {
    deleteNotes();
  });

  //delete function
  const deleteNotes = () => {
    box.remove();
    saveNotes();
    location.reload()
  };

  //save notes by onClick
  box.querySelector(".save").addEventListener("click", () => {
    saveNotes();
  });

  //save notes by focusOut
  box.querySelector("textarea").addEventListener("focusout", () => {
    saveNotes();
  });

  //saveNotes function with localstorage
  const saveNotes = () => {
    const notes = document.querySelectorAll("textarea");
    let data = [];
    notes.forEach((note) => {
      data.push(note.value);
    });
    if (data.length == 0) {
      localStorage.removeItem("notes");
    } else {
      localStorage.setItem("notes", data);
    }
    
  };

  //background color buttton
  const colorBtn = box.querySelector(".color");
  colorBtn.addEventListener("click", () => {
    bgColorCode();
  });

  //function for randomcolor of textarea background
  const bgColorCode = ( ) => {
    let textarea = box.querySelector("textarea");
    ColorNum = Math.floor(Math.random() * 16777215);
    hexCode = "#" + ColorNum.toString(16);
    if (hexCode.length < 7) {
      hexCode = hexCode + 1;
      textarea.style.backgroundColor = hexCode;
      colorBtn.style.color= hexCode;
    } else {
      textarea.style.backgroundColor = hexCode;
      colorBtn.style.color= hexCode;
    }
  };

//font color buttton
const fontColorBtn = box.querySelector(".font-color");
fontColorBtn.addEventListener("click", () => {
  fontColorCode();
});

//function for randomcolor of textarea font
const fontColorCode = () => {
    let textarea = box.querySelector("textarea");
    ColorNum = Math.floor(Math.random() * 16777215);
    hexCode = "#" + ColorNum.toString(16);
    localStorage.setItem("color",hexCode)
    if (hexCode.length < 7) {
      hexCode = hexCode + 1;
      textarea.style.color = hexCode;
      fontColorBtn.style.color= hexCode;
    } else {
      textarea.style.color = hexCode;
      fontColorBtn.style.color= hexCode;
    }
  };

};

//iife function for page refrash and resotre saved data
(() => {
  let savedNotes = localStorage.getItem("notes");
  if (savedNotes === null) {
    addNote();
  } else {
    savedNotes = savedNotes.split(",");
    savedNotes.forEach((savedValue) => {
      addNote(savedValue);
    });
  }
})();
