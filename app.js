
function listenForCreateNewQuestion(addQuestionElement) {
    if (addQuestionElement != null) {
        addQuestionElement.addEventListener('click', (e) => {
            // e.preventDefault();
            e.stopPropagation();
            renderAdditionalQuestion(document.querySelector('#questions'))
        });
    };
};

function renderAdditionalQuestion(appender) {

    // need some way of knowing what question this is numerically. 
    const currentQuestionCount = document.querySelector('#questions').querySelectorAll('.question').length;
    
    console.log('currentQuestionCount', currentQuestionCount)

    const newQuestionHTMLTemplate = `
<div class="card col-12 mb-3">
    <div class="card-body">                   
        <div class="form-group col-12">
        <div class="float-right m-1">
            <button type="button" id="remove-quiz-question-${currentQuestionCount}" class="btn btn-danger">Delete ${currentQuestionCount}</button>
        </div>
            <label class="card-title font-weight-bold" for="quiz-question-${currentQuestionCount}">Quiz Question ${currentQuestionCount}</label>
            <textarea class="form-control question" id="quiz-question-${currentQuestionCount}" rows="3"></textarea>

    </div>
    <div class="form-group col-12">
        <div>
            <button type="button" id="add-question-${currentQuestionCount}" class="btn btn-success">Add Answer Option</button>
        </div>
        <div class="answer-options">
            <div class="row answer-option">
                <div class="col-12">
                    <label class="card-subtitle mb-2 font-weight-bold" for="quiz-answer-${currentQuestionCount}">Quiz Answer Option 0</label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-10">
                    <input type="text" class="form-control" id="quiz-answer-${currentQuestionCount}">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <button type="button" id="remove-quiz-answer-${currentQuestionCount}" class="btn btn-danger disabled align-self-center">Remove Option</button>
                </div>
            </div>
        </div>
    </div>
    </div>
</div>
`;
    appender.innerHTML += newQuestionHTMLTemplate;
    removeQuestion(document.querySelector(`#remove-quiz-question-${currentQuestionCount}`));

    listenForAddAnswerOption(document.querySelector(`#add-question-${currentQuestionCount}`), currentQuestionCount);
};

function removeQuestion(removeElement) {
    removeElement.addEventListener('click', (e) => {
        e.stopPropagation();
        e.target.closest('.card').remove();
    })
    // slice the question out? of the final object array. -why not construct object on submit then use that?
    // re-order all of the ids?
};

function listenForAddAnswerOption(addAnswerOptionElement, currentQuestionValue) {
    if(addAnswerOptionElement != null) {
        addAnswerOptionElement.addEventListener('click', (e) => {
            e.stopPropagation();
            renderAdditionalAnswerOption(e.target.parentElement.parentElement.querySelector('.answer-options'), currentQuestionValue);
        })
    }
}

function renderAdditionalAnswerOption(appender, currentQuestionValue) {

    const currentAnswerCount = appender.querySelectorAll('.answer-option').length;

    const answerOptionHtmlTemplate = `
    <div class="row answer-option">
                <div class="col-12">
                    <label class="card-subtitle mb-2 font-weight-bold" for="quiz-question-${currentQuestionValue}-answer-${currentAnswerCount}">Quiz Answer Option ${currentAnswerCount} </label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-10">
                    <input type="text" class="form-control" id="quiz-question-${currentQuestionValue}-answer-${currentAnswerCount}">
                </div>
                <div class="col-12 col-sm-6 col-md-2">
                    <button type="button" id="remove-quiz-question-${currentQuestionValue}-answer-${currentAnswerCount}" class="btn btn-danger align-self-center">Remove Option ${currentAnswerCount}</button>
                </div>
            </div>
    `;

    appender.innerHTML += answerOptionHtmlTemplate;
    removeAnswerOption(document.querySelector(`#remove-quiz-question-${currentQuestionValue}-answer-${currentAnswerCount}`));
};

function removeAnswerOption(removeElement) {
    if(removeElement != null) {
        removeElement.addEventListener('click', (e) => {
            e.stopPropagation();
            e.target.closest('.answer-option').remove();
        })
    }
}

window.addEventListener("DOMContentLoaded", () => {

    listenForCreateNewQuestion(document.querySelector('#add-question'));
    listenForAddAnswerOption(document.querySelector(`#add-question-0`));


})