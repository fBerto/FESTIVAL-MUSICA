document.addEventListener("DOMContentLoaded", function () {
  iniciarApp();
});

function iniciarApp() {
  crearGaleria();
  scrollNav();
  navegacionFija();
}

function navegacionFija() {
  const barra = document.querySelector('.header');
  const sobreFestival = document.querySelector('.sobre-festival');
  const body = document.querySelector('body');
  let esFijo = false;
  window.addEventListener('scroll', function() {
      const alturaHeader = barra.offsetHeight;
      if( sobreFestival.getBoundingClientRect().bottom - alturaHeader < 0){
          barra.classList.add('fijo');
          // Si el ancho de la ventana es inferior al de tablet,
          // No se le aplica el atributo, pues no se incluye el header
          if(window.innerWidth > 768){
              body.style.paddingTop = barra.offsetHeight + "px";
          }
          //body.classList.add('body-scroll');
      }else{
          barra.classList.remove('fijo');
          body.removeAttribute("style");
      }
  });
}

function scrollNav() {
  const enlaces = document.querySelectorAll(".navegacion-principal a");
  enlaces.forEach((enlace) => {
    enlace.addEventListener("click", function (e) {
      e.preventDefault();
      const seccionScroll = e.target.attributes.href.value;
      const seccion = document.querySelector(seccionScroll);
      seccion.scrollIntoView({ behavior: "smooth" });
    });
  });
}

function crearGaleria() {
  const galeria = document.querySelector(".galeria-imagenes");
  for (let i = 1; i <= 12; i++) {
    const imagen = document.createElement("picture");
    imagen.innerHTML = `<source srcset="build/img/thumb/${i}.avif" type="image/avif" />
        <source srcset="build/img/thumb/${i}.webp" type="image/webp" />
        <img
          loading="lazy"
          width="200"
          hseight="300"
          src="build/img/thumb/${i}.jpg"
          alt="Imagen galeria"
            >`;
    imagen.onclick = function () {
      //de esta forma para poder pasarle el parametro de click
      mostrarImagen(i);
    };
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(id) {
  const imagen = document.createElement("picture");
  imagen.innerHTML = `<source srcset="build/img/grande/${id}.avif" type="image/avif" />
        <source srcset="build/img/grande/${id}.webp" type="image/webp" />
        <img
          loading="lazy"
          width="200"
          hseight="300"
          src="build/img/grande/${id}.jpg"
          alt="Imagen galeria"
            >`;
  //crea el overlay con la imagen
  const overlay = document.createElement("DIV");
  overlay.appendChild(imagen);
  overlay.classList.add("overlay");
  overlay.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };
  //boton para cerrar el modal
  const cerrarModal = document.createElement("P");
  cerrarModal.textContent = "X";
  cerrarModal.classList.add("btn-cerrar");
  overlay.appendChild(cerrarModal);
  cerrarModal.onclick = function () {
    const body = document.querySelector("body");
    body.classList.remove("fijar-body");
    overlay.remove();
  };

  //añade al html
  const body = document.querySelector("body");
  body.appendChild(overlay);

  body.classList.add("fijar-body");
}
