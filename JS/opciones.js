// Obtener el usuario logeado desde localStorage
const currentUser = localStorage.getItem('currentUser'); // Nombre del usuario logeado

// Si no hay un usuario logeado, redirigir al login o mostrar un mensaje
if (!currentUser) {
    alert('No hay usuario logeado. Redirigiendo al login...');
    window.location.href = 'intro.html'; // Redirige si no hay usuario logeado
}

// Definir la clave para almacenar las configuraciones del usuario
const userSettingsKey = `settings_${currentUser}`;

// Cargar configuración del usuario al iniciar o usar valores predeterminados
let userSettings = JSON.parse(localStorage.getItem(userSettingsKey)) || {
    theme: 'dark',
    sfx: false,
    username: currentUser,
};

// Función para aplicar el tema
function applyTheme() {
    // Cambiar el tema de la página
    document.body.className = userSettings.theme === 'dark' ? 'dark-theme' : 'light-theme';
    // Cambiar el texto del botón de cambiar tema
    themeToggle.textContent = userSettings.theme === 'dark' ? 'Cambiar a Claro' : 'Cambiar a Oscuro';
}

// Guardar configuración del usuario en localStorage
function saveSettings() {
    localStorage.setItem(userSettingsKey, JSON.stringify(userSettings));
}

// Cambiar tema cuando se hace clic en el botón
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        userSettings.theme = userSettings.theme === 'dark' ? 'light' : 'dark'; // Alternar entre 'dark' y 'light'
        applyTheme(); // Aplicar el nuevo tema
        saveSettings(); // Guardar los cambios
    });
}

// Cambiar el nombre de usuario
const usernameSubmit = document.getElementById('username-submit');
const usernameInput = document.getElementById('username-change');
if (usernameSubmit && usernameInput) {
    usernameSubmit.addEventListener('click', () => {
        const newUsername = usernameInput.value.trim();
        if (newUsername) {
            alert(`Nombre cambiado a: ${newUsername}`);
            userSettings.username = newUsername; // Actualizar el nombre de usuario
            saveSettings(); // Guardar la nueva configuración
            localStorage.setItem('currentUser', newUsername); // Actualizar el usuario logeado
        } else {
            alert('Por favor ingresa un nombre válido.');
        }
    });
}

// Habilitar/Deshabilitar sonidos
const sfxToggle = document.getElementById('sfx-toggle');
if (sfxToggle) {
    sfxToggle.addEventListener('click', () => {
        userSettings.sfx = !userSettings.sfx; // Alternar el estado de los sonidos
        sfxToggle.textContent = userSettings.sfx ? 'Deshabilitar SFX' : 'Habilitar SFX'; // Actualizar el texto del botón
        saveSettings(); // Guardar cambios
    });
}

// Inicializar la configuración al cargar la página
window.addEventListener('DOMContentLoaded', () => {
    applyTheme(); // Aplicar el tema guardado
    if (sfxToggle) {
        sfxToggle.textContent = userSettings.sfx ? 'Deshabilitar SFX' : 'Habilitar SFX'; // Establecer el texto del botón de sonidos
    }
});

// Restablecer configuraciones
const resetSettings = document.getElementById('reset-settings');
if (resetSettings) {
    resetSettings.addEventListener('click', () => {
        localStorage.removeItem(userSettingsKey); // Eliminar las configuraciones guardadas
        alert('Configuraciones restablecidas.');
        location.reload(); // Recargar para aplicar los cambios
    });
};

// Guardar configuraciones y redirigir al menú
const saveAndReturnButton = document.getElementById('save-and-return');
if (saveAndReturnButton) {
    saveAndReturnButton.addEventListener('click', () => {
        saveSettings(); // Guardar las configuraciones actuales
        window.location.href = 'menu.html'; // Redirigir al menú
    });
}
