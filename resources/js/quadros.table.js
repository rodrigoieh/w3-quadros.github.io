let n, m;
let cellSize;
let tableWidth;
let tableHeight;
let cellWidth;
let cellHeight;
let cellWidthOverride = 0;
let cellHeightOverride = 0;

let setCellContentOverride = undefined;
const setCellContent = (td, i, j, y = n, x = m) => {
    if (typeof setCellContentOverride === 'function')
        return setCellContentOverride(td, i, j, y, x);
    else return 'black';
};

function main(y = 10, x = 10, cellSizeOverride = 0) {
    n = y, m = x;
    cellSize = cellSizeOverride !== 0 ? cellSizeOverride : 60;
    tableWidth = cellSize * m;
    tableHeight = cellSize * n;
    cellWidth = tableWidth / m;
    cellHeight = tableHeight / n;
    cellSize = Math.min(Math.min(cellWidth, cellHeight), cellSize);
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
            td.style.width = cellWidthOverride === 0 ? `${cellWidth}px` : cellWidthOverride;
            td.style.height = cellHeightOverride === 0 ? `${cellHeight}px` : cellHeightOverride;
        }
    }
    demo.id = 'demo';
    table.id = 'table'
    demo.appendChild(table);
    body.appendChild(demo);
    styleSetPositionCenter(demo);
}
