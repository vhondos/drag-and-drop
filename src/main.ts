const canvas = document.getElementById("miCanvas") as HTMLCanvasElement;
const btnHamburger = document.getElementById("btnHamburger");
const btnPuntero = document.getElementById("btnPuntero");
const btnMover = document.getElementById("btnMover");
const btnColorTexto = document.getElementById("btnColorTexto");
const btnColorBg = document.getElementById("btnColorBg");
const iconHamburger = document.querySelector(".fa-bars");
const iconXmark = document.querySelector(".fa-xmark");
const menuAcciones = document.getElementById("menuAcciones");
const modal = document.getElementById("miModal")!;
const closeModalBtn = document.getElementById("closeModalBtn")!;
const colorInput = document.getElementById("colorInput") as HTMLInputElement;

// Cerrar la ventana modal
closeModalBtn.addEventListener("click", function () {
  modal.classList.add("oculto");
});

// Funcionalidad hamburguesa
btnHamburger!.addEventListener("click", function () {
  iconHamburger!.classList.toggle("oculto");
  iconXmark!.classList.toggle("oculto");
  menuAcciones!.classList.toggle("oculto");
});

function cambiarCursor(cursor: string) {
  document.body.style.cursor = cursor;
}

btnPuntero!.addEventListener("click", () => cambiarCursor("pointer"));
btnMover!.addEventListener("click", () => cambiarCursor("grab"));
btnColorTexto!.addEventListener("click", () => cambiarCursor("text"));
btnColorBg!.addEventListener("click", () => cambiarCursor("crosshair"));

function crearVentana(): HTMLDivElement {
  // Ventana flotante
  const ventana = document.createElement("div");
  ventana.classList.add("ventana");

  // Header
  const header = document.createElement("div");
  header.classList.add("header");
  header.innerHTML = "Ventana Flotante <span>x</span>";
  ventana.appendChild(header);

  // Contenido
  const contenido = document.createElement("div");
  contenido.classList.add("contenido");
  contenido.innerHTML =
    '<p contenteditable="true">¡Puedes mover esta ventana!</p>';
  ventana.appendChild(contenido);

  // Insertar la ventana flotante dentro del canvas
  canvas.parentElement?.appendChild(ventana);

  // Funcionalidad de cerrar ventana
  const closeBtn = header.querySelector("span") as HTMLSpanElement;
  closeBtn.onclick = function () {
    ventana.style.display = "none";
  };

  let isDragging = false;
  let offsetX: number, offsetY: number;

  // Hacer que la ventana sea arrastrable
  header.onmousedown = function (e: MouseEvent) {
    if (document.body.style.cursor === "grab") {
      isDragging = true;
      offsetX = e.clientX - ventana.offsetLeft;
      offsetY = e.clientY - ventana.offsetTop;

      document.onmousemove = function (e: MouseEvent) {
        if (isDragging) {
          ventana.style.left = e.clientX - offsetX + "px";
          ventana.style.top = e.clientY - offsetY + "px";
          document.body.style.cursor = "grabbing";
        }
      };

      document.body.style.cursor = "grabbing";

      document.onmouseup = function () {
        isDragging = false;
        document.onmousemove = null;
        document.onmouseup = null;
        document.body.style.cursor = "grab";
      };
    }
  };

  // Cambiar color cuando el texto es clickeado y el cursor es text
  ventana.addEventListener("click", function () {
    if (document.body.style.cursor === "text") {
      const texto = contenido.querySelector("p");
      if (texto) {
        modal.classList.remove("oculto");
        closeModalBtn.addEventListener("click", function () {
          const colorInput = document.getElementById(
            "colorInput"
          ) as HTMLInputElement;
          if (document.body.style.cursor === "text") {
            texto.style.color = colorInput.value;
          }
          modal.classList.add("oculto"); // Cierra el modal
        });
      }
    }
  });

  // Cambiar fondo cuando el cursor es crosshair
  ventana.addEventListener("click", function () {
    cambiarfondo.call(this); // Utilizar 'call' para hacer que 'this' sea 'ventana'
  });

  return ventana;
}

// Abrir la ventana flotante solo si el cursor es "pointer"
canvas.ondblclick = function (e: MouseEvent) {
  if (document.body.style.cursor === "pointer") {
    const ventana = crearVentana();

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    ventana.style.left = `${mouseX}px`;
    ventana.style.top = `${mouseY}px`;
  }
};

function cambiarfondo(this: HTMLDivElement) {
  if (document.body.style.cursor === "crosshair") {
    modal.classList.remove("oculto");

    // Asegurarse de agregar el event listener solo una vez
    closeModalBtn.removeEventListener("click", cerrarModal); // Eliminar el listener anterior para evitar duplicados
    closeModalBtn.addEventListener("click", cerrarModal); // Añadir el listener

    // Función de cierre del modal
    function cerrarModal() {
      const colorInput = document.getElementById(
        "colorInput"
      ) as HTMLInputElement;
      if (document.body.style.cursor === "crosshair") {
        colorInput.style.backgroundColor = colorInput.value; // 'this' se refiere a closeModalBtn, pero aquí no necesitamos usar 'this'
      }
      modal.classList.add("oculto"); // Cierra el modal
    }
  }
}
