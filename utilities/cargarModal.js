export async function cargarModal(url, idModal) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`No se pudo cargar el modal de: ${url}`);
        const html = await response.text();
        document.getElementById(idModal).innerHTML = html;
    } catch (error) {
        console.error('Error al cargar el modal:', error);
        throw new Error('Error al cargar el modal.');
    }
}
