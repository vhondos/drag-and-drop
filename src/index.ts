const canvas = document.getElementById("miCanvas") as HTMLCanvasElement;

function crearVentana(): HTMLDivElement {
    //Ventana flotante
    const ventana = document.createElement("div");
    ventana.classList.add("ventana");

    // header
    const header = document.createElement("div");
    header.classList.add("header");
    header.innerHTML = '<span>Ventana Flotante</span> <div class="close-button"><div class="close-icon"></div></div>';
    ventana.appendChild(header);

    // contenido
    const contenido = document.createElement("div");
    contenido.classList.add("contenido");
    contenido.innerHTML = '<p contenteditable="true">¡Puedes mover esta ventana!</p>';
    ventana.appendChild(contenido);

    // Insertar la ventana flotante dentro del canvas
    canvas.appendChild(ventana);

    // Funcionalidad de cerrar ventana
    const closeBtn = header.querySelector(".close-button") as HTMLSpanElement;
    closeBtn.onclick = function() {
        ventana.remove();
    };

    // Hacer que la ventana sea arrastrable
    let isDragging = false;
    let offsetX: number, offsetY: number;

    header.onmousedown = function(e: MouseEvent) {
        isDragging = true;
        offsetX = e.clientX - ventana.offsetLeft;
        offsetY = e.clientY - ventana.offsetTop;
        document.onmousemove = function(e: MouseEvent) {
            if (isDragging) {
                ventana.style.left = e.clientX - offsetX + "px";
                ventana.style.top = e.clientY - offsetY + "px";
            }
        };
        document.onmouseup = function() {
            isDragging = false;
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    return ventana;
}

// Abrir la ventana flotante al hacer doble clic en el canvas
canvas.ondblclick = function(e: MouseEvent) {
    const ventana = crearVentana();

    // Obtener la posición del ratón y asignarla a la ventana
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    ventana.style.left = `${mouseX}px`;
    ventana.style.top = `${mouseY}px`;
};
