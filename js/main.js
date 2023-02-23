const formatter = new Intl.NumberFormat("es-CL", { style: "currency", currency: "CLP" });

//Captura de Nodos DOM
let displayProductos = document.getElementById("displayProductos");
let buscador = document.getElementById("buscador");
let displayProductosBuscados = document.getElementById("displayProductosBuscados");
let displayCategorias = document.getElementById("displayCategorias");
let ordenSelect = document.getElementById("ordenSelect");
let botonCarrito = document.getElementById("botonCarrito");
let guardarProductoBtn = document.getElementById("guardarProductoBtn");
let eliminarProductoModal = document.getElementById("eliminarProductoModal");
let carritoDetalle = document.getElementById("carritoDetalle");

//FUNCTIONS:

// Clase Constructora para productos
class Producto {
	constructor(id, nombre, categoria, genero, precio, img) {
		this.id = id,
		this.nombre = nombre,
		this.categoria = categoria,
		this.genero = genero,
		this.precio = precio,
		this.img = img,
		this.cantidad = 1
	}

	//Metodos
	sumarUni() {
		this.cantidad = this.cantidad + 1;
		return this.cantidad
	}
	restarUni() {
		this.cantidad = this.cantidad - 1;
		return this.cantidad
	}
}

// Estableciendo Catalogo
let catalogo = [];

const cargarCatalogo = async () => {
	const loadingCatalogo = Swal.fire({
		title: "Cargando catálogo...",
		allowOutsideClick: false,
		didOpen: async () => {
			Swal.showLoading()
			try {
				const response = await fetch("../api/productos.json")
				const data = await response.json()
				for (const producto of data) {
					const productoNuevo = new Producto(
						producto.id,
						producto.nombre,
						producto.categoria,
						producto.genero,
						producto.precio,
						producto.img
					);
					catalogo.push(productoNuevo)
				}
				localStorage.setItem("catalogo", JSON.stringify(catalogo));
			} catch (error) {
				Swal.fire({
					icon: "error",
					title: "Error cargando catálogo",
					text: error.message,
				})
			}
			Swal.hideLoading()
			loadingCatalogo.close()
		},
		showConfirmButton: false,
	});
};




if (localStorage.getItem("catalogo")) {
	for (const producto of JSON.parse(localStorage.getItem("catalogo"))) {
		const productoNuevo = new Producto(
			producto.id,
			producto.nombre,
			producto.categoria,
			producto.genero,
			producto.precio,
			producto.img
		)
		catalogo.push(productoNuevo)
	}
	console.log(catalogo)
} else {
	console.log("Estableciendo Stock de Vestuario")
	cargarCatalogo()
}



//INDEX

// Function para obtener 4 productos aleatorios del catálogo
function obtenerProductosAleatorios() {
	const catalogoCopia = catalogo.slice()
	const productosAleatorios = []

	for (let i = 0; i < 3; i++) {
		const indiceAleatorio = Math.floor(Math.random() * catalogoCopia.length)
		const productoAleatorio = catalogoCopia[indiceAleatorio]
		productosAleatorios.push(productoAleatorio)

		catalogoCopia.splice(indiceAleatorio, 1)
	}

	return productosAleatorios
}

// Function para mostrar los productos aleatorios en el HTML
function mostrarProductosAleatorios() {
	const productosAleatorios = obtenerProductosAleatorios();
	const divProductosAleatorios = document.getElementById("productosAleatorios")

	divProductosAleatorios.innerHTML = ""

	for (const producto of productosAleatorios) {
		const nuevoProducto = document.createElement("div")
		nuevoProducto.classList.add(
			"col-12",
			"col-md-6",
			"col-lg-3",
			"my-3",
			"d-flex",
			"justify-content-center"
		)

		nuevoProducto.innerHTML = `
		<div id="${producto.id}" class="card" style="width: 18rem;">
		<img class="card-img-top img-fluid" src="${producto.img}" alt="${producto.nombre}">
		<div class="card-body d-flex flex-column justify-content-center align-items-center">
			<h6 class="card-title">${producto.nombre}</h6>
			<p>${producto.categoria} | ${producto.genero}</p>
			<p class="fw-bold h4">${formatter.format(producto.precio)}</p>
			<a href="pages/productos.html" class="btn btn-secondary bg-gris-oscuro text-resalto border-0">Ver Mas <i class="bi bi-cart"></i></a>
		</div>
		</div>`

		divProductosAleatorios.appendChild(nuevoProducto)
	}
}

//PRODUCTOS

//Mostrar categorias sidebar
function obtenerCategorias(array) {
	return array.map((item) => item.category)
}

function mostrarCategorias(array) {
	let contador = array.reduce((contador, item) => {
		if (!contador[item.categoria]) {
			contador[item.categoria] = 0
		}
		contador[item.categoria]++
		return contador;
	}, {});

	for (let item in contador) {
		let nuevaCategoria = document.createElement("button")
		nuevaCategoria.classList.add(
			"list-group-item",
			"d-flex",
			"justify-content-between",
			"align-items-center"
		);
		nuevaCategoria.setAttribute(`id`, `filtrar${item}`)
		nuevaCategoria.innerHTML = `
                ${item}
            <span class="badge bg-primary rounded-pill">${contador[item]}</span>`
		displayCategorias.appendChild(nuevaCategoria);

		let filtrar = document.getElementById(`filtrar${item}`)
		filtrar.addEventListener("click", () => {
			buscarProductos(item, catalogo)
		});
	}
}

//Function para visualizar los productos
function mostrarCatalogo(array) {
	displayProductos.innerHTML = ""
	for (let item of array) {
		let nuevoProducto = document.createElement("div")
		nuevoProducto.classList.add(
			"col-12",
			"col-md-6",
			"col-lg-3",
			"my-3",
			"d-flex",
			"justify-content-center"
		);
		nuevoProducto.innerHTML = `
        <div id="${item.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" src="../${item.img}" alt="${item.nombre}">
				<div class="card-body d-flex flex-column justify-content-center align-items-center">
					<h4 class="card-title">${item.nombre}</h4>
					<p>${item.genero}</p>
					<p>${item.categoria}</p>
					<p class="fw-bold">${formatter.format(item.precio)}</p>
					<button id="agregarBtn${item.id}" class="btn btn-secondary bg-gris-oscuro text-resalto border-0">Agregar al Carrito <i class="bi bi-cart"></i></button>
                </div>
        </div>`;
		displayProductos.appendChild(nuevoProducto)

		let agregarBtn = document.getElementById(`agregarBtn${item.id}`)
		agregarBtn.addEventListener("click", () => {
			agregarProductoCarrito(item)
		});
	}
}

// Obtener los productos guardados en el local storage del carrito
let carritoCompras = [];
if (localStorage.getItem("carrito")) {
	for (let producto of JSON.parse(localStorage.getItem("carrito"))) {
		let cantidadStorage = producto.cantidad
		let productoCarrito = new Producto(
			producto.id,
			producto.nombre,
			producto.categoria,
			producto.genero,
			producto.precio,
			producto.img
		);
		productoCarrito.cantidad = cantidadStorage
		carritoCompras.push(productoCarrito)
	}
} else {
	carritoCompras = []
}

//Agregar productos al Carrito
function agregarProductoCarrito(producto) {
	let productoEnCarrito = carritoCompras.find((i) => i.id === producto.id)
	if (productoEnCarrito == undefined) {
		producto.cantidad = 1
		carritoCompras.push(producto)
		localStorage.setItem("carrito", JSON.stringify(carritoCompras))
		//Sweet Alert
		Swal.fire({
			icon: "success",
			title: "Yay!",
			text: `Producto ${producto.nombre} ha sido agregado al carrito`,
			showConfirmButton: false,
			timer: 1500,
		})
	} else {
		productoEnCarrito.cantidad += 1;
		localStorage.setItem("carrito", JSON.stringify(carritoCompras))
		//Toastify
		Toastify({
			text: `${producto.nombre} se ha agregado una unidad`,
			duration: 1500,
			backgroundColor: "#198754",
		}).showToast()
	}
}

function actualizarLocalStorage(array) {
	localStorage.setItem("carrito", JSON.stringify(array))
}

//Mostrar productos del Carrito
function mostrarCarrito() {
	// Actualizar el carrito desde el localStorage
	if (localStorage.getItem("carrito")) {
		carritoCompras = []
		for (let producto of JSON.parse(localStorage.getItem("carrito"))) {
			let cantidadStorage = producto.cantidad
			let productoCarrito = new Producto(producto.id, producto.nombre, producto.categoria, producto.genero, producto.precio, producto.img)
			productoCarrito.cantidad = cantidadStorage
			carritoCompras.push(productoCarrito)
		}
	}

	// Crear contenido HTML para mostrar los productos en el carrito
	let contenido = "";
	for (let item of carritoCompras) {
		contenido += `
            <tr>
                <th scope="row" id="productoCarrito${item.id}">${item.id}</th>
                <th><img src="../${item.img}" class="thumbnail"></th>
                <td>${item.nombre}</td>
                <td>${item.cantidad}</td>
                <td>${formatter.format(item.precio)}</td>
                <td class="fw-bold">${formatter.format(item.cantidad * item.precio)}</td>
                <td><button class= "btn btn-success" id="sumarUnidadBtn${item.id}"><i class=""></i>+</button>
                <button class= "btn btn-danger" id="restarUnidadBtn${item.id}"><i class=""></i>-</button>
                <button class="btn btn-outline-danger" id="eliminarBtn${item.id}">Eliminar</button></td>
            </tr>
            `;
	}

	// Mostrar el contenido HTML en el modal
	// Si no hay productos en el carrito
	if (carritoCompras.length == 0) {
		carritoDetalle.innerHTML = "No hay productos en el carrito";
	} else {
		carritoDetalle.innerHTML = `
        <table class="table table-flush text-center align-middle">
            <thead>
                <tr>
                    <th scope="col">SKU</th>
                    <th scope="col"></th>
                    <th scope="col">Producto</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col">Total</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody class="table-group-divider">
                ${contenido}
            </tbody>
        </table>
        `;
	}

	// Agregar evento click a los botones eliminar
	for (let item of carritoCompras) {
		// Boton Eliminar Total Carrito
		document.getElementById(`eliminarBtn${item.id}`).addEventListener("click", () => {
			let productoRow = document.getElementById(`productoCarrito${item.id}`)
			productoRow.remove()

			let eliminarProducto = carritoCompras.filter((i) => i.id == item.id)
			let eliminarPosicion = carritoCompras.indexOf(eliminarProducto[0])
			carritoCompras.splice(eliminarPosicion, 1)

			actualizarLocalStorage(carritoCompras)
			mostrarCarrito()
			calcularTotal(carritoCompras)

			// Toastify
			Toastify({
				text: `${item.nombre} ha sido eliminado`,
				duration: 1500,
				backgroundColor: "#dc3545",
			}).showToast();
		});

		//Sumar Unidad de Producto Carrito
		document.getElementById(`sumarUnidadBtn${item.id}`).addEventListener("click", () => {
			console.log(`funciona sumar unidad`)
			item.sumarUni()
			actualizarLocalStorage(carritoCompras)
			mostrarCarrito(carritoCompras)
		});

		//Restar Unidad de Producto Carrito
		document.getElementById(`restarUnidadBtn${item.id}`).addEventListener("click", () => {
			let eliminarUnidad = item.restarUni()
			if (eliminarUnidad < 1) {
				let productoRow = document.getElementById(`productoCarrito${item.id}`)
				productoRow.remove()
				let eliminarProducto = array.findIndex((i) => i.id == item.id)
				array.splice(eliminarProducto, 1)
				actualizarLocalStorage()
				calcularTotal(carritoCompras)
			} else {
				actualizarLocalStorage(carritoCompras)
			}
			mostrarCarrito(carritoCompras)
		});
	}
	calcularTotal(carritoCompras)
}

function calcularTotal(array) {
	let montoTotal = array.reduce(
		(acc, item) => acc + item.precio * item.cantidad,
		0
	);
	montoTotal == 0 ? (document.getElementById("montoTotal").innerHTML = `No hay productos en el carrito`) : (document.getElementById("montoTotal").innerHTML = `TOTAL: ${formatter.format(montoTotal)}`);

	return montoTotal;
}

// Buscador de productos
function buscarProductos(buscado, array) {
	let busquedaArray = array.filter((item) => item.nombre.toLowerCase().includes(buscado.toLowerCase()) || item.categoria.toLowerCase().includes(buscado.toLowerCase()) || item.genero.toLowerCase().includes(buscado.toLowerCase())
	);
	//condicional sino encuentra nada:
	if (busquedaArray.length == 0) {
		displayProductosBuscados.innerHTML = `<h3>No tenemos el producto que buscas...</h3>`;
		mostrarCatalogo(busquedaArray);
	} else {
		displayProductosBuscados.innerHTML = "";
		mostrarCatalogo(busquedaArray);
	}
}

//Ordenar
function menorMayor(array) {
	const menorMayor = [].concat(array);

	menorMayor.sort((a, b) => a.precio - b.precio);
	mostrarCatalogo(menorMayor);
}

function mayorMenor(array) {
	const mayorMenor = [].concat(array);
	mayorMenor.sort((a, b) => b.precio - a.precio);
	mostrarCatalogo(mayorMenor);
}

function alfabeticamente(array) {
	const alfabe = [].concat(array);
	alfabe.sort((a, b) => {
		if (a.titulo > b.titulo) {
			return 1;
		}
		if (a.titulo < b.titulo) {
			return -1;
		}
		return 0;
	});
	mostrarCatalogo(alfabe);
}

async function obtenerUsuarios() {
	const response = await fetch("../api/usuarios.json");
	const data = await response.json();
	return data.usuarios;
}

function validarUsuario(event) {
	event.preventDefault(); // Previene que el formulario se envíe y se recargue la página

	const username = document.getElementById("username").value;
	const password = document.getElementById("password").value;

	obtenerUsuarios().then((usuarios) => {
		const usuarioValido = usuarios.find(
			(usuario) =>
				usuario.username === username && usuario.password === password
		);

		if (usuarioValido) {
			localStorage.setItem("usuarioActual", JSON.stringify(usuarioValido));
			Toastify({
				text: "Validación exitosa. Redirigiendo...",
				duration: 1500,
				close: true,
				gravity: "bottom",
				position: "center",
				backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
				stopOnFocus: true,
			}).showToast();
			setTimeout(() => {
				window.location.href = "admin.html";
			}, 1500);
		} else {
			Toastify({
				text: "Usuario o contraseña incorrecto",
				duration: 1500,
				close: true,
				gravity: "bottom",
				position: "center",
				backgroundColor: "linear-gradient(to right, #ff5f6d, #ffc371)",
				stopOnFocus: true,
			}).showToast();
		}
	});
}

//Function para agregar un nuevo producto
function agregarProducto(array) {
	//creamos nuevo objeto
	const productoNuevo = new Producto(
		array.length + 1,
		nombreInput.value,
		categoriaInput.value,
		generoInput.value,
		parseInt(precioInput.value),
		"api/img/logo-square.png"
	);
	console.log(productoNuevo);
	//sumarlo a estanteria
	array.push(productoNuevo);
	console.log(array);
	//guardar en localStorage
	localStorage.setItem("catalogo", JSON.stringify(array));
	administrarProductos(array);

	//resetear input
	nombreInput.value = "";
	categoriaInput.value = "";
	generoInput.value = "";
	precioInput.value = "";
}

async function administrarProductos() {
	try {
		let productos = JSON.parse(localStorage.getItem("catalogo"));

		let contenido = "";
		for (let item of productos) {
			contenido += `
            <tr>
                <th scope="row">${item.id}</th>
                <th><img src="../${item.img}" class="thumbnail"></th>
                <td>${item.nombre}</td>
                <td>${formatter.format(item.precio)}</td>
                <td><button class="btn btn-outline-danger" id="eliminar${item.id}"><i class="bi bi-trash3"></i></button></td>
            </tr>
            `;
		}

		if (productos.length == 0) {
			document.getElementById("eliminarPrductoBody").innerHTML =
				"<h5>No hay productos en el stock</h5>";
		} else {
			document.getElementById("eliminarPrductoBody").innerHTML = `
            <table class="table table-flush text-center align-middle">
                <thead>
                <tr>
                    <th scope="col">SKU</th>
                    <th scope="col"></th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio Unitario</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody class="table-group-divider">
                ${contenido}
                </tbody>
            </table>
            `;
		}

		eliminarProductoBtn(productos);
	} catch (error) {
		console.log(error);
	}
}

function eliminarProductoBtn(array) {
	for (let item of array) {
		let eliminarBtn = document.getElementById(`eliminar${item.id}`);
		eliminarBtn.addEventListener("click", () => {
			catalogo = array.filter((i) => i.id !== item.id);
			localStorage.setItem("catalogo", JSON.stringify(catalogo));
			console.log(`Producto eliminado: ${item.id}`);
			// Llamada a la función para mostrar el nuevo listado de productos actualizado
			administrarProductos(catalogo);
		});
	}
}

function imprimirProductosCheckout() {
	const carritoDetalleCheckout = document.getElementById(
		"carritoDetalleCheckout"
	);
	let tabla = `
    <table class="table table-flush text-center align-middle">
        <thead>
            <tr>
                <th scope="col">SKU</th>
                <th scope="col"></th>
                <th scope="col">Producto</th>
                <th scope="col">Cantidad</th>
                <th scope="col">Precio Unitario</th>
                <th scope="col">Total</th>
            </tr>
        </thead>
        <tbody class="table-group-divider">
    `;

	// Obtener el carrito del localStorage
	const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

	// Iterar sobre el array del carrito y generar la tabla
	let subtotal = 0;
	carrito.forEach((item) => {
		subtotal += item.cantidad * item.precio;
		tabla += `
        <tr>
            <th scope="row" id="productoCarrito${item.id}">${item.id}</th>
            <th><img src="../${item.img}" class="thumbnail"></th>
            <td>${item.nombre}</td>
            <td>${item.cantidad}</td>
            <td>${formatter.format(item.precio)}</td>
            <td class="fw-bold">${formatter.format(item.cantidad * item.precio)}</td>
        </tr>
		</tbody>
        `;
	});

	// Agregar resumen al final de la tabla
	const iva = subtotal * 0.19;
	const total = subtotal;
	const resumen = `
    <tfoot>
        <tr>
            <td colspan="5" class="text-end">Subtotal (IVA Incl.)</td>
            <td class="fw-bold">${formatter.format(subtotal)}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="5" class="text-end">IVA</td>
            <td class="fw-bold">${formatter.format(iva)}</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="5" class="text-end">Total a pagar</td>
            <td class="fw-bold">${formatter.format(total)}</td>
            <td></td>
        </tr>
    </tfoot>
	</table>
    `;
	tabla += resumen;

	carritoDetalleCheckout.innerHTML = tabla;
}

//EVENTOS:
let categorias = obtenerCategorias(catalogo);

document.addEventListener("DOMContentLoaded", () => {
	if (document.URL.includes("index.html")) {
		mostrarProductosAleatorios();
		botonCarrito.addEventListener("click", function () {
			mostrarCarrito();
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (document.URL.includes("productos.html")) {
		mostrarCatalogo(catalogo);
		mostrarCategorias(catalogo);

		buscador.addEventListener("input", () => {
			buscarProductos(buscador.value, catalogo);
		});

		ordenSelect.addEventListener("change", () => {
			console.log(ordenSelect.value);
			if (ordenSelect.value == 1) {
				menorMayor(catalogo);
			} else if (ordenSelect.value == 2) {
				mayorMenor(catalogo);
			} else if (ordenSelect.value == 3) {
				alfabeticamente(catalogo);
			} else {
				mostrarCatalogo(catalogo);
			}
		});
		// Borrar Filtro
		const borrarFiltroBtn = document.getElementById("borrarFiltroBtn");

		borrarFiltroBtn.addEventListener("click", () => {
			mostrarCatalogo(catalogo);
		});

		botonCarrito.addEventListener("click", function () {
			mostrarCarrito();
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (document.URL.includes("login.html")) {
		// Vincula el evento "submit" del formulario con la función validarUsuario
		document.getElementById("login-form").addEventListener("submit", validarUsuario);
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (document.URL.includes("admin.html")) {
		guardarProductoBtn.addEventListener("click", () => {
			agregarProducto(catalogo);
		});
		administrarProductos(catalogo);
		botonCarrito.addEventListener("click", function () {
			mostrarCarrito();
		});
	}
});

document.addEventListener("DOMContentLoaded", () => {
	if (document.URL.includes("checkout.html")) {
		imprimirProductosCheckout();
	}
});
