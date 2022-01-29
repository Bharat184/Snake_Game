//Game Constants & Variables
let inputDir={x:0,y:0};
const foodSound=new Audio('./music/food.mp3');
const gameOverSound=new Audio('./music/gameover.mp3')
const moveSound=new Audio('./music/move.mp3')
const musicSound=new Audio('./music/music.mp3');
const board=document.getElementById('board');
// const scor=document.getElementById('score');
let speed=8;
let lastPaintTime=0;
let snakeArr=[
    {x:3,y:5}
]
let food={x:13,y:15};
let score=0;
//Game Functions
function main(ctime)
{
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed)
    {
        return;
    }
    lastPaintTime=ctime;
    gameEngine();

    // console.log(ctime)
}

function isCollide(snake)
{
    //If you bump into yourself
    for(let i=1;i<snakeArr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y)
        {
            return true;
        }
    }
    //If you bump into the wall
    if(snake[0].x>=18 || snake[0].x <= 0 || snake[0].y >=18 || snake[0].y <= 0)
    {
        return true;
    }
}

function gameEngine()
{
    //Part 1: Updating  the snake array
    if(isCollide(snakeArr))
    {
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        alert("Game Over. Press any Key to press again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        score=0;
        scoreBox.innerHTML=`Score: ${score}`;
    }
    //If You have eaten the food increment and regenerate the food.
    if(snakeArr[0].y===food.y && snakeArr[0].x===food.x)
    {
        foodSound.play();
        score+=1;
        if(score>highscore)
        {
            localStorage.setItem('highscore',JSON.stringify(score));
            highscore=localStorage.getItem('highscore');
            highScoreBox.innerHTML='High Score:'+highscore;
        }
        scoreBox.innerHTML=`Score: ${score}`;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x,y:snakeArr[0].y+inputDir.y});
        let a=2;
        let b=15;
        food={x:2+Math.round(a+(b-a)*Math.random()),y:2+Math.round(a+(b-a)*Math.random())}
    }

    //Moving the Snake
    for(let i=snakeArr.length-2;i>=0;i--)
    {
        snakeArr[i+1]={...snakeArr[i]}
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //Part 2: Render the snake and food
    //Display the snake
    board.innerHTML="";
    snakeArr.forEach((e,index)=>{
        snakeElement=document.createElement('div');
        snakeElement.style.gridRowStart=e.y;
        snakeElement.style.gridColumnStart=e.x;
        if(index===0)
        {
            snakeElement.classList.add('head');
        }
        else
        {
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

    //Display the food
    foodElement=document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

//Main Logic Starts Here
musicSound.play();
let highscore=localStorage.getItem('highscore')
if(highscore)
{
  highScoreBox.innerHTML='High Score:'+highscore;
}
else
{
    localStorage.setItem('highscore','0');
    highScoreBox.innerHTML='High Score:'+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}; //Start the game
    moveSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log('arrowup');
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case 'ArrowDown':
            console.log('arrowDown');
            inputDir.x=0;
            inputDir.y=1;
            break;
        case 'ArrowLeft':
            console.log('arrowLeft');
            inputDir.x=-1;
            inputDir.y=0;
            break;
        case 'ArrowRight':
            console.log('arrowRight');
            inputDir.x=1;
            inputDir.y=0;
            break;
        default:
            break;
        
    }
})
