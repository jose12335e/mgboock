// cg_hojas.js

// --- Funciones de Utilidad General ---

/**
 * Reproduce el audio del elemento con ID "audio".
 * Captura y registra errores si la reproducción falla (ej. por auto-reproducción bloqueada).
 */
function play() {
  const audio = document.getElementById("audio");
  if (audio) {
    audio.play().catch(error => {
      console.error("Error al reproducir el audio:", error);
      // Opcional: podrías mostrar un mensaje al usuario aquí si quieres
      // alert("No se pudo reproducir el audio automáticamente. Haz clic para activarlo.");
    });
  }
}

/**
 * Navega a la página de capítulo especificada.
 * @param {string} page - La URL del capítulo al que se desea navegar.
 */
function goToChapter(page) {
  window.location.href = page;
}

/**
 * Reinicia el progreso de lectura del usuario, eliminando el estado guardado
 * y redirigiendo a la página de introducción o volumen.
 */
function resetProgress() {
  if (confirm("¿Estás seguro de que quieres reiniciar tu progreso? Esto te llevará al inicio.")) {
    localStorage.removeItem("unlockedChapterIndex"); // Limpia el estado de los capítulos desbloqueados si lo usas.
    window.location.href = "vlm/volumen.html"; // Redirige a la página de inicio/volumen.
  }
}

// Hacemos las funciones accesibles globalmente para los atributos 'onclick' en HTML.
// En un proyecto más grande, se preferiría añadir event listeners en JavaScript.
window.play = play;
window.goToChapter = goToChapter;
window.resetProgress = resetProgress;


// --- Lógica de Firebase Firestore para el Envío de Opiniones ---

/**
 * Muestra un mensaje en el formulario de opinión con un estilo específico.
 * @param {string} message - El texto del mensaje a mostrar.
 * @param {string} type - El tipo de mensaje ('success', 'error', o vacío para neutral).
 */
function displayFormMessage(message, type = '') {
  const formMessage = document.getElementById('formMessage');
  formMessage.textContent = message;
  formMessage.className = type ? `${type}-message` : ''; // Añade la clase CSS correspondiente
  formMessage.classList.remove('hidden'); // Asegura que el mensaje sea visible
}

/**
 * Envía la opinión del lector a la colección 'opiniones' en Firestore.
 * Muestra mensajes de éxito o error al usuario.
 */
async function submitOpinion() {
  const nameInput = document.getElementById('readerName');
  const opinionInput = document.getElementById('opinionText');

  const name = nameInput.value.trim();
  const opinion = opinionInput.value.trim();

  if (opinion === '') {
    displayFormMessage('¡Por favor, escribe tu opinión antes de enviarla!', 'error');
    return;
  }

  displayFormMessage('Enviando tu opinión...', ''); // Mensaje de "cargando"

  try {
    // Asegúrate de que 'db' (la instancia de Firestore) esté inicializada globalmente
    // en tu archivo HTML ANTES de cargar este script.
    await db.collection("opiniones").add({
      name: name || "Anónimo", // Usa 'Anónimo' si el nombre está vacío
      opinion: opinion,
      timestamp: firebase.firestore.FieldValue.serverTimestamp() // Fecha y hora del servidor para consistencia
    });

    displayFormMessage('¡Gracias por tu opinión! Ha sido enviada.', 'success');

    // Limpia los campos del formulario después de un envío exitoso
    nameInput.value = '';
    opinionInput.value = '';

  } catch (error) {
    console.error("Error al enviar la opinión a Firebase:", error);
    displayFormMessage('Hubo un error al enviar tu opinión. Inténtalo de nuevo.', 'error');
  }
}

// Hacemos la función 'submitOpinion' accesible globalmente.
window.submitOpinion = submitOpinion;


// --- Inicialización al Cargar el Documento ---

document.addEventListener("DOMContentLoaded", function() {
  // Aquí puedes añadir cualquier lógica que necesite ejecutarse cuando
  // el DOM esté completamente cargado. Por ahora, no hay nada específico
  // relacionado con el desbloqueo de capítulos, ya que la navegación es libre.
});