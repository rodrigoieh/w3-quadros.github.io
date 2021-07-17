/*** Test functions ***/

function testSetup() {
    const reg = getCookieRegistry(document.cookie);
    const data = JSON.parse(reg['setupGlobal'])['filenamePrefix'] === 'quadro-archive-';
    console.assert(true === data, {data: data, error: "invalid data"});
}

function playground() {
    console.info('playground start');

    // Test: data
    const filename = 'quadro-archive-90100.html';

    // Test: filename extension substring
    const extension = filename.substr(get('filenameLength'), filename.length);
    console.debug(get('filenameLength'), extension, filename);

    // Test: filename group filter with prefix
    const filenameBlockGroupFilter = JSON.parse(get('filenameBlockGroupFilter'));
    console.debug(filename.split('-')[2].substr(0, 3));
    console.debug(filenameBlockGroupFilter.indexOf(filename.split('-')[2].substr(0, 3)) === -1);

    console.info('playground exit');
}

/*** HTML elements builders (legacy) deprecated, using node builders instead ***/

function buildUnorderedList(innerHtml = '', isStyleEnabled = true, cssStyle = '') {
    const style = `style="${cssStyle !== '' ? cssStyle : 'list-style: none; padding-left: 0;"'}`;
    const ulStart = `<ul ${isStyleEnabled ? style : ''}>`;
    const ulEnd = '</ul>';
    return String().concat(ulStart, innerHtml, ulEnd);
}

function buildListItem(innerHtml = '') {
    const liStart = '<li>';
    const liEnd = '</li>';
    return String().concat(liStart, innerHtml, liEnd);
}