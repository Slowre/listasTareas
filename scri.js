const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);


const addTareaButton = document.getElementById("add-tarea");
const modal = document.getElementById("modal-add-tarea");
const closeModalAddTarea = document.getElementById("closeModalBtn");
const containformAddList = document.getElementById("contain-form-add-list");

function openModal(modalTemp) {
  modalTemp.style.display = "flex";
  setTimeout(() => {
    modalTemp.classList.add("show");
  }, 50);
}

function closeModal(modalTemp) {
  modalTemp.classList.remove("show");
  setTimeout(() => {
    modalTemp.style.display = "none";
  }, 300);
}

addTareaButton.addEventListener("click", () => {
  addTareaButton.style.display = "none";
  containformAddList.style.display = "flex";
});

containformAddList.addEventListener("click", () => {
  containformAddList.style.display = "none"; 
    addTareaButton.style.display = "flex"; 
});