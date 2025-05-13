const display = document.getElementById('display'); // => on récupère l'écran de la calculette
let currentInput = '';


// Ajouter les chiffres
document.querySelectorAll('[data-number]').forEach(button => { //Les attributs data- sont faits spécialement pour stocker des infos personnalisées dans un élément HTML.
  button.addEventListener('click', () => {
    currentInput += button.dataset.number; // pour récuperer la valeur du bouton
    updateDisplay();
  });
});

// Ajouter les opérateurs
document.querySelectorAll('[data-operator]').forEach(button => {
  button.addEventListener('click', () => {
    const op = button.dataset.operator;

    // Empêche d'ajouter un opérateur en premier ou après un autre opérateur
    if (currentInput === '' || /[+\-*/]$/.test(currentInput)) return;

    currentInput += op;
    updateDisplay();
  });
});


// Bouton =
document.getElementById('equals').addEventListener('click', () => {
  try {
    // Valide que l'entrée est mathématiquement sûre (pas de lettres, etc.)
    if (/^[0-9.+\-*/() ]+$/.test(currentInput)) {
      const result = eval(currentInput); // Attention : eval est utilisé ici avec précaution
      currentInput = result.toString();
    } else {
      currentInput = 'Erreur';
    }
  } catch {
    currentInput = 'Erreur';
  }

  updateDisplay();
});

// Bouton Clear
document.getElementById('clear').addEventListener('click', () => {
  currentInput = '';
  updateDisplay();
});

// Fonctions utilitaires
function updateDisplay() {
  display.value = currentInput || '0';
}
