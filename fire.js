const firePixelArray = new Array;
const fireWidth = 50;
const fireHeight = 40;
const fireColorsPalette = [
    {"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}
];
let direction = false;
let fireIntesity = 36;



function start(){
    createFireEstructure();
    creatorFireResource();
    calculateFirePropagation();

    setInterval(calculateFirePropagation, 30);
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
        firePixelArray[lastRowIndex + column] = fireIntesity;
    }
}
function calculateFirePropagation(){
    for (let column = 0; column < fireWidth; column++){
        for (let row = 0; row < fireHeight; row++){
            const pixelIndex = column + (fireWidth * row);
            updateFireIntesityPerPixel(pixelIndex);
        }
    }
    renderFire();
}
function updateFireIntesityPerPixel(currentPixelIndex){
    const belowPixelIndex = currentPixelIndex + fireWidth;
    if (belowPixelIndex >= fireHeight * fireWidth){
        return;
    }
    const decay = Math.floor(Math.random() * 3);
    const belowPixelFireIntesity = firePixelArray[belowPixelIndex];
    const newFireIntesity = belowPixelFireIntesity - decay >= 0 ? belowPixelFireIntesity - decay : 0;

    if (direction){
        console.log('esquerda')
        firePixelArray[currentPixelIndex - decay] = newFireIntesity;
    } else {
        console.log('direita')
        firePixelArray[currentPixelIndex + decay] = newFireIntesity;
    }
}
function renderFire(){
    const debug = false;
    let table = '<table cellspacing="0" cellpadding="0">';
    for (let row = 0; row < fireHeight; row++){
        table += '<tr>';
        for (let column = 0; column < fireWidth; column++){
            const pixelIndex = column + row * fireWidth;
            const fireIntensity = firePixelArray[pixelIndex];
            if (debug){
                table += '<td>'
                table += fireIntensity;
                table += '</td>'
            } else {
                let palette = fireColorsPalette[fireIntensity];
                let rgbColor = `${palette.r}, ${palette.g}, ${palette.b}`;
                table += `<td style="background-color: rgb(${rgbColor});"`;
                table += '</td>'
            }
            
        }
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('fogo').innerHTML = table;
}
function addListnerToButtons(){
    const buttons = document.querySelectorAll('button');
    buttons[0].addEventListener('click', moreFireIntensity);
    buttons[1].addEventListener('click', lessFireIntensity);
    buttons[2].addEventListener('click', killFireIntensity);
    buttons[3].addEventListener('click', igniteFireIntesity);
    buttons[4].addEventListener('click', function() { changeWindDirection(true) });
    buttons[5].addEventListener('click', function() { changeWindDirection(false) });
}
function moreFireIntensity(){
    fireIntesity += fireIntesity + 2 <= 36 ? 2 : 0;
    creatorFireResource();
}
function lessFireIntensity(){
    fireIntesity -= fireIntesity - 2 > 0 ? 2 : 0;
    creatorFireResource();
}
function igniteFireIntesity(){
    fireIntesity = 36;
    creatorFireResource();
}
function killFireIntensity(){
    fireIntesity = 0;
    creatorFireResource();
}
function changeWindDirection(dir){
    direction = dir;
    creatorFireResource();
}

start();
addListnerToButtons();