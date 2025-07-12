// Cambia esto al PIN deseado
const correctPin = "211330";

// Hacer la función global para poder usarla desde HTML
function verifyPin() {
  const pinInput = document.getElementById("pin-input").value;
  const errorMessage = document.getElementById("error-message");
  const authContainer = document.getElementById("auth-container");
  const contentContainer = document.getElementById("content-container");

  // Validar el PIN
  if (pinInput === correctPin) {
    // Ocultar pantalla de autenticación y mostrar contenido
    authContainer.style.display = "none";
    contentContainer.style.display = "block";
  } else {
    // Mostrar mensaje de error
    errorMessage.style.display = "block";
  }
}

// Aseguramos que la función esté disponible globalmente
window.verifyPin = verifyPin;