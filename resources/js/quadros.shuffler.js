const go = () => Math.round(Math.random()) === 1;
const reset = () => render();
const shuffle = () => render();
const shuffler = () => {
    for (let i = 15; i > 0; i--)
        setTimeout(shuffle, 60 * i);
}

let cellClass = 'td';
let options = 'ab';
let selector = [...options];
let selection = 0;

function addEventListeners() {
    document.addEventListener('click', (event) => {
            const className = event.target.className;
            selection = selector.indexOf(className.split(' ').pop());
            if (++selection === selector.length - 1) selection = 0;
            event.target.className = `${cellClass} ${selector[selection]}`;
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
