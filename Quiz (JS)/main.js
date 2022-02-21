const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');
const numberOfQuestion = document.getElementById('number-of-question'),
      nuberOfAllQuestions = document.getElementById('number-of-all-questions');

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');
const btnTryAgain = document.getElementById('btn-try-again'); 

let score = 0;
let indexOfQuestion,
    indexOfPage = 0;


const correctAnswer = document.getElementById('correct-answer');
const numberOfAllQuestion2 = document.getElementById('number-of-all-questions-2');


const questions = [
    {
        question: 'Сколько раз я могу отжаться?',
        options: [
            '8',
            '32',
            '64',
            '128'
        ],
        rightAnswer: 2
    },
    {
        question: 'Любимый бургер в Маке?',
        options: [
            'БигМак',
            'БигТейсти',
            'Мон-Блан Бургер',
            'Цезарь-Ролл'
        ],
        rightAnswer: 1
    },
    {
        question: 'Самый милый зверек?',
        options: [
            'Котик',
            'Свинка',
            'Жираф',
            'Песик'
        ],
        rightAnswer: 3
    },
    {
        question: 'Сколько раз я могу подтянуться?',
        options: [
            '8',
            '32',
            '64',
            '128'
        ],
        rightAnswer: 0
    },
    {
        question: 'Мой любимый праздник?',
        options: [
            'Новый Год',
            'День Рождения',
            'День взятия Бастилии',
            'День Знаний'
        ],
        rightAnswer: 2
    }
];

nuberOfAllQuestions.innerHTML = questions.length;

let complitedAnswers = []; 

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; 

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};
const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false;

    if (indexOfPage == questions.length) {
        quizOver();
    } else {
        if (complitedAnswers.length > 0) {
            complitedAnswers.forEach (item => {
                if (item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if (hitDuplicate) {
                randomQuestion();
            } else {
                indexOfQuestion = randomNumber;
                load()
            }
        }
        if (complitedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load()
        }
    }
    complitedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    blockOptions();
}

const blockOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('wrong', 'correct', 'disabled')
    })
}

const answerTracker = () => {
    questions.forEach (() => {
        const div = document.createElement ('div');
        answersTracker.appendChild (div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validation = () => {
    if (!option1.classList.contains('disabled')){
        alert('You must choose any answer!')
    } else {
        randomQuestion();
        enableOptions();
    }
}

btnNext.addEventListener('click', () => {
    validation();
})

for (option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e))
}

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestion2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);