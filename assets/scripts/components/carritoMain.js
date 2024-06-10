import { cargarComponente } from '../../../utilities/cargarComponente.js';
import {CarritoModel} from '../models/carritoModel.js';


const carritoMain = async () => {
    try{
        await cargarComponente('./views/pages/carritoMain.html', 'main'); 
    }catch (error){
        console.error("Error al mostrar la vista carrito.", error)
    }
    
    const carritoModel= new CarritoModel()
    irAtras()  
    mostrarProductosCarrito(carritoModel)   
    eliminarProducto(carritoModel)  
    vaciarCarrito(carritoModel)
    pagarCarrito(carritoModel)
}


function irAtras(){
    document.getElementById('atrasBtn').addEventListener('click', () => window.location.href = './index.html');
}


function mostrarProductosCarrito(carritoModel) {
    const productosCarrito = document.getElementById('productosCarrito');
    productosCarrito.innerHTML = ''; 

    if(carritoModel.obtenerCarrito().length==0){
        productosCarrito.innerHTML = `<h5 class="lead text-center mb-3">Carrito vacío</h5>`;
    }else{
        carritoModel.obtenerCarrito().forEach((producto) => {
            productosCarrito.innerHTML += `
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">$${producto.precio} x ${producto.cantidad} = $${producto.precio * producto.cantidad}</p>
                        <button class="btn" data-id="${producto.id_producto}">Eliminar</button>
                    </div>
                </div>
            `;
        });        
    }
}

function eliminarProducto(carritoModel) {
    try {
        const productosCarrito = document.getElementById('productosCarrito');
        productosCarrito.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn')) {
                const id_producto = event.target.getAttribute('data-id');
                carritoModel.removerProducto(id_producto)
                guardarCarrito(carritoModel)   
                mostrarProductosCarrito(carritoModel)      
            } 
        });
    } catch (error) {
        alert("Error al remover el producto:" + error.message)
    }
}

function vaciarCarrito(carritoModel) {
    document.getElementById('vaciarBtn').addEventListener('click', () => {
        carritoModel.limpiarCarrito()
        guardarCarrito(carritoModel)   
        mostrarProductosCarrito(carritoModel)
    });
}

function pagarCarrito(carritoModel) {
    document.getElementById('pagarBtn').addEventListener('click', () => {
        if (carritoModel.obtenerCarrito().length > 0) {            
            carritoModel.limpiarCarrito() 
            guardarCarrito(carritoModel)     
            mostrarProductosCarrito(carritoModel)  
            alert('Pago realizado exitosamente.');
        } else {
            alert('El carrito está vacío.');
        }        
    });
}


function guardarCarrito(carritoModel) {
    try {
        carritoModel.almacenarCarrito()
    } catch (error) {
        console.error('Error al guardar el carrito:', error);
    }
}


function agregarProducto(producto){
    try {
        const carritoModel= new CarritoModel()
        carritoModel.añadirProducto(producto)
        guardarCarrito(carritoModel)
    } catch (error) {
        alert("Error al agregar el producto:" + error.message)
    }
}


export {agregarProducto}
export default carritoMain;