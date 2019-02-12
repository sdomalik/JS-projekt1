const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const input = document.querySelector('#fileInput')

const brightness = document.querySelector("#brightness");
const contrast = document.querySelector("#contrast");
const saturation = document.querySelector("#saturation")
const submit = document.querySelector("#submit")

let img = new Image(); //new object


input.onchange = function(event){ //perform when file chosen
    let files = event.target.files; //Filelist 
    let file = files[0];
    let reader = new FileReader(); //New constructor

    reader.readAsDataURL(file); //how to read file
    reader.onload = function(event){ //perform when file is loaded
        img.src = event.target.result; //set image source

        img.onload = function(){ //perform when image is loaded
            ctx.drawImage(img,0,0,1000,600); //drawing image on canvas
        }
    }
}
 
let satValue = 100;
let conValue = 100;
let brValue = 100;

brightness.oninput = function(){ //execute when input used
    brValue = this.value // set brightness value
    useFilters(); // execute function after change
}
contrast.oninput = function(){
    conValue = this.value
    useFilters();
}
saturation.oninput = function(){
    satValue = this.value
    useFilters();
}

function useFilters(){ //seting filters on ctx whith values from inputs
    ctx.filter = `brightness(${brValue}%) contrast(${conValue}%) saturate(${satValue}%)`
    ctx.drawImage(img,0,0,1000,600)
}

//variables neccessary to draw on image
let paint;
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();

//function used for adding coordinates to array
function addClick(x , y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

//execute when mouse button is pressed 
canvas.addEventListener('mousedown', function(e){
    let mouseX = e.pageX - this.offsetLeft;
    let mouseY = e.pageY - this.offsetTop;

    paint = true;
    addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
    draw();
})
//execute when cursor is moving on canvas
canvas.addEventListener('mousemove', function(e){
    if(paint){
        addClick(e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
        draw();
      }
})
//setting paint to false when mousse button is not pressed
canvas.addEventListener('mouseup', function(e){
    paint = false;
})
//setting paint to false when cursor is off the canvas
canvas.addEventListener('mouseleave', function(e){
    paint = false;
})

//drawing on canvas
function draw(){
    ctx.strokeStyle = "#df4b26";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;

    for(let i=0; i < clickX.length; i++) {		
        ctx.beginPath();
        if(clickDrag[i] && i){
          ctx.moveTo(clickX[i-1], clickY[i-1]);
         }else{
           ctx.moveTo(clickX[i]-1, clickY[i]);
         }
         ctx.lineTo(clickX[i], clickY[i]);
         ctx.closePath();
         ctx.stroke();
      }
}







