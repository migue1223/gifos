"use strict";

import apiGiphy from "../../api/index.js";
import {
  renderSpanIconsImages,
  renderSpanIconFavorite,
} from "./funcionesGenerales.js";

console.log(apiGiphy);

const containerGifos = document.querySelector(".containerImgGifos"); //resultados de gifos slide
const containerSearchGifos = document.getElementById("resultsGifos"); //resultados de gifos busqueda
const containerSearchResultsGifos = document.querySelector(
  ".contentResultsGifos"
);
const inputSearch = document.getElementById("inputSearch");
const titleBuscador = document.querySelector(".titleBuscador");
const imageBuscador = document.querySelector(".imageBuscador");
const iconSearch = document.querySelector(".iconSearch");
const iconClose = document.querySelector(".iconClose");
const titleCategorySearch = document.getElementById("titleCategorySearch");
const seeMoreButton = document.getElementById("verMasGifs");
const modalGifos = document.getElementById("openModal");
const closeModal = document.querySelector(".closeModal");

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

// click button ver mas
seeMoreButton.addEventListener("click", async () => {
  const keywords = document.getElementById("titleCategorySearch").innerHTML;
  const offset = +seeMoreButton.getAttribute("offset");
  const updateValueOffset = offset + 12;
  updateOffset(updateValueOffset);
  try {
    const results = await apiGiphy.getSeeMoreGifos(keywords, updateValueOffset);
    const res = await results.json();
    res.data.forEach(renderGifsResultsClickSearch);
  } catch (error) {
    console.error(error);
  }
});

// click cerrar modal
closeModal.addEventListener("click", () => {
  modalGifos.style.display = "none";
  const listContainerSlider = containerGifos.querySelectorAll(
    "figure span .validate-favorite"
  );
  const listContainerSearch = containerSearchGifos.querySelectorAll(
    "figure span .validate-favorite"
  );
  if (listContainerSlider.length > 0) {
    renderSpanIconFavorite(listContainerSlider);
  }
  if (listContainerSearch.length > 0) {
    renderSpanIconFavorite(listContainerSearch);
  }
});

// funciones

// crear el titulo de usuario y nombre del gifos
function renderTitleUser(item, container) {
  const h2User = document.createElement("h2");
  const h3Title = document.createElement("h3");
  h2User.innerText = item.username;
  h2User.classList = "h2-title-search";
  h3Title.innerText = item.title;
  h3Title.classList = "h3-title-search";
  container.appendChild(h2User);
  container.appendChild(h3Title);
}

// mostrar los gifos aleatorios en el inicio
function renderGifsInicio(item) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const spanIcons = document.createElement("span");
  image.classList = "loaderGifos";
  image.onload = removeClassLoader;
  image.src = item.images.original.url;
  image.alt = item.title;
  renderSpanIconsImages(item, spanIcons);
  figure.appendChild(image);
  figure.appendChild(spanIcons);
  renderTitleUser(item, figure);
  containerGifos.appendChild(figure);
}

// mostrar gifos al hacer la busqueda
function renderGifsResultsClickSearch(item) {
  const figure = document.createElement("figure");
  const image = document.createElement("img");
  const spanIcons = document.createElement("span");
  image.classList = "loaderGifos";
  image.src = item.images.original.url;
  image.alt = item.title;
  image.onload = removeClassLoader;
  renderSpanIconsImages(item, spanIcons);
  figure.appendChild(image);
  figure.appendChild(spanIcons);
  renderTitleUser(item, figure);
  containerSearchResultsGifos.appendChild(figure);
  seeMoreButton.style.display = "block";
}

// remover las sugerencias de busqueda
function removeUlSearch() {
  const ulContainerSearch = document.querySelectorAll(".ulContentSearch");
  ulContainerSearch.forEach((item) => (item.style.display = "none"));
}

// actualizar el offset
function updateOffset(value) {
  seeMoreButton.setAttribute("offset", value);
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
    const results = await apiGiphy.getResultsCategory(keywords);
    const res = await results.json();
    containerSearchGifos.style.display = "block";
    titleCategorySearch.innerHTML = keywords;
    showTitleImageSearch();
    res.data.forEach(renderGifsResultsClickSearch);
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
    let results;
    let res;
    if (window.matchMedia("(max-width: 1024px)").matches) {
      results = await apiGiphy.getTrendingGifs(12);
      res = await results.json();
    } else {
      results = await apiGiphy.getTrendingGifs(3);
      res = await results.json();
    }
    res.data.forEach(renderGifsInicio);
  } catch (error) {
    console.error(error);
  }
}

getLastGifs();
