import { cargarComponente } from '../../../utilities/cargarComponente.js';
import {crearEditarProductoModal} from './crearEditarProductoModal.js';
import {eliminarProductoModal} from './eliminarProductoModal.js';
import {cargarProductosAPI} from '../../../utilities/cargarProductosAPI.js';

const detalleProductoMain = async (id_producto) => {
    try{
        await cargarComponente('./views/pages/detalleProductoMain.html', 'main');
    }catch (error){
        console.error("Error al mostrar la vista detalle producto.", error)
    }

    irAtras()
    cargarDetalleProducto(id_producto);
    mostrarCrearEditarProductoModal()
    mostrarEliminarProductoModal()
}

function irAtras(){
    document.getElementById('atrasBtn').addEventListener('click', () => window.location.href = './index.html');
}

async function cargarDetalleProducto(id_producto) {
    
    try {
        const productos= await cargarProductosAPI()
        const producto = productos.find(p => p.id_producto.toString() === id_producto);
        
        if (!producto) {
            throw new Error('Producto no encontrado.');
        }
        
        document.getElementById('categoria').innerText = producto.categoria;
        document.getElementById('nombre').innerText = producto.nombre;
        document.getElementById('precio').innerText = producto.precio;
        document.getElementById('descripcion').innerText = producto.descripcion;

        crearEditarProductoModal({editar:true, productos: productos, producto: producto});
        eliminarProductoModal(producto);

    } catch (error) {
        console.error('Error al cargar los detalles de la producto:', error);
        return null; 
    }
}


function mostrarCrearEditarProductoModal(){
    document.getElementById('editarBtn').addEventListener('click', ()=>{
        var myModal = new bootstrap.Modal(document.getElementById('crearEditarProductoModal'));
        myModal.show(); 
    });
}

function mostrarEliminarProductoModal(){
    document.getElementById('eliminarBtn').addEventListener('click', ()=>{
        var myModal = new bootstrap.Modal(document.getElementById('eliminarProductoModal'));
        myModal.show(); 
    })
}

export {cargarDetalleProducto}
export default detalleProductoMain;