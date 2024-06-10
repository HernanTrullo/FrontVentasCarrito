import { cargarComponente } from '../../../utilities/cargarComponente.js';
import navbarHeader from './navbarHeader.js';
import detalleProductoMain from './detalleProductoMain.js';
import {crearEditarProductoModal} from './crearEditarProductoModal.js';
import {cargarProductosAPI} from '../../../utilities/cargarProductosAPI.js';
import { agregarProducto } from './carritoMain.js';

let productos= []

const productosMain = async () => {
    navbarHeader()

    try{
        await cargarComponente('./views/pages/productosMain.html', 'main'); 
    }catch (error){
        console.error("Error al mostrar la vista productos.", error)
    }

    cargarProductos();
    mostrarCrearEditarProductoModal() 
    buscarCategoria();       
    filaTabla()
}

async function cargarProductos() {
    try {
        productos = await cargarProductosAPI();
        crearEditarProductoModal({ productos });
        mostrarProductos("");

    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
}

function mostrarProductos(filtro) {
    const productosFiltrados = productos.filter(producto => 
        producto.categoria.toLowerCase().includes(filtro.toLowerCase())
    );
    const productosTabla = document.getElementById('productosTabla');
    let tabla = '<table class="table table-hover">';
    tabla += '<thead><tr><th>Categoría</th><th>Producto</th><th>Precio</th><th>Acción</th></tr></thead><tbody>';

    productosFiltrados.forEach(producto => {
        tabla += `<tr class="mi-tr-producto" data-id="${producto.id_producto}">
                    <td>${producto.categoria}</td>
                    <td>${producto.nombre}</td>
                    <td>${producto.precio}</td>
                    <td><button class="btn" data-id="${producto.id_producto}">Agregar</button></td>
                    </tr>`;
    });

    tabla += '</tbody></table>';
    productosTabla.innerHTML = tabla;
}


function buscarCategoria(){
    const buscarInput = document.getElementById('buscarInput');
    const buscarBtn = document.getElementById('buscarBtn');
    const icono = buscarBtn.querySelector('i');
    
    buscarInput.addEventListener('keyup', (event) => {
        const texto = event.target.value.trim();
        if (texto.length >= 3  && event.key === 'Enter') {
            mostrarProductos(texto);
            icono.classList.replace("bi-search", "bi-x");
        } else if (texto.length === 0) {
            icono.classList.replace("bi-x", "bi-search");
            mostrarProductos('');
        }
    });    
        
    buscarBtn.addEventListener('click', function() {
        const texto = buscarInput.value.trim();
        if (texto.length >= 3  && icono.classList.contains("bi-search")) {
            mostrarProductos(texto);
            icono.classList.replace("bi-search", "bi-x");
        }else if (icono.classList.contains("bi-x")) {
            buscarInput.value = ''; 
            icono.classList.replace("bi-x", "bi-search");
            mostrarProductos('');
        } 
    });
}


function filaTabla(){    
    const productosTabla = document.getElementById('productosTabla');
    productosTabla.addEventListener('click', (event) => {
        const elemento = event.target;

        if (elemento.classList.contains('btn')) {
            const id_producto = elemento.getAttribute('data-id');
            agregarCarrito(id_producto);        

        } else if (elemento.closest('.mi-tr-producto')) {
            const id_producto = elemento.closest('.mi-tr-producto').getAttribute('data-id');
            detalleProductoMain(id_producto);
        }
    });
}

function agregarCarrito(id_producto) {
    const producto = productos.find(p => p.id_producto == id_producto);
    agregarProducto(producto);
    alert(`${producto.nombre} ha sido agregado al carrito.`);    
}


function mostrarCrearEditarProductoModal(){
    document.getElementById('crearProductoBtn').addEventListener('click', ()=>{
        var myModal = new bootstrap.Modal(document.getElementById('crearEditarProductoModal'));
        myModal.show(); 
    });
}

export {cargarProductos}
export default productosMain;