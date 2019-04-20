var redBlock, startpt, endpt;
var refr_rate = 10;

var loc0 = [42.5213, -87.959526]
var loc1 = [42.520955, -87.954529]
var loc2 = [42.518050, -87.952377]
var loc3 = [42.514992, -87.954459]

var lon01div = -87.9570275;
var lat12div = 42.5195025;
var lat23div = 42.516521;

var upperbound = 42.53;
var bottombound = 42.45;
var rightbound = -87.975;
var leftbound = -87.93;

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
         
        // This block of code will map the GeoLocations to the block.loc var 
        if (lon >= lon01div && lat >= lat12div) redBlock.loc = 0;
        if (lon >= lon01div && lat >= lat12div) redBlock.loc = 1; 
        if (lat <= lat12div && lat >= lat23div) redBlock.loc = 2;
        if (lat <= lat23div)                    redBlock.loc = 3;
         
        // If the GeoLocation is not any reasonable location by Uline, hide the block
        if (lat <= bottombound || lat >= upperbound || lon >= leftbound || lon <= rightbound) redBlock.loc = -1;
        
        console.log("Given: ",lat, lon,"Loc: ",redBlock.loc);
        return;
    },
    
    this.hide = function(){
        this.clear();
        this.x = NaN;
        this.y = NaN;
        this.loc = -1;
        return;
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
            case -1:
                this.x = NaN;
                this.y = NaN;
                break;
            default:
                this.x = NaN;
                this.y = NaN;
                console.log("Unexpected value in redBlock.loc");
                break;
        }
        ctx = myBackground.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
   
}

function hideMap(){
    document.getElementById("label").innerHTML = "The Driver is away.";
    document.getElementById("header").innerHTML = "AWAY."; 
    redBlock.hide();
}

function showMap(){
    document.getElementById("label").innerHTML = "This the Driver page.";
    document.getElementById("header").innerHTML = "DRIVING.";
    redBlock.update();
}

function updateBackground(){
    myBackground.clear();
    getLocation();
    redBlock.update();
}

function getLocation(){
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(redBlock.setLocation); 
    else document.getElementById("label").innerHTML = "Geolocation is not supported by this browser.";
}
