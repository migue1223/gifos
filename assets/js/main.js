"use strict";

import apiGiphy from "../../api/index.js";
import {
  renderSpanIconFavorite,
  renderGifo,
  renderRemoveIconFavorite,
  renderListTrendings,
} from "./funcionesGenerales.js";

const containerGifos = document.querySelector(".containerImgGifos"); //resultados de gifos slide
const containerTrendingGifos = document.getElementById("trendingGifos");
const containerSearchGifos = document.getElementById("resultsGifos"); //resultados de gifos busqueda
const containerSearchResultsGifos = document.querySelector(
  ".contentResultsGifos"
);
const containerMisGifos = document.querySelector(".misGifosFavoritos");
const containerMisGifosFavoritos = document.getElementById(
  "containerMisGifosFavoritos"
);
const containerMisGifos_ = document.querySelector(".misGifos");
const container_MisGifos = document.getElementById("containerMisGifos");
const containerBuscador = document.querySelector(".sectionBuscador");
const containerModal = document.getElementById("containerOpenModal");
const containerNotFoundFavorites = document.getElementById("notFoundFavorites");
const containerNotFoundMisGifos = document.getElementById("notFoundMisGifos");
const containerTrendingP = document.querySelector(".containerTrendingP");
const containerCrearGifo = document.getElementById("containerSubirGifo");

const inputSearch = document.getElementById("inputSearch");
const imageBuscador = document.querySelector(".imageBuscador");
const closeModal = document.querySelector(".closeModal");
const iconCloseModal = closeModal.querySelector("img");
const titleBuscador = document.querySelector(".titleBuscador");
const titleMisGifos = document.getElementById("liMisGifosFavoritos");
const titleGifos = document.getElementById("misGifos");
const titleMisGifo = document.querySelector(".titleMisGifos");
const titleModoNocturno = document.getElementById("modoNocturno");
const titleFavorites = document.querySelector(".trendingGifos");
const iconClose = document.querySelector(".iconClose");
const iconSearch = document.querySelector(".iconSearch");
const seeMoreButton = document.getElementById("verMasGifs");
const seeMoreButtonFavorite = document.getElementById("verMasGifsFavoritos");
const imageHeader = document.querySelector(".headerFigure");
const buttonSliderLeft = document.querySelector(".buttonSliderLeft");
const buttonSliderRight = document.querySelector(".buttonSliderRight");
const moveSlider = document.querySelector(".avanzarSliderTrending");
const backSlider = document.querySelector(".retrocederSliderTrending");
const body = document.body;
const imgLogo = imageHeader.querySelector("img");
const imgCrearGifo = document.querySelector(".crearGifos");
const texts = body.querySelectorAll("h1, h2, h3, p, li a");
const imgSliderLeft = body.querySelectorAll(".buttonSliderLeft");
const imgSliderRight = body.querySelectorAll(".buttonSliderRight");
const buttonsVerMas = body.querySelectorAll(".button-ver-mas");
const p = body.querySelectorAll(".p-dark-mode");
const modalGifos = document.getElementById("openModal");
const navMovil = document.querySelector(".botoneraMovil");
const buttonNavMovil = document.querySelector(".icons-bars-times");
const buttonFabars = document.querySelector(".fa-bars");
const buttonFatimes = document.querySelector(".fa-times");

let dataSearchs = [];
let resSlider = [];
let dataAvanzarSlider = [];
localStorage.setItem("mode-dark", "white");

//click modo nocturno
titleModoNocturno.addEventListener("click", () => {
  if (localStorage.getItem("mode-dark") === "black") {
    localStorage.setItem("mode-dark", "white");
  } else {
    localStorage.setItem("mode-dark", "black");
  }
  body.classList.toggle("dark-mode");
  containerGifos.classList.toggle("container-dark-mode");
  titleMisGifo.classList.toggle("dark-mode");
  titleFavorites.classList.toggle("dark-mode");
  const pListTrendings = containerTrendingP.querySelectorAll("p");

  const a = titleModoNocturno.querySelector("a");

  if (a.innerHTML === "Modo Nocturno") {
    a.innerHTML = "Modo Diurno";
    imgLogo.src = "assets/img/Logo-modo-noc.svg";
    imgCrearGifo.src = "assets/img/CTA-crar-gifo-modo-noc.svg";
    iconSearch.src = "assets/img/icon-search-modo-noct.svg";
    iconClose.src = "assets/img/close-modo-noct.svg";
    iconCloseModal.src = "assets/img/close-modo-noct.svg";
    containerTrendingGifos.classList.add("trending-gifos-dark");
    containerTrendingGifos.classList.remove("trending-gifos-white");
    containerGifos.classList.add("trending-gifos-dark");
    containerGifos.classList.remove("trending-gifos-white");
    inputSearch.classList.add("input-dark-mode");
    inputSearch.classList.remove("input-white-mode");
    containerModal.classList.add("modal-dark-mode");
    containerModal.classList.remove("modal-white-mode");
    navMovil.classList.remove("nav-white-mode");
    if (window.matchMedia("(max-width:767px)").matches) {
      navMovil.classList.add("trending-gifos-dark");
    }
    navMovil.style.opacity = "1";

    imgSliderLeft.forEach((item) => {
      item.src = "assets/img/button-slider-left-md-noct.svg";
      item.classList.add("hover-slider-left");
      item.classList.remove("white-mode-slider-left");
    });
    imgSliderRight.forEach((item) => {
      item.src = "assets/img/button-slider-right-md-noct.svg";
      item.classList.add("hover-slider-right");
      item.classList.remove("white-mode-slider-right");
    });

    buttonsVerMas.forEach((item) => {
      item.classList.add("dark-ver-mas");
      item.classList.remove("white-ver-mas");
    });

    texts.forEach((item) => {
      item.classList.add("text-dark-mode");
      item.classList.remove("text-white-mode");
    });
    p.forEach((item) => {
      item.classList.add("text-dark-mode");
      item.classList.remove("p-dark-mode");
    });

    pListTrendings.forEach((item) => {
      item.classList.add("text-dark-mode");
      item.classList.remove("text-white-mode");
    });
  } else {
    a.innerHTML = "Modo Nocturno";
    imgLogo.src = "assets/img/logo-desktop.svg";
    imgCrearGifo.src = "assets/img/button-crear-gifo.svg";
    iconSearch.src = "assets/img/icon-search.svg";
    iconClose.src = "assets/img/close.svg";
    iconCloseModal.src = "assets/img/close.svg";
    containerTrendingGifos.classList.remove("trending-gifos-dark");
    containerTrendingGifos.classList.add("trending-gifos-white");
    containerGifos.classList.remove("trending-gifos-dark");
    containerGifos.classList.add("trending-gifos-white");
    inputSearch.classList.remove("input-dark-mode");
    inputSearch.classList.add("input-white-mode");
    containerModal.classList.remove("modal-dark-mode");
    containerModal.classList.add("modal-white-mode");
    navMovil.classList.add("nav-white-mode");
    if (window.matchMedia("max-width:767px")) {
      navMovil.classList.remove("trending-gifos-dark");
    }
    // navMovil.style.opacity = "0.9";

    imgSliderLeft.forEach((item) => {
      item.src = "assets/img/button-slider-left.svg";
      item.classList.remove("hover-slider-left");
      item.classList.add("white-mode-slider-left");
    });
    imgSliderRight.forEach((item) => {
      item.src = "assets/img/Button-Slider-right.svg";
      item.classList.remove("hover-slider-right");
      item.classList.add("white-mode-slider-right");
    });

    buttonsVerMas.forEach((item) => {
      item.classList.remove("dark-ver-mas");
      item.classList.add("white-ver-mas");
    });
    texts.forEach((item) => {
      item.classList.remove("text-dark-mode");
      item.classList.add("text-white-mode");
    });
    p.forEach((item) => {
      item.classList.remove("text-dark-mode");
      item.classList.add("p-dark-mode");
    });

    pListTrendings.forEach((item) => {
      item.classList.remove("text-dark-mode");
      item.classList.add("text-white-mode");
    });
  }
});

//click en button nav movil
buttonNavMovil.addEventListener("click", () => {});

// click input search & iconClose
inputSearch.addEventListener("click", () => {
  const listSearch = [];
  localStorage.setItem("listSearch", JSON.stringify(listSearch));
  hideTitleImageSearch();
});

// cerrar el buscador
iconClose.addEventListener("click", () => {
  showTitleImageSearch();
  const ulContainerSearch = document.querySelectorAll(".ulContentSearch");
  ulContainerSearch.forEach((item) => (item.style.display = "none"));
});

// change input search
inputSearch.addEventListener("keyup", (e) => {
  const valueInput = inputSearch.value;
  if (e.key === "Enter") {
    getResultsTags(valueInput);
    showTitleImageSearch();
    removeUlSearch();
  } else {
    getSuggestionsSearh(valueInput);
    removeClassLoader();
  }
  if (valueInput === "") {
    removeUlSearch();
  }
});

// click button ver mas gifos en busquedas
let offset = 0;
seeMoreButton.addEventListener("click", async () => {
  const keywords = document.getElementById("titleCategorySearch").innerHTML;
  offset = offset + 12;
  try {
    const results = await apiGiphy.getSeeMoreGifos(keywords, offset, 12);
    const res = await results.json();
    renderGifo(res.data, containerSearchResultsGifos, "searchSlider");
    res.data.forEach((item) => dataSearchs.push(item));

    localStorage.setItem("listSearch", JSON.stringify(dataSearchs));

    removeClassLoader();
  } catch (error) {
    console.error(error);
  }
});

// click cerrar modal
closeModal.addEventListener("click", () => {
  const imgs = containerModal.querySelectorAll("figure");
  const favoriteIcon = containerModal.querySelector(".validate-favorite");
  const classFavorite = containerModal.querySelector(".icon-add-favorite");
  const idGifo = favoriteIcon.getAttribute("data-id-gifo");

  if (imgs.length > 0) {
    imgs.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  const listContainerSlider = containerGifos.querySelectorAll(
    "figure span .validate-favorite"
  );
  const listContainerSearch = containerSearchGifos.querySelectorAll(
    "figure span .validate-favorite"
  );

  if (listContainerSlider.length > 0) {
    // renderSpanIconFavorite(listContainerSlider);
    renderRemoveIconFavorite(listContainerSlider, idGifo, classFavorite);
  }
  if (listContainerSearch.length > 0) {
    // renderSpanIconFavorite(listContainerSearch);
    renderRemoveIconFavorite(listContainerSlider, idGifo, classFavorite);
  }

  modalGifos.style.display = "none";
});

// click en mis favoritos
titleMisGifos.addEventListener("click", () => {
  containerBuscador.style.display = "none";
  containerMisGifos_.style.display = "none";
  containerNotFoundFavorites.style.display = "none";
  containerCrearGifo.style.display = "none";
  containerMisGifos.style.display = "flex";

  if (apiGiphy.localStorageFavorites.length === 0) {
    containerNotFoundFavorites.style.display = "flex";
  }

  const imgs = containerMisGifosFavoritos.querySelectorAll("figure");
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  if (apiGiphy.localStorageFavorites.length < 12) {
    seeMoreButtonFavorite.style.display = "none";
    containerMisGifosFavoritos.style.marginBottom = "78px";
  } else {
    seeMoreButtonFavorite.style.display = "initial";
    containerMisGifosFavoritos.style.marginBottom = "0px";
  }
  renderGifo(
    apiGiphy.localStorageFavorites.slice(0, 12),
    containerMisGifosFavoritos,
    "favoritesSlider"
  );
  removeClassLoader();
});

// click button ver mas favoritos
let offsetInicio = 0;
let offsetFin = 12;
seeMoreButtonFavorite.addEventListener("click", async () => {
  offsetInicio = offsetInicio + 12;
  offsetFin = offsetFin + 12;
  try {
    renderGifo(
      apiGiphy.localStorageFavorites.slice(offsetInicio, offsetFin),
      containerMisGifosFavoritos,
      "favoritesSlider"
    );
    removeClassLoader();
  } catch (error) {
    console.error(error);
  }
});

// click en title mis gifos
titleGifos.addEventListener("click", () => {
  containerBuscador.style.display = "none";
  containerMisGifos.style.display = "none";
  containerNotFoundMisGifos.style.display = "none";
  containerCrearGifo.style.display = "none";
  containerMisGifos_.style.display = "flex";

  if (apiGiphy.localStorageMisGifos.length === 0) {
    containerNotFoundMisGifos.style.display = "flex";
  }
  const imgs = containerMisGifos_.querySelectorAll("figure");
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }
  renderGifo(
    apiGiphy.localStorageMisGifos.slice(0, 12),
    container_MisGifos,
    "misGifosSlider"
  );
  removeClassLoader();
});

// click en image header
imageHeader.addEventListener("click", () => {
  containerMisGifos.style.display = "none";
  containerMisGifos_.style.display = "none";
  containerCrearGifo.style.display = "none";
  containerBuscador.style.display = "flex";
  containerTrendingGifos.style.display = "flex";
  containerGifos.style.display = "flex";

  const imgs = containerGifos.querySelectorAll("figure");
  imgs.forEach((item) => item.parentNode.removeChild(item));

  getLastGifs();
  listTrendingSearch();
});

// funciones
async function avanzarSlider() {
  const spanFavorite = containerModal.querySelector(
    "figure span .validate-favorite"
  );
  const idGifo = spanFavorite.getAttribute("data-id-gifo");
  const classSlider = spanFavorite.getAttribute("data-classSlider");

  const indexFavorites = apiGiphy.localStorageFavorites.findIndex(
    (item) => item.id === idGifo
  );
  const indexTrending = apiGiphy.localStorageTrending.findIndex(
    (item) => item.id === idGifo
  );
  let indexSearch;
  if (localStorage.getItem("listSearch") !== null) {
    indexSearch = JSON.parse(localStorage.getItem("listSearch")).findIndex(
      (item) => item.id === idGifo
    );
  }

  const indiceFavorites = apiGiphy.localStorageFavorites.length - 1;
  const indiceTrending = apiGiphy.localStorageTrending.length - 1;
  const indiceSearch = apiGiphy.localStorageSearch.length - 1;

  buttonSliderLeft.style.visibility = "hidden";
  buttonSliderRight.style.visibility = "hidden";

  const imgs = containerModal.querySelectorAll("figure");
  imgs.forEach((item) => item.parentNode.removeChild(item));

  if (indexFavorites === indiceFavorites) {
    if (classSlider === "favoritesSlider") {
      let data = [];
      data.push(
        apiGiphy.localStorageFavorites[
          apiGiphy.localStorageFavorites.length - 1
        ]
      );
      renderGifo(data, containerModal, "favoritesSlider");
    }
  }

  if (indexTrending === indiceTrending) {
    if (classSlider === "trendingSlider") {
      let data = [];
      data.push(
        apiGiphy.localStorageTrending[apiGiphy.localStorageTrending.length - 1]
      );
      renderGifo(data, containerModal, "trendingSlider");
    }
  }

  if (indexSearch === indiceSearch) {
    if (classSlider === "searchSlider") {
      let data = [];
      const listSearch = JSON.parse(localStorage.getItem("listSearch"));
      data.push(listSearch[listSearch.length - 1]);
      renderGifo(data, containerModal, "searchSlider");
    }
  }

  if (indexFavorites !== indiceFavorites) {
    if (classSlider === "favoritesSlider") {
      renderGifo(
        apiGiphy.localStorageFavorites.slice(
          indexFavorites + 1,
          indexFavorites + 2
        ),
        containerModal,
        "favoritesSlider"
      );
    }
  }

  if (indexTrending !== indiceTrending) {
    if (classSlider === "trendingSlider") {
      renderGifo(
        apiGiphy.localStorageTrending.slice(
          indexTrending + 1,
          indexTrending + 2
        ),
        containerModal,
        "trendingSlider"
      );
    }
  }
  if (indexSearch !== indiceSearch) {
    if (classSlider === "searchSlider") {
      renderGifo(
        JSON.parse(localStorage.getItem("listSearch")).slice(
          indexSearch + 1,
          indexSearch + 2
        ),
        containerModal,
        "searchSlider"
      );
    }
  }

  buttonSliderLeft.style.visibility = "visible";
  buttonSliderRight.style.visibility = "visible";
  removeClassLoader();
}

async function retrocederSlider() {
  const spanFavorite = containerModal.querySelector(
    "figure span .validate-favorite"
  );
  const idGifo = spanFavorite.getAttribute("data-id-gifo");
  const classSlider = spanFavorite.getAttribute("data-classSlider");

  const indexFavorites = apiGiphy.localStorageFavorites.findIndex(
    (item) => item.id === idGifo
  );
  const indexTrending = apiGiphy.localStorageTrending.findIndex(
    (item) => item.id === idGifo
  );
  const indexSearch = JSON.parse(localStorage.getItem("listSearch")).findIndex(
    (item) => item.id === idGifo
  );

  buttonSliderLeft.style.visibility = "hidden";
  buttonSliderRight.style.visibility = "hidden";

  const imgs = containerModal.querySelectorAll("figure");
  imgs.forEach((item) => item.parentNode.removeChild(item));

  if (indexFavorites === 0) {
    if (classSlider === "favoritesSlider") {
      let data = [];
      data.push(apiGiphy.localStorageFavorites[0]);
      renderGifo(data, containerModal, "favoritesSlider");
    }
  }

  if (indexTrending === 0) {
    if (classSlider === "trendingSlider") {
      let data = [];
      data.push(apiGiphy.localStorageTrending[0]);
      renderGifo(data, containerModal, "trendingSlider");
    }
  }

  if (indexSearch === 0) {
    if (classSlider === "searchSlider") {
      let data = [];
      data.push(JSON.parse(localStorage.getItem("listSearch"))[0]);
      renderGifo(data, containerModal, "searchSlider");
    }
  }

  if (indexFavorites !== 0) {
    if (classSlider === "favoritesSlider") {
      renderGifo(
        apiGiphy.localStorageFavorites.slice(
          indexFavorites - 1,
          indexFavorites
        ),
        containerModal,
        "favoritesSlider"
      );
    }
  }

  if (indexTrending !== 0) {
    if (classSlider === "trendingSlider") {
      renderGifo(
        apiGiphy.localStorageTrending.slice(indexTrending - 1, indexTrending),
        containerModal,
        "trendingSlider"
      );
    }
  }

  if (indexSearch !== 0) {
    if (classSlider === "searchSlider") {
      renderGifo(
        JSON.parse(localStorage.getItem("listSearch")).slice(
          indexSearch - 1,
          indexSearch
        ),
        containerModal,
        "searchSlider"
      );
    }
  }

  buttonSliderLeft.style.visibility = "visible";
  buttonSliderRight.style.visibility = "visible";
  removeClassLoader();
}

// remover las sugerencias de busqueda
function removeUlSearch() {
  const ulContainerSearch = document.querySelectorAll(".ulContentSearch");
  ulContainerSearch.forEach((item) => (item.style.display = "none"));
}

// ocultar Titulo y Logo Inicio
function hideTitleImageSearch() {
  titleBuscador.style.display = "none";
  imageBuscador.style.display = "none";
  iconSearch.style.display = "none";
  containerSearchGifos.style.display = "none";
  iconClose.style.display = "block";
  seeMoreButton.style.display = "none";
  const imgs = containerSearchResultsGifos.querySelectorAll("figure");
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }
}

// mostrar Titulo y Logo Inicio
function showTitleImageSearch() {
  titleBuscador.style.display = "block";
  imageBuscador.style.display = "block";
  iconSearch.style.display = "block";
  iconClose.style.display = "none";
  inputSearch.value = "";
}

// ocultar lista de sugerencias
function showListSuggestions(e) {
  inputSearch.value = "";
  inputSearch.value = e.target.innerText;
  removeUlSearch();
  getResultsTags(inputSearch.value);
}

// remover class despues de cargar el gif y validar si hay favoritos
function removeClassLoader() {
  const imgs = document.querySelectorAll(".loaderGifos");
  imgs.forEach((item) => {
    setTimeout(() => {
      item.removeAttribute("class");
    }, 5000);
  });
}

// click en avanzar slider
let sliceStart = 0;
let sliceEnd = 3;
moveSlider.addEventListener("click", () => {
  sliceStart = sliceStart + 3;
  sliceEnd = sliceEnd + 3;

  validateIndiceSlider();

  const imgs = containerGifos.querySelectorAll("figure");
  imgs.forEach((item) => item.parentNode.removeChild(item));

  if (resSlider[0] === "avanzarSlider") {
    renderGifo(dataAvanzarSlider, containerGifos, "trendingSlider");
  } else {
    renderGifo(
      apiGiphy.localStorageTrending.slice(sliceStart, sliceEnd),
      containerGifos,
      "trendingSlider"
    );
  }
  removeClassLoader();
});

// click en retroceder slider
backSlider.addEventListener("click", () => {
  sliceStart = sliceStart - 3;
  sliceEnd = sliceEnd - 3;

  validateIndiceSlider();

  const imgs = containerGifos.querySelectorAll("figure");
  imgs.forEach((item) => item.parentNode.removeChild(item));

  if (resSlider[0] === "retrocederSlider") {
    renderGifo(
      apiGiphy.localStorageTrending.slice(0, 3),
      containerGifos,
      "trendingSlider"
    );
  } else {
    renderGifo(
      apiGiphy.localStorageTrending.slice(sliceStart, sliceEnd),
      containerGifos,
      "trendingSlider"
    );
  }
  removeClassLoader();
});

function validateIndiceSlider() {
  const indice1 = apiGiphy.localStorageTrending.length - 1;
  const indice2 = apiGiphy.localStorageTrending.length - 2;
  const indice3 = apiGiphy.localStorageTrending.length - 3;

  const validateList = containerGifos.querySelectorAll(".validate-favorite");

  validateList.forEach((item) => {
    const idGifo = item.getAttribute("data-id-gifo");
    const indexTrending = apiGiphy.localStorageTrending.findIndex(
      (item) => item.id === idGifo
    );
    if (
      indexTrending === indice1 ||
      indexTrending === indice2 ||
      indexTrending === indice3
    ) {
      const listTrending = JSON.parse(localStorage.getItem("listTrending"));
      dataAvanzarSlider = [];
      dataAvanzarSlider.push(listTrending[listTrending.length - 1]);
      dataAvanzarSlider.push(listTrending[listTrending.length - 2]);
      dataAvanzarSlider.push(listTrending[listTrending.length - 3]);
      resSlider = [];
      return resSlider.push("avanzarSlider");
    }
    if (indexTrending === 0 || indexTrending === 1 || indexTrending === 2) {
      return resSlider.push("retrocederSlider");
    }
  });
}

//cuando se hace click en la lista de trending
function clickListTrending() {
  const keywords = this.innerHTML;
  const imgs = containerSearchResultsGifos.querySelectorAll("figure") || [];
  if (imgs.length > 0) {
    imgs.forEach((item) => item.parentNode.removeChild(item));
  }
  getResultsTags(keywords);
  removeClassLoader();
}

// obtener los resultados al elegir la busqueda
async function getResultsTags(keywords) {
  dataSearchs = [];
  try {
    const titleCategorySearch = document.getElementById("titleCategorySearch");
    const results = await apiGiphy.getResultsCategory(keywords);
    const res = await results.json();
    res.data.forEach((item) => dataSearchs.push(item));

    localStorage.setItem("listSearch", JSON.stringify(dataSearchs));

    containerSearchGifos.style.display = "block";
    titleCategorySearch.innerHTML = keywords;
    showTitleImageSearch();
    renderGifo(res.data, containerSearchResultsGifos, "searchSlider");
    seeMoreButton.style.display = "block";
    removeClassLoader();
  } catch (error) {
    console.error(error);
  }
}

// mostrar sugerencias en buscador
async function getSuggestionsSearh(keywords) {
  try {
    const results = await apiGiphy.getSuggestionsListCategory(keywords);
    const res = await results.json();

    const ul = document.createElement("ul");
    ul.className = "ulContentSearch";
    res.data.forEach((item) => {
      const li = document.createElement("li");
      const textLi = document.createTextNode(item.name);
      li.appendChild(textLi);
      li.addEventListener("click", showListSuggestions);
      ul.appendChild(li);
      inputSearch.parentNode.appendChild(ul);
    });
  } catch (error) {
    console.error(error);
  }
}

// obtener ultimos gifs en inicio
async function getLastGifs() {
  try {
    const results = await apiGiphy.getTrendingGifs("", 0);
    const res = await results.json();
    localStorage.setItem("listTrending", JSON.stringify(res.data));
    if (window.matchMedia("(max-width: 1024px)").matches) {
      renderGifo(
        apiGiphy.localStorageTrending.slice(0, 12),
        containerGifos,
        "trendingSlider"
      );
    } else {
      renderGifo(
        apiGiphy.localStorageTrending.slice(0, 3),
        containerGifos,
        "trendingSlider"
      );
    }
    removeClassLoader();
  } catch (error) {
    console.error(error);
  }
}

//obtener lista de gifs populares
async function listTrendingSearch() {
  const results = await apiGiphy.getListTrendingSearch();
  const res = await results.json();
  let list = [];
  for (let i = 0; i < 5; i++) {
    const aleatorioList = Math.floor(Math.random() * res.data.length);
    list.push(res.data[aleatorioList]);
  }
  renderListTrendings(list);
}

getLastGifs();
listTrendingSearch();

export {
  removeClassLoader,
  avanzarSlider,
  retrocederSlider,
  getResultsTags,
  clickListTrending,
};
