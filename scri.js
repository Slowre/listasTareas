const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const addTareaButton = document.getElementById("add-tarea");
const containformAddList = document.getElementById("contain-form-add-list");
const closeformAddListButton = document.getElementById("close-form-add-list");
const formAddList = document.getElementById("form-add-list");

const DISPLAY_FLEX = "flex";
const DISPLAY_NONE = "none";
let isFormAddListVisible = false;

function changeFormAddlistVisibility() {
  if (isFormAddListVisible) {
    containformAddList.style.display = DISPLAY_NONE;
    addTareaButton.style.display = DISPLAY_FLEX;
    formAddList.reset();
  } else {
    addTareaButton.style.display = DISPLAY_NONE;
    containformAddList.style.display = DISPLAY_FLEX;
  }
  isFormAddListVisible = !isFormAddListVisible;
}

addTareaButton.addEventListener("click", changeFormAddlistVisibility);

closeformAddListButton.addEventListener("click", changeFormAddlistVisibility);

window.addEventListener("click", (event) => {
  if (
    !event.target.closest("#add-tarea") &&
    !event.target.closest("#contain-form-add-list")
  ) {
    if (isFormAddListVisible) {
      changeFormAddlistVisibility();
    }
  }
});

formAddList.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {};
  formData.forEach((value, key) => {
    data[key] = value;
  });
  const dataForm = Object.fromEntries(formData);
  const dato = JSON.stringify(dataForm);
 
});

// const modal = document.getElementById("modal-add-tarea");
// const closeModalAddTarea = document.getElementById("closeModalBtn");

// function openModal(modalTemp) {
//   modalTemp.style.display = "flex";
//   setTimeout(() => {
//     modalTemp.classList.add("show");
//   }, 50);
// }

// function closeModal(modalTemp) {
//   modalTemp.classList.remove("show");
//   setTimeout(() => {
//     modalTemp.style.display = "none";
//   }, 300);
// }
