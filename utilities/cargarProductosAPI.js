import endpoints from "../assets/scripts/connections/endpoints.js";

export async function cargarProductosAPI() {
    try {
        const response = await fetch(endpoints.getAllProductos);
        // const response = await fetch('./utilities/productos.json');
        if (!response.ok) throw new Error('No se pudo cargar los productos.');
        
        return await response.json();
    } catch (error) {
        console.error('Fallo en la obtención de los productos desde el servidor:', error);
        throw new Error('Fallo en la obtención de los productos desde el servidor.');
    }
}