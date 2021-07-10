/*** Utilities ***/

const getCookieRegistry = str => str
    .split(';')
    .map(v => v.split('='))
    .reduce((reg, v) => {
        reg[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return reg;
    }, {});

function getUrlSearchParamsEntries() {
    try {
        const urlSearchParams = new URLSearchParams(window.location.search);
        const entries = Object.fromEntries(urlSearchParams.entries());
        if (isDebugEnabled) console.debug(urlSearchParams, entries);
        return entries;
    } catch (err) {
        console.error(err);
    }
    return undefined;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getStringFromArrayOfArrays(arr, reverse = false) {
    if (reverse) return getStringFromArrayOfArrays(arr.reverse());
    return [].concat.apply([], arr).join('');
}

function getStringFromArrayOfReversedArrays(arr) {
    return getStringFromArrayOfArrays(arr, true);
}

function isUndefined(obj) {
    return (typeof obj === 'undefined');
}

function isNotUndefined(obj) {
    return (typeof obj !== 'undefined');
}