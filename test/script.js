// ========= DATENBANK UNSERER FRAGEN =========
// Hier legen wir alle unsere Artikel mit PLU und Bildpfad ab.
// WICHTIG: Erstelle einen Ordner "images" und lege deine Bilder dort ab.
const pluData = [
    { plu: "7011", image: "images/GGBanane.png" },
   
    // Füge hier so viele Artikel hinzu, wie du möchtest!
];

// ========= VERBINDUNG ZU DEN HTML-ELEMENTEN =========
// Wir holen uns alle HTML-Elemente, die wir verändern wollen, in unser Skript.
const pluImage = document.getElementById('plu-image');
const pluInput = document.getElementById('plu-input');
const scoreDisplay = document.getElementById('score-display');
const livesDisplay = document.getElementById('lives-display');
const feedbackIcon = document.getElementById('feedback-icon');
const gameArea = document.getElementById('game-area');
const gameOverScreen = document.getElementById('game-over-screen');
const finalScore = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

// ========= SPIELZUSTAND-VARIABLEN =========
// Diese Variablen speichern den aktuellen Stand des Spiels.
let score = 0;
let lives = 3;
let currentQuestionIndex = 0;
let currentQuestions = []; // Wird zu Beginn mit gemischten Fragen gefüllt

// ========= EVENT LISTENERS =========
// Diese "lauschen" auf Aktionen des Benutzers.

// Prüft die Antwort, wenn der Benutzer 4 Ziffern eingegeben hat.
pluInput.addEventListener('keyup', function() {
    if (pluInput.value.length === 4) {
        checkAnswer();
    }
});

// Startet das Spiel neu, wenn der Neustart-Button geklickt wird.
restartButton.addEventListener('click', startGame);

// ========= SPIELFUNKTIONEN =========

// Mischt ein Array (damit die Fragen immer in zufälliger Reihenfolge kommen)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Zeigt die nächste Frage an
function displayQuestion() {
    // Falls alle Fragen durch sind, mische neu und starte von vorne
    if (currentQuestionIndex >= currentQuestions.length) {
        currentQuestionIndex = 0;
        shuffleArray(currentQuestions);
    }
    
    const question = currentQuestions[currentQuestionIndex];
    pluImage.src = question.image; // Setzt das Bild
    pluInput.value = ""; // Leert das Eingabefeld
    feedbackIcon.innerHTML = ""; // Entfernt das Feedback-Icon
}

// Prüft die gegebene Antwort
function checkAnswer() {
    const userAnswer = pluInput.value;
    const correctAnswer = currentQuestions[currentQuestionIndex].plu;

    if (userAnswer === correctAnswer) {
        // Richtige Antwort
        score++;
        feedbackIcon.innerHTML = '✅'; // Zeigt grünen Haken
        feedbackIcon.style.color = 'green';
    } else {
        // Falsche Antwort
        lives--;
        feedbackIcon.innerHTML = '❌'; // Zeigt rotes X
        feedbackIcon.style.color = 'red';
    }

    updateUI();

    // Kurze Pause, damit der Spieler das Feedback sieht, dann nächste Frage oder Game Over
    setTimeout(() => {
        if (lives <= 0) {
            gameOver();
        } else {
            currentQuestionIndex++;
            displayQuestion();
        }
    }, 700); // 700 Millisekunden warten
}

// Aktualisiert die Anzeige für Punkte und Leben
function updateUI() {
    scoreDisplay.textContent = `Punkte: ${score}`;
    livesDisplay.textContent = "Leben: " + "❤️".repeat(lives);
}

// Beendet das Spiel
function gameOver() {
    gameArea.classList.add('hidden'); // Versteckt den Spielbereich
    gameOverScreen.classList.remove('hidden'); // Zeigt den Game-Over-Bildschirm
    finalScore.textContent = score; // Zeigt den finalen Punktestand
}

// Startet und initialisiert das Spiel
function startGame() {
    // Spielzustand zurücksetzen
    score = 0;
    lives = 3;
    currentQuestionIndex = 0;
    currentQuestions = [...pluData]; // Kopiert die Fragen in die aktuelle Runde
    shuffleArray(currentQuestions); // Mischt die Fragen

    // UI zurücksetzen
    gameOverScreen.classList.add('hidden'); // Versteckt Game-Over-Screen
    gameArea.classList.remove('hidden'); // Zeigt Spielbereich
    pluInput.focus(); // Setzt den Cursor direkt ins Eingabefeld
    updateUI();
    displayQuestion();
}

// ========= SPIELSTART =========
// Das Spiel wird gestartet, sobald die Seite vollständig geladen ist.
startGame();