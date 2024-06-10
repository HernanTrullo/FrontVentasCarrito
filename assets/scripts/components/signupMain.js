import { cargarComponente } from '../../../utilities/cargarComponente.js';
import productosMain from './productosMain.js';
import endpoints from '../connections/endpoints.js';
import signinMain from './signinMain.js';

const signupMain = () => {
    const user = localStorage.getItem('user');
    if(!user){
        cargarMain();
    }else{
        productosMain()
    }
}

async function cargarMain(){ 
    try{
        await cargarComponente('./views/pages/signupMain.html', 'main'); 
    }catch (error){
        console.error("Error al mostrar la vista registro.", error)
    }
    
    document.querySelectorAll('#signinForm input').forEach(input => {
        input.addEventListener('input', ocultarError);
    });
    document.getElementById('signupForm').addEventListener('submit', signup);
    irSigninMain()
}

function irSigninMain(){
    document.getElementById('signinBtn').addEventListener('click', ()=>{
        signinMain()
    })
}

async function signup(event){
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (!validarEmail(email)) {
        mostrarError('El correo electrónico no es válido.');
        return; 
    }
    
    if (!validarPassword(password)) {
        mostrarError('La contraseña debe tener más de 8 caracteres, incluir mayúsculas, minúsculas, un número y un carácter especial (!#$%&/?*-_@).');
        return; 
    }
    
    try {
        const user= await register(email, password)

        if(user){
            signinMain();
        }
        
    } catch (error) {
        console.error(error);
        mostrarError("Correo o contraseña incorrectos.");
    } 
}

async function register(username, password){

    const response= await fetch(endpoints.signup, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username, password})
    })

    if(!response.ok){
        const errorDetalle= await response.text()
        throw new Error(`No se pudo registrarse: ${errorDetalle}`)
    }

    return await response.json()
}

function validarEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function validarPassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!#$%&/?*-_@])[A-Za-z\d!#$%&/?*-_@]{8,}$/;
    return regex.test(password);
}

function mostrarError(mensaje) {
    const alertaError = document.getElementById('alertaError');
    alertaError.textContent = mensaje;
    alertaError.classList.remove('d-none');
}

function ocultarError(){
    const alertaError = document.getElementById('alertaError');
    alertaError.classList.add('d-none');
    alertaError.textContent = '';
}

export default signupMain;