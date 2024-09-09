// FORMULARIO EN CONTACTO

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const checkbox = document.getElementById('checkbox');
    const submitButton = form.querySelector('button[type="submit"]');

    checkbox.addEventListener('change', function () {
        submitButton.disabled = !checkbox.checked;
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const dni = document.getElementById('DNI').value.trim();
        const email = document.getElementById('email').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const mensaje = document.getElementById('textarea').value.trim();

        if (!nombre || !dni || !email || !celular || !mensaje) {
            alert('Por favor, completa todos los campos antes de enviar.');
            return;
        }

        if (dni.length !== 8 || isNaN(dni)) {
            alert("El DNI debe tener exactamente 8 dígitos numéricos.");
            return false;
        }

        if (celular.length !== 9 || celular.charAt(0) !== '9' || isNaN(celular)) {
            alert("El número de celular debe tener 9 dígitos y comenzar con 9.");
            return false;
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        if (!validateEmail(email)) {
            alert('Por favor, ingresa un correo electrónico válido.');
            return;
        }

        if (!checkbox.checked) {
            alert('Debes aceptar las políticas de privacidad antes de enviar el formulario.');
            return;
        }

        alert('Gracias por contactarnos, ' + nombre + '. Hemos recibido tu mensaje y te responderemos pronto.');

        form.reset();
        submitButton.disabled = true;
    });
});
