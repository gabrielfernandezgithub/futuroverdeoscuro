document.addEventListener("DOMContentLoaded", function () {
  // Obtenemos una referencia al elemento <span> del nombre de usuario
  const valorUsuario = document.getElementById("usernameDropdown");
  const usuario = valorUsuario.textContent;

  // Obtenemos el ID del producto almacenado en el Local Storage
  const nuevoID = localStorage.getItem("prodID");
  const IDcategoria = localStorage.getItem("catID"); //Aca traemos el id de categoria del producto seleccionado

  // Construimos las URLs para obtener información del producto y comentarios
  let productoInfoURL = `https://japceibal.github.io/emercado-api/products/${nuevoID}.json`;
  const comentariosURL = `https://japceibal.github.io/emercado-api/products_comments/${nuevoID}.json`;
  const productosRelacionados = `https://japceibal.github.io/emercado-api/cats_products/${IDcategoria}.json`;




  // Establecer el contenido completo en el elemento

  // Función para obtener el HTML de las estrellas según el puntaje


  // Obtener y mostrar los comentarios del Local Storage
  const comentariosAlmacenados =
    JSON.parse(localStorage.getItem("comentarios")) || [];

  // Función para generar el HTML de un comentario
  function generarHTMLComentario(comentario) {
    return `
      <div class="comentario">
        <div class="usuario">${comentario.user}</div>
        <div class="fecha">${comentario.dateTime}</div>
        <div class="descripcion">${comentario.description}</div>
      </div>
    `;
  }

  // Contenedor de comentarios en la página
  const comentariosElement = document.getElementById("comentarios-container");

  // Mostrar los comentarios del Local Storage en la página
  comentariosAlmacenados.forEach((comentario) => {
    const comentarioHTML = generarHTMLComentario(comentario);
    comentariosElement.innerHTML += comentarioHTML;
  });

  // Obtener información del producto a través de fetch
  fetch(productoInfoURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error al cargar la información.");
      }
      return response.json();
    })
    .then((productoData) => {
      const datosElement = document.getElementById("datosproducto");

  




      // Establecer el contenido completo en el elemento
      datosElement.innerHTML = contenidoHTML;

  

      // Obtener y mostrar los comentarios a través de fetch
      fetch(comentariosURL)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error al cargar los comentarios.");
          }
          return response.json();
        })
        .then((comentariosData) => {
          console.log(comentariosData);
          const comentariosElement = document.getElementById(
            "comentarios-container"
          );

          // Iterar sobre los comentarios y mostrarlos
          comentariosData.forEach((comentario) => {
            const estrellasHTML = ObtenerEstrellas(comentario.score);
            const comentarioHTML = `
              <div class="comentario">
                <div class="usuario">${comentario.user}</div>
                <div class="fecha">${comentario.dateTime}</div>
                <div class="descripcion">${comentario.description}</div>
              </div>
            `;
            comentariosElement.innerHTML += comentarioHTML;
          });
        })
        .catch((error) => {
          console.error("Error al cargar los comentarios:", error);
        });
    })
    .catch((error) => {
      console.error("Error al cargar la información del producto:", error);
    });

  // Función para actualizar el contador de caracteres restantes en el formulario
  document.getElementById("textarea").addEventListener("input", function () {
    var maxCaracteres = 250; // Establecemos la cantidad máxima permitida de caracteres
    var texto = this.value; // Obtener el valor del <textarea> actual
    var caracteresRestantes = maxCaracteres - texto.length;

    // Actualiza el contador en la página
    document.getElementById("contador").textContent = caracteresRestantes;

    // Limita la longitud del texto en el textarea
    if (caracteresRestantes < 0) {
      this.value = texto.slice(0, maxCaracteres);
      caracteresRestantes = 0;
      document.getElementById("contador").textContent = caracteresRestantes;
    }
  });

  /* Tomamos datos del comentario */
  const commentForm = document.querySelector("#comentar");
  commentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const score = document.querySelector("#mi-puntuacion").value;
    const comentario = document.querySelector("#textarea").value;
    const fechaActual = new Date();
    const formatoFechaHora = fechaActual
      .toISOString()
      .slice(0, 19)
      .replace("T", " "); // Formatear la fecha y hora en "aaaa-mm-dd hh:mm:ss"



    // Definir los datos que deseas enviar
    const Comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
    Comentarios.push({
      description: comentario,
      user: usuario, // Asigna el nombre de usuario almacenado
      dateTime: formatoFechaHora,
    });

    // Guardar los comentarios actualizados en el Local Storage
    localStorage.setItem("comentarios", JSON.stringify(Comentarios));

    // Mostrar el último comentario en la página
    if (Comentarios.length > 0) {
      const ultimoComentario = Comentarios[Comentarios.length - 1];
      const comentarioHTML = generarHTMLComentario(ultimoComentario);
      comentariosElement.innerHTML += comentarioHTML;
    }



    // El evento beforeunload se dispara justo antes de que la página se recargue o cierre
    window.addEventListener("beforeunload", borrarComentariosLocalStorage);
  });
});




