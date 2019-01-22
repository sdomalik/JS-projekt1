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

brightness.oninput = function(){
    brValue = this.value
    useFilters();
}
contrast.oninput = function(){
    conValue = this.value
    useFilters();
}
saturation.oninput = function(){
    satValue = this.value
    useFilters();
}

function useFilters(){
    ctx.filter = `brightness(${brValue}%) contrast(${conValue}%) saturate(${satValue}%)`
    ctx.drawImage(img,0,0,1000,600)
}

