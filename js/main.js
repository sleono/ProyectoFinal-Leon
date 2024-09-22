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


    // Validadores
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

    // Esto crea un objeto con los datos del formulario para guardar
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
        alert('Gracias por contactarnos, ' + nombre + '. Hemos recibido tu mensaje y te responderemos pronto.');

    // Actualiza el 'div' de resultado con un mensaje personalizado
        resultado.innerText = `¡Hola de nuevo, ${nombre}! Ya hemos recibido tu mensaje.`;

    // Limpiar los campos
        form.reset();

    // Deshabilitar el botón de envío hasta que se acepte el checkbox
        submitButton.disabled = true;
    });
});

// CARRITO PIZZAS

// Array de pizzas
const pizzas = [
    {
        id: 1,
        nombre: 'Margarita',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella fresca, albahaca y un toque de aceite de oliva virgen.',
        precio: 25.00,
        imagen: '../img/pizza-margarita.jpeg'
    },
    {
        id: 2,
        nombre: 'Americana',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella y jamón bondiola ahumada.',
        precio: 30.00,
        imagen: '../img/pizza-americana.jpeg'
    },
    {
        id: 3,
        nombre: 'Pepperoni',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella y una generosa cantidad de rodajas de pepperoni.',
        precio: 30.00,
        imagen: '../img/pizza-pepperoni.jpeg'
    },
    {
        id: 4,
        nombre: 'Suprema',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella, pepperoni, salchichas italianas, pimientos verdes, cebolla, champiñones y aceitunas negras.',
        precio: 35.00,
        imagen: '../img/pizza-suprema.jpeg'
    },
    {
        id: 5,
        nombre: 'Cuatro Estaciones',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella, cada sección con diferentes ingredientes: alcachofas, jamón, champiñones y aceitunas negras.',
        precio: 35.00,
        imagen: '../img/pizza-cuatro-estaciones.jpeg'
    },
    {
        id: 6,
        nombre: 'Vegetariana',
        descripcion: 'Pizza grande con salsa de tomate, mozzarella, champiñones, pimientos rojos, cebolla, aceitunas negras, espinacas y tomate fresco.',
        precio: 35.00,
        imagen: '../img/pizza-vegetariana.jpeg'
    }
];

// Page carta
const pizzaContainer = document.querySelector('main.carta');

if (pizzaContainer) {

    function mostrarPizzas() {
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

    document.addEventListener('DOMContentLoaded', mostrarPizzas);

    pizzaContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('agregar-carrito')) {
            const pizzaId = parseInt(event.target.getAttribute('data-id'));
            agregarAlCarrito(pizzaId);
        }
    });
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar una pizza al carrito
function agregarAlCarrito(pizzaId) {
    const pizzaSeleccionada = pizzas.find(pizza => pizza.id === pizzaId);
    carrito.push(pizzaSeleccionada);
    actualizarCarrito();
    alert(`Pizza ${pizzaSeleccionada.nombre} ha sido agregada al carrito.`);
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
            carrito.splice(index, 1);
            actualizarCarrito();
            mostrarCarrito();
        }
    });

// Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        carrito = [];
        actualizarCarrito();
        mostrarCarrito();
    });
};