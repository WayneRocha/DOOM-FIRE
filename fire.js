const firePixelArray = new Array;
const fireWidth = 15;
const fireHeight = 10;

function start(){
    createFireEstructure();
    creatorFireResource();
    calculateFirePropagation();
    renderFire();
}
function createFireEstructure(){
    const numberOfPixels = fireWidth * fireHeight;
    for (let i = 0; i < numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}
function creatorFireResource(){
    let lastRowIndex = (fireHeight * fireWidth) - fireWidth;
    for (let column = 0; column < fireWidth; column++){
        firePixelArray[lastRowIndex + column] = 36;
    }
}
function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireWidth; row++){
            const pixelIndex = (fireHeight * row) + column;
            console.log(pixelIndex);
        }   
    }
}
function renderFire(){
    let table = '<table cellspacing="0" cellpadding="0">';
    for (let row = 0; row < fireHeight; row++){
        table += '<tr>';
        for (let column = 0; column < fireWidth; column++){
            const pixelIndex = column + row * fireWidth;
            const fireIntensity = firePixelArray[pixelIndex];
            table += '<td>'
            table += fireIntensity;
            table += '</td>'
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('fogo').innerHTML = table;
}

start();