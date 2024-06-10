import { cargarModal } from '../../../utilities/cargarModal.js';
import endpoints from '../connections/endpoints.js';
import productosMain from './productosMain.js';

export async function eliminarProductoModal(producto) {
    try{
        await cargarModal('./views/components/eliminarProductoModal.html', 'eliminarModal');
    }catch (error){
        console.error("Error al mostrar el modal de eliminar producto.", error)
    }
    
    eliminarProducto(producto)
}

function eliminarProducto(producto){
    document.getElementById('textoProductoModal').innerText = producto.nombre; 
    document.getElementById("confirmarEliminarBtn").addEventListener("click", async ()=>{
        try {
            await eliminar(producto)
            document.getElementById("eliminarProductoModal").querySelector(".btn-close").click()           
            productosMain()
        } catch (error) {
            console.error(`Error al eliminar el producto. ${error}`)
            alert(`Error al eliminar el producto.`)
        }
    })
}


async function eliminar(producto){
    
    const response= await fetch(`${endpoints.deleteProducto}/${producto.id_producto}`, {
        method: "DELETE", 
        headers: {
            "Content-Type": "application/json"
        }
    })

    if(!response.ok){
        const errorDetalle= await response.text()
        throw new Error(`No se pudo eliminar el producto. ${errorDetalle}`)
    }

}
