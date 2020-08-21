var character = document.getElementById("character");
var obstacle = document.getElementById("obstacle");
var main_frame = document.getElementById("main_frame");
var score = document.getElementById("score");
var play_button = document.getElementById("play_button");
var high_score_counter = document.getElementById("high_score");
var points = 0;
var high_score = 0;
var run;

play_button.addEventListener("click", start_game);

function start_game() {
    play_button.classList.add("hide");
    high_score_counter.classList.add("hide");
    enable_jump();
    obstacle.classList.add("animate_obstacle");
    run = setInterval(animate_run, 100);
}

function enable_jump() {
    main_frame.addEventListener("click", animate_jump);
}

function animate_jump() {
    if(character.classList.contains("animate_jump")) {
        return;
    }
    character.classList.add("animate_jump");
    setTimeout(remove_jump, 500);
}

function remove_jump() {
    character.classList.remove("animate_jump");
    var obstacle_left = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    if(obstacle_left <= 40) {
    add_point();
    }
}

function add_point() {
    points++;
    score.innerHTML = "Score: " + points;
}

var check_dead = setInterval(function() {
    var character_top = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var obstacle_left = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));
    //console.log(character_top);
    console.log(obstacle_left);
    if((obstacle_left < 60 && obstacle_left > 40) && character_top > 240){
        death_screen();
    }
}, 10);

var tick = 0;

function animate_run() {
    if(tick == 0) {
        character.style.backgroundImage="url(character2.png)";
        tick = 1;
    }
    else
    {
        character.style.backgroundImage="url(character.png)";
        tick = 0;
    }
}

function death_screen() {
    if(points > high_score) {
        high_score = points;
    }
    points = 0;
    score.innerHTML = "Score: " + points;
    high_score_counter.innerHTML = "Highscore: " + high_score;
    play_button.classList.remove("hide");
    high_score_counter.classList.remove("hide");
    obstacle.classList.remove("animate_obstacle");
    main_frame.removeEventListener("click", animate_jump);
    clearInterval(run);
}