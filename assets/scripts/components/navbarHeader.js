import { cargarComponente } from '../../../utilities/cargarComponente.js';
import productosMain from './productosMain.js';
import carritoMain from './carritoMain.js';

const navbarHeader= async () => {
    try{
        await cargarComponente('./views/layouts/navbar.html', 'header');
    }catch (error){
        console.error("Error al mostrar el navbar.", error)
    }

    irProductosMain()
    irCarritoMain()
    logout()
}

function irProductosMain(){
    document.getElementById('productosBtn').addEventListener('click', ()=>{
        productosMain()
    })
}

function irCarritoMain(){
    document.getElementById('carritoBtn').addEventListener('click', ()=>{
        carritoMain()
    })
}

function logout(){
    document.getElementById('logoutBtn').addEventListener('click', ()=>{
        localStorage.clear();
        window.location.href = './index.html';
    })
}

export default navbarHeader;