document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);

let score = 0;
let currentQuestionIndex = 0;
let timer;

const questions = [
    {
        question: "What do you call a computer on a network that requests files from another computer?",
        options: ["A client", "A host", "A router", "A web server"],
        correct: "A client",

    },
    {
        question: "How can you catch a computer virus?",
        options: ["Sending e-mail messages", "Using a laptop during the winter", "Opening e-mail attachments", "Shopping on-line"],
        correct: "Opening e-mail attachments",
    },
    {
        question: "Google (www.google.com) is a:",
        options: ["Search Engine", "Number in Math", "Directory of images", "Chat service on the web"],
        correct: "Search Engine",
    },
    {
        question: "Which is not an Internet protocol?",
        options: ["HTTP", "FTP", "STP", "IP"],
        correct: "STP",
    },
    {
        question: "Which of the following is not a valid domain name?",
        options: ["www.yahoo.com", "www.yahoo.co.uk", "www.com.yahoo", "www.yahoo.co.in"],
        correct: "www.com.yahoo",
    }
];

function startQuiz() {
    document.getElementById('initial-screen').classList.remove('active');
    setTimeout(() => {
      document.getElementById('initial-screen').style.display = 'none';
      document.getElementById('quiz-container').style.display = 'block';
      document.getElementById('quiz-container').classList.add('active');
      // Call displayQuestion to ensure elements are loaded
      displayQuestion();
      // Call startTimer after elements are potentially loaded
      startTimer();
    }, 300);
  }
  

function displayQuestion() {
    const question = questions[currentQuestionIndex];
    document.getElementById('question').innerText = question.question;
    const optionsContainer = document.getElementById('answer-options');
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
        const optionElement = document.createElement('div');
        optionElement.innerHTML = `
            <input type="radio" name="answer" value="${option}">
            <label>${option}</label>
        `;
        optionsContainer.appendChild(optionElement);
    });
}

document.getElementById('submit-btn').addEventListener('click', handleSubmit);

function handleSubmit() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        const answer = selectedOption.value;
        if (answer === questions[currentQuestionIndex].answer) {
            score++;
            document.getElementById('feedback-container').innerText = 'Correct!';
        } else {
            document.getElementById('feedback-container').innerText = 'Incorrect!';
        }
        document.getElementById('score').innerText = score;
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    } else {
        alert('Please select an answer');
    }
}

function startTimer() {
    let timeLeft = 30;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
        } else {
            document.getElementById('timer').innerText = timeLeft;
            timeLeft--;
        }
    }, 1000);
}

function endQuiz() {
    document.getElementById('quiz-container').innerHTML = `<h2>Quiz Over! Your score is ${score}</h2>`;
}

// Trigger animation on page load
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('initial-screen').classList.add('active');
});