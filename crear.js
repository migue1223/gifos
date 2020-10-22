//--------- Crear gif -----------//
let recorder = null;
let blob = null;
let Api_key = 'Nc8u10QS9qz9vLVNpc7W08yiQVxITRYJ'

function requestVideo() {
    const video = document.getElementById("video");

    navigator.mediaDevices
        .getUserMedia({ audio: false, video: true })
        .then((stream) => {
            video.srcObject = stream;
            video.play();
        })
        .then(recordRequest);
}

function startRecording(stream) {
    recorder = new RecordRTCPromisesHandler(stream, {
        type: 'video'
    });
    recorder.startRecording();
}

function stopRecording() {
    recorder
        .stopRecording()
        .then(() => {
            blob = recorder.getBlob();
            recorder = null;
        });
}


function recordInit() {
    const buttonPaso1 = document.getElementById('button-paso1');
    const comenzarButton = document.getElementById('comenzar');
    const containerDiv = document.getElementById('text-container');

    comenzarButton.classList.remove('active');
    buttonPaso1.classList.add('active');

    containerDiv.innerHTML = `<h2 class="camera-container-title">¿Nos das acceso a tu cámara?</h2>
							<p>El acceso a tu camara será válido sólo <br>por el tiempo en el que estés creando el GIFO.</p>`;
    requestVideo();
}


function recordRequest() {
    const buttonPaso2 = document.getElementById('button-paso2');
    const buttonPaso1 = document.getElementById('button-paso1');
    const grabarButton = document.getElementById('grabar');
    const video = document.getElementById("video");
    const textContainer = document.getElementById('text-container')

    grabarButton.classList.add('active');
    buttonPaso2.classList.add('active');
    buttonPaso1.classList.remove('active');
    video.classList.add('active');
    textContainer.remove('active');
}

function recording() {
    const grabarButton = document.getElementById('grabar');
    const finalizarButton = document.getElementById('finalizar');
    const recordingTimeText = document.getElementById('recording-time')
    const video = document.getElementById("video");

    grabarButton.classList.remove('active');
    finalizarButton.classList.add('active');
    recordingTimeText.classList.add('active');
    startRecording(video.srcObject);
}

function recordingFinished() {
    const recordingTimeText = document.getElementById('recording-time');
    const repetirText = document.getElementById('repetir-captura');
    const buttonPaso2 = document.getElementById('button-paso2');
    const buttonPaso3 = document.getElementById('button-paso3');
    const video = document.getElementById("video");

    recordingTimeText.classList.remove('active');
    repetirText.classList.add('active');
    buttonPaso2.classList.remove('active');
    buttonPaso3.classList.add('active');
    stopRecording();
}


function recordUpload() {
    let form = new FormData();
    form.append('file', blob, 'myGif.gif');
    fetch(`https://upload.giphy.com/v1/gifs?api_key=${Api_key}&file=${form.get('file')}`);
    console.log(form.get('file'));
}

document.getElementById("comenzar").addEventListener('click', () => recordInit());
document.getElementById("grabar").addEventListener('click', () => recording());
document.getElementById("finalizar").addEventListener('click', () => recordingFinished());