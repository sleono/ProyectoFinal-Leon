// FORMULARIO EN CONTACTO

document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('form');
    const checkbox = document.getElementById('checkbox');
    const submitButton = form.querySelector('button[type="submit"]');

    // Para que aparezca el 'div' con el resultado
    const resultado = document.createElement('div');
    resultado.classList.add('resultado');
    form.appendChild(resultado);

    // Evento que habilita o deshabilita el botón de envío
    checkbox.addEventListener('change', function () {
        submitButton.disabled = !checkbox.checked;
    });

    // Recupera los datos guardados
    const datosGuardados = JSON.parse(localStorage.getItem('formData'));

    // Y si hay datos guardados muestra un mensaje personalizado
    if (datosGuardados) {
        resultado.innerText = `¡Hola de nuevo, ${datosGuardados.nombre}! Ya hemos recibido tu mensaje.`;
    }

    // Para que aparezca el 'div' de resultado entre contacto y formulario
    const contactoDiv = document.querySelector('.contacto');
    contactoDiv.insertAdjacentElement('afterend', resultado);

    // Envío del formulario
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Obtener y limpiar los datos ingresados
        const nombre = document.getElementById('nombre').value.trim();
        const dni = document.getElementById('DNI').value.trim();
        const email = document.getElementById('email').value.trim();
        const celular = document.getElementById('celular').value.trim();
        const mensaje = document.getElementById('textarea').value.trim();

        // Validaciones
        if (!nombre || !dni || !email || !celular || !mensaje) {
            Swal.fire({
                title: 'Campos incompletos',
                text: 'Por favor, completa todos los campos antes de enviar.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (dni.length !== 8 || isNaN(dni)) {
            Swal.fire({
                title: 'DNI inválido',
                text: 'El DNI debe tener exactamente 8 dígitos numéricos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (celular.length !== 9 || celular.charAt(0) !== '9' || isNaN(celular)) {
            Swal.fire({
                title: 'Número de celular inválido',
                text: 'El número de celular debe tener 9 dígitos y comenzar con 9.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        if (!validateEmail(email)) {
            Swal.fire({
                title: 'Correo electrónico inválido',
                text: 'Por favor, ingresa un correo electrónico válido.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        if (!checkbox.checked) {
            Swal.fire({
                title: 'Políticas de privacidad',
                text: 'Debes aceptar las políticas de privacidad antes de enviar el formulario.',
                icon: 'warning',
                confirmButtonText: 'Aceptar'
            });
            return;
        }

        // Crear un objeto con los datos del formulario para guardar
        const formData = {
            nombre: nombre,
            dni: dni,
            email: email,
            celular: celular,
            mensaje: mensaje,
            fecha: new Date().toLocaleDateString()
        };

        localStorage.setItem('formData', JSON.stringify(formData));

        // Mensaje de agradecimiento al usuario
        Swal.fire({
            title: '¡Mensaje enviado!',
            text: `Gracias por contactarnos, ${nombre}. Hemos recibido tu mensaje y te responderemos pronto.`,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });

        // Actualiza el 'div' de resultado con un mensaje personalizado
        resultado.innerText = `¡Hola de nuevo, ${nombre}! Ya hemos recibido tu mensaje.`;

        // Limpiar los campos
        form.reset();

        // Deshabilitar el botón de envío hasta que se acepte el checkbox
        submitButton.disabled = true;
    });
});


// CARRITO PIZZAS

// Para declarar la variable pizzas al inicio
let pizzas = [];

// Page carta
const pizzaContainer = document.querySelector('main.carta');

if (pizzaContainer) {

    // Función para mostrar las pizzas
    function mostrarPizzas() {
        pizzaContainer.innerHTML = '';

        pizzas.forEach(pizza => {
            const menuCard = document.createElement('div');
            menuCard.classList.add('menu-card');

            menuCard.innerHTML = `
                <div class="pizza-info">
                    <h3>${pizza.nombre}</h3>
                    <img src="${pizza.imagen}" alt="Pizza ${pizza.nombre}" class="img-fluid">
                    <p>${pizza.descripcion}</p>
                    <p><strong>S/ ${pizza.precio.toFixed(2)}</strong></p>
                    <button class="btn btn-primary agregar-carrito" data-id="${pizza.id}">Agregar al carrito</button>
                </div>
            `;
            pizzaContainer.appendChild(menuCard);
        });
    }

    // Función para cargar las pizzas desde el JSON
    async function cargarPizzas() {
        try {
            const response = await fetch('/pizzas.json');
            const data = await response.json();
            pizzas = data;
            mostrarPizzas();
        } catch (error) {
            console.error('Error al cargar las pizzas:', error);
        }
    }

    document.addEventListener('DOMContentLoaded', cargarPizzas);

    pizzaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregar-carrito')) {
            const pizzaId = parseInt(event.target.getAttribute('data-id'));
            agregarAlCarrito(pizzaId);
        }
    });
}

// Inicializar el carrito desde localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar una pizza al carrito
const agregarAlCarrito = (pizzaId) => {
    const pizzaSeleccionada = pizzas.find(({ id }) => id === pizzaId);
    carrito = [...carrito, pizzaSeleccionada];
    actualizarCarrito();

    Swal.fire({
        title: '¡Añadido al carrito!',
        text: `La pizza ${pizzaSeleccionada.nombre} ha sido agregada al carrito.`,
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
}

// Función para actualizar el carrito y también el contador
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito
function actualizarContadorCarrito() {
    const cantidadCarrito = document.getElementById('cantidad-carrito');
    if (cantidadCarrito) {
        cantidadCarrito.textContent = carrito.length;
    }
}

// Actualizar el contador al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContadorCarrito);

// Modal del carrito (el que está en HTML)
const modalCarrito = document.getElementById('modalCarrito');
const carritoContenido = document.getElementById('carrito-contenido');
const totalCarrito = document.getElementById('total-carrito');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

if (modalCarrito && carritoContenido && totalCarrito && vaciarCarritoBtn) {

    function mostrarCarrito() {
        carritoContenido.innerHTML = '';

        carrito.forEach((pizza, index) => {
            const item = document.createElement('div');
            item.classList.add('item-carrito', 'd-flex', 'justify-content-between', 'align-items-center', 'mb-2');
            item.innerHTML = `
                <p class="mb-0">${pizza.nombre} - S/ ${pizza.precio.toFixed(2)}</p>
                <button class="btn btn-danger btn-sm eliminar-item" data-index="${index}">Eliminar</button>
            `;
            carritoContenido.appendChild(item);
        });

        const total = carrito.reduce((acumulador, pizza) => acumulador + Number(pizza.precio), 0);
        totalCarrito.textContent = `Total: S/ ${total.toFixed(2)}`;
    }

    modalCarrito.addEventListener('shown.bs.modal', mostrarCarrito);

    carritoContenido.addEventListener('click', (event) => {
        if (event.target.classList.contains('eliminar-item')) {
            const index = parseInt(event.target.getAttribute('data-index'));
            const pizzaEliminada = carrito[index];
    
            Swal.fire({
                title: '¿Estás seguro?',
                text: `¿Deseas eliminar la pizza ${pizzaEliminada.nombre} del carrito?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito.splice(index, 1);
                    actualizarCarrito();
                    mostrarCarrito();
                    Swal.fire({
                        title: 'Eliminado',
                        text: `La pizza ${pizzaEliminada.nombre} ha sido eliminada del carrito.`,
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });    

    // Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        if (carrito.length === 0) {
            Swal.fire({
                title: 'El carrito ya está vacío',
                icon: 'info',
                confirmButtonText: 'Aceptar'
            });
        } else {
            Swal.fire({
                title: '¿Estás seguro?',
                text: 'Esto eliminará todos los productos del carrito.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sí, vaciar',
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed) {
                    carrito = [];
                    actualizarCarrito();
                    mostrarCarrito();
                    Swal.fire({
                        title: 'Carrito vacío',
                        text: 'Todos los productos han sido eliminados del carrito.',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                }
            });
        }
    });    
};