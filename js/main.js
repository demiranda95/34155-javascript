//Captura de Nodos DOM
let displayProductos = document.getElementById("displayProductos")
let buscador = document.getElementById("buscador")
let displayProductosBuscados = document.getElementById("displayProductosBuscados")
let displayCategorias = document.getElementById("displayCategorias")
let ordenSelect = document.getElementById("ordenSelect")


//FUNCTIONS:

// Clase Constructora para productos
class Producto {
    constructor(id, producto, categoria, genero, precio, img){
        this.id = id,
        this.producto = producto,
        this.categoria = categoria,
        this.genero = genero,
        this.precio = precio,
        this.img = img
    }
}

const producto1 = new Producto(1,"Polera 1","Poleras","Mujer", 900, "polera1.png")
const producto2 = new Producto(2,"Polera 2","Poleras","Mujer", 1000, "polera2.png")
const producto3 = new Producto(3,"Pantalon 1","Pantalones","Hombre", 2000, "pantalon1.png")
const producto4 = new Producto(4,"Pantalon 2","Pantalones","Hombre", 1500, "pantalon2.png")
const producto5 = new Producto(5,"Jockey 1","Gorros","Mujer", 3000, "jockey1.png")
const producto6 = new Producto(6,"Jockey 2","Gorros","Hombre", 3100, "jockey2.png")
const producto7 = new Producto(7,"Zapatillas 1","Calzado","Hombre", 10000, "zapatillas1.png")
const producto8 = new Producto(8,"Zapatillas 2","Calzado","Mujer", 10000, "zapatillas2.png")


// Array de notas vacio para iniciar
let catalogo = []
if (localStorage.getItem("catalogo")){
    catalogo = JSON.parse(localStorage.getItem("catalogo"))
} else {
    console.log("Estableciendo Stock de Vestuario")
    catalogo.push(producto1,producto2,producto3,producto4,producto5,producto6,producto7,producto8)
    localStorage.setItem("catalogo", JSON.stringify(catalogo))
}

//Mostrar categorias
function obtenerCategorias(array) {
    return array.map(item => item.category)
}

function mostrarCategorias(array) {
    let contador = array.reduce((contador, item) => {
        if (!contador[item.categoria]) {
            contador[item.categoria] = 0
        }
        contador[item.categoria]++
        return contador
    }, {})
    
    for (let item in contador) {
        let nuevaCategoria = document.createElement("button")
        nuevaCategoria.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center",)
        nuevaCategoria.setAttribute(`id`,`filtrar${item}`)
        nuevaCategoria.innerHTML = `
                ${item}
            <span class="badge bg-primary rounded-pill">${contador[item]}</span>`
        displayCategorias.appendChild(nuevaCategoria)

        let filtrar = document.getElementById(`filtrar${item}`)
        filtrar.addEventListener("click", ()=>{
            buscarProductos(item, catalogo)
        })
    }
}

//Function para visualizar los productos
function mostrarCatalogo(array){
    displayProductos.innerHTML = ""
    for (let item of array){
        
        let nuevoProducto = document.createElement("div")
        nuevoProducto.classList.add("col-12", "col-md-6", "col-lg-3", "my-3", "d-flex", "justify-content-center")
        nuevoProducto.innerHTML = `
        <div id="${item.id}" class="card" style="width: 18rem;">
                <img class="card-img-top img-fluid" src="../assets/img/${item.img}" alt="${item.producto}">
                <div class="card-body">
                            <h4 class="card-title">${item.producto}</h4>
                            <p>${item.genero}</p>
                            <p>${item.categoria}</p>
                            <p class="fw-bold">$${item.precio}</p>
                        <button id="agregarBtn${item.id}" class="btn btn-outline-success">Agregar al Carrito <i class="bi bi-cart"></i></button>
                </div>
        </div>`
        displayProductos.appendChild(nuevoProducto)

        let agregarBtn = document.getElementById(`agregarBtn${item.id}`)
        agregarBtn.addEventListener("click", ()=>{
            agregarProductoCarrito(item)
        })
    }
}

//Agregar productos al Carrito
function agregarProductoCarrito(producto) {
    let carritoCompras
    if (localStorage.getItem("carrito")) {
        carritoCompras = JSON.parse(localStorage.getItem("carrito"))
    } else {
        carritoCompras = []
    }

    let productoEnCarrito = carritoCompras.find(i => i.id === producto.id)
    if (productoEnCarrito) {
        // Si ya está en el carrito, solo aumentar la cantidad
        productoEnCarrito.cantidad++
        productoEnCarrito.valorTotal = productoEnCarrito.cantidad * productoEnCarrito.precio
    } else {
        // Si no está en el carrito, agregarlo
        producto.cantidad = 1
        producto.valorTotal = producto.cantidad * producto.precio
        carritoCompras.push(producto)
    }

    // Guardar el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
    console.log(carritoCompras)
}

// Eliminar productos del Carrito
function eliminarProductoCarrito(producto) {
    let carritoCompras
    if (localStorage.getItem("carrito")) {
        carritoCompras = JSON.parse(localStorage.getItem("carrito"))
    } else {
        carritoCompras = []
    }

    let productoEnCarrito = carritoCompras.find(i => i.id === producto.id)
    if (productoEnCarrito) {
        // Si ya está en el carrito, reducir la cantidad
        productoEnCarrito.cantidad--
        productoEnCarrito.valorTotal = productoEnCarrito.cantidad * productoEnCarrito.precio
        if (productoEnCarrito.cantidad <= 0) {
            // Si la cantidad es 0 o negativa, eliminar el producto del carrito
            let indice = carritoCompras.indexOf(productoEnCarrito)
            carritoCompras.splice(indice, 1)
        }
    }

    // Guardar el carrito en el local storage
    localStorage.setItem("carrito", JSON.stringify(carritoCompras))
    console.log(carritoCompras)
}

//Mostrar productos del Carrito
function mostrarCarrito(){
    // Obtener los productos guardados en el local storage
    let carritoCompras
    if (localStorage.getItem("carrito")) {
        carritoCompras = JSON.parse(localStorage.getItem("carrito"))
    } else {
        carritoCompras = []
    }


    // Crear contenido HTML para mostrar los productos en el carrito
    let contenido = ""
    let montoTotal = 0
    for (let item of carritoCompras) {
        contenido += `
            <tr>
                <th scope="row">${item.id}</th>
                <th><img src="../assets/img/${item.img}" class="thumbnail"></th>
                <td>${item.producto}</td>
                <td>${item.cantidad}</td>
                <td>$${item.precio}</td>
                <td class="fw-bold">$${item.cantidad * item.precio}</td>
                <td><button class="btn btn-outline-danger" id="eliminarBtn${item.id}">Eliminar Unidad</button></td>
            </tr>
            ` 
        montoTotal += item.cantidad * item.precio
    }

    // Mostrar el contenido HTML en el modal
    // Si no hay productos en el carrito
    if (carritoCompras.length == 0) {
        document.getElementById("carritoDetalle").innerHTML = "No hay productos en el carrito"
    } else {
        document.getElementById("carritoDetalle").innerHTML = `
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
        `
    document.getElementById("montoTotal").innerHTML = `TOTAL: $${montoTotal}`
    }

    // Agregar evento click a los botones eliminar
    for (let item of carritoCompras) {
        let eliminarBtn = document.getElementById(`eliminarBtn${item.id}`)
        eliminarBtn.addEventListener("click", ()=>{
            let carritoActualizado = carritoCompras.filter(i => i.id !== item.id)
            localStorage.setItem("carrito", JSON.stringify(carritoActualizado))
            mostrarCarrito()
        })
    }    
}

// Buscador de productos
function buscarProductos(buscado, array){
    let busquedaArray = array.filter(
        (item) => item.producto.toLowerCase().includes(buscado.toLowerCase()) || item.categoria.toLowerCase().includes(buscado.toLowerCase()) || item.genero.toLowerCase().includes(buscado.toLowerCase())
    ) 
    //condicional sino encuentra nada:
    if(busquedaArray.length == 0){
        displayProductosBuscados.innerHTML = `<h3>No tenemos el producto que buscas...</h3>`
        mostrarCatalogo(busquedaArray)
    }else{
        displayProductosBuscados.innerHTML = ""
        mostrarCatalogo(busquedaArray)
    }
}

//Ordenar
function menorMayor(array){
    const menorMayor = [].concat(array)

    menorMayor.sort((a,b) => a.precio - b.precio)
    mostrarCatalogo(menorMayor)
}

function mayorMenor(array){
    const mayorMenor = [].concat(array)
    mayorMenor.sort((a, b)=> b.precio - a.precio)
    mostrarCatalogo(mayorMenor)
}

function alfabeticamente(array){
    const alfabe = [].concat(array)
    alfabe.sort((a,b) => {
        if(a.titulo > b.titulo) {
        return 1
        }
        if (a.titulo < b.titulo) {
        return -1
        }
        return 0
    })
    mostrarCatalogo(alfabe)
}

//Function para agregar un nuevo producto
function agregarProducto(array){
    //creamos nuevo objeto 
    const productoNuevo = new Producto(array.length+1, productoInput.value, categoriaInput.value, generoInput.value, parseInt(precioInput.value), "logo-square.png")
    console.log(productoNuevo)
    //sumarlo a estanteria
    array.push(productoNuevo)
    console.log(array)
    //guardar en localStorage
    localStorage.setItem("catalogo", JSON.stringify(array))
    mostrarCatalogo(array)

    //resetear input 
    productoInput.value = ""
    categoriaInput.value = ""
    generoInput.value = ""
    precioInput.value = ""
}

//EVENTOS:
let categorias = obtenerCategorias(catalogo)

document.addEventListener("DOMContentLoaded", () => {
    if (document.URL.includes("productos.html")) {
        mostrarCatalogo(catalogo)
        mostrarCategorias(catalogo)

        buscador.addEventListener("input", ()=>{
            buscarProductos(buscador.value, catalogo)
        }) 

        ordenSelect.addEventListener("change", ()=>{
            console.log(ordenSelect.value)
            if(ordenSelect.value == 1){
                menorMayor(catalogo)
            }else if(ordenSelect.value == 2){
                mayorMenor(catalogo)
            }else if(ordenSelect.value == 3){
                alfabeticamente(catalogo)
            }else{
                mostrarCatalogo(catalogo)
            }
        })

        document.getElementById("botonCarrito").addEventListener("click", function(){
            mostrarCarrito()
        })
    }
})


document.addEventListener("DOMContentLoaded", () => {
    if (document.URL.includes("admin.html")) {
        let guardarProductoBtn = document.getElementById("guardarProductoBtn")
        guardarProductoBtn.addEventListener("click", () => {
            agregarProducto(catalogo)
        })
    }
})


