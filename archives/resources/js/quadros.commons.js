// Returns the name of the webpage file without its extension
function getPageFilename() {
    return window.location.pathname
        .split('/')
        .pop()
        .split('.')
        .shift();
}

function getRandomInt(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomIntBetweenMinAndMax(min, max) {
    return getRandomInt(min, max);
}