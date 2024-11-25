// Aplicar el tema global
function applyTheme() {
    const userSettingsKey = `settings_${localStorage.getItem('currentUser')}`;
    const userSettings = JSON.parse(localStorage.getItem(userSettingsKey)) || { theme: 'dark' };

    document.body.className = userSettings.theme === 'dark' ? 'dark-theme' : 'light-theme';
}

// Inicializar el tema
document.addEventListener('DOMContentLoaded', () => {
    applyTheme();
});






