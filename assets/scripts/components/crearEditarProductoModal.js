import { cargarModal } from '../../../utilities/cargarModal.js';
import { cargarProductos } from './productosMain.js';
import { cargarDetalleProducto } from './detalleProductoMain.js';
import endpoints from '../connections/endpoints.js';
import {cargarCategoriasAPI} from '../../../utilities/cargarCategoriasAPI.js';

export async function crearEditarProductoModal({editar = false, productos, producto}) {
    try{
        await cargarModal('./views/components/crearEditarProductoModal.html', 'productoModal');
    }catch (error){
        console.error("Error al mostrar el modal de crear editar producto.", error)
    }
    
    const categorias= await cargarCategorias(productos)
    editar && editarModal(categorias, producto);
    crearEditarProducto(editar)
}

async function cargarCategorias(productos) {
    const categoriasAPi = await cargarCategoriasAPI()
    const categorias = [...categoriasAPi.map(categoria => categoria.nombre)];
    // const categorias = [...new Set(productos.map(producto => producto.categoria))];
    const categoriaSelect = document.getElementById('categoriaSelect');
    categoriaSelect.innerHTML = '';
    categorias.forEach((categoria, index) => {
        let opcion = document.createElement('option');
        opcion.value = index+1;
        opcion.textContent = categoria;
        categoriaSelect.appendChild(opcion);
    });

    return categorias
}

function editarModal(categorias, producto) {
    document.querySelector('#crearEditarProductoModal h5').textContent = 'Editar Producto';
    document.querySelector('#crearEditarProductoModal button[type="submit"]').textContent = 'Editar';
    const categoria= categorias.findIndex(categoria => categoria === producto.categoria);
    document.getElementById('categoriaSelect').value = categoria+1 || '';
    document.getElementById('productoId').value = producto.id_producto || '';
    document.getElementById('nombreInput').value = producto.nombre || '';
    document.getElementById('precioInput').value = producto.precio || '';
    document.getElementById('descripcionTextarea').value = producto.descripcion || ''; 
}


function crearEditarProducto(editar){
    document.getElementById("crearEditarProductoForm").addEventListener("submit", async (event)=>{
        event.preventDefault()
        const productoObtenido= obtenerProducto()
        try {         
            const productoRecibido= await enviarProducto(editar, productoObtenido)
            document.getElementById("crearEditarProductoModal").querySelector(".btn-close").click()
            alert(`Producto ${productoRecibido.nombre} ${!editar ? "creado" : "Actualizado"} con exito.`)
            !editar ? cargarProductos() : cargarDetalleProducto(productoRecibido.id_producto)
        } catch (error) {
            console.error(`Error al ${!editar ? "crear" : "Actualizar"} el producto. ${error}`)
            alert(`Error al ${!editar ? "crear" : "Actualizar"} el producto.`)
        }
    })
}

function obtenerProducto(){
    return {
        id_producto: document.getElementById("productoId").value,
        nombre: document.getElementById("nombreInput").value,
        descripcion: document.getElementById("descripcionTextarea").value,
        precio: parseInt(document.getElementById("precioInput").value),
        id_categoria: Number(document.getElementById("categoriaSelect").value)
    }
}

async function enviarProducto(editar, productoObtenido){

    const url= !editar ? endpoints.createProducto : `${endpoints.updateProducto}/${productoObtenido.id_producto}`
    const method= !editar ? "POST" : "PUT"
    
    const response= await fetch(url, {
        method: method, 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(productoObtenido)
    })

    if(!response.ok){
        const errorDetalle= await response.text()
        throw new Error(`No se pudo ${!editar ? "crear" : "Actualizar"} el producto. ${errorDetalle}`)
    }

    return await response.json()
}

