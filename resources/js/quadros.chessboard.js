const n = 8, m = 8;
const squareSize = 70;
const boardWidth = squareSize * n;
const boardHeight = squareSize * m;
const squareWidth = boardWidth / n;
const squareHeight = boardHeight / m;

let colorLight = 'a';
let colorDark = 'b';

function main() {
    render(n, m);
}

function render(n, m) {
    let body = document.body,
        table = document.createElement('table'),
        demo = document.createElement('div');
    demo.style.paddingTop = '5px';
    table.style.width = `${boardWidth}px`;
    table.style.height = `${boardHeight}px`;
    for (let i = 0; i < n; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < m; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            const squareColor = ((i + j) & 1) ? colorDark : colorLight;
            td.setAttribute('class', `td ${squareColor}`);
            td.style.width = `${squareWidth}px`;
            td.style.height = `${squareHeight}px`;
        }
    }
    demo.setAttribute('id', 'demo');
    demo.appendChild(table);
    body.appendChild(demo);
    styleSetPositionCenter(demo);
}