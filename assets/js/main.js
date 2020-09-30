"use strict";

const API_KEY = "u1D9iripUKO0Kpv6uxr8vxuPwAs0z2J4";
const API_URL_SEARCH = "https://api.giphy.com/v1/gifs/search?";
const API_URL_TRENDING = "https://api.giphy.com/v1/gifs/trending?";
const API_URL_TAGS = "https://api.giphy.com/v1/gifs/search/tags?";
const containerGifos = document.querySelector(".containerImgGifos");
const containerSearchGifos = document.getElementById("resultsGifos");
const containerSearchResultsGifos = document.querySelector(
  ".contentResultsGifos"
);
const inputSearch = document.getElementById("inputSearch");
const titleBuscador = document.querySelector(".titleBuscador");
const imageBuscador = document.querySelector(".imageBuscador");
const iconSearch = document.querySelector(".iconSearch");
const iconClose = document.querySelector(".iconClose");
const titleCategorySearch = document.getElementById("titleCategorySearch");

// click input search & iconClose
inputSearch.addEventListener("click", hideTitleImageSearch);

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
    const ulContainerSearch = document.querySelectorAll(".ulContentSearch");
    ulContainerSearch.forEach((item) => (item.style.display = "none"));
  } else {
    getSuggestionsSearh(valueInput);
  }
});

// funciones

// obtener ultimos gifs en inicio
async function getLastGifs() {
  const results = await fetch(`${API_URL_TRENDING}api_key=${API_KEY}&limit=12`);
  const res = await results.json();
  res.data.forEach((item) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.classList = "loaderGifos";
    image.onload = removeClassLoader;
    image.src = item.images.original.url;
    figure.appendChild(image);
    containerGifos.appendChild(figure);
  });
}
getLastGifs();

// mostrar sugerencias en buscador
async function getSuggestionsSearh(keywords) {
  const results = await fetch(
    `${API_URL_TAGS}q=${keywords.toLowerCase()}&api_key=${API_KEY}&limit=5`
  );
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
}

// ocultar Titulo y Logo Inicio
function hideTitleImageSearch() {
  titleBuscador.style.display = "none";
  imageBuscador.style.display = "none";
  iconSearch.style.display = "none";
  containerSearchGifos.style.display = "none";
  iconClose.style.display = "block";
  const imgs = containerSearchResultsGifos.querySelectorAll("img");
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
  const ulContainerSearch = document.querySelectorAll(".ulContentSearch");
  inputSearch.value = "";
  inputSearch.value = e.target.innerText;
  ulContainerSearch.forEach((item) => (item.style.display = "none"));
  getResultsTags(inputSearch.value);
}

// obtener los resultados al elegir la busqueda
async function getResultsTags(keywords) {
  const results = await fetch(
    `${API_URL_SEARCH}q=${keywords.toLowerCase()}&api_key=${API_KEY}&limit=12`
  );
  const res = await results.json();
  console.log(res);
  containerSearchGifos.style.display = "block";
  titleCategorySearch.innerHTML = keywords;
  showTitleImageSearch();
  res.data.forEach((item) => {
    const image = document.createElement("img");
    image.classList = "loaderGifos";
    image.src = item.images.original.url;
    image.onload = removeClassLoader;
    containerSearchResultsGifos.appendChild(image);
  });
}

function removeClassLoader(container) {
  const imgs = document.querySelectorAll(".loaderGifos");
  imgs.forEach((item) => {
    if (item.complete) {
      item.removeAttribute("class");
    }
  });
}
