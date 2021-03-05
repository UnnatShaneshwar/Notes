const container = document.querySelector(".container");
const addBtn = document.querySelector("#add-note-btn");

const updateData = () => {
  const txtAreaData = document.querySelectorAll(".note-text-inp");
  const notes = [];
  txtAreaData.forEach((note) => {
    return notes.push(note.value);
  });
  localStorage.setItem("notes", JSON.stringify(notes));
};

const addNote = (txt = "") => {
  const note = document.createElement("div");
  note.classList.add("note");
  const noteHtmlData = `<div class="action-button">
  <button id="ok" class="btn-style-2 ${txt ? "hidden" : ""}">
    <i class="fas fa-check"></i> Save 
  </button>
  <button id="delete" class="btn-style-1 btn-circle">
    <i class="fas fa-trash-alt"></i>
  </button></div>
  <div class="note-text ${txt ? "" : "hidden"}"></div>
  <textarea class="note-text-inp ${
    txt ? "hidden" : ""
  }" placeholder="Type here">
  </textarea>`;
  note.insertAdjacentHTML("beforeend", noteHtmlData);
  container.appendChild(note);

  const okBtn = note.querySelector("#ok");
  const delBtn = note.querySelector("#delete");
  const noteTxt = note.querySelector(".note-text");
  const txtArea = note.querySelector(".note-text-inp");
  const empNoteErr = document.querySelector("#empty-note-error");
  txtArea.focus();

  // Deleting Note
  delBtn.addEventListener("click", () => {
    note.remove();
    updateData();
  });
  txtArea.value = txt;
  noteTxt.innerHTML = txt;

  // Editing Note
  const editSaveNote = () => {
    noteTxt.classList.toggle("hidden");
    txtArea.classList.toggle("hidden");
    okBtn.classList.toggle("hidden");
    noteTxt.innerHTML = txtArea.value;
    txtArea.focus();
    if (txtArea.value == "") {
      note.remove();
      empNoteErr.style.opacity = "1";
      setTimeout(() => {
        empNoteErr.style.opacity = "0";
      }, 2000);
    }
    updateData();
  };
  noteTxt.addEventListener("click", editSaveNote);
  okBtn.addEventListener("click", editSaveNote);
};

const notes = JSON.parse(localStorage.getItem("notes"));
if (notes) {
  notes.forEach((note) => {
    return addNote(note);
  });
}
addBtn.addEventListener("click", () => addNote());
