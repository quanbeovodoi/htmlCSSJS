function snakegame(options) { 
    class snake_part{
        constructor(x,y){
            this.x = x;
            this.y = y;
        }
    }
    const canvas = document.getElementById('snake_game');
    let speed = 7;
    let headX = 10;
    let headY = 10;
    let appleX = 15;
    let appleY = 7;
    let xVelocity = 0;
    let yVelocity = 0;
    let score = 0;
    let snakePart = [];
    let tailLength = 2;
    const tileCount = 20;
    const tileSize = canvas.width / tileCount - 2;
    let start = true;
    let gameOver = false;
    // Vẽ bảng
    const ctx = canvas.getContext('2d');
    function resetG(){
        headX = 10;
        headY = 10;
        appleX = 15;
        appleY = 7;
        xVelocity = 0;
        yVelocity = 0;
        score = 0
        tailLength = 2;
        snakePart = [];
        start = true;
    }
    function drawGame(){
        startGame();
        changeSnakePosition();
        let result = isGameOver();
        if(result)
        return;

        clearBoard();
        checkAppleCollision();
        drawApple();
        drawSnake();
        drawScore();
        setTimeout(drawGame, 1000/speed);
    }
    function startGame(){
        const playgame = document.querySelector('#play_snake');
        playgame.addEventListener('click',()=>{
            if(start){
                yVelocity = -1;
                xVelocity = 0;
                start = false
            }
            if(gameOver)
            {
                resetG();
                start = true;
                drawGame();
                gameOver = false;
            }
        })
    }
    function isGameOver(){
        
        if(yVelocity === 0 && xVelocity ===0){
            return false;
        }
        if(headX < 0){
            gameOver = true
        }
        else if(headX === tileCount){
            gameOver = true
        }
        else if(headY < 0){
            gameOver = true
        }
        else if(headY === tileCount){
            gameOver = true
        }
        for(let i = 0;i<snakePart.length;i++){
            let part = snakePart[i];
            if(part.x === headX && part.y === headY){
                gameOver = true;
                break;
            }
        }
        if(gameOver){
            ctx.fillStyle = "white";
            ctx.font = "50px Verdana";
            
            var gradient = ctx.createLinearGradient(0,0,canvas.width,canvas.height)
            gradient.addColorStop("0","magenta");
            gradient.addColorStop("0.5","blue");
            gradient.addColorStop("1.0","red");

            ctx.fillStyle = gradient;
            ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
        }
        return gameOver;
    }
    function drawScore(){
        ctx.fillStyle = "white";
        ctx.font = "10px Verdana";
        ctx.fillText("Score: " + score,canvas.width - 50,10);
    }
    function drawApple(){
        ctx.fillStyle = "red";
        ctx.fillRect(appleX*tileCount,appleY*tileCount,tileSize,tileSize)
    }
    function drawSnake(){
        
        ctx.fillStyle = "blue";
        for(let i = 0;i < snakePart.length;i++){
            let part = snakePart[i];
            ctx.fillRect(part.x * tileCount,part.y * tileCount,tileSize,tileSize)
        }

        snakePart.push(new snake_part(headX,headY))
        if(snakePart.length > tailLength){
            snakePart.shift()
        }
        ctx.fillStyle = "orange";
        ctx.fillRect(headX * tileCount,headY * tileCount,tileSize,tileSize);
    }
    function clearBoard(){
        ctx.fillStyle = "black";
        ctx.fillRect(0,0,canvas.width,canvas.height);
    }
    function changeSnakePosition(){
        headX = headX + xVelocity;
        headY = headY + yVelocity;
    }
    function checkAppleCollision(){
        if(appleX === headX && appleY === headY){
            appleX = Math.floor(Math.random() * tileCount);
            appleY = Math.floor(Math.random() * tileCount);
            tailLength ++;
            score ++;
        }
    }
    function keyDown(event){
        if(event.keyCode == 38){
            if(yVelocity === 1)
            return
            yVelocity = -1;
            xVelocity = 0;
        }
        if(event.keyCode == 37){
            if(xVelocity===1)
            return
            yVelocity = 0;
            xVelocity = -1;
        }
        if(event.keyCode == 39){
            if(xVelocity === -1)
            return
            yVelocity = 0;
            xVelocity = 1;
        }
        if(event.keyCode == 40){
            if(yVelocity===-1)
            return
            yVelocity = 1;
            xVelocity = 0;
        }
    }
    document.body.addEventListener('keydown',keyDown);
    
    drawGame();
}
