const start_btn = document.querySelector(".start_btn");
const quit_btn = document.querySelector(".quit_btn");
const play_btn = document.querySelector(".play_btn");
const next_btn = document.querySelector(".next_que_btn");

const about_box = document.querySelector(".about_box");
const question_box = document.querySelector(".question_box");
const result_box = document.querySelector(".result_box");

const question_options = document.querySelector(".question_options");
const status_text = document.querySelector(".status_text")
const timer_text = document.querySelector("#timer_sec");
const result_text = document.querySelector(".result_content");

let question_counter=0;
let correct_answer_count=0;
let counter;
let timer_value=10;
let chronometer_ms=720;

function ShowAboutBox() {
	about_box.classList.remove("hidden");
	start_btn.classList.add("hidden");
}

function ShowResultBox(){
    result_text.innerHTML = "<p>"+ questions.length +" sorudan "+correct_answer_count+" tane doğru yaptınız.</p>"
    question_box.classList.add("hidden");
    result_box.classList.remove("hidden");
}

function LeaveAboutBox() {
	about_box.classList.add("hidden");
	start_btn.classList.remove("hidden");
}

function RestartQuiz(){
    question_counter=0;
    correct_answer_count=0;
    clearInterval(counter);
    result_box.classList.add("hidden");
    start_btn.classList.remove("hidden");
}

function StartQuiz() {
	about_box.classList.add("hidden");
	question_box.classList.remove("hidden");
	ShowQuestions(0);
    StartTimer(timer_value);
}

function NextQuestion(){
    if(question_counter < questions.length - 1){
        question_counter++;
        clearInterval(counter);
        StartTimer(timer_value);
        ShowQuestions(question_counter);
    }
    else{ //Game Over
        ShowResultBox();
    }

}

function ShowQuestions(index) {
	const que_title = document.querySelector(".question_title");
	let que_text = questions[index].index+") "+ questions[index].question;
	let option_text = "<li class='que_options'>" + questions[index].options[0] + "</li>";
	for (let i = 1; i < questions[index].options.length; i++) {
		option_text +="<li class='que_options'>" + questions[index].options[i] + "</li>";
	}
	question_options.innerHTML = option_text;
	que_title.innerHTML = que_text;
    status_text.innerHTML = correct_answer_count +" / "+ question_counter;

    const options=question_options.querySelectorAll(".que_options");
    for(let i=0;i<options.length;i++)
    {
        options[i].setAttribute("onclick","OptionSelected(this)");
    }
}

function OptionSelected(answer){
    clearInterval(counter);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[question_counter].answer;
    let options_count = question_options.children.length;
    if(userAnswer === correctAnswer){
        answer.classList.add("correct_que");
        correct_answer_count++;
    }
    else{
        answer.classList.add("incorrect_que");
        SelectCorrectAnswer(options_count);
    }
    DisableAllOptions(options_count);
    setTimeout(() => {
        NextQuestion();
    }, chronometer_ms);
}

function DisableAllOptions(options_count){
    for(let index = 0; index < options_count; index++){
        question_options.children[index].classList.add("disabled")
    }
}

function SelectCorrectAnswer(options_count){
    let correctAnswer = questions[question_counter].answer;
    for(let index = 0; index < options_count; index++){
        if(question_options.children[index].textContent === correctAnswer){
            question_options.children[index].classList.add("correct_que")
        }
    }
}

function StartTimer(time){
    counter = setInterval(timer,1000);
    function timer(){
        timer_text.textContent = time;
        time--;
        if(time < 0){
            timer_text.textContent = "0";
            let options_count = question_options.children.length;
            SelectCorrectAnswer(options_count);
            DisableAllOptions(options_count);
            setTimeout(() => {
                NextQuestion();
            }, chronometer_ms);
        }
    }
}