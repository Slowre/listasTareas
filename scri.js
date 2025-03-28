const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

//const addTareaButton = $('#add-tarea')
//const modal = $('#modal-add-tarea')
//const closeModalAddTarea = $('#closeModalBtn')
const addTareaButton = document.getElementById("add-tarea");
const modal = document.getElementById("modal-add-tarea");
const closeModalAddTarea = document.getElementById("closeModalBtn");

function abrirModal(modalTemp) {
  modalTemp.style.display = "flex";
  setTimeout(() => {
    modalTemp.classList.add("show");
  }, 50);
}

function cerrarModal(modalTemp) {
  modalTemp.classList.remove("show");
  setTimeout(() => {
    modalTemp.style.display = "none";
  }, 300);
}

addTareaButton.addEventListener("click", () => {
  abrirModal(modal);
});
closeModalAddTarea.addEventListener("click", () => {
  cerrarModal(modal);
});

window.addEventListener("click", (event) => {
  if (event.target == modal) {
    cerrarModal(modal);
  }
});
