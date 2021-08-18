let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext('2d');
ctx.lineCap = 'round'; // to make line smoother
ctx.lineJoin = 'round';
let sizeInp = document.querySelector('#size');
let colorInp = document.querySelector('#color');
let saveBtn = document.querySelector('.save');
let undoBtn = document.querySelector('.undo');

let shapeStartX;
let shapeStartY;
let lineSize = 10;
let lineColor = '#000';
let isPressed = false;
let currentTool = 'brush'; //datatype in html
let savedData; //store the current state of canvas
let savedStates = []; //for undo button

document.querySelectorAll('.toolbar__button').forEach((btn) => {
    btn.addEventListener('click', function() {
        document.querySelector('.toolbar__button--pressed').classList.remove('toolbar__button--pressed');
        this.classList.add('toolbar__button--pressed');
        currentTool = this.dataset.name;
    })
});

//BRUSH TOOL
canvas.addEventListener('mousedown', (e) => {
    savedData = ctx.getImageData(0, 0, 800, 600);
    savedStates.push(savedData);
    isPressed = true;
    ctx.lineWidth = lineSize;
    ctx.strokeStyle = lineColor;
    shapeStartX = e.offsetX;
    shapeStartY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(shapeStartX, shapeStartY);
    if (currentTool === 'eraser') {
        ctx.globalCompositeOperation = 'destination-out';
    }
})

canvas.addEventListener('mousemove', (e) => { //aby ked potiahneme ciara pojde za koncom
    let x = e.offsetX;
    let y = e.offsetY;
    if (isPressed) {
        switch (currentTool) {
            case 'brush':
                drawPoint(x, y);
                break;
            case 'line':
                drawLine(x, y);
                break;
            case 'rectangle':
                drawRectangle(shapeStartX, shapeStartY, x - shapeStartX, y - shapeStartY);
                break;
            case 'circle':
                drawCircle(shapeStartX, shapeStartY, Math.sqrt(Math.pow(x - shapeStartX, 2) + Math.pow(y - shapeStartY, 2)));
                break;
            case 'eraser':
                eraser(x, y);
                break;
        }

    }
})

canvas.addEventListener('mouseup', (e) => {
    isPressed = false;
    ctx.closePath();
    ctx.globalCompositeOperation = 'source-over';
})

sizeInp.addEventListener('input', () => {
    lineSize = sizeInp.value;
})

colorInp.addEventListener('input', () => {
    lineColor = colorInp.value;
})

//DRAWING A SINGLE POINT
let drawPoint = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
}

let drawLine = (x, y) => { // function fro drawing line
    ctx.putImageData(savedData, 0, 0); //store current status of canvas
    ctx.beginPath(); //behind a new path
    ctx.moveTo(shapeStartX, shapeStartY);
    ctx.lineTo(x, y);
    ctx.stroke();
}

let drawRectangle = (x, y, width, height) => {
    ctx.putImageData(savedData, 0, 0);
    ctx.beginPath();
    ctx.rect(x, y, width, height)
    ctx.stroke();
}

let drawCircle = (x, y, radius) => {
    ctx.putImageData(savedData, 0, 0);
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

let eraser = (x, y) => {
    ctx.lineTo(x, y);
    ctx.stroke();
}

saveBtn.addEventListener('click', () => {
    let dataURL = canvas.toDataURL('image/png');
    saveBtn.href = dataURL;
})


let undo = () => {
    ctx.putImageData(savedStates.pop(), 0, 0);
}

undoBtn.addEventListener('click', () => {
    undo();
})

document.addEventListener('keydown', function(e) {
    if (e.keyCode === 90 && e.ctrlKey) {
        undo();
    }
})