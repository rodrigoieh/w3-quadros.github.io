// configuration
let n = 12, m = 12;
let width = 48, height = 48;
let background = 'td b';
const borderPrimary = '1px green solid';
const borderInternal = '1px green dashed';

// debugging
const debugCoordinates = false;
const debugCoordinatesFontSize = '0.7em';
const debugCoordinatesFontColor = 'green';
const borderDisplayTimeoutInSeconds = 3;
let isBorderHidden = true;

// functions
let classNameOverride = undefined;
const reset = render;
const clear = () => render(false);
const borderDisplayTimeout = () => {
    borderDisplay();
    setTimeout(borderHide, 1000 * borderDisplayTimeoutInSeconds);
    // TODO, for async calls and repeated switching (toggles) borderHide should have a lock variable,
    //  and this function check if borders were unhidden before calling setTimeout (based on lock)
}

/***
 * Functions onLoad Page Event
 */

function main() {
    load();
    render();
    borderDisplayTimeout();
}

function load() {
    let body = document.body,
        table = document.createElement('table'),
        demo = document.createElement('div');
    table.setAttribute('id', 'demo');
    demo.appendChild(table);
    body.appendChild(demo);
    styleSetPositionCenter(demo);
    addEventListeners();
    document.title = getPageFilename();
}

function render(isPatternEnabled = true) {
    let table = document.getElementById('demo');
    table.innerHTML = '';
    for (let i = 0; i < n; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < m; j++) {
            let td = tr.insertCell();
            let span = document.createElement('span');
            const coordinates = `${i} ${j}`;
            let textNode = document.createTextNode(debugCoordinates ? coordinates : '');
            if (debugCoordinates) {
                span.style.color = debugCoordinatesFontColor;
                span.style.fontSize = debugCoordinatesFontSize;
            }
            span.appendChild(textNode);
            td.appendChild(span);
            td.setAttribute('id', coordinates);
            td.style.width = `${width}px`;
            td.style.height = `${height}px`;
            td.setAttribute('class', isPatternEnabled ? getClassName(i, j) : background);
        }
    }
}

/***
 * Function on loading page: patterns & colors
 * Variations?, override classNameOverride function in Quadros HTML
 */

function getClassName(y, x) {
    if (debugCoordinates) console.debug(y, x);
    if (typeof classNameOverride === 'function') {
        return classNameOverride(y, x);
    } else return (x < m / 2 && !(x & 1) || x >= m / 2 && (x & 1)) ? 'td a' : 'td b';
}

/*** Functions on client events: listeners ***/

function addEventListeners() {
    let table = document.getElementById('demo');
    table.addEventListener('click', (event) => {
        // target td
        const className = event.target.className;
        event.target.className = className === 'td a' ? 'td b' : 'td a';
        const coordinates = event.target.id.split(' ');
        if (debugCoordinates) console.debug(coordinates);
        // mirrored td
        const y = coordinates[0];
        const x = coordinates[1];
        mirror(y, x, event.target.className);
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'B':
            case 'b':
                borderToggle();
                break;
            case 'C':
            case 'c':
                clear();
                break;
            case 'R':
            case 'r':
                reset();
                break;
        }
    });
}

/*** Functions on client events: user actions ***/

function mirror(y, x, className) {
    const mirrorId = `${y.concat(' ').concat(m - x - 1)}`;
    let mirrorTd = document.getElementById(mirrorId);
    if (mirrorTd !== null) mirrorTd.className = className;
}

function borderToggle() {
    if (isBorderHidden) borderDisplay();
    else borderHide();
    isBorderHidden = !isBorderHidden;
}

function borderDisplay() {
    let table = document.getElementById('demo');
    table.style.border = borderPrimary;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const coordinates = `${i} ${j}`;
            let td = document.getElementById(coordinates);
            td.style.border = borderInternal;
            if (m & 1 && n & 1) continue;
            if (j === m / 2) td.style.borderLeft = borderPrimary;
            if (i === n / 2) td.style.borderTop = borderPrimary;
        }
    }
}

function borderHide() {
    let table = document.getElementById('demo');
    table.style.border = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const coordinates = `${i} ${j}`;
            let td = document.getElementById(coordinates);
            td.style.border = ''
        }
    }
}