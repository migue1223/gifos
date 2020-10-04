"use strict";

import apiGiphy from "../../api/index.js";
const modalGifos = document.getElementById("openModal");

// crear los iconos de favoritos, descargar, expandir
async function renderSpanIconsImages(item, container) {
  const favoriteIcon = await favoriteIconGifo(item);
  const downloadIcon = await downloadIconGifo(item);
  const expandIcon = await expandIconGifo(item);
  container.appendChild(favoriteIcon);
  container.appendChild(downloadIcon);
  container.appendChild(expandIcon);
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

// crear modal gifo
async function createModalClick() {
  modalGifos.style.display = "block";
  const spanActionsGifos = modalGifos.querySelector(
    ".container-actions-modal span"
  );
  const imgs = modalGifos.querySelectorAll(".container-actions-modal span img");
  if (imgs.length > 0) {
    imgs.forEach((element) => {
      element.parentNode.removeChild(element);
    });
  }

  let image = modalGifos.querySelector("figure img");
  image.setAttribute("src", "assets/img/Spin-1s-200px.gif");
  image.classList = "loaderGifos";

  let favoriteIcon;
  let downloadIcon;

  const idGifo = this.getAttribute("data-id-gifo");
  let title, user, url;
  // validamos si existe en localStorage
  const validate = apiGiphy.localStorage.filter((item) => {
    if (item.id === idGifo) {
      return item;
    }
  });
  if (validate.length > 0) {
    title = validate[0].title;
    user = validate[0].user;
    url = validate[0].images.original.url;
    favoriteIcon = await favoriteIconGifo(validate[0]);
    downloadIcon = await downloadIconGifo(validate[0]);
  } else {
    const resultId = await apiGiphy.getGifoId(idGifo);
    const res = await resultId.json();
    title = res.data.title;
    user = res.data.username;
    url = res.data.images.original.url;
    favoriteIcon = await favoriteIconGifo(res.data);
    downloadIcon = await downloadIconGifo(res.data);
  }

  // image.onload = removeClassLoader;
  image.src = url;
  image.alt = title;

  const h2 = modalGifos.querySelector(".h2-actions-modal");
  h2.innerHTML = user;
  const h3 = modalGifos.querySelector(".h3-actions-modal");
  h3.innerHTML = title;
  spanActionsGifos.appendChild(favoriteIcon);
  spanActionsGifos.appendChild(downloadIcon);

  const listContainer = modalGifos.querySelectorAll(
    ".container-actions-modal span .validate-favorite"
  );
  console.log(listContainer);
  renderSpanIconFavorite(listContainer);
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

export { renderSpanIconsImages, downloadIconGifo, favoriteIconGifo, expandIconGifo, addFavoriteGifo, renderSpanIconFavorite, removeFavoriteGifo };
