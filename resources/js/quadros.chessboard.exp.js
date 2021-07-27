/*** Quadros Chessboard Expansion Script ***/

const isDebugEnabled = location.hostname === 'localhost';
const boardId = 'demo';
const options = 'bcd';
const selector = [...options];
let selectorIndex = 0;
const simulateClickOnBoard = () => simulateEventClick(boardId);

/*** Theme Selector ***/

const themes = [
    {backgroundColor: "#496E96", squareColorLight: "#EEEED2", squareColorDark: "#769756"},
    {backgroundColor: "#322E2C", squareColorLight: "#A1BAD2", squareColorDark: "#7D93AB"}
];
const randomThemeSelection = new Date().getSeconds() & 1;
const theme = themes[randomThemeSelection];
// document.body.style.background = theme.backgroundColor;
// colorLight = theme.squareColorLight;
// colorDark = theme.squareColorDark;

/*** Page loading detection ***/

const checkTable = setInterval(() => {
    const board = document.getElementById(boardId);
    if (board !== null) {
        clearInterval(checkTable);
        addEventListenerForBoardColorRotation();
        selectorIndex = Math.floor(Math.random() * selector.length - 1);
        simulateClickOnBoard();
    }
}, 100);

/*** Events listeners ***/

function addEventListenerForBoardColorRotation() {
    document.addEventListener('click', (event) => {
        if (++selectorIndex === selector.length) selectorIndex = 0;
        let className = selector[selectorIndex];
        colorDark = `td ${className}`;
        document.body.innerHTML = '';
        render(n, m);
        if (isDebugEnabled) debugCssByClassName('td');
    });
}

function addEventListenerForSquareColorRotation() {
    const board = document.getElementById(boardId);
    board.addEventListener('click', (event) => {
        selectorIndex = selector.indexOf(event.target.className.split(' ').pop());
        if (++selectorIndex === selector.length) selectorIndex = 0;
        let className = selector[selectorIndex];
        event.target.className = `td ${className}`;
    });
}

/*** Events simulation ***/

function simulateEventClick(elementId) {
    eventDispatcher(document.getElementById(elementId), 'click');
}

function eventDispatcher(element, eventType) {
    // iexplore 8 support with fireEvent..
    if (element.fireEvent) {
        element.fireEvent(`on${eventType}`);
    } else {
        let event = document.createEvent('Events');
        event.initEvent(eventType, true, false);
        element.dispatchEvent(event);
    }
}

/*** CSS utils ***/

function debugCssByClassName(className) {
    const classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
    for (let css of classes) {
        if (css.selectorText.includes(className)) {
            console.debug(css.cssText, css.style.cssText);
        }
    }
}
