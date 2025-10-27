const contenedor = document.getElementById("contenedor-productos");
const btnAgregar = document.getElementById("btn-agregar");

let productos = [];

// Función para guardar productos en localStorage
function guardarEnLocal() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

// Mostrar productos
function mostrarProductos() {
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const div = document.createElement("div");
    div.classList.add("producto");

    div.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre}</h3>
      <p>Precio: $${producto.precio}</p>
      <button class="btn-eliminar">Eliminar</button>
    `;

    const btnEliminar = div.querySelector(".btn-eliminar");
    btnEliminar.addEventListener("click", () => {
      productos.splice(index, 1);
      guardarEnLocal();
      mostrarProductos();
    });

    contenedor.appendChild(div);
  });
}

// Cargar productos desde localStorage o JSON
function cargarProductos() {
  const guardados = localStorage.getItem("productos");
  if (guardados) {
    productos = JSON.parse(guardados);
    mostrarProductos();
  } else {
    fetch("products.json")
      .then((response) => response.json())
      .then((datos) => {
        productos = datos;
        guardarEnLocal();
        mostrarProductos();
      })
      .catch((error) => console.log("Error al cargar el JSON:", error));
  }
}

// Evento para agregar producto
btnAgregar.addEventListener("click", () => {
  const nombre = prompt("Nombre del producto:");
  const precio = prompt("Precio del producto:");
  const imagen = prompt("URL de la imagen:");

  if (nombre && precio && imagen) {
    const nuevoProducto = {
      id: productos.length + 1,
      nombre,
      precio: Number(precio),
      imagen,
    };
    productos.push(nuevoProducto);
    guardarEnLocal();
    mostrarProductos();
  } else {
    alert("⚠️ Todos los campos son obligatorios.");
  }
});

// Cargar al iniciar
cargarProductos();
