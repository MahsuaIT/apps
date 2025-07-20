const categoryButtons = document.querySelectorAll('.category-btn');
const difficultyButtons = document.querySelectorAll('.difficulty-btn');
const startButton = document.getElementById('start');
const backButton = document.getElementById('back');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const quizContainer = document.getElementById('quiz');
const selectionScreen = document.getElementById('selection-screen');

let score = 0;
let currentQuestion = {};
let difficultyLevel = 1;
let mathCategory = '+';

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        mathCategory = button.getAttribute('data-category');
        categoryButtons.forEach(btn => btn.style.backgroundColor = '');
        button.style.backgroundColor = '#0056b3';
    });
});

difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyLevel = parseInt(button.getAttribute('data-level'));
        difficultyButtons.forEach(btn => btn.style.backgroundColor = '');
        button.style.backgroundColor = '#0056b3';
    });
});

startButton.addEventListener('click', () => {
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    selectionScreen.style.display = 'none';
    quizContainer.style.display = 'block';
    generateQuestion();
});

backButton.addEventListener('click', () => {
    quizContainer.style.display = 'none';
    selectionScreen.style.display = 'block';
    resetSelection();
});

function generateQuestion() {
    const max = Math.pow(10, difficultyLevel) - 1;
    const min = Math.pow(10, difficultyLevel - 1);
    const num1 = Math.floor(Math.random() * (max - min + 1)) + min;
    const num2 = Math.floor(Math.random() * (max - min + 1)) + min;
    let question = '';
    let correctAnswer = 0;

    switch(mathCategory) {
        case '+':
            question = `What is ${num1} + ${num2}?`;
            correctAnswer = num1 + num2;
            break;
        case '-':
            question = `What is ${num1} - ${num2}?`;
            correctAnswer = num1 - num2;
            break;
        case '*':
            question = `What is ${num1} * ${num2}?`;
            correctAnswer = num1 * num2;
            break;
        case '/':
            question = `What is ${num1} / ${num2}?`;
            correctAnswer = parseFloat((num1 / num2).toFixed(2)); // Limit to two decimal places
            break;
    }

    currentQuestion = {
        question: question,
        answer: correctAnswer
    };

    questionElement.innerText = currentQuestion.question;
    answersElement.innerHTML = '';

    // Generate answer buttons
    const correctAnswerButton = createAnswerButton(correctAnswer, true);
    answersElement.appendChild(correctAnswerButton);

    for (let i = 0; i < 3; i++) {
        let wrongAnswer;
        do {
            wrongAnswer = generateWrongAnswer(correctAnswer, difficultyLevel);
        } while (document.getElementById(`answer-${wrongAnswer}`));

        const wrongAnswerButton = createAnswerButton(wrongAnswer, false);
        answersElement.appendChild(wrongAnswerButton);
    }

    shuffleAnswers();
    resultElement.innerText = '';
}

function createAnswerButton(answer, isCorrect) {
    const button = document.createElement('button');
    button.classList.add('answer-btn');
    button.innerText = answer;
    button.id = `answer-${answer}`;
    button.addEventListener('click', () => handleAnswerClick(button, isCorrect));
    return button;
}

function handleAnswerClick(button, isCorrect) {
    if (isCorrect) {
        score++;
        button.classList.add('correct');
        resultElement.innerText = 'Correct!';
    } else {
        button.classList.add('incorrect');
        resultElement.innerText = 'Wrong!';
        const correctButton = document.getElementById(`answer-${currentQuestion.answer}`);
        correctButton.classList.add('correct');
    }
    scoreElement.innerText = `Score: ${score}`;
    setTimeout(generateQuestion, 1000);
}

function generateWrongAnswer(correctAnswer, level) {
    const range = Math.pow(10, level);
    let wrongAnswer = correctAnswer;
    while (wrongAnswer === correctAnswer) {
        wrongAnswer = Math.floor(Math.random() * range);
        if (mathCategory === '/' && level === 3) {
            wrongAnswer = parseFloat((wrongAnswer / 100).toFixed(2));
        }
    }
    return wrongAnswer;
}

function shuffleAnswers() {
    for (let i = answersElement.children.length; i >= 0; i--) {
        answersElement.appendChild(answersElement.children[Math.random() * i | 0]);
    }
}

function resetSelection() {
    categoryButtons.forEach(btn => btn.style.backgroundColor = '');
    difficultyButtons.forEach(btn => btn.style.backgroundColor = '');
    mathCategory = '+';
    difficultyLevel = 1;
}
