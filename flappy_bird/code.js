/*************** Variables ***************/
var time = 0;
var waiting_ceilling = -10;
var velocity_y = 0;
var velocity_x = 0;

var game_over = document.getElementById("game_over");
var text_score = document.getElementById("text_score");
var title = document.getElementById("title")

var player = document.getElementById("player");

var waiting1 = false;
var waiting2 = false;
var waiting3 = false;
var waiting4 = false;

var waiting_transistion = 0;

var n = 0;
var a = 0;

var h1 = document.getElementById("h1");
var h2 = document.getElementById("h2");
var h3 = document.getElementById("h3");
var h4 = document.getElementById("h4");

var b1 = document.getElementById("b1");
var b2 = document.getElementById("b2");
var b3 = document.getElementById("b3");
var b4 = document.getElementById("b4");

var gameOver = false;
var homepage = true
var bounce = false;
var jump = true;
var rotate = false;

var gravity = 0.15;
var gravity_bool = true
var waiting_jump = 0;

var score = 0;
var best_score_1_value = localStorage.getItem('best_score');

var transition_faite = false

/*
localStorage.removeItem('best_score')
*/



/*************** Initialization ***************/
function fact(x){
    result = 1
    if(x == 0){
        return 1
    }
    for(var i = 1; i < x+1; i++){
        result = result * i
    }
    return result
};

function sin(x){
    result = 0
    for(var i = 0; i < 50; i++){
        result += (x ** ((2*i)+1)) * ((-1) ** i) / fact((2*i)+1)
    }
    return result
};

function random_pos(start) {
    return -((start - Math.random()*300)-50)
};

function get_info(who, what) {
    return parseInt(window.getComputedStyle(document.getElementById(who)).getPropertyValue(what));
};

setInterval(function(){
    time = time+1
},100);

if(localStorage.getItem('best_score') == null){
    best_score_1.innerHTML = "Best score : 0"
}
else{
    best_score_1.innerHTML = "Best score : " + localStorage.getItem('best_score')
}

player.style.top = 360 + "px"



/*************** Other ***************/


    



/*************** position random trou debut ***************/
var random1 = random_pos(2442)
h1.style.top = random1 + "px";
waiting1 = false

var random2 = random_pos(2672)
h2.style.top = random2 + "px";
waiting2 = false

var random3 = random_pos(2902)
h3.style.top = random3 + "px";
waiting3 = false

var random4 = random_pos(3132)
h4.style.top = random4 + "px";
waiting4 = false






/*************** Jump ***************/

document.addEventListener('keydown', function(event) {

    if(event.keyCode == 32) {
        if((jump) && (time - waiting_ceilling > 3)){
            velocity_y = -4
            waiting_jump = time
        }

        if((gameOver) && (time - waiting_jump > 10)){
            gameOver = false
            restart_game()
            velocity_y = -4
        }

        if(homepage){
            homepage = false
            title.style.zIndex = -1
            restart_game()
            velocity_y = -4
        }
    }
});






/*************** Hole generation ***************/
h1.addEventListener('animationiteration', () => {
    var random = random_pos(2442)
    h1.style.top = random + "px";
    waiting1 = false

});

h2.addEventListener('animationiteration', () => {
    var random = random_pos(2672)
    h2.style.top = random + "px";
    waiting2 = false
});

h3.addEventListener('animationiteration', () => {
    var random = random_pos(2902)
    h3.style.top = random + "px";
    waiting3 = false
});

h4.addEventListener('animationiteration', () => {
    var random = random_pos(3132)
    h4.style.top = random + "px";
    waiting4 = false
});






/*************** Collision, Score ***************/


setInterval(function(){

    var distance_web_game = (document.documentElement.scrollWidth - 500)/2

    /*************** placement joueur ***************/
    if(gameOver == false){
        player.style.left = distance_web_game + 50 + "px"
    }

    /*************** Data ***************/
    var b1_left = get_info("b1", "left")
    var b2_left = get_info("b2", "left")
    var b3_left = get_info("b3", "left")
    var b4_left = get_info("b4", "left")

    var block_width = get_info("b1", "width")

    var h1_top = get_info("h1", "top") + 2442 + 40
    var h1_bottom = get_info("h1", "top") + 2442 + 230 - 40
    var h2_top = get_info("h2", "top") + 2672 + 40
    var h2_bottom = get_info("h2", "top") + 2672 + 230 - 40
    var h3_top = get_info("h3", "top") + 2902 + 40
    var h3_bottom = get_info("h3", "top") + 2902 + 230 - 40
    var h4_top = get_info("h4", "top") + 3132 + 40
    var h4_bottom = get_info("h4", "top") + 3132 + 230 - 40

    var player_left = get_info("player", "left")
    var player_width = get_info("player", "width")
    var player_top = get_info("player", "top")
    var player_height = get_info("player", "height")

    var player_left_modif = get_info("player", "left") - distance_web_game + 50



    /*************** Collision ***************/
    if(
        ((player_left - distance_web_game + player_width > b1_left) && (b1_left + block_width > player_left - distance_web_game) && ((player_top-35 < h1_top)||(player_top-35 + player_height > h1_bottom)))
        || 
        ((player_left - distance_web_game + player_width > b2_left) && (b2_left + block_width > player_left - distance_web_game) && ((player_top-35 < h2_top)||(player_top-35 + player_height > h2_bottom)))
        ||
        ((player_left - distance_web_game + player_width > b3_left) && (b3_left + block_width > player_left - distance_web_game) && ((player_top-35 < h3_top)||(player_top-35 + player_height > h3_bottom))) 
        ||
        ((player_left - distance_web_game + player_width > b4_left) && (b4_left + block_width > player_left - distance_web_game) && ((player_top-35 < h4_top)||(player_top-35 + player_height > h4_bottom))))   {
            gameOver = true
    }

    if((player_top - 35 + player_height + 20 > 635) || (player_left < distance_web_game)){
        player.style.zIndex = -1
        player.style.top = 200 + "px"
        player.style.left = -1000 + "px"
        activate_gravity = false
        gameOver = true
    }

    if((player_top <= 35)&& (time-waiting_ceilling > 3)){
        velocity_y = -1 * velocity_y
        waiting_ceilling = time
    }



    /*************** Score ***************/

    if(((b1_left + block_width < 70) && (b1_left + block_width > 60)) && (waiting1 == false)) {
        score++
        waiting1 = true
    }
    if(((b2_left + block_width < 70) && (b2_left + block_width > 60)) && (waiting2 == false)) {
        score++
        waiting2 = true
    }
    if(((b3_left + block_width < 70) && (b3_left + block_width > 60)) && (waiting3 == false)) {
        score++
        waiting3 = true
    }
    if(((b4_left + block_width < 70) && (b4_left + block_width > 60)) && (waiting4 == false)) {
        score++
        waiting4 = true
    }

    var text_score = document.getElementById("text_score")
 
    text_score.style.left = 250 + distance_web_game - 150 + "px";

    
    var game_over = document.getElementById("game_over")
    game_over.style.left = distance_web_game + "px";

    title.style.left = distance_web_game + 25 + "px";

    

    var restart = document.getElementById("restart")
    restart.style.left = distance_web_game + "px";

    var best_score_1 = document.getElementById("best_score_1")
    best_score_1.style.left = distance_web_game + 10 + "px";


    /*************** homepage ***************/

    if(homepage){
        restart.style.zIndex = 3;
        text_score.style.zIndex = -1
        best_score_1.style.zIndex = -1
        if(a > 18.84){
            a = 0
        }
        a = a + 0.02
        restart.innerHTML = "press space to start"
        restart.style.color = "rgba(0, 0, 0, " + String(sin(a)) + ")"
        b1.style.animationPlayState = 'paused';
        b2.style.animationPlayState = 'paused';
        b3.style.animationPlayState = 'paused';
        b4.style.animationPlayState = 'paused';
        h1.style.animationPlayState = 'paused';
        h2.style.animationPlayState = 'paused';
        h3.style.animationPlayState = 'paused';
        h4.style.animationPlayState = 'paused';
        jump = false
        rotate = false
    }

    /*************** Game Over ***************/
    if(gameOver){

        restart.innerHTML = "press space to restart"

        game_over.style.zIndex = 3;
        restart.style.zIndex = 3;
        if(a > 18.84){
            a = 0
        }
        a = a + 0.02
        restart.style.color = "rgba(0, 0, 0, " + String(sin(a)) + ")"
        b1.style.animationPlayState = 'paused';
        b2.style.animationPlayState = 'paused';
        b3.style.animationPlayState = 'paused';
        b4.style.animationPlayState = 'paused';
        h1.style.animationPlayState = 'paused';
        h2.style.animationPlayState = 'paused';
        h3.style.animationPlayState = 'paused';
        h4.style.animationPlayState = 'paused';

        if(transition_faite == false){
            text_score.style.transition = "1s"
            transition_faite = true
            waiting_transistion = time
        }
        if(time - waiting_transistion > 10){
            text_score.style.transition = "0s"
        }

        text_score.style.top = "250px";
        text_score.style.fontSize = "4.5rem";

        jump = false
        rotate = true

        if(score > best_score_1_value){
            best_score_1_value = score
            localStorage.setItem('best_score',best_score_1_value)

            best_score_1.innerHTML = "Best score : " + localStorage.getItem('best_score')
        }
    }

    if(rotate){
        n = n + 10
        player.style.transform = 'rotate(' + String(n) + 'deg)';
    }





    /*************** Bounce ***************/
    if(b1_left > -200){
        if(((player_left_modif - 42 + player_width > b1_left) && (player_top + player_height - 35 > h1_top + 160) && (player_left_modif < b1_left + block_width)) || ((player_left_modif - 42 + player_width > b1_left) && (player_top < h1_top + 40) && (player_left_modif < b1_left + block_width) && (player_top - 35 < h1_top - 20))) {
            velocity_x = 2
            velocity_x = -1 * velocity_x
        }
        else if((player_top-35 < h1_top) && (player_left_modif - 42 + player_width > b1_left) && (player_left_modif < b1_left + block_width + 60)){
            if(velocity_y < 1){
                velocity_y = 2
                velocity_x = 3
            }
            else{
                velocity_y = -0.5 * velocity_y
                velocity_x = 3
            }
        }
        else if((player_top-35 + player_height > h1_bottom) && (player_left_modif - 42 + player_width > b1_left)&& (player_left_modif < b1_left + block_width+60)){
            velocity_y = -0.7 * velocity_y
            velocity_x = 3
        }
    }


    if(b2_left > -200){
        if(((player_left_modif - 42 + player_width > b2_left) && (player_top + player_height - 35 > h2_top + 160) && (player_left_modif < b2_left + block_width)) || ((player_left_modif - 42 + player_width > b2_left) && (player_top < h2_top + 40) && (player_left_modif < b2_left + block_width) && (player_top - 35 < h2_top - 20))) {
            velocity_x = 2
            velocity_x = -1 * velocity_x
        }
        else if((player_top-35 < h2_top) && (player_left_modif - 42 + player_width > b2_left) && (player_left_modif < b2_left + block_width + 60)){
            if(velocity_y < 1){
                velocity_y = 2
                velocity_x = 3
            }
            else{
                velocity_y = -0.5 * velocity_y
                velocity_x = 3
            }
        }

        else if((player_top-35 + player_height > h2_bottom) && (player_left_modif - 42 + player_width > b2_left)&& (player_left_modif < b2_left + block_width+60)){
            velocity_y = -0.7 * velocity_y
            velocity_x = 3
        }
    }




    if(b3_left > -200){
        if(((player_left_modif - 42 + player_width > b3_left) && (player_top + player_height - 35 > h3_top + 160) && (player_left_modif < b3_left + block_width)) || ((player_left_modif - 42 + player_width > b3_left) && (player_top < h3_top + 40) && (player_left_modif < b3_left + block_width) && (player_top - 35 < h3_top - 20))) {
            velocity_x = 2
            velocity_x = -1 * velocity_x
        }
        else if((player_top-35 < h3_top) && (player_left_modif - 42 + player_width > b3_left) && (player_left_modif < b3_left + block_width + 60)){
            if(velocity_y < 1){
                velocity_y = 2
                velocity_x = 3
            }
            else{
                velocity_y = -0.5 * velocity_y
                velocity_x = 3
            }
        }

        else if((player_top-35 + player_height > h3_bottom) && (player_left_modif - 42 + player_width > b3_left)&& (player_left_modif < b3_left + block_width+60)){
            velocity_y = -0.7 * velocity_y
            velocity_x = 3
        }
    }



    if(b4_left > -200){
        if(((player_left_modif - 42 + player_width > b4_left) && (player_top + player_height - 35 > h4_top + 160) && (player_left_modif < b4_left + block_width)) || ((player_left_modif - 42 + player_width > b4_left) && (player_top < h4_top + 40) && (player_left_modif < b4_left + block_width) && (player_top - 35 < h4_top - 20))) {
            velocity_x = 2
            velocity_x = -1 * velocity_x
        }
        else if((player_top-35 < h4_top) && (player_left_modif - 42 + player_width > b4_left) && (player_left_modif < b4_left + block_width + 60)){
            if(velocity_y < 1){
                velocity_y = 2
                velocity_x = 3
            }
            else{
                velocity_y = -0.5 * velocity_y
                velocity_x = 3
            }
        }

        else if((player_top-35 + player_height > h4_bottom) && (player_left_modif - 42 + player_width > b4_left)&& (player_left_modif < b4_left + block_width+60)){
            velocity_y = -0.7 * velocity_y
            velocity_x = 3
        }
    }
        
    if((homepage) && (player_top > 400)){
        velocity_y = -4
    }

    /*************** text ***************/
    text_score.innerHTML = score
    console.log()
},10);




/*************** restart ***************/
function restart_game(){
    var b1_el = document.getElementById('b1');
    b1_el.style.animation = 'none';
    b1_el.offsetHeight; /* trigger reflow */
    b1_el.style.animation = null; 

    var b2_el = document.getElementById('b2');
    b2_el.style.animation = 'none';
    b2_el.offsetHeight; /* trigger reflow */
    b2_el.style.animation = null; 

    var b3_el = document.getElementById('b3');
    b3_el.style.animation = 'none';
    b3_el.offsetHeight; /* trigger reflow */
    b3_el.style.animation = null; 

    var b4_el = document.getElementById('b4');
    b4_el.style.animation = 'none';
    b4_el.offsetHeight; /* trigger reflow */
    b4_el.style.animation = null; 

    var h1_el = document.getElementById('h1');
    h1_el.style.animation = 'none';
    h1_el.offsetHeight; /* trigger reflow */
    h1_el.style.animation = null; 

    var h2_el = document.getElementById('h2');
    h2_el.style.animation = 'none';
    h2_el.offsetHeight; /* trigger reflow */
    h2_el.style.animation = null; 

    var h3_el = document.getElementById('h3');
    h3_el.style.animation = 'none';
    h3_el.offsetHeight; /* trigger reflow */
    h3_el.style.animation = null; 

    var h4_el = document.getElementById('h4');
    h4_el.style.animation = 'none';
    h4_el.offsetHeight; /* trigger reflow */
    h4_el.style.animation = null;

    player.style.top = 360 + "px"
    player.style.zIndex = 2
    rotate = false
    jump = true
    activate_gravity = true
    game_over.style.zIndex = -1;
    restart.style.zIndex = -1;
    velocity_y = 0
    velocity_x = 0
    score = 0
    player.style.transform = 'rotate(' + String(n + (360 - n)) + 'deg)'
    n = 0

    transition_faite = false
    text_score.style.transition = "1s"
    text_score.style.fontSize = "2.5rem";
    text_score.style.top = "100px";
    waiting1 = false;
    waiting2 = false;
    waiting3 = false;
    waiting4 = false;
    gravity_bool = true;
    best_score_1.style.zIndex = 3
    text_score.style.zIndex = 3
}


/*************** Gravity ***************/
setInterval(function(){
    var position_y = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    var position_x = parseInt(window.getComputedStyle(player).getPropertyValue("left"));

    if(gravity_bool){
        var friction_y = 0.007 * velocity_y
        var friction_x = 0.007 * velocity_x

        if(position_y < 900){
            velocity_y = velocity_y + gravity - friction_y
            player.style.top = (position_y + velocity_y) + "px";
        }

        velocity_x = velocity_x - friction_x
        player.style.left = (position_x + velocity_x) + "px";
    }

    console.log()
},10);



