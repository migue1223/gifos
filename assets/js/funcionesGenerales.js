"use strict";

import apiGiphy from "../../api/index.js";
import {
  removeClassLoader,
  avanzarSlider,
  retrocederSlider,
  clickListTrending,
} from "./main.js";

const modalGifos = document.getElementById("openModal");
const containerModal = document.getElementById("containerOpenModal");

// crear el gifo
function renderGifo(list, container, classSlider) {
  list.forEach(async (item) => {

    const figure = document.createElement("figure");
    const image = document.createElement("img");
    image.classList = "loaderGifos";
    figure.appendChild(image);
    container.appendChild(figure);

    const h2User = document.createElement("h2");
    const h3Title = document.createElement("h3");
    const spanIcons = document.createElement("span");
    const favoriteIcon = favoriteIconGifo(item, classSlider);
    const downloadIcon = await downloadIconGifo(item);
    const expandIcon = expandIconGifo(item, classSlider);

    image.src = item.images.original.url;
    image.alt = item.title;
    spanIcons.appendChild(favoriteIcon);
    spanIcons.appendChild(downloadIcon);
    spanIcons.appendChild(expandIcon);
    h2User.innerText = item.username;
    h3Title.innerText = item.title;
    if (localStorage.getItem("mode-dark") === "black") {
      h2User.classList = "text-dark-mode";
      h3Title.classList = "text-dark-mode";
    } else {
      h2User.classList = "text-white-mode-modal";
      h3Title.classList = "text-white-mode-modal";
    }

    figure.appendChild(spanIcons);
    figure.appendChild(h2User);
    figure.appendChild(h3Title);
  });
}

// para descargar el gifo
async function downloadIconGifo(item) {
  const downloadIcon = document.createElement("img");
  downloadIcon.classList = "icon-default-download icon-download-hover";
  const a = document.createElement("a");
  let response = await fetch(item.images.original.url);
  let file = await response.blob();
  a.download = item.title;
  a.href = window.URL.createObjectURL(file);
  a.dataset.downloadurl = ["application/octet-stream", a.download, a.href].join(
    ":"
  );
  a.appendChild(downloadIcon);
  return a;
}

// icono de favoritos
function favoriteIconGifo(item, classSlider) {
  const favoriteIcon = document.createElement("img");
  favoriteIcon.setAttribute("data-id-gifo", item.id);
  const validate = apiGiphy.localStorageFavorites.findIndex(
    (e) => e.id === item.id
  );
  favoriteIcon.setAttribute("data-title-gifo", item.title);
  favoriteIcon.setAttribute("data-username-gifo", item.username);
  favoriteIcon.setAttribute("data-url-gifo", item.images.original.url);
  favoriteIcon.setAttribute("data-classSlider", classSlider);
  favoriteIcon.classList =
    "icon-default-favorite icon-favorite-hover validate-favorite";
  favoriteIcon.addEventListener("click", addFavoriteGifo);

  if (validate !== -1) {
    favoriteIcon.classList.remove("icon-default-favorite");
    favoriteIcon.classList.remove("icon-favorite-hover");
    favoriteIcon.classList.add("icon-add-favorite");
    favoriteIcon.removeEventListener("click", addFavoriteGifo);
    favoriteIcon.addEventListener("click", removeFavoriteGifo);
  }
  return favoriteIcon;
}

// icono de expandir pantalla completa Gifo
function expandIconGifo(item, classSlider) {
  const expandIcon = document.createElement("img");
  expandIcon.classList = `icon-default-expand icon-expand-hover ${classSlider}`;
  expandIcon.setAttribute("data-id-gifo", item.id);
  expandIcon.setAttribute("data-classSlider", classSlider);
  expandIcon.addEventListener("click", createModalClick);
  return expandIcon;
}

// adicionar gifo a favoritos
async function addFavoriteGifo() {
  const idGifo = this.getAttribute("data-id-gifo");
  const titleGifo = this.getAttribute("data-title-gifo");
  const userGifo = this.getAttribute("data-username-gifo");
  const urlGifo = this.getAttribute("data-url-gifo");
  this.classList.remove("icon-default-favorite");
  this.classList.remove("icon-favorite-hover");
  this.classList.add("icon-add-favorite");
  this.removeEventListener("click", addFavoriteGifo);
  this.addEventListener("click", removeFavoriteGifo);

  apiGiphy.localStorageFavorites.push({
    id: idGifo,
    title: titleGifo,
    username: userGifo,
    images: { original: { url: urlGifo } },
  });

  localStorage.setItem(
    "listFavorites",
    JSON.stringify(apiGiphy.localStorageFavorites)
  );
}

// remover gifo de favoritos
async function removeFavoriteGifo() {
  const idGifo = this.getAttribute("data-id-gifo");
  this.classList.remove("icon-add-favorite");
  this.classList.add("icon-default-favorite");
  this.classList.add("icon-favorite-hover");
  this.removeEventListener("click", removeFavoriteGifo);
  this.addEventListener("click", addFavoriteGifo);

  const validate = apiGiphy.localStorageFavorites.findIndex((item) => {
    item.id === idGifo;
  });
  if (validate === -1) {
    apiGiphy.localStorageFavorites.splice(validate, 1);
    localStorage.setItem(
      "listFavorites",
      JSON.stringify(apiGiphy.localStorageFavorites)
    );
  }
}

// validar si hay favoritos en localStorage y el container de gifos
function renderSpanIconFavorite(lista) {
  const listContainer = lista;
  listContainer.forEach((item) => {
    apiGiphy.localStorageFavorites.forEach((element) => {
      if (item.getAttribute("data-id-gifo") === element.id) {
        item.classList.remove("icon-default-favorite");
        item.classList.remove("icon-favorite-hover");
        item.classList.add("icon-add-favorite");
        item.removeEventListener("click", addFavoriteGifo);
        item.addEventListener("click", removeFavoriteGifo);
      }
    });
  });
}

// remover icono de favoritos al cerrar el modal
function renderRemoveIconFavorite(container, idGifo, classIcon) {
  if (classIcon === null) {
    container.forEach((item) => {
      if (item.getAttribute("data-id-gifo") === idGifo) {
        item.classList.add("icon-default-favorite");
        item.classList.add("icon-favorite-hover");
        item.classList.remove("icon-add-favorite");
        item.addEventListener("click", addFavoriteGifo);
        item.removeEventListener("click", removeFavoriteGifo);
      }
    });
  }
}

// crear modal gifo
async function createModalClick() {
  modalGifos.style.display = "block";
  const buttonSliderLeft = document.querySelector(".buttonSliderLeft");
  const buttonSliderRight = document.querySelector(".buttonSliderRight");
  buttonSliderRight.addEventListener("click", avanzarSlider);
  buttonSliderLeft.addEventListener("click", retrocederSlider);
  buttonSliderLeft.style.visibility = "hidden";
  buttonSliderRight.style.visibility = "hidden";
  // validamos si existe en localStorage
  const idGifo = this.getAttribute("data-id-gifo");
  const classSlider = this.getAttribute("data-classSlider");
  const validate = apiGiphy.localStorageFavorites.filter((item) => {
    if (item.id === idGifo) {
      return item;
    }
  });

  if (validate.length > 0) {
    renderGifo(validate, containerModal, classSlider);
    buttonSliderLeft.style.visibility = "visible";
    buttonSliderRight.style.visibility = "visible";
  } else {
    const resultId = await apiGiphy.getGifoId(idGifo);
    const res = await resultId.json();
    let data = [];
    data.push(res.data);
    renderGifo(data, containerModal, classSlider);
    buttonSliderLeft.style.visibility = "visible";
    buttonSliderRight.style.visibility = "visible";
  }
  removeClassLoader()
}

function renderListTrendings(list) {
  const container = document.querySelector(".containerTrendingP");
  list.forEach((item) => {
    const p = document.createElement("p");
    p.classList = "reactions text-white-mode";
    p.innerText = `${item},`;
    p.addEventListener("click", clickListTrending);
    container.appendChild(p);
  });
}

export {
  renderSpanIconFavorite,
  renderGifo,
  renderRemoveIconFavorite,
  renderListTrendings,
};
