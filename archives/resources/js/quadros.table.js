let n, m;
let cellSize;
let tableWidth;
let tableHeight;
let cellWidth;
let cellHeight;

let setCellContentOverride = undefined;
const setCellContent = (td, i, j, y = n, x = m) => {
    if (typeof setCellContentOverride === 'function')
        return setCellContentOverride(td, i, j, y, x);
    else return 'black';
};

function main(y = 10, x = 10) {
    n = y, m = x;
    cellSize = 60;
    tableWidth = cellSize * n;
    tableHeight = cellSize * m;
    cellWidth = tableWidth / n;
    cellHeight = tableHeight / m;
    render(n, m);
    document.body.style.zoom = '80%';
}

function render(y = n, x = m) {
    document.title = getPageFilename();
    let body = document.body,
        table = document.createElement('table'),
        demo = document.createElement('div');
    table.style.width = `${tableWidth}px`;
    table.style.height = `${tableHeight}px`;
    for (let i = 0; i < y; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < x; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            setCellContent(td, i, j, y, x);
            td.style.width = `${cellWidth}px`;
            td.style.height = `${cellHeight}px`;
        }
    }
    demo.setAttribute('id', 'demo');
    table.setAttribute('id', 'table');
    demo.appendChild(table);
    body.appendChild(demo);
    styleSetPositionCenter(demo);
}
