'use strict';
// assigns the HTML elements a variable 
let c = document.getElementById("myCanvas");
let background = document.getElementById("background");
let selectBackground = document.getElementById('select-background')
let startButton = document.getElementById("start");
let startButtonHover = document.getElementById('start-hover');
let scroll1 = document.getElementById('scroll1');
let idleCharacter = document.getElementById('character-idle');
let nextButton = document.getElementById('next-button');
let backButton = document.getElementById('back-button');
let atk_icon = document.getElementById('atk-point');
let defence_icon = document.getElementById('defence');
let health_icon = document.getElementById('health-point');
let crit_icon = document.getElementById('crit');
let energy_icon = document.getElementById('energy');
let special_icon = document.getElementById('special');
let world_map = document.getElementById('map');
let map_pointer = document.getElementById('pointer');
let battle_map = document.getElementById('battle-map');
let battle_button = document.getElementById('battle-button');
let battle_button_bg = document.getElementById('battle-button-bg');
let health_border = document.getElementById('healthborder');
let opponent_health_border = document.getElementById('healthborder2');
let ult_symbol = document.getElementById('ult-charge');
let town_center = document.getElementById('town-center');
let map_symbol = document.getElementById('map-symbol');
let enemyCharacter = document.getElementById('enemy-character');
let add_character = document.getElementById('add-character');
let leaderboardSymbol = document.getElementById('leaderboard');
let wins_symbol = document.getElementById('wins');
let exit = document.getElementById('exit');
let gameOverScreen = document.getElementById('game-over');
let winScreen = document.getElementById('win-screen');
let returnButton = document.getElementById('back-to-town');
//lets the computer know what context the element is (2 dimensions in this case)yu
let ctx = c.getContext("2d");

// dimensions of the start button image
const STARTWIDTH = 260.25;
const STARTHEIGHT = 89.25;

// creates a variable for where the starting image should be placed
let startX, startY;

// creates a variable to determine if the user has selected the start button
let selected = false;

// creates a variable to store the opening scroll setInterval timer
let scrollTimer;

//creates a time that runs the game loop function
let characterSelectTimer;

// creates a variable that determines what character the user is on
let character = 1;

//creates a variable to stop the unneccesary elements from being drawn during the scroll opening animation
let flickerStopper = 0;

// makes a variable that chescks if the user is able to press the next or back
let pressed = false;

let pressed2 = false;

//creates a variable that is used to determine the frame that the animation is on
let charFrame = 0;

// checks if the user is hovering over a selectable text
let textHover = false;

// creates a variablt that saves the amount of stat points the character can use when creating
//their own character
let statPoints = 0;

//creates a vairalbe to see if parcing the strings are needed
let gotStats = false;

// creates a variable to see if the inputs for custom character is submitted and valid 
let submitted = false;

// variable for if the user has clicked the randomize stat button yet 
let reroll = false;

// store the maximum and minimum stat points the user can get
const MAXPOINT = 245
const MINPOINT = 125

// makes a new array to store each of the scroll frames
let frames = new Array(11);
frames[0] = '0.png';
frames[1] = '1.png';
frames[2] = '2.png';
frames[3] = '3.png';
frames[4] = '4.png';
frames[5] = '5.png';
frames[6] = '6.png';
frames[7] = '7.png';
frames[8] = '8.png';
frames[9] = '9.png';
frames[10] = '10.png';
// create variable for the number of characters that the user can choose from 
let numCharacters = 4

// timer to keep drawing gui in battle screen
let battleGUITimer;

// timer to draw the town center hub
let townTimer;

// const to store the search and input element 
const SEARCHINPUT = document.getElementById('search-character');
const SORT = document.getElementById('sort');

// constant for what we are searching by 
const NUMWINS = 'wins'
const ALPHABETICALLY = 'alphabetically'
// variable for what we are searching by 
let typeOfSorting = NUMWINS

// variable for text of what we are searching by 
let sorting = 'Sorting by ' + typeOfSorting 

// create array for how many times we found item that matched the search  
let countSearch = new Array(4)

// store the y position of the name positions
let searchNamePositionY = new Array(4)
searchNamePositionY[0] = 175
searchNamePositionY[1] = 250
searchNamePositionY[2] = 325
searchNamePositionY[3] = 400

// store the y position of win symbol
let searchWinPositionY = new Array(4)
searchWinPositionY[0] = 150
searchWinPositionY[1] = 225
searchWinPositionY[2] = 300
searchWinPositionY[3] = 375

// timer to check for inputs 
let inputTimer;

// variable to know if you are in the battle
let inBattle = false;

// creates an array to store the names of each of the characters
let characters = new Array(numCharacters);
characters[0] = 'Leaf Ranger';
characters[1] = 'Wind Hasashin';
characters[2] = 'Fire Night';

// create array to store the number of wins each character in the game will have 
let numWins = new Array(numCharacters)
numWins[0] = 0
numWins[1] = 0
numWins[2] = 0
numWins[3] = 0


// creates an array that stores each frame of the idle animation for character 1
let character1Idle = new Array(12);
character1Idle[0] = 'idle_1.png';
character1Idle[1] = 'idle_2.png';
character1Idle[2] = 'idle_3.png';
character1Idle[3] = 'idle_4.png';
character1Idle[4] = 'idle_5.png';
character1Idle[5] = 'idle_6.png';
character1Idle[6] = 'idle_7.png';
character1Idle[7] = 'idle_8.png';
character1Idle[8] = 'idle_9.png';
character1Idle[9] = 'idle_10.png';
character1Idle[10] = 'idle_11.png';
character1Idle[11] = 'idle_12.png';

// creates an array that stores each frame of the idle animation for character 2
let character2Idle = new Array(8)
character2Idle[0] = 'idle2_1.png';
character2Idle[1] = 'idle2_2.png';
character2Idle[2] = 'idle2_3.png';
character2Idle[3] = 'idle2_4.png';
character2Idle[4] = 'idle2_5.png';
character2Idle[5] = 'idle2_6.png';
character2Idle[6] = 'idle2_7.png';
character2Idle[7] = 'idle2_8.png';

// creates an array that stores each frame of the idle animation for character 3
let character3Idle = new Array(8)
character3Idle[0] = 'idle3_1.png';
character3Idle[1] = 'idle3_2.png';
character3Idle[2] = 'idle3_3.png';
character3Idle[3] = 'idle3_4.png';
character3Idle[4] = 'idle3_5.png';
character3Idle[5] = 'idle3_6.png';
character3Idle[6] = 'idle3_7.png';
character3Idle[7] = 'idle3_8.png';

// creates an array that stores each frame of the idle animation for character 4
let character4Idle = new Array(6)
character4Idle[0] = 'idle4_1.png';
character4Idle[1] = 'idle4_2.png';
character4Idle[2] = 'idle4_3.png';
character4Idle[3] = 'idle4_4.png';
character4Idle[4] = 'idle4_5.png';
character4Idle[5] = 'idle4_6.png';

//creates an array to store the stamina stat for each of the characters
let stamina = new Array(numCharacters);
stamina[0] = '9 STA';
stamina[1] = '12 STA';
stamina[2] = '5 STA';

//creates an array to store the health stat for each of the characters
let health = new Array(numCharacters);
health[0] = '165 HP';
health[1] = '135 HP';
health[2] = '155 HP';

//creates an array to store the defence stat for each of the characters
let defence = new Array(numCharacters);
defence[0] = '15 DEF';
defence[1] = '10 DEF';
defence[2] = '20 DEF';

//creates an array to store the can crit stat for each of the characters
let crit = new Array(numCharacters );
crit[0] = 'Chance for +0.2x DMG';
crit[1] = 'Chance for +0.2x DMG';
crit[2] = 'Chance for +0.2x DMG';

//creates an array to store the damage stat for each of the characters
let attack = new Array(numCharacters);
attack[0] = '30 ATK';
attack[1] = '35 ATK';
attack[2] = '10 ATK';

//creates an array for each of the characters 1st move
let move1 = new Array(numCharacters);
move1[0] = 'Leaf Pummel: 25 DMG, 1 STA';
move1[1] = 'Slash: 25 DMG, 1 STA';
move1[2] = 'Slice: 25 DMG, 1 STA';
move1[3] = 'Meditate: +25 HP, 1 STA';


//creates an array for each of the characters 2nd move
let move2 = new Array(numCharacters);
move2[0] = 'Stick Barrage: 50 DMG, 2 STA';
move2[1] = 'Triple-Slash: 50 DMG, 2 STA';
move2[2] = 'Ballerina: 50 DMG, 2 STA';
move2[3] = 'Multi-Punch: 50 DMG, 2 STA';

//creates an array for each of the characters 3rd move
let move3 = new Array(numCharacters);
move3[0] = 'Sky Dart: 75 DMG, 3 STA';
move3[1] = 'Multi-Slash: 75 DMG, 3 STA';
move3[2] = 'Explosion Blast: 75 DMG, 3 STA';
move3[3] = 'Earth Shatter: 75 DMG, 3 STA';

//array that stores how many characters have been created
let numSubmitted = new Array(numCharacters -3);

// creates an array to store the names of the moves of the chosen character
let moveNames = new Array(3);
moveNames[0] = '';
moveNames[1] = '';
moveNames[2] = '';

// variale to keep track of the amount of special moves there are
let numSpecial = 3;
//creates an array to store each of the characters' special moves
let special = new Array(numSpecial);
special[0] = 'Photosynthesize:';
special[1] = 'Echo Rythm:';
special[2] = 'Volcanic Divide:';

//creates arrays that stores the damage and stamina cost of the move
let movedmg = new Array(3);
movedmg[0] = '';
movedmg[1] = '';
movedmg[2] = '';

let movesta = new Array(3);
movesta[0] = '';
movesta[1] = '';
movesta[2] = '';

// create variable for the number of special moves that there are correlating to the number of characters
let numDmgSpecial = 3
//creates an array for each of the characters' special moves damage range
let special_damage_range = new Array(numDmgSpecial);
special_damage_range[0] = 100;
special_damage_range[1] = 100;
special_damage_range[2] = 100;



// create an array that stores the arrays of the inputs 
let characterStats = new Array(7)
characterStats[0] = characters;
characterStats[1] = special;
characterStats[2] = special_damage_range;
characterStats[3] = attack;
characterStats[4] = defence;
characterStats[5] = health;
characterStats[6] = crit;
characterStats[7] = stamina;

// create array for the inputs without buttons
const INPUTSNOBUTTONS = new Array(8);
INPUTSNOBUTTONS[0] = document.getElementById("text-input");
INPUTSNOBUTTONS[1] = document.getElementById("input-name");
INPUTSNOBUTTONS[2] = document.getElementById("input-damage");
INPUTSNOBUTTONS[3] = document.getElementById("input-attack");
INPUTSNOBUTTONS[4] = document.getElementById("input-defence");
INPUTSNOBUTTONS[5] = document.getElementById("input-health");
INPUTSNOBUTTONS[6] = document.getElementById("input-critical");
INPUTSNOBUTTONS[7] = document.getElementById("input-energy");

// create array for the inputs with buttons
const INPUTSWITHBUTTONS = new Array(10);
INPUTSWITHBUTTONS[0] = document.getElementById("text-input");
INPUTSWITHBUTTONS[1] = document.getElementById("submit-button");
INPUTSWITHBUTTONS[2] = document.getElementById("input-name");
INPUTSWITHBUTTONS[3] = document.getElementById("input-damage");
INPUTSWITHBUTTONS[4] = document.getElementById("random");
INPUTSWITHBUTTONS[5] = document.getElementById("input-attack");
INPUTSWITHBUTTONS[6] = document.getElementById("input-defence");
INPUTSWITHBUTTONS[7] = document.getElementById("input-health");
INPUTSWITHBUTTONS[8] = document.getElementById("input-critical");
INPUTSWITHBUTTONS[9] = document.getElementById("input-energy");

// create array for inputs for attack buttons
let INPUTSFORATTACKBUTTONS = new Array(4);
INPUTSFORATTACKBUTTONS[0] = document.getElementById("move1");
INPUTSFORATTACKBUTTONS[1] = document.getElementById("move2");
INPUTSFORATTACKBUTTONS[2] = document.getElementById("move3");
INPUTSFORATTACKBUTTONS[3] = document.getElementById("move4");

// store the stats for the character that the user chose
let numHealth;
let ultCharge;
let numStamina;
let numDefence;
let numCrit;

// create empty arrays that hold the frames of each image of each character
let character1Move1 = new Array(12);
let character1Move2 = new Array(10);
let character1Move3 = new Array(12);
let character1Move4 = new Array(17);
let character2Move1 = new Array(8);
let character2Move2 = new Array(18);
let character2Move3 = new Array(26);
let character2Move4 = new Array(30);
let character3Move1 = new Array(11);
let character3Move2 = new Array(19);
let character3Move3 = new Array(28);
let character3Move4 = new Array(18);
let character4Move1 = new Array(16);
let character4Move2 = new Array(12);
let character4Move3 = new Array(22);
let character4Move4 = new Array(25);

// create arrays for all characters to store the array that stores the array of the frames of each move (this sentence makes sense it just takes a second to process)
let character1Moves = new Array(4);
character1Moves[0] = character1Move1;
character1Moves[1] = character1Move2;
character1Moves[2] = character1Move3;  
character1Moves[3] = character1Move4;

let character2Moves = new Array(4);
character2Moves[0] = character2Move1;
character2Moves[1] = character2Move2;
character2Moves[2] = character2Move3;  
character2Moves[3] = character2Move4;

let character3Moves = new Array(4);
character3Moves[0] = character3Move1;
character3Moves[1] = character3Move2;
character3Moves[2] = character3Move3;  
character3Moves[3] = character3Move4;

let character4Moves = new Array(4);
character4Moves[0] = character4Move1;
character4Moves[1] = character4Move2;
character4Moves[2] = character4Move3;  
character4Moves[3] = character4Move4;

// array to store the array of all the arrays that hold the images of the moves
let allCharacterMoves = new Array(4);   
allCharacterMoves[0] = character1Moves;
allCharacterMoves[1] = character2Moves;
allCharacterMoves[2] = character3Moves;
allCharacterMoves[3] = character4Moves;

// positions of where the inputs with buttons are 
const CHARACTERSELECTPOSITIONS = [
    { left: 0.40, top: 0.70, width: 0.18, height: 0.05 },
    { left: 0.45, top: 0.80, width: 0.1, height: 0.05 },
    { left: 0.65, top: 0.25, width: 0.18, height: 0.05 },
    { left: 0.65, top: 0.33, width: 0.18, height: 0.05 },
    { left: 0.70, top: 0.75, width: 0.15, height: 0.1 },
    { left: 0.195, top: 0.235, width: 0.13, height: 0.05 },
    { left: 0.195, top: 0.36, width: 0.13, height: 0.05 },
    { left: 0.195, top: 0.485, width: 0.13, height: 0.05 },
    { left: 0.195, top: 0.61, width: 0.13, height: 0.05 },
    { left: 0.195, top: 0.735, width: 0.13, height: 0.05 }
];

// create objects to store health bar positions
const HEALTHBARPOSITIONS = [
    {left: 0.025, top: 0.3, width: 0.20, height: 0.057},
    {left: 0.775, top: 0.3, width: 0.20, height: 0.057},
]


//variable to stop the listener from running
let loadingPreventer = false;

//variable to prevent the user from being able to spam the move button
let inAnimation = false;

// array to store the health bar HTML elements
let healthBar = new Array(2)
healthBar[0] = document.getElementById('user-progress-bar-bg');
healthBar[1] = document.getElementById('enemy-progress-bar-bg');

// creates a variable to store the previous map to prevent repetition
let lastMap ="";
// creates a variable to store the current map
let map = "";

// creates variables to store the user's stats
let userStamina = '';
let userHealth = '';
let userDefence = '';
let userCrit = '';
let userAttack = '';

// creates variables to store the stats of the random enemy (no stamina since the enemy randomly picks a move regardless of stamina cost)
let enemyHealth = '';
let enemyDefence = '';
let enemyCrit = '';
let enemyAttack = '';

let characterChosen = false;

// creates a variable to store the user's move animation setInterval
let moveAnimationTimer;
// creates a variable to store the move that the user has chose
let moveChosen = 0;
// variable to reallign the character select inputs if the web dimensions were changed
let reallign;

// creates an array to store the arrays that store the images for the idle animation for each character (think about this comment and it will make sense)
let idleAnimationArrays = new Array(4);
idleAnimationArrays[0] = character1Idle; 
idleAnimationArrays[1] = character2Idle; 
idleAnimationArrays[2] = character3Idle; 
idleAnimationArrays[3] = character4Idle; 

// creates a variable to store the frame that the enemy is on
let enemyFrame = 0;

// creates a variable to store the frame that the move animation is on
let moveFrame = 0;

// creates a variable to store the setinterval for the enemy's move animation function
let enemyTurnTimer;

// creates variables that stores the max health percent and max pixels for both the user and enemy's health bars
let enemyHealthPixels = 200;
let userHealthPercent = 100;

// creates a variable to determine if the battle is finished or not
let won = false;

// creates a variable to prevent a set interval from being created too many times
let intervalSpamPreventer = false;

// creates a variable to store the damage that will be inflicted on an ene
let dmgDealt = 0;

// creates a variable to store the amount to heal when using the meditate move
let healAmount = 0;

// creates a variable to store the random enemy attack
let randomEnemyAttack = '';

// make empty array of the reorganized the character's move
let fixedMoves = new Array(4)

// store the array of each move
let characterMoveStats = new Array(4);
characterMoveStats[0] = move1;
characterMoveStats[1] = move2;
characterMoveStats[2] = move3;
characterMoveStats[3] = special;

// store the number of moves the player has gone
let numMoves = 0

// create constant to store the number of moves required to use special move
const REQUIREDMOVES = 3;

// variable to determine what the max number we can use is when getting a random enemy
let characterLimit = 4

// creates a variable to store the random enemy
let randomEnemy ="";

// creates a variable to store the previous random enemy
let lastRandomEnemy = "";

// draw the position of the health bars during battle
function positionHealthBar() {
    
    for(let i = 0; i<healthBar.length; i++){
        const CANVASRECT = c.getBoundingClientRect();
        const POSITION = HEALTHBARPOSITIONS[i]
        healthBar[i].style.left = String(CANVASRECT.left + CANVASRECT.width * POSITION.left) + 'px';
        healthBar[i].style.top = String(CANVASRECT.top + CANVASRECT.height * POSITION.top)+'px';
        healthBar[i].style.width = String(CANVASRECT.width * POSITION.width) + 'px';
        healthBar[i].style.height = String(CANVASRECT.height * POSITION.height) + 'px';
    }
}




function start() {
    // make all of number of submitted array into false
    for(let i = 0; i<numSubmitted.length; i++){
        numSubmitted[i] = false;
    }
    // constantly rechanging the position of inputs on character select if web size is changed
    reallign = setInterval(positionInputBox, 1)
    // calculate centered position for the 'start' image
    startX = (c.width - STARTWIDTH) / 2;
    startY = (c.height - STARTHEIGHT) / 2;

    
    // draw the background and button 
    redrawButton();

    // add a mousemove event listener to check for hovering
    c.addEventListener("mousemove", function (event) {

        // creates constant to store the position of the canvas on the webpage
        const RECT = c.getBoundingClientRect();
        // creates constants to store the positions of the mouse
        const MOUSEX = event.clientX - RECT.left;
        const MOUSEY = event.clientY - RECT.top;
        
        //checks if the user has selected the start button and exits the if statement if true
        if (selected == true){
           return;
            
        }
        else{
        
            // checks if the mouse is over the button
            if (MOUSEX >= startX && MOUSEX <= startX + STARTWIDTH && MOUSEY >= startY && MOUSEY <= startY + STARTHEIGHT) {
                // change the cursor to indicate a button
                c.style.cursor = "pointer"; 
                //draws the highlighted start button
                highlightButton();  
            } 
            
            //else, make the cursor normal
            else{
                c.style.cursor = "default"; 
                // redraws the original unselected button
                redrawButton();
            }
        }
        
        
    });
    // listens for a click event inside the canvas
    c.addEventListener("click", function (event){
        // creates a constant to store where the canvas is inside of the webpage
        const RECT = c.getBoundingClientRect();

        //creates constants to store the mouse position inside the canvas
        const MOUSEX = event.clientX - RECT.left;
        const MOUSEY = event.clientY - RECT.top;

        // checks if the mouse is hovering over the start button
        if (MOUSEX >= startX && MOUSEX <= startX + STARTWIDTH && MOUSEY >= startY && MOUSEY <= startY + STARTHEIGHT && selected == false) {
            //creates a timer that runs the draw scroll function every 70 ms
            scrollTimer = setInterval(drawScroll, 70);
            //sets selected to true so that we know the user has pressed the start button
            selected = true;
        }
        
    })
}

function highlightButton() {
    // clears the canvas and draws the screen again
    ctx.drawImage(background, 0, 0, c.width, c.height);
    ctx.drawImage(startButtonHover, startX, startY, STARTWIDTH, STARTHEIGHT);

}

function redrawButton() {
    // draws the screen without the hover effect on the button
    ctx.drawImage(background, 0, 0, c.width, c.height);
    ctx.drawImage(startButton, startX, startY, STARTWIDTH, STARTHEIGHT);
}

function drawScroll(){    
    //checks if the scroll animation is over by making sure that the frames are greater than or equal to the length of the scroll array
    if (charFrame >= frames.length) {
        // stops the timer when all frames are drawn
        clearInterval(scrollTimer); 
        //draws the character select GUI
        drawSelectCharacterGUI();
        return;
    }

    //makes sure that the scroll stays on the last frame
    scroll1.src = frames[charFrame];

    // when the scroll image loads
    scroll1.onload = function () {
        //draw the background to cover the frame of previous scroll frames
        ctx.drawImage(background, 0, 0, c.width, c.height)
        // draw the scroll
        ctx.drawImage(scroll1, -200, -225, c.width + 400, c.height + 400);
        //updates the array for the scroll frames so that it moves to the next scroll image animation
        charFrame++; 
        
    };
    //adds to the flicker stopper
    flickerStopper++
    //checks if the flicker stopper has been run 10 times to make sure the character gui isn't being drawn early
    if (flickerStopper >= 10){
        //creates the game loop that runs at 70 frames per second
        clearInterval(characterSelectTimer);
        characterSelectTimer = setInterval(drawSelectCharacterGUI, 250);
             
    }
}

function boldHoverText(hoverFont, font){
    // if the user is hovering over the character name, bold it
    if (textHover == true){
        ctx.font = hoverFont;
        ctx.fillText(characters[character-1], (c.width -200) /2, (c.height -200/2)); 
    }

    // else, unbold it
    else if(textHover == false){
        ctx.font = font;
        ctx.fillText(characters[character-1], (c.width -200) /2, (c.height -200/2)); 
    }
   
}

function switchDisplayCharacter(event){
    // creates constant to store the position of the canvas on the webpage
    const RECT = c.getBoundingClientRect();
    // creates constants to store the positions of the mouse
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;

   

    // if the mouse is in this box,
    if(MOUSEX >= 350 && MOUSEX <= 400 && MOUSEY >= 350 && MOUSEY <= 400 && pressed == false && characterChosen == false){
        // check if the user is on the second character before letting them go to the character page 1 to prevent them going to character 0
        if (character >=2){ 
            character--;

        }
        // if the user goes backwards on character 1, go to the last character page
        else if (character == 1){
            character = numCharacters
        }

        // show the inputs if it is one of the custom characters
        if (character >=4){
            // if the user submits the stats
            if(numSubmitted[character-4] == true){
                //hide the input boxes
                for(let i = 0; i< INPUTSWITHBUTTONS.length; i++){
                    INPUTSWITHBUTTONS[i].hidden = true
                    
                }
            }
        }

        
        // when the next button is pressed
        pressed = true;
        // gotten stats of all characters
        gotStats = false;

    }

    //box for next button
    if(MOUSEX >= 600 && MOUSEX <= 650 && MOUSEY >= 350 && MOUSEY <= 400 && pressed == false && characterChosen == false){
        // go to next page
        if(character >= 1 && character <(numCharacters)){
            character++;
        }
        // go to first page after reaching last page
        else if (character >= numCharacters ){
            character = 1;
        }
        // when the mouse click is released
        pressed = true;
        gotStats = false;
    }

    
    //when the user releases the mouse
    c.addEventListener("mouseup", function (){
        // set pressed to false so that they can switch characters again
        pressed = false;
    })


}


// draw the character select screen 
function drawSelectCharacterGUI(){
    
   
    // draw the input boxes 
    positionInputBox();
    // when mouse is clicked and held
    c.addEventListener("mousedown", switchDisplayCharacter)
    if (character == 1){
       drawAnimation(character1Idle);
    }
// change character idle animation
    else if (character == 2){
        drawAnimation(character2Idle);
            
    }
// change character idle animation
    else if (character == 3){
        drawAnimation(character3Idle);
    }   
    // change character idle animation
    else if (character >= 4){
       
        
        
        c.removeEventListener("mousedown", selectCharacter);
        c.removeEventListener("mousemove", selectHover);
        
        if (charFrame >= character4Idle.length -1) {
            charFrame = 0;
        }
        // Update the src of the image element
        idleCharacter.src = character4Idle[charFrame];

        // Use the onload event to ensure the image is ready before drawing
        idleCharacter.onload = function () {
            if(loadingPreventer == false){
                drawStats();
                
                
                if (numSubmitted[character-4] == true && character == numCharacters){
                    
                    ctx.drawImage(add_character, 800, 200, 100, 100);
                    for(let i =0; i<INPUTSWITHBUTTONS.length; i++){
                        INPUTSWITHBUTTONS[i].hidden = true;
                    }
                    
                    c.addEventListener("mousedown", createNewCharacter);
                }
            
                else if (numSubmitted[character-4] == false){
                    
                    for(let i = 0; i< INPUTSWITHBUTTONS.length; i++){
                        INPUTSWITHBUTTONS[i].hidden = false
                        
                    }
                }
                if (pressed == false){
                    c.addEventListener("mousemove", selectCustomCharacter)
                   
                    c.addEventListener("mousedown", selectHoverCustomCharacter)
                
                }
            
                // bold text when hovered 
                if (textHover == true && numSubmitted[character-4] == true){
                    ctx.font = "bold 30px Courier New";
                    ctx.fillText(characters[character-1], (c.width -160) /2, (c.height -200/2)); 
                }
                // unbold when not hovered
                else if(textHover == false && numSubmitted[character-4] == true){
                    
                    ctx.font = "30px Courier New";
                    ctx.fillText(characters[character-1], (c.width -160) /2, (c.height -200/2)); 
                }
            
            }
        }
        
    }
}  

function drawAnimation(characteridle){
    //hides the input buttons
    for(let i = 0; i<INPUTSWITHBUTTONS.length; i++){
        INPUTSWITHBUTTONS[i].hidden = true;
    }

    // change character idle animation
    if (charFrame >= characteridle.length -1) {
        charFrame = 0;
    }
    // update the src of the image element
    idleCharacter.src = characteridle[charFrame];

    // use the onload event to ensure the image is ready before drawing
    idleCharacter.onload = function () {
        //makes sure that each time the idleCharacter image loads, it doesnt draw the stats again
        if(loadingPreventer == false){
            drawStats();
        //if the user hasn't selected a character yet,
        if (pressed2 == false){
            c.addEventListener("mousemove", selectHover);
            c.addEventListener("mousedown", selectCharacter);
        }
        // bold when hover
        boldHoverText('bold 30px Courier New', '30px Courier New')
        }
    }
}

// increase all array lengths when new character is created
function updateNumSubmitted(){
    stamina.length = numCharacters ;

    health.length = numCharacters ;

    defence.length = numCharacters ;

    crit.length = numCharacters ;

    attack.length = numCharacters ;

    move1.length = numCharacters ;

    move2.length = numCharacters;

    move3.length = numCharacters;

    // -3 because numSubmitted keeps track of the amount of characters that have been created, which is always equal to the number of characters - the premade characters
    numSubmitted.length = numCharacters -3;

    idleAnimationArrays.length = numCharacters;

    allCharacterMoves.length = numCharacters;
    
    characters.length = numCharacters;
    
    // fill the new index of numSubmitted by making it false because the characters has not been submitted yet
    numSubmitted[numSubmitted.length-1] = false
    

}

function selectCustomCharacter(){
    if (textHover == true && numSubmitted[character-4] == true){
        
        pressed2 = true
        // change the character name of the selected custom character to character 3 because
        // there will only be 4 characters playing in the game
        characters[3] = characters[character-1]
        numWins[3] = 0
        
        loadingPreventer = true;
        isolateStatsValue(userHealth, userDefence, userStamina, userCrit, userAttack, character)
        characterAnimation(character)
       
        c.removeEventListener("mousemove", selectCustomCharacter);
        c.removeEventListener("mousemove", selectHoverCustomCharacter);
        // townTimer = setInterval(drawTownCenter, 10);
        drawTownCenter()
    }
}


function selectHoverCustomCharacter(event){
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    // allow text hover when inputs are submitted
    if (numSubmitted[character-4] == true){
        // text is hovered when mouse coordinates are within the text coordinates
        if (MOUSEX >= 400 && MOUSEX <= 600 && MOUSEY >= 400 && MOUSEY <= 480){
            textHover = true;
        }
        else{
            textHover = false;
        }
    }
}


// function to submit all inputs and show the texts
function submitAll(){
    // output to check if each input was inputted something
    let output = 0;
    // output to check if each input that is supposed to have a number has a number
    let output2 = 0;
    
    // get value of all inputs and add it to outputs
    for(let i = 0; i < INPUTSNOBUTTONS.length; i++){
        output += INPUTSNOBUTTONS[i].value.length;
        (characterStats[i])[character-1] = INPUTSNOBUTTONS[i].value;
        
    }
    // check if the all the inputs have been inputted something
    if(output >= INPUTSNOBUTTONS.length){
        // get value for all inputs that should have a number
        for(let x = 3; x <= 7; x++){
            //adds all of the input number values and saves it into output2
            output2 += Number(INPUTSNOBUTTONS[x].value)
            
            // submit inputs when values are the numbers that should be numbers are numbers and the stats = to # of statpoints
            // and special move damage is between 0 and 100
            if(isNaN(Number(INPUTSNOBUTTONS[x].value)) == false && output2 == statPoints && Number(INPUTSNOBUTTONS[2].value) >= 0 && Number(INPUTSNOBUTTONS[2].value) <= 100){
                
                loadingPreventer = false;
                // make sure that this character is submitted and can't submit this character again
                numSubmitted[character-4] = true;
                // incrrease the array length of the specials and dmg special
                numSpecial ++;
                numDmgSpecial++;
                // gets the stats of the character made and saves it into their respective arrays
                characters[character-1] = INPUTSNOBUTTONS[0].value;
                stamina[character-1] = INPUTSNOBUTTONS[7].value;
                defence[character-1] = INPUTSNOBUTTONS[4].value;
                health[character-1] = INPUTSNOBUTTONS[5].value;
                crit[character-1] = INPUTSNOBUTTONS[6].value;
                attack[character-1] = INPUTSNOBUTTONS[3].value;
                special_damage_range[character-1] = INPUTSNOBUTTONS[2].value;
                // reset the output for the next time that we submit
                output2=0
                break;
                
            }
        }
    
        
    }
}


function positionInputBox() {
    // get the position object for each of the input elements with buttons and apply the positions to the input elements
    for (let i = 0; i<INPUTSWITHBUTTONS.length; i++){
        const CANVASRECT = c.getBoundingClientRect();
        const POSITION = CHARACTERSELECTPOSITIONS[i];
        INPUTSWITHBUTTONS[i].style.left = String(CANVASRECT.left + CANVASRECT.width * POSITION.left)+'px';
        INPUTSWITHBUTTONS[i].style.top = String(CANVASRECT.top + CANVASRECT.height * POSITION.top)+'px';
        INPUTSWITHBUTTONS[i].style.width = String(CANVASRECT.width * POSITION.width) + 'px';
        INPUTSWITHBUTTONS[i].style.height = String(CANVASRECT.height * POSITION.height) + 'px';
        
    }   
}




function randomizeStat(){
    // randomize the stat points
    statPoints = Math.floor(Math.random() * (MAXPOINT-MINPOINT+1)) + MINPOINT;
    reroll = true;
}

function drawStats(){
    // checks if the cost per move has been gotten already so that it only does it once per character change
    if(gotStats == false){
        //clears the game loop timer so that it can parce the string
        clearInterval(characterSelectTimer);
        getMoveCost();
    }
    //draws the scroll each time so that the idle animation doesn't bleed
    ctx.drawImage(scroll1, -200, -225, c.width + 400, c.height + 400);

    //draws the idle character as well as the next and back arrows
    ctx.drawImage(idleCharacter, 0, -200, c.width, c.height);
    ctx.drawImage(nextButton, 600, 350, 50, 50);
    ctx.drawImage(backButton, 350, 350, 50, 50);

    //draws the stat icons for each of the stats
    ctx.drawImage(atk_icon, 150, 125, 40, 40);
    ctx.drawImage(defence_icon, 150, 200, 40, 40);
    ctx.drawImage(health_icon, 150, 275, 40, 40);
    ctx.drawImage(crit_icon, 150, 345, 40, 40);
    ctx.drawImage(energy_icon, 150, 425, 40, 40);
    ctx.drawImage(special_icon, 640, 125, 50, 50);

    //sperate if statement for character 4 since the moves text are at a different coordinate
    if(character >= 4){
        //draws the text
        ctx.font = "25px Arial";
        ctx.fillText("Moves:", 690, 275);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[0] + ' +' + movedmg[0] + ' HP, ' + movesta[0] + ' STA', 630, 300);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[1] + ' ' + movedmg[1] + ' DMG, ' + movesta[1] + ' STA', 630, 325);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[2] + ' ' + movedmg[2] + ' DMG, ' + movesta[2] + ' STA', 630, 350);
        
        if (numSubmitted[character-4] == true){
            
            // once submitted, print out the arrays of the arrays for character 3 
            ctx.font = "20px Arial";
            ctx.fillText((characterStats[1])[character-1], 690, 155);
            ctx.font = "17px Arial";
            ctx.fillText((characterStats[2])[character-1] + ' DMG', 650, 200);
            ctx.font = "25px Arial";
            ctx.fillText((characterStats[7])[character-1], 200, 450);
            ctx.font = "17px Arial";
            ctx.fillText('Chance for +' + (characterStats[6])[character-1] + '% DMG', 190, 370);
            ctx.font = "25px Arial";
            ctx.fillText((characterStats[5])[character-1], 200, 300);
            ctx.font = "25px Arial";
            ctx.fillText((characterStats[3])[character-1], 200, 150);
            ctx.font = "25px Arial";
            ctx.fillText((characterStats[4])[character-1], 200, 225);

        }
        
        // show the # of stat points when the user clicks the random stats button
        if (reroll == true){
            ctx.font = "20px Arial"
            ctx.fillText(statPoints + ' Stat Points', 700, 400)

        }
        //draws the character select text (the text on the top middle of the scroll)
        ctx.font = "50px Arial";
        ctx.fillText("Character Select",(c.width - 350)/2, (c.height - 300)/2);
        //adds one to the charFrame variable to keep the idle animations running
        charFrame++;
    }

    // for characters 1, 2, 3
    else{
        //draw the stats, moves, and special attacks
        ctx.font = "25px Arial";
        ctx.fillText("Moves:", 690, 220);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[0] + ' ' + movedmg[0] + ' DMG, ' + movesta[0] + ' STA', 630, 245);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[1] + ' ' + movedmg[1] + ' DMG, ' + movesta[1] + ' STA', 630, 270);
        ctx.font = "17px Arial";
        ctx.fillText(moveNames[2]+ ' ' + movedmg[2] + ' DMG, ' + movesta[2] + ' STA', 630, 295);
        ctx.font = "20px Arial";
        ctx.fillText(special[character - 1], 690, 155);
        ctx.font = "17px Arial";
        ctx.fillText('0-'+special_damage_range[character - 1], 650, 185);
        ctx.font = "25px Arial";
        ctx.fillText(stamina[character - 1], 200, 450);
        ctx.font = "17px Arial";
        ctx.fillText(crit[character - 1], 190, 370);
        ctx.font = "25px Arial";
        ctx.fillText(health[character - 1], 200, 300);
        ctx.font = "25px Arial";
        ctx.fillText(attack[character - 1], 200, 150);
        ctx.font = "25px Arial";
        ctx.fillText(defence[character - 1], 200, 225);
        ctx.font = "50px Arial";
        ctx.fillText("Character Select",(c.width - 350)/2, (c.height - 300)/2);
        charFrame++;
    }
    
}

function getMoveCost(){
    // variable to determine if the string parcing algorithm has finished getting the damage value
    let gettingdmg = false;
    // sets and defines the getStamina variable to false since the stamina value is not being extracted yet
    let getStamina = false;

    // creates a variable to save the substrings
    let stringPortion;
    // creates a variable to save the string that we want to parce with this algorithm
    let strToParse;

    

    // creates a array to store the moves so that we can extract the damage and staminea values from them
    let array = new Array(3);
    array[0] = move1[character - 1];
    array[1] = move2[character - 1];
    array[2] = move3[character - 1];
    
    // clears the movedmg and movesta arrays since we are going to fill them with the current character's stats
    movedmg[0] = '';
    movedmg[1] = '';
    movedmg[2] = '';

    movesta[0] = '';
    movesta[1] = '';
    movesta[2] = '';

    // less than 3 since there are 3 different moves
    for(let iterations = 0; iterations < 3; iterations++){
        
        //creates a variable to determine wether to exit the move cost extraction process or not
        let doneGettingStats = false;
        // saves the string that we want to parce into a variable
        strToParse = array[iterations];

        // saves the move name into the moveNames array 

        moveNames[iterations] = strToParse.substring(0, (strToParse.indexOf(':', 0) + 1));

        // loops until each character inside the character's move string has been checked
        for(let x = 0; x <= (array[iterations].length - 1); x++){  
            // gets each character inside the string to parce and saves it into a variable
            stringPortion = strToParse.substring(x, x + 1);

            //checks if the substring is not a number or a space
            if(isNaN(stringPortion) || stringPortion == ' '){
                //checks if the algorithm has found the end of the damage number and if it has, 
                if(gettingdmg == true){
                    //turns the string into a number
                    movedmg[iterations] = Number(movedmg[iterations]);

                    // sets the getstamina variable to true and the gettingdmg variable to false to
                    //indicate that the algorithm has extracted the amount of damage the move will do
                    getStamina = true;
                    gettingdmg = false;
                }

                //once the algorithm has extracted all of the stats, 
                else if(doneGettingStats == true){
                    //turns the stamina string into a number
                    movesta[iterations] = Number(movesta[iterations]);
                    // exits the for loop by making x greater than the length of the string
                    x = array[iterations].length + 1
                    // sets get stamina to false since we have extracted all of the information from the string including the stamina
                    getStamina = false
                }
            }

            //once we find the beginning of a number (move cost), find the rest
            else{
                // if the algorithm is currently finding the stamina cost,
                if(getStamina == true){
                    // adds the substring to the movesta array since we know that it is a number and the stamina stat
                    movesta[iterations] += stringPortion;

                    //sets done getting stats to true (doesn't instantly leave the for loop until
                    //the stamina number has been fully extracted because the exit loop code 
                    //is inside of the if statement that checks if the substring is not a number, therefore that part doesn't run
                    //until the full number has been extracted)
                    doneGettingStats = true;
                }

                //if the code isn't getting the stamina, it has to be the damage or in that one special case for character 4, the heal amount
                else{
                    //saves the substring into the movedmg array
                    movedmg[iterations] += stringPortion;

                    // sets gettingdmg to true to indicate that the algorithm is getting the damage
                    // this variable is used inside of the isNaN if statement above to signal that the algorithm has finished getting
                    // the damage and will be getting the stamina cost which is the next number inside of the string to parce
                    gettingdmg = true;
                }
                                       
            }
        }
    }
    //once the algorithm has finished extracting the move costs, set the got stats variable to true
    // to signal that this function doesn't need to run until the user goes to the next character
    gotStats = true;
    // restarts the game loop timer to continue the game
    characterSelectTimer = setInterval(drawSelectCharacterGUI, 250);   
}

function selectHover(event){
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    
    // hover text when mouse coords are on the text
    if (MOUSEX >= 400 && MOUSEX <= 600 && MOUSEY >= 400 && MOUSEY <= 480){
        textHover = true;
    }
    else{
        textHover = false;
    }
}

function selectCharacter(){
    

    
    
    
    // if it's hover it means that mouse is clicked over the text
    if (textHover == true){
       
        if(numCharacters >= 4){
            
            // change the character name of the selected custom character to character 3 because
            // there will only be 4 characters playing in the game
            characters[3] = characters[character-1];
            
            
            numWins[3] = 0
        }
    
        if (numCharacters>4){
           return;
        }
        else{
           
            // give character 4 premade stats so that the custom character can be an enemy if not submitted
            stamina[3] = '7 STA';
            health[3] = '170 HP';
            defence[3] = '10 DEF';
            crit[3] = 'Chance for +20% DMG';
            attack[3] = '20 ATK';
            special_damage_range[3] = 100;
            characters[3] = 'Ground Monk'
            numWins[3] = 0
        }
        
        characterChosen = true
        //sets these variables to true to signal that a character has been selected
        loadingPreventer = true;
        pressed2 = true;
        
        //parces the stats for the character chosen
        isolateStatsValue(userHealth, userDefence, userStamina, userCrit, userAttack, character);
        //calls the function to fill the animation image arrays with the names of the png files
        characterAnimation(character);
        // remove previous event listeners to prevent overlap
        c.removeEventListener("mousedown", selectCharacter);
        c.removeEventListener("mousemove", selectHover);
        c.removeEventListener("mousedown", switchDisplayCharacter);
        drawTownCenter();
    }
}





// algorithm to get the frames of all the moves for the selected character
function characterAnimation(characterChosen){
    // if the character is greater than 4, make it 4 since the image for all custom characters are the same
    if(characterChosen >= 5){
        characterChosen = 4
    }
    for(let y = 1; y <= allCharacterMoves[characterChosen - 1].length; y++){
        for(let x = 1; x <= allCharacterMoves[characterChosen - 1][y-1].length; x++){
            allCharacterMoves[characterChosen - 1][y-1][x-1] =  'character' + characterChosen  + '_move' + y + '_' + x + '.png';  
        }
    }
}


// function to randomly choose a map
function randomMap(){
    // randomize the map
    while (map == lastMap || map ==""){
        map = Math.floor(Math.random() * (3-1+1)) + 1;
    }
    // set the last map to current map
    lastMap = map;
    // change the image source of the battle map depending on the random number tht was selected
    battle_map.src ='boss_battle' + lastMap + '.png'; 
}


function isolateStatsValue(playerHealth, playerDefence, playerStamina, playerCrit, playerAttack, characterUsed){
    // clears the variables so that we can fill them with updated stats
    playerHealth = '';
    playerDefence = '';
    playerCrit = '';
    playerAttack = '';

    // creates a variable to determine if the first number of the stat has been found
    let num1Gotten = false;

    // creates a variable to store substrings that are numbers temporarily
    let tempStatsHolder; 
    
    for (let i = 0; i < health[characterUsed - 1].length; i++){
        tempStatsHolder = health[characterUsed-1].substring(i, i+1);
        // checks if the substring is a number
        if(!isNaN(tempStatsHolder)){
            // if so, check if it is the first number
            if(num1Gotten == false){
                // if so, set num 1 gotten to true
                num1Gotten = true;
                // add the number to the player health variable
                playerHealth = tempStatsHolder;
            }
            // if its not the first number,
            else{
                // turn the number into a string so that no calculations will occurr
                tempStatsHolder = String(tempStatsHolder);
                // add the number to the player's stat variable
                playerHealth += tempStatsHolder;
            }
            
        }

    }
    // reset the num1gotten variable for the next parcing algorithm
    num1Gotten = false;
    // turn the extracted string into a number
    playerHealth = Number(playerHealth);

    for (let i = 0; i < defence[characterUsed - 1].length; i++){
        tempStatsHolder = defence[characterUsed-1].substring(i, i+1);
        // checks if the substring is a number
        if(!isNaN(tempStatsHolder)){
            // if so, check if it is the first number
            if(num1Gotten == false){
                // if so, set num 1 gotten to true
                num1Gotten = true
                // add the number to the player defence variable
                playerDefence = tempStatsHolder;
            }
            // if its not the first number,
            else{
                // turn the number into a string so that no calculations will occurr
                tempStatsHolder = String(tempStatsHolder);
                // add the number to the player's stat variable
                playerDefence += tempStatsHolder;
            }
            
        }

    }
    // reset the num1gotten variable for the next parcing algorithm
    num1Gotten = false;
    // turn the extracted string into a number
    playerDefence = Number(playerDefence);

    for (let i = 0; i < crit[characterUsed - 1].length; i++){
        tempStatsHolder = crit[characterUsed-1].substring(i, i+1);
        // checks if the substring is a number
        if(!isNaN(tempStatsHolder)){
            // if so, check if it is the first number
            if(num1Gotten == false){
                // if so, set num 1 gotten to true
                num1Gotten = true;
                // add the number to the player crit variable
                playerCrit = tempStatsHolder;
            }
            // if its not the first number,
            else{
                // turn the number into a string so that no calculations will occurr
                tempStatsHolder = String(tempStatsHolder)
                // add the number to the player's stat variable
                playerCrit += tempStatsHolder;
            }
            
        }

    }
    // reset the num1gotten variable for the next parcing algorithm
    num1Gotten = false;
    // turn the extracted string into a number
    playerCrit = Number(playerCrit);

    for (let i = 0; i < attack[characterUsed - 1].length; i++){
        tempStatsHolder = attack[characterUsed-1].substring(i, i+1);
        // checks if the substring is a number
        if(!isNaN(tempStatsHolder)){
            // if so, check if it is the first number
            if(num1Gotten == false){
                // if so, set num 1 gotten to true
                num1Gotten = true;
                // add the number to the player attack variable
                playerAttack = tempStatsHolder;
            }
            // if its not the first number,
            else{
                // turn the number into a string so that no calculations will occurr
                tempStatsHolder = String(tempStatsHolder)
                // add the number to the player's stat variable
                playerAttack += tempStatsHolder;
            }
            
        }

    }
    // reset the num1gotten variable for the next parcing algorithm
    num1Gotten = false;
    // turn the extracted string into a number
    playerAttack = Number(playerAttack);

    //makes sure that we arent isolating the stamina for the randomenemy since it doesn't require stamina
    if(playerStamina != 'enemyStamina'){
        // clears the playerstamina variable so that we can fill it with updated stamina
        playerStamina = '';
        for (let i = 0; i < stamina[characterUsed - 1].length; i++){
            tempStatsHolder = stamina[characterUsed-1].substring(i, i+1);
            // checks if the substring is a number
            if(!isNaN(tempStatsHolder)){
                // if so, check if it is the first number
                if(num1Gotten == false){
                    // if so, set num 1 gotten to true
                    num1Gotten = true;
                    // add the number to the player stamina variable
                    playerStamina = tempStatsHolder;
                }
                // if its not the first number,
                else{
                    // turn the number into a string so that no calculations will occurr
                    tempStatsHolder = String(tempStatsHolder);
                    // add the number to the player's stat variable
                    playerStamina += tempStatsHolder;
                }
            }
        }
        // turns the extracted string into a number
        playerStamina = Number(playerStamina);
        //assigns the extracted numbers to the correspoinding user stat variable
        userStamina = playerStamina;
        userAttack = playerAttack;
        userDefence = playerDefence;
        userCrit = playerCrit;
        userHealth = playerHealth;
    }
    // if it is parcing the stats for the random enemy,
    else{
        // assign the extracted numbers to the correspongind enemy stat variables
        enemyAttack = playerAttack;
        enemyDefence = playerDefence;
        enemyCrit = playerCrit;
        enemyHealth = playerHealth;
    }

}


function drawBattleGUI(){
    c.addEventListener("mousedown", switchDisplayCharacter);
    ctx.drawImage(battle_map, 0, 0, c.width, c.height);
    
    // unhide the health bars
    for (let i =0; i<healthBar.length;i++){
        healthBar[i].hidden = false;
    }

    // give the character the stats that they character has
    numHealth = health[character-1];
    numStamina = stamina[character -1];
    ultCharge = 0;
    numCrit = crit[character-1];
    numDefence = defence[character-1]

    // change the text style
    ctx.fillStyle = "white";
    ctx.font="Bold 20px Courier New"
    // draw the symbol for how long until special move is ready
    ctx.drawImage(ult_symbol, 30, 450, 40, 40);
    // draw the ult charge
    ctx.fillText(numMoves + '/' + REQUIREDMOVES, 30, 520, 50,50);
    // draw the symbol for number of stamina
    ctx.drawImage(energy_icon, 90, 450, 40, 40);
    // change the text style
    ctx.fillStyle = "white";
    ctx.font="Bold 20px Courier New"
    // draw the num of stamina the user has
    ctx.fillText(userStamina + ' STA', 90, 520, 50, 50);

    // HEALTHBAR.hidden = false;
    //draw health border for user
    ctx.drawImage(health_border, 13, 155, 220, 60);
    // draw health border for enemy
    ctx.drawImage(opponent_health_border, 765, 155, 220, 60);

    // draw the button of attack moves
    ctx.drawImage(battle_button, 10, 20, 220, 40);
    ctx.drawImage(battle_button, 10, 75, 220, 40);
    ctx.drawImage(battle_button, 225, 20, 220, 40);
    ctx.drawImage(battle_button, 225, 75, 220, 40);
    
    
   
    // change text colour
    ctx.fillStyle = "black"
    // draw the attack move names
    ctx.font="Bold 10px Courier New"
    ctx.fillText(move1[character-1], 30, 45, 200, 65);
    ctx.font="Bold 10px Courier New"
    ctx.fillText(move2[character-1], 30, 100, 200, 65);
    ctx.font="Bold 10px Courier New"
    ctx.fillText(move3[character-1], 245, 45, 200, 65);

    // if the character chosen was premade, dont include the extra + 'DMG' at the end since it is already there
    if(character <=3){
        ctx.font="Bold 10px Courier New"
    ctx.fillText(special[character-1] + ': 0-' + special_damage_range[character-1], 245, 100, 200, 65)
    }

    // else, add the 'DMG' at the end of the special move damage range
    else{
        ctx.font="Bold 10px Courier New"
    ctx.fillText(special[character-1] + ': 0-' + special_damage_range[character-1] + ' DMG', 245, 100, 200, 65)
    }
    
    c.addEventListener('mouseup', selectMove);
    
    drawCharactersInBattle();
    
}

function playerAttackDamage(playerAttack, playerMove){
    // create and set damage dealt and crit chance to 0 
    let dealtDamage = 0;
    let critChance = 0;
    
    // calculates the base damage without including any other stats besides attack and the move damage
    dealtDamage = movedmg[playerMove-1]+(playerAttack/3)

    // gets a random number between 1 and 3 and saves it into a variable
    critChance = Math.floor(Math.random() * (3-1 + 1)) + 1
    // if the random number was 3,
    if (critChance == 3){
        // add the user's crit damage to the dealtDamage variable
        dealtDamage += dealtDamage*(userCrit/100);
        alert('Critical Hit!');
    }
    return dealtDamage;
}

// get the random damage of the special move
function specialAttackDamage(playerCharacter){
    // create and set special damage to 0
    let specialDamage = 0;
    // randomize to get special dmaage
    specialDamage = Math.floor(Math.random() * (special_damage_range[playerCharacter-1]))
    return specialDamage;
}


function selectMove(event){
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    // checks if the user has clicked a move and checks if they have enough stamina to do that move
    if(MOUSEX >= 10 && MOUSEX <= 230 && MOUSEY >= 20 && MOUSEY <=60 && inAnimation == false){
        checkValidMove(1);
    }
    else if(MOUSEX >= 10 && MOUSEX <= 230 && MOUSEY >= 75 && MOUSEY <=115 && inAnimation == false){
        checkValidMove(2);
    }
    else if(MOUSEX >= 225 && MOUSEX <= 445 && MOUSEY >= 20 && MOUSEY <=60 && inAnimation == false){
        checkValidMove(3);
    }
    // if they pick the special move, check if the user has done 3 moves before picking the special
    else if(MOUSEX >=  225 && MOUSEX <= 445 && MOUSEY >= 75 && MOUSEY <= 115 && inAnimation == false && numMoves >= REQUIREDMOVES){
        // sets numMoves to 0 since they just used up their special
        numMoves = 0;
        moveChosen = 4;
        // sets inAnimation to true to signal that the user has selected a valid move and the move animation is going to be played
        inAnimation = true;
        // clears the interval that draws the character battle GUI
        clearInterval(battleGUITimer);
        // creates an interval to run every 200ms that draws the character's move animation
        moveAnimationTimer = setInterval(drawCharacterMove, 200);
    }
}

function checkValidMove(move){
    // sets moveChosen to the move so that the move that has been chosen is globally known and accessible
    moveChosen = move;
    // chekcs if the user has enough stamina for their chosen move and plays the animation if they do
    if (userStamina >= movesta[move - 1]){
        userStamina -= movesta[move - 1]
        inAnimation = true;
        clearInterval(battleGUITimer);
        moveAnimationTimer = setInterval(drawCharacterMove, 200);
    }

    // if they don't, tell the user to pick another move that they have the stamina for
    else{
        alert('Pick a different move, you don\'t have enough stamina');
        moveChosen = 0;
    }
}


function drawCharactersInBattle(){
    ctx.drawImage(idleCharacter, -10, 75, 800, 350);
    // save the current canvas state
    ctx.save();
    // translates the canvas 900px horizontally
    ctx.translate(900, 0); 
    // mirrors the canvas to flip everything
    ctx.scale(-1, 1); 
    // draw the enemy character image
    ctx.drawImage(enemyCharacter, -120, 75, 800, 350);
    // reset the canvas so that it is back to normal and the characters are facing eachother
    ctx.setTransform(1,0,0,1,0,0)
    
    // idle animations for both the user's character and the random enemy
    if (charFrame >= idleAnimationArrays[character-1].length-1) {
        charFrame = 0;
            
    }
    
    if (enemyFrame >= idleAnimationArrays[randomEnemy-1].length-1) {
        enemyFrame = 0;
            
    }

    // update the src of the image element to continue the idle animation
    enemyCharacter.src = idleAnimationArrays[randomEnemy-1][enemyFrame];
    idleCharacter.src = idleAnimationArrays[character-1][charFrame];
    // increase the frames by 1 to continue the idle animation
    charFrame++
    enemyFrame++
}


function drawCharacterMove(){
    // resets the dmgDealt variable so damage doen't stack
    dmgDealt = 0;
    // draws the random map
    ctx.drawImage(battle_map, 0, 0, c.width, c.height);
    //draw health border for user
    ctx.drawImage(health_border, 13, 155, 220, 60)
    // draw health border for enemy
    ctx.drawImage(opponent_health_border, 765, 155, 220, 60)
    // draws the character image
    ctx.drawImage(idleCharacter, -10, 75, 800, 350);

    // save the current canvas state
    ctx.save();
    // translates the canvas 900px horizontally
    ctx.translate(900, 0); 
    // mirrors the canvas to flip everything
    ctx.scale(-1, 1); 
    // draw the enemy character image
    ctx.drawImage(enemyCharacter, -120, 75, 800, 350);
    // reset the canvas so that it is back to normal and the characters are facing eachother
    ctx.setTransform(1,0,0,1,0,0)

    // draws each frame of the move animation
    if(moveFrame < allCharacterMoves[character-1][moveChosen-1].length){
        idleCharacter.src = allCharacterMoves[character-1][moveChosen-1][moveFrame];
        moveFrame++;
    }
    // once it's done drawing the animation,
    else{
        //check if the move chosen is less then 4
        if (moveChosen < 4){
            // if the meditate move was chosen,
            if(moveChosen == 1 && character >= 4){
                // heal 25% of the user's health
                healAmount = 25*(100/userHealth);
                //update the html health bar element
                document.getElementById('user-progress-bar').style.width = (userHealthPercent + healAmount) + '%';
            }
            // if any other move was chosen,
            else{
                //calculate the damaage it will do to the enemy
                dmgDealt = (enemyHealth/200)*(playerAttackDamage(userAttack, moveChosen)*(1/(enemyDefence*0.01+1)));
                // update the enemy's health 
                document.getElementById('enemy-progress-bar').style.width = (enemyHealthPixels - dmgDealt) + 'px'
                // sets the enemy health pixels to its new value after the attack
                enemyHealthPixels -= dmgDealt;
                // if the health is less than or equal to 0
                if(enemyHealthPixels <= 0){
                    // clear all intervals
                    clearInterval(moveAnimationTimer);
                    clearInterval(enemyTurnTimer);
                    // set won to true to signal that the battle is over
                    won = true;
                    // set the health bar to 0 
                    document.getElementById('enemy-progress-bar').style.width = '0px';
                    // checks if the user is using a character greater than 4
                    if(character >= 5){
                        // if they are, give the win to character 4
                        numWins[3]++;
                    }
                    // else,
                    else{
                        // give the win to the character they picked
                        numWins[character-1]++;
                    }
                    // display the win screen and reselt variables
                    gameOver(winScreen);
                    
                }
                
            }
            
        }
        // if the special move has been chosen,
        else{
            // calculate the damage it will do to the enemy
            dmgDealt = specialAttackDamage(character)*(200/enemyHealth);
            // update the enemy's health bar
            document.getElementById('enemy-progress-bar').style.width = (enemyHealthPixels - dmgDealt) + 'px';
            // check if the enemy is dead
            if(enemyHealthPixels-dmgDealt <= 0){
                // clear all intervals
                clearInterval(moveAnimationTimer);
                clearInterval(enemyTurnTimer);
                // set won to true to signal that the battle is over
                won = true;
                // set the enemy health bar to 0
                document.getElementById('enemy-progress-bar').style.width = '0px';
                // chekc if the user is useing a character greater than 4
                if(character >= 5){
                    // reward the win to character 4
                    numWins[3]++;
                }
                // if they arent, 
                else{
                    // give the win to the user's chosen character
                    numWins[character-1]++;
                }
                // display the win screen and reset variables
                gameOver(winScreen);
            }
            // subtract the damage from the enemy's health
            enemyHealthPixels -= dmgDealt;
        }
        // make sure that the battle isn't over
        if(won == false){
            // give the user 1.5 stamina after each move
            userStamina += 1.5;
            // check if the user has done the required amount of moves to do the special attack
            if (numMoves < REQUIREDMOVES){
                // if they haven't, att 1 to the number of moves they have done
                numMoves++
            }
            // set the character's frame to frame 1 to reset their pose
            moveFrame = 0;
            // clear the set interval for the user's move
            clearInterval(moveAnimationTimer);
            // set the characte's frame to the first one
            idleCharacter.src = idleAnimationArrays[character-1][0];
            // check if the interval has been made yet
            if(intervalSpamPreventer == false){
                // if not, create one and set the interval spam variable to true to signal that one has been created
                intervalSpamPreventer = true;
                enemyTurnTimer = setInterval(drawEnemyMove, 150);
            }
            // get a random enemy attack
            randomizeEnemyAttack();
        }
    }
}

function drawEnemyMove(){
    // reset the damage so the damage doesn't stack
    dmgDealt = 0;
    // draw the random background
    ctx.drawImage(battle_map, 0, 0, c.width, c.height);
    //draw health border for user
    ctx.drawImage(health_border, 13, 155, 220, 60)
    // draw health border for enemy
    ctx.drawImage(opponent_health_border, 765, 155, 220, 60)
    // draw the idle character
    ctx.drawImage(idleCharacter, -10, 75, 800, 350);

    // save the current canvas state
    ctx.save();
    // translates the canvas 900px horizontally
    ctx.translate(900, 0); 
    // mirrors the canvas to flip everything
    ctx.scale(-1, 1); 
    // draw the enemy character image
    ctx.drawImage(enemyCharacter, -120, 75, 800, 350);
    // reset the canvas so that it is back to normal and the characters are facing eachother
    ctx.setTransform(1,0,0,1,0,0)

    // draws the move animation for the enemy
    if(moveFrame < allCharacterMoves[randomEnemy-1][randomEnemyAttack-1].length){
        enemyCharacter.src = allCharacterMoves[randomEnemy-1][randomEnemyAttack-1][moveFrame];
        moveFrame++;
    }
    // once the move animation is done,
    else{
        // check if the attack was less than 4
        if (randomEnemyAttack < 4){
            // if so, check if the move chosen was meditate
            if(randomEnemyAttack == 1 && randomEnemy == 4){
                // if so, heal the appropriate amount and update the health bar for the enemy
                healAmount = 25*(200/enemyHealth);
                document.getElementById('enemy-progress-bar').style.width = (enemyHealthPixels + healAmount) + 'px';
            }
            // if the move is not meditate,
            else{
                //calculate the damage that the enemy will do to the user's character
                dmgDealt = (playerAttackDamage(enemyAttack, randomEnemyAttack)*(100/userHealth))*(1/((userDefence*0.01)+1));
                // update the user's health bar after receiving damage
                document.getElementById('user-progress-bar').style.width = (userHealthPercent - dmgDealt) + '%';
                // update the user's health percentage
                userHealthPercent -= dmgDealt;
                // if the user's health is below or equal to 0,
                if(userHealthPercent <= 0){
                    // clear all intervals
                    clearInterval(moveAnimationTimer);
                    clearInterval(enemyTurnTimer);
                    // set won to true to signal that the battle is over
                    won = true;
                    // set the user's health bar to 0
                    document.getElementById('user-progress-bar').style.width = '0%';
                    // give the win to the enemy character
                    numWins[randomEnemy-1]++;
                    // display the game over screen and reset variables
                    gameOver(gameOverScreen);
                }
                
            }
        }
        // if the special attack was chosen, 
        else{
            // calculate the damage that the attack would inflict in the user and save it into a variable
            dmgDealt = specialAttackDamage(randomEnemy)*(100/userHealth);
            // update the user's health bat after receiving damage
            document.getElementById('user-progress-bar').style.width = (userHealthPercent - dmgDealt) + '%';
            // update the user's health percentage variable
            userHealthPercent -= dmgDealt;
            // if the user's health is less than or equal to 0,
            if(userHealthPercent <= 0){
                // clear all intervals
                clearInterval(moveAnimationTimer);
                clearInterval(enemyTurnTimer);
                // sets the won variable to true to signal that the battle is over and there is a winner
                won = true;
                // sets the user's health bar to 0
                document.getElementById('user-progress-bar').style.width = '0%';
                // awards the win to the enemy's character
                numWins[randomEnemy-1]++;
                // displays the game over screen and resets variables
                gameOver(gameOverScreen);
            }
           
        }
        // check if the game is over or not
        if(won == false && inBattle == true){
            // if not, set the move frame to 0 so that the character animation is reset back to it's first frame
            moveFrame = 0;
            // reset the damage dealt variable to ensure that the damage won't stack
            dmgDealt = 0;
            // clear all intervals
            clearInterval(enemyTurnTimer);
            clearInterval(moveAnimationTimer);
            // creates the interval for running the draw character GUI fucntion so that the user can choose their moves again
            battleGUITimer = setInterval(drawBattleGUI, 200);
            // sets the in animation variable to false to indicate that we are no longer in an animation
            inAnimation = false;
            // sets the interval spam preventer variable to false since the interval has been cleared and the interval is going to me
            // made later again
            intervalSpamPreventer = false;
        }
    }
}


function randomizeEnemy(){
    // while the random enemy is the previous enemy or the user's selected character,
    while (randomEnemy == character || randomEnemy == "" || randomEnemy == lastRandomEnemy){
        // check if the user's character is greater or equal to 4
        if (character >= 4){
            // if it is, set the character limit to 3
            characterLimit = 3;
        }
        // gets a random number and saves it into a variable 
        randomEnemy = Math.floor(Math.random() * (characterLimit-1 + 1)) + 1
        
    }
    // make the last random enemy to our current one so that next time we won't get the same enemy
    lastRandomEnemy = randomEnemy
    // get the stats of the random enemy
    isolateStatsValue(enemyHealth, enemyDefence, 'enemyStamina', enemyCrit, enemyAttack, randomEnemy);
    
}


function gameOver(screen){
    // clear the battle GUI interval to prevent it from drawing the gui while in the town
    clearInterval(battleGUITimer);
    // remove the elect move event listener so the user is unable to click the move buttons after the battle is over
    c.removeEventListener('mouseup', selectMove);
    // resets variable so that next time the stats aren't saved from this battle
    inBattle = false;
    inAnimation = false;
    enemyHealthPixels = 200;
    userHealthPercent = 100;
    document.getElementById('enemy-progress-bar').style.width = enemyHealthPixels + 'px';
    document.getElementById('user-progress-bar').style.width = userHealthPercent + '%';
    numMoves = 0;
    moveFrame = 0;
    // get the original stats of the user
    isolateStatsValue(userHealth, userDefence, userStamina, userCrit, userAttack, character);
    // draws wither the win or game over screen
    ctx.drawImage(screen, 0, 0, c.width, c.height);
    // unhides the restart button
    returnButton.style.width = '200px';
    returnButton.style.height = '75px';
    returnButton.hidden = false;

    // hides the health bars
    for (let i =0; i<healthBar.length;i++){
        healthBar[i].hidden = 'true';
    }
}


function randomizeEnemyAttack(){
    // randomize the character attack that the enemy character can choose from 1 to 4 
    randomEnemyAttack = Math.floor(Math.random() * (4-1 + 1)) + 1
    characterAnimation(randomEnemy);
}

function drawBattle(){
    // clear canvas
    ctx.clearRect(0, 0, c.width, c.height);
    // change variable so that we know we are in the battle and that the previous click event listener wouldn't be inputted in 
    inBattle = true;
    

    
    
    // call the drawBattleGUI function every 200 ms
    battleGUITimer = setInterval(drawBattleGUI, 200);
    
    // get a random map and enemy
    randomMap();
    randomizeEnemy();

    // resets the enemy's src so that it starts on the first frame
    enemyCharacter.src = idleAnimationArrays[randomEnemy-1][enemyFrame];
    // positions the health bar
    positionHealthBar();
    c.removeEventListener("click", enterBattle);
    c.removeEventListener("click", backToTownCenter)


}

function drawMap(){
    c.removeEventListener("click", enterMap);
    c.removeEventListener("mousemove", mapSymbolHover);
    // clear canvas
    ctx.clearRect(0,0, c.width, c.height)
    // clear all previous 
    clearInterval(characterSelectTimer);
    clearInterval(scrollTimer);
    // draw the map
    ctx.drawImage(world_map, 0, 0, c.width, c.height);
    // draw the map pointers on where the user can click to go into battle
    ctx.drawImage(map_pointer, 285,  85, 20, 20);
    ctx.drawImage(map_pointer, 665,  140, 20, 20);
    ctx.drawImage(map_pointer, 78,  165, 20, 20);
    ctx.drawImage(map_pointer, 741,  49, 20, 20);
    ctx.drawImage(map_pointer, 868,  75, 20, 20);
    ctx.drawImage(map_pointer, 276,  285, 20, 20);
    ctx.drawImage(map_pointer, 475,  179, 20, 20);
    ctx.drawImage(map_pointer, 122,  400, 20, 20);
    ctx.drawImage(map_pointer, 551,  335, 20, 20);
    ctx.drawImage(map_pointer, 770,  373, 20, 20);
    // draw exit button
    ctx.drawImage(exit, 25, 25, 100,100)

    c.addEventListener("click", backToTownCenter)
    //check if the user has clicked an arrow to initiate a fight
    c.addEventListener("click", enterBattle)
        
}
function enterBattle(event){
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    // check if mouse coordinates are within boundaries of each mouse pointer to load them into battle
    if(MOUSEX >= 285 && MOUSEY >= 85 && MOUSEX <= 305 && MOUSEY <= 105 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 665 && MOUSEY >= 140 && MOUSEX <= 685 && MOUSEY <= 160 && inBattle == false){
        drawBattle();
        
    }
    else if(MOUSEX >= 78 && MOUSEY >= 165 && MOUSEX <= 98 && MOUSEY <= 185 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 741 && MOUSEY >= 49 && MOUSEX <= 761 && MOUSEY <= 69 && inBattle == false){
        drawBattle();
    }

    else if(MOUSEX >= 868 && MOUSEY >= 75 && MOUSEX <= 888 && MOUSEY <= 95 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 276 && MOUSEY >= 285 && MOUSEX <= 296 && MOUSEY <= 305 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 475 && MOUSEY >= 179 && MOUSEX <= 495 && MOUSEY <= 199 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 122 && MOUSEY >= 400 && MOUSEX <= 142 && MOUSEY <= 420 && inBattle == false){
        drawBattle();
        
    }

    else if(MOUSEX >= 551 && MOUSEY >= 335 && MOUSEX <= 571 && MOUSEY <= 355 && inBattle == false){
        drawBattle();
       
    }

    else if(MOUSEX >= 770 && MOUSEY >= 373 && MOUSEX <= 790 && MOUSEY <= 393 && inBattle == false){
        drawBattle();
        
    }
}

function drawTownCenter(){
    c.removeEventListener('mouseup', selectMove);
    // make 3rd index equal to character made because we 
    
   
    
    
    
    //sets won to false so that we can go back into another battle after winning or losing
    won = false;

    //sets the interval spam variable to false so that we can run the interval when going into battle again
    intervalSpamPreventer = false;
    // hides the button to go back to town 
    document.getElementById('back-to-town').hidden = true;
    ctx.clearRect(0, 0, c.width, c.height);
    // draw backgrounds 
    ctx.drawImage(town_center, 0,0,c.width, c.height);
    ctx.drawImage(map_symbol, 20,20, 90, 70);
    ctx.drawImage(leaderboardSymbol, 750 , 100 ,80, 60)
    
    c.addEventListener("click", enterMap);

    c.addEventListener("mousemove", mapSymbolHover);
    
    c.addEventListener("click", drawLeaderboard);
    
}

function mapSymbolHover(event){
    let mapHovered = true;
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    // draw hovered map when mouse corods are in dimesnsions 
    if (MOUSEX >= 20 && MOUSEX <= 110 && MOUSEY >=20 && MOUSEY <= 90){
        // change the cursor to indicate a button
        c.style.cursor = "pointer"; 
        mapHovered = true;
    }
    else{
        mapHovered = false;
        
    }
    
    highlightMap(mapHovered);
}

function enterMap(event){
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;

    if (MOUSEX >= 20 && MOUSEX <= 110 && MOUSEY >=20 && MOUSEY <= 90 ){
        clearInterval(townTimer);
        // draw map when clicked 
        drawMap();
    }

}

function highlightMap(mapHovered){
    if(mapHovered){
        // draw with hovered map 
        ctx.drawImage(town_center, 0,0,c.width,c.height);
        ctx.drawImage(map_symbol, 20, 20, 100, 80);
        ctx.drawImage(leaderboardSymbol, 750 , 100 ,80, 60)
    }

    else{
        // draw without hovered map
        ctx.drawImage(town_center,0,0,c.width,c.height);
        ctx.drawImage(map_symbol, 20,20, 90, 70);
        ctx.drawImage(leaderboardSymbol, 750 , 100 ,80, 60)
    }
}


function createNewCharacter(event){
    c.removeEventListener("mousedown", createNewCharacter)
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    
    if (MOUSEX >=800 && MOUSEX <=900 && MOUSEY >=250 && MOUSEY<=350){
        // increase the number of characters 
        numCharacters++
        updateNumSubmitted();
        for (let i = move1.length -1 ; i<move1.length;i++){
            
            // make all character 5 and above moves in to character 4 moves 
            move1[i] = move1[3]
            move2[i] = move2[3]
            move3[i] = move3[3]

        }

        // make all character 5 and above animation in to character 4 moves
        idleAnimationArrays[numCharacters-1] = idleAnimationArrays[3]

        // make all character 5 and above moves in to character 4 moves 
        allCharacterMoves[numCharacters-1] = allCharacterMoves[3]

        for(let i = 0; i< INPUTSWITHBUTTONS.length; i++){
            INPUTSWITHBUTTONS[i].value = '';
        }
    }
}



function drawLeaderboard(event){
    // get mouse coordinates
    const CANVASRECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - CANVASRECT.left;
    const MOUSEY = event.clientY - CANVASRECT.top;

    // get leaderboard background
    let leaderboardBackground = scroll1

    if (MOUSEX >=750 && MOUSEX <=830 && MOUSEY >=100 && MOUSEY <=160){
        // remove previous event listeners because you are on a new screen now
        c.removeEventListener("click", enterMap);
        c.removeEventListener("mousemove", mapSymbolHover);
        c.removeEventListener("click", drawLeaderboard);
        // draw backgrounds 
        ctx.drawImage(town_center,0,0,c.width,c.height);
        ctx.drawImage(leaderboardBackground, -200, -225, c.width + 400, c.height + 400);
        // draw leaderboard title
        ctx.font = "bold 50px Courier New";
        ctx.fillText("LeaderBoard", (c.width - 350)/2, (c.height - 300)/2)
        // unhide the input and button
        SEARCHINPUT.hidden = false;
        SORT.hidden = false;
        

        // change the sizing of the input button and input search
        SEARCHINPUT.style.top = String(CANVASRECT.top + CANVASRECT.height * 0.8)+'px';
        SEARCHINPUT.style.width = String(CANVASRECT.width * 0.2) + 'px';
        SEARCHINPUT.style.height = String(CANVASRECT.height * 0.05) + 'px';

        SORT.style.top = String(CANVASRECT.top + CANVASRECT.height * 0.4)+'px';
        SORT.style.width = String(CANVASRECT.width * 0.2) + 'px';
        SORT.style.height = String(CANVASRECT.height * 0.07) + 'px';
        SORT.style.left = String(CANVASRECT.left + CANVASRECT.width * 0.7) + 'px'; 
        
        
       
        
        
        
        // draw the # of wins symbol
        ctx.drawImage(wins_symbol, 300, 150, 60, 60)
        ctx.drawImage(wins_symbol, 300, 225, 60, 60)
        ctx.drawImage(wins_symbol, 300, 300, 60, 60)
        ctx.drawImage(wins_symbol, 300, 375, 60, 60)

        // interval to always check
        inputTimer = setInterval(checkInput, 10);

        // show the text of the first time we load in the leaderboard for the sort button
        SORT.innerHTML = typeOfSorting
        
        // draw the exit 
        ctx.drawImage(exit, 25, 25, 100,100)
        c.addEventListener("click", backToTownCenter)
    }

    
}   


function checkInput(){
        // check for input when there is no value in search bar 
        if (SEARCHINPUT.value != "" ){
            // hide the sort button 
            SORT.hidden = true
            // clear canvas
            ctx.clearRect(0, 0, c.width, c.height);
            
            
           
            // get leaderboard background
            let leaderboardBackground = scroll1
            ctx.drawImage(town_center,0,0,c.width,c.height);
            ctx.drawImage(leaderboardBackground, -200, -225, c.width + 400, c.height + 400);
            
            ctx.font = "bold 50px Courier New";
            ctx.fillText("LeaderBoard", (c.width - 350)/2, (c.height - 300)/2)
            // draw exit symbol
            ctx.drawImage(exit, 25, 25, 100,100)
            // set count back to 0 
            let count = 0
            // make new arrays to get the character and number of wins 
            let copy = new Array(4);
            let copyWins = new Array(4);
    
            
            for(let i = 0 ; i< 4; i++){
                console.log(characters[i])
                // change to lower case and get index so that it is not cap sensitive
                let index = characters[i].toLowerCase().indexOf(SEARCHINPUT.value.toLowerCase());
                // when the index is 0 or greater it is in the string
                if (index >=0){
                    // make the copied array equal to the character we just search
                    copy[count] = characters[i]

                    // do they same but for the wins so that they are parallel 
                    copyWins[count] = numWins[i] 
                    // increase count for the next time we find another character to is searched
                    count++
                    console.log(count)
                    
                    // draw the amount of times that the search matched up with the characters
                    for (let j = 0; j < count; j++){
                        // draw the wins, characters, and win symbol
                        ctx.font = "Bold 30px Courier New"
                        ctx.fillText(copyWins[j], 400, searchNamePositionY[j]);
                        ctx.fillText(copy[j], 450, searchNamePositionY[j]);
                        ctx.drawImage(wins_symbol, 300, searchWinPositionY[j], 60, 60);
                        
                    }
                    
                }


            }
            
        }

        else{
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(town_center,0,0,c.width,c.height);
            // get leaderboard background
            let leaderboardBackground = scroll1
            ctx.drawImage(leaderboardBackground, -200, -225, c.width + 400, c.height + 400);
            ctx.font = "bold 50px Courier New";
            ctx.fillText("LeaderBoard", (c.width - 350)/2, (c.height - 300)/2) 
            // draw exit symbol
            ctx.drawImage(exit, 25, 25, 100,100)
            // draw win symbol
            ctx.drawImage(wins_symbol, 300, 150, 60, 60)
            ctx.drawImage(wins_symbol, 300, 225, 60, 60)
            ctx.drawImage(wins_symbol, 300, 300, 60, 60)
            ctx.drawImage(wins_symbol, 300, 375, 60, 60)
            //unhide button 
            SORT.hidden = false
            if (typeOfSorting == NUMWINS){
                // change order of sorting
                sortingType(numWins)
                
                
            }
        
            else{
                // change order of sorting 
                sortingType(characters)
                
            }  
        }
       
}



function changeSort(){
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(town_center,0,0,c.width,c.height);
    // get leaderboard background
    let leaderboardBackground = scroll1
    ctx.drawImage(leaderboardBackground, -200, -225, c.width + 400, c.height + 400);
    ctx.font = "bold 50px Courier New";
    ctx.fillText("LeaderBoard", (c.width - 350)/2, (c.height - 300)/2)
    // draw exit symbol
    ctx.drawImage(exit, 25, 25, 100,100)
    // draw wins symbol
    ctx.drawImage(wins_symbol, 300, 150, 60, 60)
    ctx.drawImage(wins_symbol, 300, 225, 60, 60)
    ctx.drawImage(wins_symbol, 300, 300, 60, 60)
    ctx.drawImage(wins_symbol, 300, 375, 60, 60)

    // when there is nothing in the search input 
    if(SEARCHINPUT.value == ""){
        if (typeOfSorting == NUMWINS){
            // change order of sorting 
            sortingType(numWins)
            // change type of sorting 
            typeOfSorting = ALPHABETICALLY
            
            
           
        }
    
        else{
            // change order of sorting 
            sortingType(characters)
            // change type of sorting 
            typeOfSorting = NUMWINS
            
        }  
    }
    // change the button text
    SORT.innerHTML = typeOfSorting
    
    
}



function sortingType(array){
    
    
    
    // make new arrays that will be in order
    let copy = new Array(4)
    let copyWins = new Array(4);
    let copyCharacter = new Array(4);
    for (let i = 0; i < 4; i++){
        // make new array equal to old array
        copy[i] = array[i]
        copyWins[i] = numWins[i];
        copyCharacter[i] = characters[i]
    }

    for (let i = 0; i < copy.length - 1; i++){
        // assume that the boundary element is the smallest at the start
        // of the find minimum algorithm
        let smallestIndex = i;

        // search the array starting from the smallest, to try and find
        // anything smaller
        for (let j = i + 1; j < copy.length; j++){
            // if the current element in the search is smaller than
            // smallest, we replace smallest
            // make string so that we can lowercase so that they will all have the same unicode
            // to actually alphabetically sort
            if (String(copy[j]).toLowerCase() < String(copy[smallestIndex]).toLowerCase()){
                smallestIndex = j;
            }
        }

        // the search has finished, and smallestIndex will be storing the
        // location of the actual smallest element
        let temp = copy[i];
        copy[i] = copy[smallestIndex];
        copy[smallestIndex] = temp;
        // swap the corresponding numWins elements to keep them parallel
        let tempWins = copyWins[i];
        copyWins[i] = copyWins[smallestIndex];
        copyWins[smallestIndex] = tempWins;
        
         // also swap the corresponding character elements to keep them parallel
        let tempCharacter = copyCharacter[i];
        copyCharacter[i] = copyCharacter[smallestIndex];
        copyCharacter[smallestIndex] = tempCharacter;
    }
     // change depending which type of sorting 
    if (typeOfSorting == ALPHABETICALLY){
        ctx.font = "Bold 30px Courier New"
        // draw wins in order
        ctx.fillText(copy[0], 450, 175) 
        ctx.fillText(copy[1], 450, 250)
        ctx.fillText(copy[2], 450, 325)
        ctx.fillText(copy[3], 450, 400)
        // draw characters in order
        ctx.fillText(copyWins[0], 400, 175)
        ctx.fillText(copyWins[1], 400, 250)
        ctx.fillText(copyWins[2], 400, 325)
        ctx.fillText(copyWins[3], 400, 400)
        
    }
    // change depending which type of sorting 
    else{
        // draw wins in order
        ctx.font = "Bold 30px Courier New"
        ctx.fillText(copyWins[3], 400, 175) 
        ctx.fillText(copyWins[2], 400, 250)
        ctx.fillText(copyWins[1], 400, 325)
        ctx.fillText(copyWins[0], 400, 400)
        // draw the characters in order 
        ctx.fillText(copyCharacter[3], 450, 175)
        ctx.fillText(copyCharacter[2], 450, 250)
        ctx.fillText(copyCharacter[1], 450, 325)
        ctx.fillText(copyCharacter[0], 450, 400)

       
    }
}

function backToTownCenter(event){
    // get mouse coordinates
    const RECT = c.getBoundingClientRect();
    const MOUSEX = event.clientX - RECT.left;
    const MOUSEY = event.clientY - RECT.top;
    if (MOUSEX >= 25 && MOUSEX <= 125 && MOUSEY>=25 && MOUSEY <=125){
        // clear interval of leaderboard
        clearInterval(inputTimer)
        drawTownCenter()
        c.removeEventListener("click", backToTownCenter)
        // hide the input and button in leadboard
        SORT.hidden = true
        SEARCHINPUT.hidden = true
        
    }
}
