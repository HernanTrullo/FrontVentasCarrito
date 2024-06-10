/**
 * Comentarios JSDoc
 * Inicializa y maneja toda la lógica relacionada con la pantalla de inicio de sesión.
 * Esto incluye la validación del formulario de inicio de sesión, manejo de eventos
 * y comunicación con servicios de autenticación si es necesario.
 *
 * @function
 * @name loginMain
 * @description Inicia la funcionalidad de la página de login.
 * Puede añadir event listeners y realizar configuraciones iniciales necesarias.
 * Por ejemplo, configurar validaciones de formularios o manejar el estado inicial del DOM.
 * @returns {void} No retorna ningún valor.
 */
import signinMain from './components/signinMain.js';

document.addEventListener('DOMContentLoaded', () => {    
    signinMain();
});
