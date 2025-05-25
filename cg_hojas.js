// Lista de capítulos
const chapterLinks = [
  { title: "Introducción", url: "introduccion.html" },
  { title: "Capítulo I", url: "capitulo1.html" },
  { title: "Capítulo II", url: "capitulo2.html" },
  { title: "Capítulo III", url: "capitulo3.html" },
  { title: "Conclusión", url: "conclucion.html" }
];

// Hacer funciones globales
function goToChapter(page) {
  window.location.href = page;
}

function resetProgress() {
  if (confirm("¿Estás seguro de que quieres reiniciar tu progreso?")) {
    localStorage.removeItem("unlockedChapters");
    window.location.reload();
  }
}

window.goToChapter = goToChapter;
window.resetProgress = resetProgress;

// Inicializar menú y bloqueo de capítulos
document.addEventListener("DOMContentLoaded", function () {
  const navList = document.getElementById("chapterList");
  let unlockedChapters = parseInt(localStorage.getItem("unlockedChapters")) || 1;

  chapterLinks.forEach((chapter, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = chapter.title;
    link.href = chapter.url;

    // Si no está desbloqueado, deshabilitar
    if (index >= unlockedChapters) {
      link.style.opacity = "0.5";
      link.style.pointerEvents = "none";
    }

    // Al hacer clic en un capítulo desbloqueado, desbloqueamos el siguiente
    link.addEventListener("click", function (e) {
      if (index < unlockedChapters) {
        if (index + 2 > unlockedChapters) {
          unlockedChapters = index + 2;
          localStorage.setItem("unlockedChapters", unlockedChapters);
          updateMenu();
        }
      } else {
        e.preventDefault();
        alert("Debes leer el capítulo anterior primero.");
      }
    });

    li.appendChild(link);
    navList.appendChild(li);
  });
});

// Actualiza el menú sin recargar la página
function updateMenu() {
  const navList = document.getElementById("chapterList");
  navList.innerHTML = "";
  const unlockedChapters = parseInt(localStorage.getItem("unlockedChapters")) || 1;

  chapterLinks.forEach((chapter, index) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.textContent = chapter.title;
    link.href = chapter.url;

    if (index >= unlockedChapters) {
      link.style.opacity = "0.5";
      link.style.pointerEvents = "none";
    }

    link.addEventListener("click", function (e) {
      if (index < unlockedChapters) {
        if (index + 2 > unlockedChapters) {
          localStorage.setItem("unlockedChapters", index + 2);
          updateMenu();
        }
      } else {
        e.preventDefault();
        alert("Debes leer el capítulo anterior primero.");
      }
    });

    li.appendChild(link);
    navList.appendChild(li);
  });
}
function play() {
  const audio = document.getElementById("audio");
  audio.play();
}

window.updateMenu = updateMenu;