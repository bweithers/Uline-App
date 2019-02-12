var redBlock;

var myBackground = {
    canvas: document.createElement("canvas"),
    start: function(){
        this.canvas.width = 480;
        this.canvas.height = 350;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateBackground, 20);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context.strokeRect(60,60,400,200);
    }
}

function setup(){
    myBackground.start();
    // Want to draw a path for it to move along.
    ctx = myBackground.context;
    ctx.strokeRect(60,60,400,200);
   
    redBlock = new component(30,30,"red", 30, 45);
}

function component(width, height, color, x, y){
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.state = 0;
    this.move = function(){        
        if(this.state == 0 && this.x >= 445)
            this.state = 1;
        if(this.state == 1 && this.y >= 245)
            this.state = 2;
        if(this.state == 2 && this.x <= 45)
            this.state = 3;
        if(this.state == 3 && this.y <= 45)
            this.state = 0;
        if(this.state == 0)
            this.x+=2;
        if(this.state == 1)
            this.y+=2
        if(this.state == 2)
            this.x-=2
        if(this.state == 3)
            this.y-=2
        
    },

    this.hide = function(){
        this.x = NaN;
        this.state = 5;
    },

    this.reset = function(){
        if(this.state == 5){
            this.x = 30;
            this.y = 45;
            this.state = 0;
            return 1;
        }
        return -1; 
    },

    this.update = function(){
        ctx = myBackground.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
   
}

function updateBackground(){
    myBackground.clear();
    redBlock.move();
    redBlock.update();
}

function hideDot(){
    redBlock.hide();
    document.getElementById("explanation").innerHTML = "The driver is on a break, they will be back soon.";
}


function showDot(){
    var outcome = redBlock.reset();
    if (outcome == 1)
        document.getElementById("explanation").innerHTML = "The driver is back from a break!";
}
