"use strict";

import apiGiphy from "../../api/index.js";
import { removeClassLoader } from "./main.js";

const modalGifos = document.getElementById("openModal");
const containerModal = document.getElementById("containerOpenModal")

// crear el gifo
function renderGifo(list, container) {
  list.forEach(async (item) => {
    const figure = document.createElement("figure");
    const image = document.createElement("img");
    const h2User = document.createElement("h2");
    const h3Title = document.createElement("h3");
    const spanIcons = document.createElement("span");
    const favoriteIcon = favoriteIconGifo(item);
    const downloadIcon = await downloadIconGifo(item);
    const expandIcon = expandIconGifo(item);

    image.classList = "loaderGifos";
    image.src = item.images.original.url;
    image.alt = item.title;
    image.onload = removeClassLoader;
    spanIcons.appendChild(favoriteIcon);
    spanIcons.appendChild(downloadIcon);
    spanIcons.appendChild(expandIcon);
    h2User.innerText = item.username;
    h2User.classList = "h2-title-search";
    h3Title.innerText = item.title;
    h3Title.classList = "h3-title-search";
    figure.appendChild(image);
    figure.appendChild(spanIcons);
    figure.appendChild(h2User);
    figure.appendChild(h3Title);
    container.appendChild(figure);
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
function favoriteIconGifo(item) {
  const favoriteIcon = document.createElement("img");
  favoriteIcon.setAttribute("data-id-gifo", item.id);
  favoriteIcon.setAttribute("data-title-gifo", item.title);
  favoriteIcon.setAttribute("data-username-gifo", item.username);
  favoriteIcon.setAttribute("data-url-gifo", item.images.original.url);
  favoriteIcon.classList =
    "icon-default-favorite icon-favorite-hover validate-favorite";
  favoriteIcon.addEventListener("click", addFavoriteGifo);
  return favoriteIcon;
}

// icono de expandir pantalla completa Gifo
function expandIconGifo(item) {
  const expandIcon = document.createElement("img");
  expandIcon.classList = "icon-default-expand icon-expand-hover";
  expandIcon.setAttribute("data-id-gifo", item.id);
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

  apiGiphy.localStorage.push({
    id: idGifo,
    title: titleGifo,
    user: userGifo,
    images: { original: { url: urlGifo } },
  });

  localStorage.setItem("list", JSON.stringify(apiGiphy.localStorage));
}

// remover gifo de favoritos
async function removeFavoriteGifo() {
  const idGifo = this.getAttribute("data-id-gifo");
  this.classList.remove("icon-add-favorite");
  this.classList.add("icon-default-favorite");
  this.classList.add("icon-favorite-hover");
  this.removeEventListener("click", removeFavoriteGifo);
  this.addEventListener("click", addFavoriteGifo);

  const validate = apiGiphy.localStorage.findIndex((item) => {
    item.id === idGifo;
  });
  if (validate === -1) {
    apiGiphy.localStorage.splice(validate, 1);
    localStorage.setItem("list", JSON.stringify(apiGiphy.localStorage));
  }
}

// validar si hay favoritos en localStorage y el container de gifos
function renderSpanIconFavorite(lista) {
  const listContainer = lista;
  listContainer.forEach((item) => {
    apiGiphy.localStorage.forEach((element) => {
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

// remover icono de favoritos la cerrar el modal
function renderRemoveIconFavorite(container, idGifo, classIcon) {
  if(classIcon === null) {
    container.forEach(item => {
      if(item.getAttribute("data-id-gifo") === idGifo) {
        item.classList.add("icon-default-favorite");
        item.classList.add("icon-favorite-hover");
        item.classList.remove("icon-add-favorite");
        item.addEventListener("click", addFavoriteGifo);
        item.removeEventListener("click", removeFavoriteGifo);
      }
    })
  }
}

// crear modal gifo
async function createModalClick() {
  modalGifos.style.display = "block";
  
  // validamos si existe en localStorage
  const idGifo = this.getAttribute("data-id-gifo")
  const validate = apiGiphy.localStorage.filter((item) => {
    if (item.id === idGifo) {
      return item;
    }
  });
  if (validate.length > 0) {
    renderGifo(validate, containerModal)
  } else {
    const resultId = await apiGiphy.getGifoId(idGifo);
    const res = await resultId.json();
    let data = []
    data.push(res.data);
    renderGifo(data, containerModal)
  }
}

export {
  renderSpanIconFavorite,
  renderGifo,
  renderRemoveIconFavorite
};
