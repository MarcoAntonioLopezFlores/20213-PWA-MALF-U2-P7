let contextSW = "/20213-PWA-MALF-U2-P7/sw.js";
let url = window.location.href;

let player = $("#player");
let photo = $("#photo");

let btnCamera = $("#btnCamera");
let btnCameraBack = $("#btnCameraBack");
let btnTakePhoto = $("#btnTakePhoto");
const camera = new Camera(player[0]);
let type = "";

if (navigator.serviceWorker) {
  if (url.includes("localhost")) {
    contextSW = "/sw.js";
  }
  navigator.serviceWorker.register(contextSW);
}

btnCamera.on("click", () => {
  camera.on().then((result) => {
    if (!result) {
      alert("Error al iniciar la cámara");
    }
    type = "Frontal";
  });
});

btnCameraBack.on("click", () => {
  console.log("camara back");
  camera.onBack().then((result) => {
    if (!result) {
      alert("Error al iniciar la cámara trasera");
    }
    type = "Trasera";
  });
});

btnTakePhoto.on("click", () => {
  if (type !== "") {
    camera.off();

    photo = camera.takePhoto();
    $("#example").remove();
    const card = `
      <div class="card bg-light">
        <div class="card-body">
          <img
            id="photo"
            src="${photo}"
            alt="picture"
            width="300"
            height="300"
          />
        </div>
        <div class="card-header">
          <p class="text-center">
            <strong>${type}</strong>
          </p>
        </div>
      </div>`;
    $("#collectionPictures").append(card);
    if (type === "Frontal") {
      camera.on();
    } else {
      camera.onBack();
    }
  } else {
    alert("Es necesario encender una cámara");
  }
});
