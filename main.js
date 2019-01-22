const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const input = document.querySelector('#fileInput')
let img = new Image(); //new object


input.onchange = function(event){ //perform when file chosen
    let files = event.target.files; //Filelist 
    let file = files[0];
    let reader = new FileReader(); //New constructor

    reader.readAsDataURL(file); //how to read file
    reader.onload = function(event){ //perform when file is loaded
        img.src = event.target.result; //set image source

        img.onload = function(){ //perform when image is loaded
            ctx.drawImage(img,0,0,600,400); //drawing image on canvas
        }
    }
}










