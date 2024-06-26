


const user =
  JSON.parse(localStorage.getItem("login_success")) ||
  false; /* en el caso que haya algo dentro del localStorage se guarda en esta variable */
if (!user) {
  /* si nuestra variable es false, lo mandamos al login */
  window.location.href = "login.html";
} else {
  const usernameDropdown = document.querySelector("#usernameDropdown");
  usernameDropdown.textContent = user.nombre; /* en caso de que estemos logueados, selecciona el elemento del DOM con el ID "usernameDropdown" y luego establece el contenido de texto de ese elemento en el valor almacenado en la propiedad username del objeto user, lo que resulta en que el nombre del usuario se muestra en el menú desplegable. */
}


const logout = document.querySelector("#logout");
logout.addEventListener("click", () => {
  alert("Nos vemos!");
  localStorage.removeItem("login_success");
  window.location.href = "login.html";
});






