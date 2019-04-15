var redBlock, startpt, endpt;
var refr_rate = 10;

console.log("Startup.");

var myBackground = {
    canvas: document.createElement("canvas"),
    map: document.getElementById("map"),
    start: function(){
        this.canvas.width = this.map.width;
        this.canvas.height = this.map.height;
        this.context = this.canvas.getContext("2d");
        this.interval = setInterval(updateBackground, refr_rate);
        this.context.drawImage(this.map, 0, 0);
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    clear : function(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
        this.context.drawImage(this.map, 0, 0, this.map.width, this.map.height);
    }
}

function setup(){
    myBackground.start();
    ctx = myBackground.context;
    ctx.strokeRect(60,60,400,200);
    redBlock = new component(15,15,"red", 0);
}

function component(width, height, color, loc){
    var x;
    var y;
    this.width = width;
    this.height = height;
    this.loc = loc;

    this.setLocation = function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
         
        /* This block of code will map the GeoLocations to the block.loc var
        if ((lon >= xzero && lon <= xtwo)) loc = 1;
        if ((lon >= xtwo && lon <= xthree) && (lat >= yone)) loc = 1;
        if ((lon >= xone && lon <= x) && (lat >= yone)) loc = 1; 
        if ((lon >= xone && lon <= xtwo) && (lat >= yone)) loc = 1;
        */

        console.log(lat, lon);
        return;
    },
    
    this.hide = function(){
        this.clear();
        this.x = NaN;
        this.y = NaN;
        this.loc = -1
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

    this.clear = function(){
        ctx = myBackground.context;
        ctx.clearRect(this.x, this.y, this.height, this.width);
        return; 
    },
    this.update = function(){
        this.clear();
        switch(this.loc){
            case 0:
               this.x = 270;
               this.y = 180;
               break;
            case 1:
                this.x = 670;
                this.y = 195;
                break;
            case 2:
                this.x = 920;
                this.y = 620;
                break;
            case 3:
                this.x = 725;
                this.y = 985;
                break;
        }
        ctx = myBackground.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
   
}
function hideMap(){
    document.getElementById("label").innerHTML = "The Driver is away.";
    redBlock.hide();
}
function showMap(){
    document.getElementById("label").innerHTML = "This the Driver page.";
    redBlock.update();
}
function updateBackground(){
    myBackground.clear();
    getLocation();
    redBlock.loc = 0;
    redBlock.update();
}

function getLocation(){
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(redBlock.setLocation); 
    else document.getElementById("label").innerHTML = "Geolocation is not supported by this browser.";
}
