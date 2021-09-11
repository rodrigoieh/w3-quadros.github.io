/*** Executed automatically ***/

// Adds meta tags author and description to html head
(function () {
    let head = document.getElementsByTagName('head')[0];
    let metaAuthor = document.createElement('meta');
    let metaDescription = document.createElement('meta');
    metaAuthor.name = 'author'
    metaAuthor.content = 'rodrigoieh@xronos.cl'
    metaDescription.name = 'description'
    metaDescription.content = 'css study'
    head.prepend(metaDescription);
    head.prepend(metaAuthor);
}());

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

// Character accessors
const nextChar = (c) => String.fromCharCode(c.charCodeAt(0) + 1);
const previousChar = (c) => String.fromCharCode(c.charCodeAt(0) - 1);

// Set of alphabetic identifiers, supports up to 26 chars
const getSelectors = (k, index = previousChar('a')) => {
    if (k < 1 || 26 < k) return [];
    let selectors = [];
    index = nextChar(index);
    for (let i = 0; i < k; i++) selectors.push(index = nextChar(index));
    return selectors;
}

// Check if navigator simulates or is a mobile device
const isMobileNavigator = () => {
    const devices = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];
    return devices.some((device) => {
        return navigator.userAgent.match(device);
    });
};

// Returns a random value from a key/value pair (properties)
const getRandomProperty = (obj) => {
    const reg = Object.keys(obj);
    return obj[reg[reg.length * Math.random() << 0]];
};

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