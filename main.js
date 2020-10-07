const grid = new Muuri(".grid", {
  layout: {
    rounding: false,
  },
});

window.addEventListener("load", () => {
  grid.refreshItems().layout();
  document.querySelector(".grid").classList.add("imagenes-cargadas");
  // agregamos los eventos de click
  const enlaces = document.querySelectorAll("#categorias a");
  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (e) => {
      e.preventDefault();
      enlaces.forEach((enlace) => {
        enlace.classList.remove("activo");
      });
      e.target.classList.add("activo");

      const categoria = e.target.innerHTML.toLowerCase();
      categoria === "todos"
        ? grid.filter(`[data-categoria]`)
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });
  // agregar evento para la barra de busqueda
  document
    .querySelector("#barra-busqueda")
    .addEventListener("input", (evento) => {
      const busqueda = evento.target.value;
      grid.filter((item) =>
        item.getElement().dataset.etiquetas.includes(busqueda)
      );
    });
  // overlay
  const overlay = document.getElementById("overlay");
  document.querySelectorAll(".grid .item img").forEach((elemento) => {
    elemento.addEventListener("click", () => {
      const ruta = elemento.getAttribute("src");
      const descripcion = elemento.parentNode.parentNode.dataset.descripcion;
      overlay.classList.add("show");
      document.querySelector("#overlay img").src = ruta;
      document.querySelector("#overlay .descripcion").innerHTML = descripcion;
    });
  });
  // cerrar overlay
  document.querySelector("#btn-cerrar-popup").addEventListener("click", () => {
    overlay.classList.remove("show");
  });
  overlay.addEventListener("click", (evento) => {
    if (evento.target.id === "overlay") {
      overlay.classList.remove("show");
    }
  });
});
