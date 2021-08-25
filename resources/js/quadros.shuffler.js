const go = () => Math.round(Math.random()) === 1;
const reset = () => shuffle();
const shuffle = () => {
    document.getElementById('demo').remove();
    render();
}
const shuffler = () => {
    for (let i = 15; i > 0; i--)
        setTimeout(shuffle, 60 * i);
}

let cellClass = 'td';
let options = 'ab';
let selectors = [...options];
let selection = 0;

function addEventListeners() {
    document.addEventListener('click', (event) => {
            const className = event.target.className;
            selection = selectors.indexOf(className.split(' ').pop());
            if (++selection === selectors.length) selection = 0;
            event.target.className = `${cellClass} ${selectors[selection]}`;
        }
    );

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'R':
            case 'r':
                reset();
                break;
            case 'S':
            case 's':
                shuffler();
                break;
        }
    });
}

(function () {
    addEventListeners();
}())
