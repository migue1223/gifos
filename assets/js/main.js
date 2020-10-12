"use strict";

import apiGiphy from "../../api/index.js";
import {
  renderSpanIconFavorite,
  renderGifo,
  renderRemoveIconFavorite,
} from "./funcionesGenerales.js";

const containerGifos = document.querySelector(".containerImgGifos"); //resultados de gifos slide
const containerSearchGifos = document.getElementById("resultsGifos"); //resultados de gifos busqueda
const containerSearchResultsGifos = document.querySelector(
  ".contentResultsGifos"
);
const containerMisGifos = document.querySelector(".misGifosFavoritos");
const containerMisGifosFavoritos = document.getElementById(
  "containerMisGifosFavoritos"
);
const containerBuscador = document.querySelector(".sectionBuscador");
const containerModal = document.getElementById("containerOpenModal");

const inputSearch = document.getElementById("inputSearch");
const titleBuscador = document.querySelector(".titleBuscador");
const imageBuscador = document.querySelector(".imageBuscador");
const closeModal = document.querySelector(".closeModal");
const titleMisGifos = document.getElementById("misGifosFavoritos");
const titleGifos = document.getElementById("misGifos");
const iconClose = document.querySelector(".iconClose");
const iconSearch = document.querySelector(".iconSearch");
const seeMoreButton = document.getElementById("verMasGifs");
const seeMoreButtonFavorite = document.getElementById("verMasGifsFavoritos");
const imageHeader = document.querySelector(".headerFigure");
const buttonSliderLeft = document.querySelector(".buttonSliderLeft");
const buttonSliderRight = document.querySelector(".buttonSliderRight");

// click input search & iconClose
inputSearch.addEventListener("click", hideTitleImageSearch);

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
    const results = await apiGiphy.getSeeMoreGifos(keywords, offset);
    const res = await results.json();
    renderGifo(res.data, containerSearchResultsGifos, "searchSlider");
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
  const modalGifos = document.getElementById("openModal");

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
    renderSpanIconFavorite(listContainerSlider);
    renderRemoveIconFavorite(listContainerSlider, idGifo, classFavorite);
  }
  if (listContainerSearch.length > 0) {
    renderSpanIconFavorite(listContainerSearch);
    renderRemoveIconFavorite(listContainerSlider, idGifo, classFavorite);
  }

  modalGifos.style.display = "none";
});

// click en mis favoritos
titleMisGifos.addEventListener("click", () => {
  containerBuscador.style.display = "none";
  containerMisGifos.style.display = "flex";

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
  } catch (error) {
    console.error(error);
  }
});

// click en title gifos
titleGifos.addEventListener("click", () => {
  containerMisGifos.style.display = "none";
  containerBuscador.style.display = "flex";
});

// click en image header
imageHeader.addEventListener("click", () => {
  containerMisGifos.style.display = "none";
  containerBuscador.style.display = "flex";
});

// funciones
function avanzarSlider() {
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
  const indiceFavorites = apiGiphy.localStorageFavorites.length - 1;
  const indiceTrending = apiGiphy.localStorageTrending.length - 1;

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
  }

  buttonSliderLeft.style.visibility = "visible";
  buttonSliderRight.style.visibility = "visible";
}

function retrocederSlider() {
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
  const indiceFavorites = apiGiphy.localStorageFavorites.length - 1;
  const indiceTrending = apiGiphy.localStorageTrending.length - 1;

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
    console.log("test")
    if (classSlider === "trendingSlider") {
      let data = [];
      data.push(apiGiphy.localStorageTrending[0]);
      renderGifo(data, containerModal, "trendingSlider");
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

    if (indexTrending !== 0) {
      console.log("test");
      if (classSlider === "trendingSlider") {
        renderGifo(
          apiGiphy.localStorageTrending.slice(indexTrending - 1, indexTrending),
          containerModal,
          "trendingSlider"
        );
      }
    }
  }

  buttonSliderLeft.style.visibility = "visible";
  buttonSliderRight.style.visibility = "visible";
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
  const listContainer = document.querySelectorAll(".icon-favorite-hover");
  imgs.forEach((item) => {
    if (item.complete) {
      item.removeAttribute("class");
      renderSpanIconFavorite(listContainer);
    }
  });
}

// obtener los resultados al elegir la busqueda
async function getResultsTags(keywords) {
  try {
    const titleCategorySearch = document.getElementById("titleCategorySearch");
    const results = await apiGiphy.getResultsCategory(keywords);
    const res = await results.json();
    containerSearchGifos.style.display = "block";
    titleCategorySearch.innerHTML = keywords;
    showTitleImageSearch();
    renderGifo(res.data, containerSearchResultsGifos, "searchSlider");
    seeMoreButton.style.display = "block";
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
    let results = await apiGiphy.getTrendingGifs();
    let res = await results.json();
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
  } catch (error) {
    console.error(error);
  }
}

getLastGifs();

export { removeClassLoader, avanzarSlider, retrocederSlider };
