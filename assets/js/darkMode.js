import {buttonsActionsModeDark} from './crearGifos.js'

const containerTrendingP = document.querySelector(".containerTrendingP");
const containerGifos = document.querySelector(".containerImgGifos");
const containerTrendingGifos = document.getElementById("trendingGifos");
const containerModal = document.getElementById("containerOpenModal");
const closeModal = document.querySelector(".closeModal");
const iconCloseModal = closeModal.querySelector("img");
const titleMisGifo = document.querySelector(".titleMisGifos");
const titleModoNocturno = document.getElementById("modoNocturno");
const titleFavorites = document.querySelector(".trendingGifos");
const body = document.body;
const imageHeader = document.querySelector(".headerFigure");
const imgLogo = imageHeader.querySelector("img");
const imgCrearGifo = document.querySelector(".crearGifos");
const texts = body.querySelectorAll("h1, h2, h3, p, li a");
const imgSliderLeft = body.querySelectorAll(".buttonSliderLeft");
const imgSliderRight = body.querySelectorAll(".buttonSliderRight");
const buttonsVerMas = body.querySelectorAll(".button-ver-mas");
const p = body.querySelectorAll(".p-dark-mode");
const navMovil = document.querySelector(".botoneraMovil");
const buttonFabars = document.querySelector(".fa-bars");
const buttonFatimes = document.querySelector(".fa-times");
const iconSearch = document.querySelector(".iconSearch");
const iconClose = document.querySelector(".iconClose");

//click modo nocturno
window.onload = () => {
  changeDarkMode()
  const paso1 = document.querySelector(".paso1");
  const paso2 = document.querySelector(".paso2");
  const paso3 = document.querySelector(".paso3");
  buttonsActionsModeDark(paso1, paso2, paso3);
}
 
titleModoNocturno.addEventListener("click", () => {
  if (localStorage.getItem("mode-dark") === "black") {
    localStorage.setItem("mode-dark", "white");
  } else {
    localStorage.setItem("mode-dark", "black");
  }
  changeDarkMode();
  const paso1 = document.querySelector(".paso1");
  const paso2 = document.querySelector(".paso2");
  const paso3 = document.querySelector(".paso3");
  buttonsActionsModeDark(paso1, paso2, paso3);
});

function changeDarkMode() {
  const pListTrendings = containerTrendingP.querySelectorAll("p");
  const a = titleModoNocturno.querySelector("a");

  if (localStorage.getItem("mode-dark") === "black") {
    body.classList.add("dark-mode");
    containerGifos.classList.add("container-dark-mode");
    titleMisGifo.classList.add("dark-mode");
    titleFavorites.classList.add("dark-mode");
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
    body.classList.remove("dark-mode");
    containerGifos.classList.remove("container-dark-mode");
    titleMisGifo.classList.remove("dark-mode");
    titleFavorites.classList.remove("dark-mode");
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
}
