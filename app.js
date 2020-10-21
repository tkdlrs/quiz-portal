//  Admin
function renderAdditionalQuestion(appender) {
    // need some way of knowing what question this is numerically. 
    const currentQuestionCount = document.querySelector('#questions').querySelectorAll('.question').length;
    const newQuestionHTMLTemplate = `
<div class="card col-12 mb-3 question">
<div class="card-body">                   
    <div class="form-group col-12">
    <div class="float-right m-1">
        <button type="button" class="btn btn-danger delete-question">Delete ${currentQuestionCount}</button>
    </div>
        <label class="card-title font-weight-bold" for="quiz-question-${currentQuestionCount}">Quiz Question ${currentQuestionCount}</label>
        <textarea class="form-control" id="quiz-question-${currentQuestionCount}" rows="3"></textarea>

</div>
<div class="form-group col-12">
    <div class="answer-options">
        <div>
            <button type="button" class="btn btn-success add-answer-option">Add Answer Option</button>
        </div>
        <div class="row answer-option">
            <div class="col-12">
                <label class="card-subtitle mb-2 font-weight-bold" for="answer-option-0">Quiz Answer Option 0</label>
                </div>
                <div class="col-12 col-sm-6 col-md-9">
                <input type="text" class="form-control" id="answer-option-0">
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <button type="button" class="btn btn-danger disabled align-self-center remove-answer-option">Remove Option 0</button>
            </div>
        </div>
    </div>
</div>
<div class="form-group col-12">
    <div class="correct-answer">
    <label class="font-weight-bold" for="quiz-question-${currentQuestionCount}-correct-answer">Correct Answer for Question ${currentQuestionCount}</label>
    <input type="text" class="form-control" id="quiz-question-${currentQuestionCount}-correct-answer" >
</div>
</div>
</div>
</div>
`;
    appender.innerHTML += newQuestionHTMLTemplate;
};

function renderAdditionalAnswerOption(appender) {
    const currentAnswerCount = appender.querySelectorAll('.answer-option').length;
    const answerOptionHtmlTemplate = `
<div class="row answer-option">
            <div class="col-12">
                <label class="card-subtitle mb-2 font-weight-bold" for="answer-option-${currentAnswerCount}">Quiz Answer Option ${currentAnswerCount} </label>
                </div>
                <div class="col-12 col-sm-6 col-md-9">
                <input type="text" class="form-control" id="answer-option-${currentAnswerCount}">
            </div>
            <div class="col-12 col-sm-6 col-md-3">
                <button type="button" class="btn btn-danger justify-content-center align-self-center remove-answer-option">Remove Option ${currentAnswerCount}</button>
            </div>
        </div>
`;
    appender.innerHTML += answerOptionHtmlTemplate;
};

function setupEventDelegationForCreateQuiz(element) {
    if (element !== null) {
        element.addEventListener("click", (e) => {

            // Adding Questions 
            if (e.target && e.target.matches("#add-question")) {
                e.stopPropagation();
                renderAdditionalQuestion(document.querySelector('#questions'))
            };

            // Removing Questions
            if (e.target && e.target.matches('.delete-question')) {
                e.stopPropagation();
                e.target.closest('.question').remove();
                const remainingQuestions = document.querySelectorAll('.question');
                for (let i = 0; i < remainingQuestions.length; i++) {
                    const question = remainingQuestions[i];
                    question.querySelector('.delete-question').innerText = `Delete ${i}`;
                    question.querySelector('label').innerText = `Quiz Question ${i}`;
                    question.querySelector('label').setAttribute('for', `quiz-question-${i}`);
                    question.querySelector('textarea').setAttribute('id', `quiz-question-${i}`);
                    question.querySelector('.correct-answer label').innerText = `Correct Answer for Question ${i}`;
                    question.querySelector('.correct-answer label').setAttribute('for', `quiz-question-${i}-correct-answer`)
                    question.querySelector('.correct-answer input').setAttribute('id', `quiz-question-${i}-correct-answer`)
                };
            };

            // adding Answer Options
            if (e.target && e.target.matches('.add-answer-option')) {
                e.stopPropagation();
                renderAdditionalAnswerOption(e.target.closest('.answer-options'));
            };

            // Removing Answer Options
            if (e.target && e.target.matches('.remove-answer-option')) {
                e.stopPropagation();
                const allOptions = e.target.closest('.answer-options');
                e.target.closest('.answer-option').remove();
                const remaingAnswerOptions = allOptions.querySelectorAll('.answer-option');
                for (let i = 0; i < remaingAnswerOptions.length; i++) {
                    const answerOption = remaingAnswerOptions[i];
                    answerOption.querySelector('label').innerText = `Quiz Answer Option ${i}`;
                    answerOption.querySelector('label').setAttribute('for', `answer-option-${i}`);
                    answerOption.querySelector('input').setAttribute('id', `answer-option-${i}`);
                    answerOption.querySelector('.remove-answer-option').innerText = `Remove Option ${i}`;
                };
            };

        });


    };
};

function setupSubmitNewQuiz(element) {
    if (element !== null) {
        element.addEventListener('submit', (e) => {
            e.preventDefault();
            const newQuizObject = {};

            newQuizObject['quizName'] = document.querySelector('#quiz-name').value;

            const quizQuestions = document.querySelectorAll('.question');
            for (let i = 0; i < quizQuestions.length; i++) {
                const currentQuizQuestion = quizQuestions[i];

                newQuizObject[`quizQuestion${i}`] = currentQuizQuestion.querySelector(`#quiz-question-${i}`).value;

                let answerOptionsArray = [];
                const currentQuestionAnswerOptions = currentQuizQuestion.querySelectorAll('.answer-option');
                currentQuestionAnswerOptions.forEach(answerOption => {
                    console.log(answerOption)
                    answerOptionsArray.push(answerOption.querySelector('input').value);
                });
                newQuizObject[`quizQuestion${i}AnswerOptions`] = answerOptionsArray;
                newQuizObject[`quizQuestion${i}CorrectAnswer`] = currentQuizQuestion.querySelector('.correct-answer input').value;
                if (!answerOptionsArray.includes(currentQuizQuestion.querySelector('.correct-answer input').value)) {
                    document.querySelector('#error-message').classList.remove('d-none');
                    document.querySelector('#error-message').innerHTML = '<strong>Error</strong>: One of the answer options must be correct.'
                    return;
                };
            };


            console.log(newQuizObject);
            // Then this UI/ UX stuff needs to happen so users don't freak out.
            document.querySelector('#create-quiz-form').reset();
            document.querySelector('#success-message').classList.remove('d-none');
            document.querySelector('#create-quiz-form').classList.add('d-none');
            document.querySelector('#error-message').classList.add('d-none');
            document.querySelector('#error-message').innerHTML = '';

            setTimeout(() => {
                document.querySelector('#success-message').classList.add('d-none');
                document.querySelector('#create-quiz-form').classList.remove('d-none');
            }, 5000)
        })


    }
};

// Users
function renderQuizQuestion(index, data) {
    const question = data[`quizQuestion${index}`];
    const answers = data[`quizQuestion${index}AnswerOptions`];

    let htmlTemplate = `
 <div class="form-group question">
        <label class="font-weight-bold" for="question-${index}">${Number(index)+1}) ${question}</label>
        <select id="question-${index}" class="form-control" required="required">
          <option value="">Please select a value</option>
          `;
    answers.forEach(answer => {
        htmlTemplate += `
              <option value="${answer}">${answer}</option>
              `;
    })
    htmlTemplate += `
        </select>
      </div>
 `;
    return htmlTemplate;
};

function renderQuiz(data, appender) {
    const quizTitle = data.quizName;
    const regex = /\s/gi;
    const cleanQuizTitle = quizTitle.trim().replace(regex, '-');

    const numberOfQuestions = (Object.keys(data).length - 1) / 3;

    let questionTemplate = '';

    for (let i = 0; i <= numberOfQuestions - 1; i++) {
        questionTemplate += renderQuizQuestion(i, data);
    }

    const htmlTemplate = `
<div class="row">
  <div class="col-12">
    <h1>${quizTitle}</h1>
  </div>
</div>
<div class="row">				
  <div class="col-12">
    <div class="success-alert alert alert-success d-none">
      <p>Your quiz has been submitted. You will receive an e-mail when your quiz has been graded.</p>
    </div>
    <form id="${cleanQuizTitle}-form">
        ${questionTemplate}
        <div class="float-right">
            <p class="mt-2"><a href="https://www.usu.edu/privacy/">Privacy Notice</a></p>
            <button type="submit" class="btn btn-primary">Submit Quiz</button>
        </div>
      <br>
      <div class="clearfix"></div>
      <div class="error alert alert-danger d-none"></div>						
      <div class="clearfix"></div>
      <br>
    </form>
  </div>
</div>
    `;
    appender.innerHTML = htmlTemplate;
};

function setupQuizForUser(element) {
    if (element != null) {
        // get the questions from your DB. here we'll use a static json file as an example.
        fetch('./fake-quiz.json')
            .then(response => {
                return response.json();
            })
            .then(data => {
                return renderQuiz(data, element);
            })
            .catch(err => console.log(err));

    };
};


// Things that should actually happen.
window.addEventListener("DOMContentLoaded", () => {
    // Admins functions
    setupEventDelegationForCreateQuiz(document.querySelector('#create-quiz-form'));
    setupSubmitNewQuiz(document.querySelector('#create-quiz-form'));
    // Users functions
    setupQuizForUser(document.querySelector('#user-quiz'))
})