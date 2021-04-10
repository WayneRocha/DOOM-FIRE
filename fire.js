const firePixelArray = new Array;
const fireWidth = 3;
const fireHeight = 3;

function start(){
    createFireEstructure();
    creatorFireResource();
    calculateFirePropagation();
    renderFire();
    console.countReset();
    setInterval(() => start(), 3000);
}
function createFireEstructure(){
    const numberOfPixels = fireWidth * fireHeight;
    for (let i = 0; i < numberOfPixels; i++){
        firePixelArray[i] = 0;
    }
}
function creatorFireResource(){
    const lastRowIndex = (fireHeight * fireWidth) - fireWidth;
    for (let column = 0; column < fireWidth; column++){
        firePixelArray[lastRowIndex + column] = 36;
    }
}
function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row);
            updateFireIntesityPerPixel(pixelIndex);
        }
    }
}
function updateFireIntesityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;
    if (belowPixelIndex >= fireHeight * fireWidth){
        return 1;
    }
    const decay = 1;
    const belowPixelFireIntesity = firePixelArray[belowPixelIndex];
    const newFireIntesity = belowPixelFireIntesity - decay;
    console.count();
    
    firePixelArray[currentPixelIndex] = newFireIntesity;    
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