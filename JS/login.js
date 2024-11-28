document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const messageElement = document.getElementById('message');

    // Obtener los usuarios registrados de localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Buscar si existe un usuario con el correo y la contraseña ingresados
    const usuarioValido = usuarios.find(
        usuario => usuario.correo === email && usuario.contrasena === password
    );

    if (usuarioValido) {
        messageElement.textContent = 'Inicio de sesión exitoso!';
        messageElement.style.color = 'green';
    
        // Guardar toda la información del usuario actual en el localStorage
        localStorage.setItem('currentUser', JSON.stringify({
            correo: usuarioValido.correo,
            nombre: usuarioValido.nombre || 'Invitado' // Usar 'nombre' si existe
        }));
    
        // Redirigir a la página del menú
        setTimeout(() => {
            window.location.href = 'HTML/menu.html';  // Redirige a 'menu.html'
        }, 1000); // Espera 1 segundo para mostrar el mensaje antes de redirigir
    } else {
        messageElement.textContent = 'Correo electrónico o contraseña incorrectos.';
        messageElement.style.color = 'red';
    }    
});
