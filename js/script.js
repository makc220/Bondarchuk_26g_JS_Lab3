
function swapBlocks() {
    let block4 = document.getElementById('block4');
    let block5 = document.getElementById('block5');

    
    let tempContent = block4.innerHTML;
    block4.innerHTML = block5.innerHTML;
    block5.innerHTML = tempContent;
}

function generateTriangleInputs() {
    document.getElementById('block3').innerHTML = `
        <div class="grid" style="display: grid; grid-template-columns: 1fr; gap: 10px;">
            ${[...Array(3)].map((_, i) => `
                <div style="display: flex; gap: 10px;">
                    <input id="x${i+1}" type="number" placeholder="X${i+1}" style="width: 100%;">
                    <input id="y${i+1}" type="number" placeholder="Y${i+1}" style="width: 100%;">
                </div>
            `).join('')}
        </div>
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px;">
        <button onclick="calculateAreaByCoordinates()" style="margin-top: 10px;">Обчислити</button>
        <p id="areaOutput" style="font-size:20px; margin-top: 10px;"></p>`;
}

function calculateAreaByCoordinates() {
    let coords = [...Array(3)].map((_, i) => [
        Number(document.getElementById(`x${i+1}`).value),
        Number(document.getElementById(`y${i+1}`).value)
    ]);
    let area = 0.5 * Math.abs(
        coords[0][0] * (coords[1][1] - coords[2][1]) +
        coords[1][0] * (coords[2][1] - coords[0][1]) +
        coords[2][0] * (coords[0][1] - coords[1][1])
    );
    document.getElementById('areaOutput').innerText = `Площа: ${area}`;
}



function generateMinForm() {
    let block3 = document.getElementById('block3');
    let form = '<p style=" font-size:20px;" >Введіть 10 чисел:</p> ';
    form += '<div class="input-grid">';
    for (let i = 0; i < 10; i++) {
        form += `<input style="width: 80px;" type="number" id="num${i}" placeholder="Число ${i + 1}" >`;
    }
    form += '</div>';
    form += '<button onclick="findMinCount()">Знайти мінімальні</button>';
    block3.innerHTML = form;
}

function findMinCount() {
    let numbers = [];
    for (let i = 0; i < 10; i++) {
        numbers.push(Number(document.getElementById(`num${i}`).value));
    }
    let minVal = Math.min(...numbers);
    let count = numbers.filter(num => num === minVal).length;
    alert(`Кількість мінімальних значень: ${count}`);
    document.cookie = `minCount=${count}; path=/`;
}

window.onload = function () {
    let cookies = document.cookie.split('; ').find(row => row.startsWith('minCount='));
    if (cookies) {
        let minCount = cookies.split('=')[1];
        if (confirm(`Збережені дані: ${minCount} мінімальних чисел. Натисніть ОК, щоб видалити.`)) {
            document.cookie = 'minCount=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            alert('Куки видалено');
            location.reload();
        }
    }
}