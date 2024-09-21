import { question } from './questions.js';

let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timerInterval;
const TIME_LIMIT = 5; 


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


function startQuiz() {
    shuffledQuestions = shuffleArray([...question]); 
    displayQuestion(); 
}


function displayQuestion() {
    const quizContainer = document.querySelector('.quiz-container');

    
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        return;
    }

    const currentQuestion = shuffledQuestions[currentQuestionIndex];

    quizContainer.innerHTML = `
        <h3>${currentQuestion.ques}</h3>
        <div class="options">
            ${currentQuestion.option.map(opt => 
              `<p class="option">${opt}</p>`
            ).join('')}
        </div>
        <p class="timer">Time left: <span id="timer">${TIME_LIMIT}</span> seconds</p>
    `;

    
    let timeLeft = TIME_LIMIT;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++; 
            setTimeout(displayQuestion, 1000); 
        }
    }, 1000);

    
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', () => {
            if (option.textContent === currentQuestion.correct) {
                score++;
            }
            clearInterval(timerInterval);
            currentQuestionIndex++; 
            setTimeout(displayQuestion, 1000); 
        });
    });
}


function endQuiz() {
    document.querySelector('.quiz-container').innerHTML = `
        <h2>Quiz Finished!</h2>
        <p>Your score is: ${score}/${shuffledQuestions.length}</p>
    `;
}

window.onload = function () {
    startQuiz();
};
