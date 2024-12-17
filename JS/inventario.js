document.addEventListener("DOMContentLoaded", () => {
    const backButton = document.getElementById("backButton");
    const selectSkinButtons = document.querySelectorAll(".select-skin");
    const equippedTextElements = document.querySelectorAll(".equipped-text");

    // Obtener la skin seleccionada de localStorage y aplicarla
    const selectedSkin = localStorage.getItem("selectedSkin");
    if (selectedSkin) {
        const selectedButton = document.querySelector(`[data-skin="${selectedSkin}"]`);
        if (selectedButton) {
            selectSkinButtons.forEach(button => button.classList.remove("btn-primary"));
            selectedButton.classList.add("btn-primary");

            // Agregar el texto "Equipado"
            selectedButton.nextElementSibling.textContent = "Equipado";
        }
    }

    // Manejar selección de skin
    selectSkinButtons.forEach(button => {
        button.addEventListener("click", () => {
            const skin = button.getAttribute("data-skin");

            // Guardar la skin seleccionada en localStorage
            localStorage.setItem("selectedSkin", skin);

            // Aplicar la skin seleccionada al tablero (agregar la clase al contenedor del tablero)
            const boardContainer = document.getElementById("board-container");
            boardContainer.classList.remove("skin1", "skin2"); // Elimina clases previas
            boardContainer.classList.add(skin); // Agrega la nueva skin

            // Actualizar el estado visual en el inventario
            selectSkinButtons.forEach(btn => btn.classList.remove("btn-primary"));
            button.classList.add("btn-primary");

            // Mostrar "Equipado" debajo de la skin seleccionada
            equippedTextElements.forEach(element => element.textContent = ""); // Limpiar "Equipado" en otras skins
            button.nextElementSibling.textContent = "Equipado"; // Mostrar "Equipado" en la skin seleccionada

            alert(`¡Has seleccionado la ${skin}!`);
        });
    });

    // Volver al menú principal
    backButton.addEventListener("click", () => {
        window.location.href = "../HTML/menu.html"; // Cambia la ruta según sea necesario
    });
});
