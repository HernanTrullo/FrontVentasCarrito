class CarritoModel{
    constructor(){
        this.carrito= []
        this.cargarCarrito()
    }

    cargarCarrito(){
        try {
            const carritoGuardado= localStorage.getItem("carrito")
            if(carritoGuardado){
                this.carrito= JSON.parse(carritoGuardado)
            }
        } catch (error) {
            console.error("Error al cargar el carrito desde localstorage:", error)
            this.carrito= []
        }
    }

    añadirProducto(producto){
        if (!producto || !producto.id_producto || !producto.nombre || typeof producto.precio !== 'number') {
            throw new Error('Producto inválido.');
        }
        const productoEncontrado = this.carrito.find(p => p.id_producto === producto.id_producto);
        if (productoEncontrado) {
            productoEncontrado.cantidad += 1;
        } else {
            producto.cantidad = 1;
            this.carrito.push(producto);
        }
    }

    obtenerCarrito() {
        return this.carrito;
    }
    
    limpiarCarrito() {
        this.carrito = [];
    }

    removerProducto(id_producto) {
        const index = this.carrito.findIndex(p => p.id_producto == id_producto);
        if (index !== -1) {
            if (this.carrito[index].cantidad > 1) {
                this.carrito[index].cantidad -= 1;
            } else {
                this.carrito.splice(index, 1);
            }
        }
    }

    almacenarCarrito(){
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }
}

export {CarritoModel}