function renderAdditionalQuestion(appender) {
    // need some way of knowing what question this is numerically. 
    const currentQuestionCount = document.querySelector('#questions').querySelectorAll('.question').length;
    const newQuestionHTMLTemplate = `
<div class="card col-12 mb-3">
    <div class="card-body">                   
        <div class="form-group col-12">
        <div class="float-right m-1">
            <button type="button" class="btn btn-danger delete-question">Delete ${currentQuestionCount}</button>
        </div>
            <label class="card-title font-weight-bold" for="quiz-question-${currentQuestionCount}">Quiz Question ${currentQuestionCount}</label>
            <textarea class="form-control question" id="quiz-question-${currentQuestionCount}" rows="3"></textarea>

    </div>
    <div class="form-group col-12">
        <div class="answer-options">
            <div>
                <button type="button" class="btn btn-success add-answer-option">Add Answer Option</button>
            </div>
            <div class="row answer-option">
                <div class="col-12">
                    <label class="card-subtitle mb-2 font-weight-bold" for="quiz-answer-${currentQuestionCount}">Quiz Answer Option 0</label>
                    </div>
                    <div class="col-12 col-sm-6 col-md-9">
                    <input type="text" class="form-control" id="quiz-answer-${currentQuestionCount}">
                </div>
                <div class="col-12 col-sm-6 col-md-3">
                    <button type="button" class="btn btn-danger disabled align-self-center remove-answer-option">Remove Option</button>
                </div>
            </div>
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

window.addEventListener("DOMContentLoaded", () => {

    // EVENT DELEGATION
    document.querySelector('#create-quiz-form').addEventListener("click", function (e) {

        // Adding Questions 
        if (e.target && e.target.matches("#add-question")) {
            e.stopPropagation();
            renderAdditionalQuestion(document.querySelector('#questions'))
        };

        // Removing Questions
        if (e.target && e.target.matches('.delete-question')) {
            e.stopPropagation();
            e.target.closest('.card').remove();
        };

        // adding Answer Options
        if (e.target && e.target.matches('.add-answer-option')) {
            e.stopPropagation();
            console.log('hi', e.target)
            renderAdditionalAnswerOption(e.target.closest('.answer-options'));
        };

        // Removing Answer Options
        if (e.target && e.target.matches('.remove-answer-option')) {
            e.stopPropagation();
            e.target.closest('.answer-option').remove();
        };

    });


})