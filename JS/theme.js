// Verificar y aplicar el tema guardado desde localStorage
window.addEventListener('DOMContentLoaded', () => {
    const userSettingsKey = `settings_${localStorage.getItem('currentUser')}`;
    const userSettings = JSON.parse(localStorage.getItem(userSettingsKey)) || {
        theme: 'dark',
        sfx: false,
        username: localStorage.getItem('currentUser')
    };

    // Aplicar el tema
    document.body.className = userSettings.theme === 'dark' ? 'dark-theme' : 'light-theme';

    // Aplicar el fondo
    if (userSettings.theme === 'dark') {
        document.body.style.backgroundImage = "url('fondo1.jpg')"; // Fondo oscuro
    } else {
        document.body.style.backgroundImage = "url('fondo2.jpg')"; // Fondo claro
    }
});
