export async function cargarComponente(url, selector) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`No se pudo cargar el componente de: ${url}`);
        const html = await response.text();
        document.querySelector(selector).innerHTML = html;
    } catch (error) {
        console.error('Error al cargar el componente:', error);
        throw new Error('Error al cargar el componente.');
    }
}

// document.querySelector('main').innerHTML = await fetch('./views/pages/productosMain.html').then(response => response.text());            



