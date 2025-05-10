const questions = [
    {
        question: "Laquelle de ces méthodes permet de transformer une chaîne JSON en objet JavaScript ?",
        answers: [
            { text: "JSON.parse()", correct: true },
            { text: "JSON.stringify()", correct: false },
            { text: "JSON.toObject()", correct: false },
            { text: "JSON.convert()", correct: false },
        ]
    },
    {
        question: " Quelle est la différence entre == et === en JavaScript ?",
        answers: [
            { text: "Aucune différence", correct: false },
            { text: "=== compare les valeurs uniquement", correct: false },
            { text: "=== compare valeur et type", correct: true },
            { text: "== est plus rapide", correct: false },
        ]
    },
    {
        question: "Que fait le mot-clé this dans une fonction d’objet ?",
        answers: [
            { text: "Réfère à la fonction elle-même", correct: false },
            { text: "Réfère à l’objet appelant", correct: true },
            { text: "Réfère à l’objet global", correct: false },
            { text: "Réfère au prototype", correct: false },
        ]
    },
    {
        question: "Quelle méthode ajouterait un élément à la fin d’un tableau ?",
        answers: [
            { text: "unshift()", correct: false },
            { text: "shift()", correct: false },
            { text: " pop()", correct: false },
            { text: "push()", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButton.firstChild) {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButton.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        StartQuiz();
    }
});

StartQuiz();

