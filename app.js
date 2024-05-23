let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "red", "green", "purpel"] // fpr the random selection
let started = false;
let level = 0;
let highScore = 0; 

let h2 = document.querySelector('h2');
let h3 = document.querySelector('h3');
let score = document.getElementById("#score");

document.addEventListener("keypress", function() {  // to start the game 
    if(started == false) {    // game is not started untill any key was pressed
        started = true;
        levelUp();
    };
    
});

// for flash the button
function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function (){
        btn.classList.remove("flash")
    },  250);
};


//for user input
function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function (){
        btn.classList.remove("userflash")
    },  250);
};


// after successfull user input it level up
function levelUp () {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random()*4); // to generate random color
    let randColor = btns[randIdx];
    let randbtn = document.querySelector(`.${randColor}`);   
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
};    



// to check user sequence is same as game sequence and update score
function checkAns(idx) {

    // for correct sequence
    if (userSeq[idx] === gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
            if (highScore < level) {   // for score should not be reseted
                highScore = level;
                h3.innerText= `High Score is : ${highScore}`;
                updateHighScore();
            };
            
        };
    } else {  // for wrong selection or wrong sequence
        h2.innerHTML = `Game Over! Your Score was <b>${level-1}</b><br>Press any key to start.`;
        document.querySelector("body").style.backgroundColor="red";
        setTimeout (function () {
            document.querySelector("body").style.backgroundColor="white";
        }, 250);
        reset();
    };
};



// for button and which colors button is pressed
function btnPress () {
    let btn = this;
    userFlash(btn);

    userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
};


// for all button behaviour
let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
};


// to reset game after wrong selection
function reset () {
    started = false;
    gameSeq = [];
    userSeq= [];
    level = 0; 
};


// for score should not be reseted
 function updateHighScore () {
    score = highScore+1;
 };
