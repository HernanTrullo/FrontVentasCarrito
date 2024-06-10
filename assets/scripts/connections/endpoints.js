const API_URL= "http://localhost:8080"
const API_URL_AUTH= "http://localhost:3000"

const endpoints= {
    getAllProductos: API_URL+"/productos",
    getProductoById: API_URL+"/productos",
    createProducto: API_URL+"/productos",
    updateProducto: API_URL+"/productos",
    deleteProducto: API_URL+"/productos",
    getAllCategorias: API_URL+"/categorias",
    signup: API_URL_AUTH+"/auth/signup",
    signin: API_URL_AUTH+"/auth/signin"
}

export default endpoints