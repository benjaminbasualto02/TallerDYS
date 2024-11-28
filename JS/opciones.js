// Obtener la clave única para almacenar configuraciones del usuario actual
const userSettingsKey = `settings_${localStorage.getItem('currentUser')}`;
let userSettings = JSON.parse(localStorage.getItem(userSettingsKey)) || { theme: 'dark' };

// Función para aplicar el tema seleccionado
function applyTheme() {
    document.body.className = userSettings.theme === 'dark' ? 'dark-theme' : 'light-theme';
}

// Alternar entre tema oscuro y claro
document.getElementById('theme-toggle').addEventListener('click', () => {
    userSettings.theme = userSettings.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(userSettingsKey, JSON.stringify(userSettings));
    applyTheme();
});

// Cambiar el nombre de usuario
document.getElementById('username-submit').addEventListener('click', () => {
    const newUsername = document.getElementById('username-change').value.trim();

    if (newUsername) {
        // Actualizar el nombre de usuario en localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
        if (usuarios.length > 0) {
            usuarios[0].nombreUsuario = newUsername; // Asumimos que el primer usuario es el actual
            localStorage.setItem('usuarios', JSON.stringify(usuarios));
        }

        alert(`¡Nombre de usuario cambiado a "${newUsername}"!`);
        document.getElementById('username-change').value = '';
    } else {
        alert('Por favor, ingresa un nombre de usuario válido.');
    }
});

// Guardar y volver al menú
document.getElementById('save-and-return').addEventListener('click', () => {
    localStorage.setItem(userSettingsKey, JSON.stringify(userSettings));
    window.location.href = 'menu.html';
});

// Eliminar cuenta y limpiar todos los datos
document.getElementById('delete-account').addEventListener('click', () => {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción es irreversible.');

    if (confirmation) {
        // Eliminar todos los datos del usuario actual
        localStorage.removeItem(userSettingsKey); // Configuración del usuario
        localStorage.removeItem('currentUser'); // Usuario actual
        localStorage.removeItem('usuarios'); // Lista de usuarios, si aplica

        alert('¡Cuenta eliminada exitosamente!');
        window.location.href = '../index.html'; // Cambiar al login
    }
});

// Aplicar el tema al cargar la página
document.addEventListener('DOMContentLoaded', applyTheme);
