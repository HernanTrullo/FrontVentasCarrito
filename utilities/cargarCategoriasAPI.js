import endpoints from "../assets/scripts/connections/endpoints.js";

export async function cargarCategoriasAPI() {
    try {
        const response = await fetch(endpoints.getAllCategorias);
        // const response = await fetch('./utilities/productos.json');
        if (!response.ok) throw new Error('No se pudo cargar las categorias.');
        
        return await response.json();
    } catch (error) {
        console.error('Fallo en la obtención de los productos desde el servidor:', error);
        throw new Error('Fallo en la obtención de los productos desde el servidor.');
    }
}