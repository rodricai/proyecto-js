const botonProductos = document.querySelector("#botonProductos");
botonProductos.addEventListener("click", ()=>{
  Swal.fire('No te quedes con las ganas, comprate algo YA!!!!.')
})
//////////////MODAL CARRITO 
document.addEventListener("DOMContentLoaded", function () {
  let botonModal = document.getElementById("botonModal");
  botonModal.addEventListener("click", abrirModal);
});

function abrirModal() {
  let modal = document.getElementById("miModal");
  modal.style.display = "block";
}

function cerrarModal() {
  let modal = document.getElementById("miModal");
  modal.style.display = "none";
}
///////////////////MODAL CONTACTO

document.addEventListener("DOMContentLoaded", function () {
  let botonContacto = document.getElementById("botonContacto");
  botonContacto.addEventListener("click", abrirFormularioContacto);
});

function abrirFormularioContacto() {
  let contacto = document.querySelector("#miModal2");
  contacto.style.display = "block";
}

function cerrarContacto() {
  let contacto = document.querySelector("#miModal2");
  contacto.style.display = "none";
}

//////////////////////CARRITO

const carrito = [];

const botonesAgregar = document.querySelectorAll(".producto button");

botonesAgregar.forEach(function (boton) {
  boton.addEventListener("click", agregarAlCarrito);
});

function agregarAlCarrito(event) {
  const producto = event.target.parentNode;

  const imagen = producto.querySelector("img").src;
  const titulo = producto.querySelector("h3").innerText;
  const precio = producto.querySelector(".precio").innerText;

  const nuevoProducto = {
    imagen: imagen,
    titulo: titulo,
    precio: precio
  };

  carrito.push(nuevoProducto);

  mostrarCarrito();

  guardarCarritoEnLocalStorage();
}

function mostrarCarrito() {
  const modalCarrito = document.querySelector("#miModal .modal-contenido");

  modalCarrito.innerHTML = "";

  carrito.forEach(function (producto, index) {
    const elementoProducto = document.createElement("div");
    elementoProducto.classList.add("producto-carrito");
    elementoProducto.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.titulo}">
      <h4>${producto.titulo}</h4>
      <p>${producto.precio}</p>
      <button class="eliminar-producto" onclick="eliminarDelCarrito(${index})">Eliminar</button>
    `;

    modalCarrito.appendChild(elementoProducto);
  });

  const total = carrito.reduce(function (acumulador, producto) {
    const precioNumerico = parseFloat(producto.precio.replace("$", "").replace(",", ""));
    return acumulador + precioNumerico;
  }, 0);

  const elementoTotal = document.createElement("div");
  elementoTotal.classList.add("total-compra");
  elementoTotal.innerHTML = `Total de compra $${total.toFixed(3)}`;

  modalCarrito.appendChild(elementoTotal);
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  mostrarCarrito();

  guardarCarritoEnLocalStorage();
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

function cargarCarritoDesdeLocalStorage() {
  var carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    mostrarCarrito();
  }
}

cargarCarritoDesdeLocalStorage();
mostrarCarrito();
