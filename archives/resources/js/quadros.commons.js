// Returns the name of the webpage file without its extension
function getPageFilename() {
    return window.location.pathname
        .split('/')
        .pop()
        .split('.')
        .shift();
}