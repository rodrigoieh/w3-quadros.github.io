let n, m;
let tableWidth;
let tableHeight;
let tableWidthOverride = 0;
let tableHeightOverride = 0;
let tableSizeUnit = 'px';
let tableSizeUnitOverride = '';
let cellWidth;
let cellHeight;
let cellWidthOverride = 0;
let cellHeightOverride = 0;
let cellSize = 60;
let cellSizeUnit = 'px';
let cellSizeUnitOverride = '';
let cellContent = 'black';
const getTableDimension = (d) => `${d}${tableSizeUnit}`;
const getCellDimension = (d) => `${d}${cellSizeUnit}`;

let setCellContentOverride = undefined;
const setCellContent = (td, i, j, y = n, x = m) => {
    if (typeof setCellContentOverride === 'function')
        return setCellContentOverride(td, i, j, y, x);
    else return cellContent;
};

function main(y = 10, x = 10, cellSizeOverride = 0) {
    n = y, m = x;
    setup(n, m, cellSizeOverride);
    render(n, m);
    document.body.style.zoom = '80%';
}

function setup(y = n, x = m, cellSizeOverride) {
    cellSize = cellSizeOverride === 0 ? cellSize : cellSizeOverride;
    tableWidth = cellSize * x;
    tableHeight = cellSize * y;
    cellWidth = tableWidth / x;
    cellHeight = tableHeight / y;
    cellSize = Math.min(Math.min(cellWidth, cellHeight), cellSize);
    cellSizeUnit = (cellSizeUnitOverride === '') ? cellSizeUnit : cellSizeUnitOverride;
    tableSizeUnit = (tableSizeUnitOverride === '') ? tableSizeUnit : tableSizeUnitOverride;
}

function render(y = n, x = m) {
    document.title = getPageFilename();
    let body = document.body,
        table = document.createElement('table'),
        demo = document.createElement('div');
    table.style.width = getTableDimension(tableWidthOverride === 0 ? tableWidth : tableWidthOverride);
    table.style.height = getTableDimension(tableHeightOverride === 0 ? tableHeight : tableHeightOverride);
    for (let i = 0; i < y; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < x; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            setCellContent(td, i, j, y, x);
            td.style.width = getCellDimension(cellWidthOverride === 0 ? cellWidth : cellWidthOverride);
            td.style.height = getCellDimension(cellHeightOverride === 0 ? cellHeight : cellHeightOverride);
        }
    }
    demo.id = 'demo';
    table.id = 'table'
    demo.appendChild(table);
    body.appendChild(demo);
    styleSetPositionCenter(demo);
}