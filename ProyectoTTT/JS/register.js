document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const nombreUsuario = document.getElementById('nombreUsuario').value;
    const correo = document.getElementById('correo').value;
    const contrasena = document.getElementById('contrasena').value;
    const confirmarContrasena = document.getElementById('confirmarContrasena').value;
    const messageElement = document.getElementById('message');

    // Validar contraseñas coincidentes
    if (contrasena !== confirmarContrasena) {
        messageElement.textContent = "Las contraseñas no coinciden.";
        messageElement.style.color = "red";
        return;
    }

    // Generar un ID único (simulado)
    const idUsuario = Date.now(); // Usamos la marca de tiempo como ID único
    const fechaRegistro = new Date().toISOString(); // Fecha actual

    // Obtener usuarios existentes en localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Validar si el correo ya está registrado
    if (usuarios.some(usuario => usuario.correo === correo)) {
        messageElement.textContent = "El correo ya está registrado.";
        messageElement.style.color = "red";
        return;
    }

    // Crear el nuevo usuario
    const nuevoUsuario = {
        ID_usuario: idUsuario,
        nombreUsuario: nombreUsuario,
        correo: correo,
        contrasena: contrasena,
        FechaRegistro: fechaRegistro
    };

    // Guardar el nuevo usuario en localStorage
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar mensaje de éxito
    messageElement.textContent = "Registro exitoso. Ahora puedes iniciar sesión.";
    messageElement.style.color = "green";

    // Redirigir al inicio de sesión
    setTimeout(() => {
        window.location.href = '../index.html';
    }, 2000);
});