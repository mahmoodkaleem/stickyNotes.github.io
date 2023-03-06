const main = document.getElementById("main");

//add note button
const addButton = document.getElementById("add-btn");
addButton.addEventListener("click", () => {
    addNote();
});

//add new notes box
const addNote = (localData = "") => {
    const box = document.createElement("div");
    box.classList.add("box");
    box.innerHTML = `<h1 id="tool-bar">
<i class="save fa-solid fa-floppy-disk"></i>
<i class="trash fa-solid fa-trash"></i>
</h1>
<textarea name="" id="textarea" >${localData}</textarea>`;
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

};

//iife function for page refrash and resotre saved data
(() => {
    let savedNotes = localStorage.getItem("notes");
    if (savedNotes === null) {
        addNote()
    } else {
        savedNotes = savedNotes.split(",")
        savedNotes.forEach((savedValue) => {
            addNote(savedValue)
        })
    }
})()