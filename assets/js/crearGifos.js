"use strict";

import apiGiphy from "../../api/index.js";

const containerCrearGifo = document.getElementById("containerSubirGifo");
const containers = document.querySelectorAll(".hiddenCrearGifo");
const containerCamGifo = document.getElementById("containerCrearGifo");

const buttonAddGifos = document.getElementById("crearGifos");
const buttonComenzar = document.querySelector(".buttonComenzar");
const buttonGrabar = document.querySelector(".buttonGrabar");
const buttonFinalizar = document.querySelector(".buttonFinalizar");
const buttonUpload = document.querySelector(".buttonSubirGifo");
const textCrear1 = document.querySelectorAll(".tcrear1");
const textCrear2 = document.querySelectorAll(".tcrear2");
const paso1 = document.querySelector(".paso1");
const paso2 = document.querySelector(".paso2");
const paso3 = document.querySelector(".paso3");
const video = document.getElementById("container-video-gif");
const previewImg = document.querySelector(".previewImgGif");

let stream, recorder;

buttonAddGifos.addEventListener("click", () => {
  containerCrearGifo.style.display = "flex";
  containers.forEach((item) => (item.style.display = "none"));
});

buttonComenzar.addEventListener("click", async () => {
  buttonComenzar.style.display = "none";
  textCrear1.forEach((item) => (item.style.display = "none"));
  textCrear2.forEach((item) => (item.style.display = "block"));
  paso1.src = "assets/img/paso-a-paso-hover.svg";
  getStreamAndRecord();
  const results = await apiGiphy.getGifoId("WQ2dLgQK57OatC8XZn");
  const res = await results.json();
  apiGiphy.localStorageMisGifos.push({
    id: res.data.id,
    title: res.data.title,
    username: res.data.username,
    images: { original: { url: res.data.images.original.url } },
  });

  localStorage.setItem(
    "listMisGifos",
    JSON.stringify(apiGiphy.localStorageMisGifos)
  );
});

buttonGrabar.addEventListener("click", () => {
  recorder = RecordRTC(stream, {
    type: "gif",
    frameRate: 1,
    quality: 10,
    width: 360,
    hidden: 240,
  });
  console.log(recorder);
  buttonGrabar.style.display = "none";
  buttonFinalizar.style.display = "block";
  onGifRecordingStarted(recorder);
});

buttonFinalizar.addEventListener("click", () => {
  recorder.stopRecording();
  const blob = recorder.getBlob();
  let urlCreator = window.URL || window.webkitURL;
  let imageUrl = urlCreator.createObjectURL(blob);
  previewImg.src = imageUrl;
  video.style.display = "none";
  previewImg.style.display = "block";
  buttonFinalizar.style.display = "none";
  buttonUpload.style.display = "block";
});

buttonUpload.addEventListener("click", async () => {
  const form = new FormData();
  form.append("file", recorder, "myGif.gif");
  form.append("tags", "pet, cat, meow");
  const uploadGif = await fetch(
    `http://upload.giphy.com/v1/gifs?api_key=u1D9iripUKO0Kpv6uxr8vxuPwAs0z2J4`,
    {
      method: "POST",
      body: form,
    }
  );
  const res = await uploadGif.json();
  if (res.meta.status === 200) {
    apiGiphy.localStorageMisGifos.push({
      id: res.data.id,
    });

    localStorage.setItem(
      "listMisGifos",
      JSON.stringify(apiGiphy.localStorageMisGifos)
    );
  }
});

function onGifRecordingStarted(recorder) {
  recorder.startRecording();
}

async function getStreamAndRecord() {
  stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      // height: { max: 390 },
      // width: {max: 688}
    },
  });
  if (stream.active === true) {
    textCrear2.forEach((item) => (item.style.display = "none"));
    video.style.display = "block";
    video.srcObject = stream;
    buttonGrabar.style.display = "block";
    paso1.src = "assets/img/paso-a-paso.svg";
    paso2.src = "assets/img/paso-a-paso-hover2.svg";
  }
}
