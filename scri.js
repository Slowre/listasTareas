const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const addTareaButton = document.getElementById("add-tarea");
const containformAddList = document.getElementById("contain-form-add-list");
const closeformAddListButton = document.getElementById("close-form-add-list");
const formAddList = document.getElementById("form-add-list");
const contenedorListas = document.getElementById("container-flujo");
const firtList = document.getElementsByClassName("colum-list");

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
  changeFormAddlistVisibility();
  addList(data);
});

function addList(data) {
  const newList = document.createElement("div");
  const newListDivHead = document.createElement("div");
  const newListDivHeadTitle = document.createElement("div");
  const newListHeadTitle = document.createElement("label");
  newListHeadTitle.textContent = data["newListName"];
  newListHeadTitle.classList.add("title-list");
  newListHeadTitle.contentEditable = true;
  newListDivHeadTitle.appendChild(newListHeadTitle);
  const svgHtml = `
  <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="menu-list"
  >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M19 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
  </svg>
  `;
  newListDivHeadTitle.innerHTML += svgHtml;
  newListDivHeadTitle.classList.add("container-title-list");
  newListDivHead.appendChild(newListDivHeadTitle);
  newListDivHead.classList.add("containt-list");
  newList.classList.add("colum-list");
  newList.classList.add("colum-list-tareas");
  newList.appendChild(newListDivHead);

  contenedorListas.insertBefore(newList, firtList[firtList.length - 1]);
}

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
