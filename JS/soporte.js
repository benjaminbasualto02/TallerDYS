document.getElementById('contact-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita que se recargue la página

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();  
    
    console.log({ name, email, message });

    // Obtener al usuario actual desde el localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Si no hay usuario actual, mostrar un mensaje de error
        document.getElementById('form-status').textContent = 'Debes iniciar sesión para enviar un mensaje.';
        document.getElementById('form-status').style.color = 'red';
        return;
    }

    // Crear un objeto para guardar los datos del formulario
    const respuesta = {
        usuario: currentUser.correo, // Aquí usamos el correo como identificador
        nombre: name,
        correo: email,
        mensaje: message,
        fecha: new Date().toLocaleString(),
    };

    // Obtener las respuestas existentes (si las hay)
    const respuestasGuardadas = JSON.parse(localStorage.getItem('respuestasSoporte')) || [];

    // Agregar la nueva respuesta
    respuestasGuardadas.push(respuesta);

    // Guardar las respuestas actualizadas en el localStorage
    localStorage.setItem('respuestasSoporte', JSON.stringify(respuestasGuardadas));

    // Mostrar un mensaje de éxito
    document.getElementById('form-status').textContent = '¡Gracias por tu mensaje! Hemos guardado tu respuesta.';
    document.getElementById('form-status').style.color = 'green';

    // Limpiar el formulario
    event.target.reset();
});
