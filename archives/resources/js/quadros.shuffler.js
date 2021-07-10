let n = 10;
let m = 10;
let mode = 'editor';
let options = 'ab';
let selector = [...options];
selector.push(go() ? 'a' : 'b');
let eventTargetClassName = '';

function main(modeOverride = '') {
    if (modeOverride !== '') mode = modeOverride;
    load();
    shuffle();
}

function go() {
    return Math.round(Math.random()) === 1;
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
}

function shuffler() {
    for (let i = 15; i > 0; i--)
        setTimeout(shuffle, 100 * i);
}

function shuffle() {
    render(true);
}

function reset() {
    render();
}

function render(isShufflingEnabled = false) {
    let table = document.getElementById('demo');
    table.innerHTML = '';
    for (let i = 0; i < n; i++) {
        let tr = table.insertRow();
        for (let j = 0; j < m; j++) {
            let td = tr.insertCell();
            td.appendChild(document.createTextNode(''));
            let className = eventTargetClassName
            if (isShufflingEnabled) {
                const selection = Math.floor(Math.random() * selector.length);
                className = `td ${selector[selection]}`;
            }
            td.setAttribute('class', className);
        }
    }
}

function addEventListeners() {
    let table = document.getElementById('demo');
    table.addEventListener('click', (event) => {
        switch (mode) {
            case 'editor':
                const className = event.target.className;
                event.target.className = className === 'td a' ? 'td b' : 'td a';
                eventTargetClassName = event.target.className;
                break;
            case 'shuffle':
            default:
                shuffle();
        }
    });

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'R':
            case 'r':
                reset();
                break;
            case 'S':
            case 's':
                //default:
                shuffler();
                break;
        }
    });
}