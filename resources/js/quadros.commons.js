/*** Executed automatically ***/

// Adds favicon if not exists in document
(function () {
    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/resources/media/favicon/favicon.ico';
}());

/*** Executed on-demand, functions: inlined ***/

// Debugging utils
let debug = (...args) => console.debug('', ...args);
let warn = (...args) => console.warn('', ...args);

/*** Executed on-demand, functions: expanded ***/

// Returns the name of the webpage file without its extension
function getPageFilename() {
    return window.location.pathname
        .split('/')
        .pop()
        .split('.')
        .shift();
}

// Randomness
function getRandomInt(min = 0, max = 1) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Randomness
function getRandomIntBetweenMinAndMax(min, max) {
    return getRandomInt(min, max);
}