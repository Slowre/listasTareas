const $ = (el) => document.querySelector(el);
const $$ = (el) => document.querySelectorAll(el);

const addTareaButton = document.getElementById("add-lista");
const containformAddList = document.getElementById("contain-form-add-list");
const closeformAddListButton = document.getElementById("close-form-add-list");
const formAddList = document.getElementById("form-add-list");
const contenedorListas = document.getElementById("container-flujo");
const firtList = document.getElementsByClassName("colum-list");

const resetLocal = $("#reset-local");

const addTareasButton = document.querySelectorAll(".container-add-tarea");
const containAddTareasForm = document.querySelectorAll(
  ".contain-form-add-tareas"
);

const closeTareasForm = document.querySelectorAll("#close-form-add-tarea");
const addTareaForm = document.querySelectorAll(".form-add-tarea");

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
    containformAddList.querySelector("#newListName").focus();
  }
  isFormAddListVisible = !isFormAddListVisible;
}

addTareaButton.addEventListener("click", changeFormAddlistVisibility);

closeformAddListButton.addEventListener("click", changeFormAddlistVisibility);

window.addEventListener("click", (event) => {
  if (
    !event.target.closest("#add-lista") &&
    !event.target.closest("#contain-form-add-list")
  ) {
    if (isFormAddListVisible) {
      changeFormAddlistVisibility();
    }
  }
  const containerAddTareaTarget = event.target.closest(".container-add-tarea");
  const containerFormTareaTarget = event.target.closest(
    ".contain-form-add-tareas"
  );

  const allFormContainers = document.querySelectorAll(
    ".contain-form-add-tareas"
  );

  const allAddButtons = document.querySelectorAll(".container-add-tarea");

  if (!containerFormTareaTarget && !containerAddTareaTarget) {
    allFormContainers.forEach((formContainer) => {
      formContainer.style.display = DISPLAY_NONE;
      formContainer.querySelector(".form-add-tarea").reset();
    });
    allAddButtons.forEach((button) => {
      button.style.display = DISPLAY_FLEX;
    });
  }
  if (containerFormTareaTarget) {
    const containtList = event.target.closest(".containt-list");
    const containAddTareasTemp = containtList.querySelector(
      ".container-add-tarea"
    );
    allFormContainers.forEach((formContainer) => {
      if (formContainer != containerFormTareaTarget) {
        formContainer.style.display = DISPLAY_NONE;
        formContainer.querySelector(".form-add-tarea").reset();
      }
    });
    allAddButtons.forEach((button) => {
      if (button != containAddTareasTemp) {
        button.style.display = DISPLAY_FLEX;
      }
    });
  }

  if (containerAddTareaTarget) {
    const containtList = event.target.closest(".containt-list");
    const formContainerTemp = containtList.querySelector(
      ".contain-form-add-tareas"
    );
    allFormContainers.forEach((formContainer) => {
      if (formContainer != formContainerTemp) {
        formContainer.style.display = DISPLAY_NONE;
        formContainer.querySelector(".form-add-tarea").reset();
      }
    });
    allAddButtons.forEach((button) => {
      if (button != containerAddTareaTarget) {
        button.style.display = DISPLAY_FLEX;
      }
    });
  }
});

formAddList.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = {};

  formData.forEach((value, key) => {
    data[key] = value;
  });
  if (data["newListName"] != "") {
    const dataForm = Object.fromEntries(formData);
    const dato = JSON.stringify(dataForm);
    changeFormAddlistVisibility();
    addList(data);
  }
});

function createElement(etiqueta, atributos = {}, children = []) {
  const element = document.createElement(etiqueta);
  Object.entries(atributos).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
  children.forEach((child) => {
    if (typeof child === "string") {
      element.innerHTML += child;
    } else {
      element.appendChild(child);
    }
  });
  return element;
}

function addList(data) {
  const titleList = createElement(
    "label",
    { class: "title-list", contenteditable: "true" },
    [data["newListName"]]
  );

  const svgHtmlMenuList = `
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

  const headDivList = createElement("div", { class: "container-title-list" }, [
    titleList,
    svgHtmlMenuList,
  ]);

  const contenedorTareasDivList = createElement("div", {
    class: "container-tareas-list",
  });

  const labelHtmlAddTareaList = `
    <label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
      Añadir nueva tarea
    </label>
  `;
  const contenedorAddTareasDivList = createElement(
    "div",
    { class: "container-add-tarea" },
    [labelHtmlAddTareaList]
  );

  const formHtmlAddTareaList = `
  <form id="form-add-tarea" class="form-add-tarea">
    <input
      type="text"
      class="input-max-width"
      placeholder="Ingrese el nombre de la tarea"
      name="newTareaName"
      id="newTareaName"
      autocomplete="off"
    />
    <div class="content-button-adds">
      <button type="submit" class="button-submit-accept">
        Añadir tarea
      </button>
      <button type="button" class="button-without-background" id="close-form-add-tarea">
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  </form>
  `;

  const contenedorFormAddTareasDivList = createElement(
    "div",
    {
      class: "contain-adds contain-form-add-tareas",
      id: "contain-form-add-tarea",
    },
    [formHtmlAddTareaList]
  );

  const containList = createElement("div", { class: "containt-list" }, [
    headDivList,
    contenedorTareasDivList,
    contenedorAddTareasDivList,
    contenedorFormAddTareasDivList,
  ]);

  const newList = createElement(
    "div",
    { class: "colum-list colum-list-tareas" },
    [containList]
  );

  contenedorListas.insertBefore(newList, firtList[firtList.length - 1]);
  setupDynamicEvents();
  setInfoToStorage();
}

function setupDynamicEvents() {
  document.removeEventListener("click", handleClickEvents);
  document.removeEventListener("submit", handleSubmitEvents);
  document.removeEventListener("change", handleChangeEvents);

  document.addEventListener("click", handleClickEvents);
  document.addEventListener("submit", handleSubmitEvents);
  document.addEventListener("change", handleChangeEvents);
}

function handleChangeEvents(event) {
  const checkbox = event.target.closest(".checkbox");

  if (checkbox) {
    setInfoToStorage();
  }
}

function handleClickEvents(event) {
  const button = event.target.closest(".container-add-tarea");
  const closeButton = event.target.closest("#close-form-add-tarea");

  if (button) {
    const formContainer = button.nextElementSibling;
    button.style.display = DISPLAY_NONE;
    formContainer.style.display = DISPLAY_FLEX;
    formContainer.querySelector("input").focus();
  }

  if (closeButton) {
    const formContainer = closeButton.closest(".contain-form-add-tareas");
    const addButton = formContainer.previousElementSibling;
    formContainer.style.display = DISPLAY_NONE;
    addButton.style.display = DISPLAY_FLEX;

    formContainer.querySelector(".form-add-tarea").reset();
  }
}

function handleSubmitEvents(event) {
  if (event.target.classList.contains("form-add-tarea")) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());

    if (formObject["newTareaName"] != "") {
      const containtList = event.target.closest(".containt-list");
      const containTareasTemp = containtList.querySelector(
        ".container-tareas-list"
      );

      const formContainer = event.target.closest(".contain-form-add-tareas");
      const addButton = formContainer.previousElementSibling;

      addTarea(formObject["newTareaName"], containTareasTemp);
      event.target.reset();
    } else {
      console.log("presiono x input vacio pero hizo submit");
    }
  }
}

function addTarea(data, contain) {
  const titleTarea = createElement("label", { class: "title-tarea" }, [data]);
  const checkboxTarea = createElement(
    "input",
    { class: "checkbox", type: "checkbox" },
    []
  );
  const containtCheckTarea = createElement(
    "label",
    { class: "custom-checkbox" },
    [checkboxTarea]
  );

  const containtTarea = createElement("div", { class: "containt-tarea" }, [
    containtCheckTarea,
    titleTarea,
  ]);

  contain.appendChild(containtTarea);
  setupDynamicEvents();
  setInfoToStorage();
}

function setInfoToStorage() {
  const allList = document.querySelectorAll(".containt-list");
  let listas = [];
  Array.from(allList).forEach((list, indexList) => {
    const titleElement = list.querySelector(".title-list");

    const allTareas = list.querySelectorAll(".containt-tarea");
    let tareas = [];
    Array.from(allTareas).forEach((tarea, indexTarea) => {
      const checkElement = tarea.querySelector(".checkbox");
      const titleTareaElement = tarea.querySelector(".title-tarea");
      const tareatmp = {
        checked: checkElement.checked,
        title: titleTareaElement.textContent,
      };
      tareas.push(tareatmp);
    });
    const listTmp = {
      title: titleElement.textContent,
      tareas: tareas,
    };
    listas.push(listTmp);
  });
  localStorage.setItem("tareas", JSON.stringify(listas));
}

function getInfoToStorage() {
  const listas = JSON.parse(localStorage.getItem("tareas"));
  if (listas) {
    listas.forEach((list, indexList) => {
      loadList(list.title, list.tareas);
    });
  }
}

function loadList(listTitle, listTareas) {
  const titleList = createElement(
    "label",
    { class: "title-list", contenteditable: "true" },
    [listTitle]
  );

  const svgHtmlMenuList = `
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

  const headDivList = createElement("div", { class: "container-title-list" }, [
    titleList,
    svgHtmlMenuList,
  ]);

  const contenedorTareasDivList = createElement("div", {
    class: "container-tareas-list",
  });

  if (listTareas) {
    listTareas.forEach((tarea, indexTarea) => {
      const titleTarea = createElement("label", { class: "title-tarea" }, [
        tarea.title,
      ]);
      const checkboxTarea = createElement(
        "input",
        { class: "checkbox", type: "checkbox" },
        []
      );
      checkboxTarea.checked = tarea.checked;
      const containtCheckTarea = createElement(
        "label",
        { class: "custom-checkbox" },
        [checkboxTarea]
      );

      const containtTarea = createElement("div", { class: "containt-tarea" }, [
        containtCheckTarea,
        titleTarea,
      ]);

      contenedorTareasDivList.appendChild(containtTarea);
    });
  }

  const labelHtmlAddTareaList = `
    <label>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M12 5l0 14" />
        <path d="M5 12l14 0" />
      </svg>
      Añadir nueva tarea
    </label>
  `;
  const contenedorAddTareasDivList = createElement(
    "div",
    { class: "container-add-tarea" },
    [labelHtmlAddTareaList]
  );

  const formHtmlAddTareaList = `
  <form id="form-add-tarea" class="form-add-tarea">
    <input
      type="text"
      class="input-max-width"
      placeholder="Ingrese el nombre de la tarea"
      name="newTareaName"
      id="newTareaName"
      autocomplete="off"
    />
    <div class="content-button-adds">
      <button type="submit" class="button-submit-accept">
        Añadir tarea
      </button>
      <button type="button" class="button-without-background" id="close-form-add-tarea">
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
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
        </svg>
      </button>
    </div>
  </form>
  `;

  const contenedorFormAddTareasDivList = createElement(
    "div",
    {
      class: "contain-adds contain-form-add-tareas",
      id: "contain-form-add-tarea",
    },
    [formHtmlAddTareaList]
  );

  const containList = createElement("div", { class: "containt-list" }, [
    headDivList,
    contenedorTareasDivList,
    contenedorAddTareasDivList,
    contenedorFormAddTareasDivList,
  ]);

  const newList = createElement(
    "div",
    { class: "colum-list colum-list-tareas" },
    [containList]
  );

  contenedorListas.insertBefore(newList, firtList[firtList.length - 1]);
  setupDynamicEvents();
}

resetLocal.addEventListener("click", () => {
  localStorage.clear();
  const allList = document.querySelectorAll(".colum-list-tareas");

  allList.forEach((element) => {
    element.remove();
  });
});

getInfoToStorage();

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
