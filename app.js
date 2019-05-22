const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const DEFAULT_COLOR = "#2C2C2C";

const CANBUS_SIZE = 700;

ctx.fillStyle="white";
ctx.fillRect(0,0,CANBUS_SIZE,CANBUS_SIZE);

ctx.strokeStyle = DEFAULT_COLOR;
ctx.fillStyle = DEFAULT_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function startPainting(){
    painting = true;
}

function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;    
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke();
    }
}


function handleColorClick(event){
    const changeColor = event.target.style.backgroundColor;
    ctx.strokeStyle=changeColor;
    ctx.fillStyle=changeColor;
}

function handleRangeChange(event){
    const changeBar = event.target.value;
    ctx.lineWidth = changeBar;
}


function handleCanvasClick(){
    if(filling){
    ctx.fillRect(0,0,CANBUS_SIZE,CANBUS_SIZE);
    stopPainting();
    }
}

function handleCM(event){
    event.preventDefault();
}

function handleSave(){
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS[:clown_face:]";
  link.click();  
}

if(range){
    range.addEventListener("input",handleRangeChange);
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
}

if(color){
    Array.from(color).forEach(color => color.addEventListener("click",handleColorClick));
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click",handleSave);
}