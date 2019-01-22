const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const input = document.querySelector('#fileInput')
const brightness = document.querySelector("#brightness");
const contrast = document.querySelector("#contrast");
const saturation = document.querySelector("#saturation")

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

brightness.oninput = function(){
    canvas.style.filter = `brightness(${this.value * 2}%)`;
}

contrast.oninput = function(){
    canvas.style.filter = `contrast(${this.value * 2}%)`;
}

saturation.oninput = function(){
    canvas.style.filter = `saturate(${this.value *2}% )`;
}











