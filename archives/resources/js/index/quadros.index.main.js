/*** Data handlers ***/

const registries = [
    'setupCheck', 'setupGlobal', 'setupFiles',
    'setupCookies', 'setupPhantomJs', 'setupGitHubApi'
];

function setFilesInCookieRegistry(files, maxAgeInSeconds = 0) {
    if (isNotUndefined(files)) {
        const setupFiles = {files: JSON.stringify(files)}
        let cookie = `setupFiles=${JSON.stringify(setupFiles)}`;
        if (maxAgeInSeconds > 0) cookie.concat(`;max-age=${maxAgeInSeconds}`);
        document.cookie = cookie;
    }
}

async function getMetadataFilesFromGitHubApi(target) {
    const data = await fetch(target);
    return await data.json();
}

async function getFiles() {
    const files = get('files');
    if (null === files || isUndefined(files)) {
        const targets = get('targets');
        const endpoint = get('endpoint');
        let metadataFiles = [];
        for (let target of targets) {
            const response = await getMetadataFilesFromGitHubApi(endpoint.concat(target));
            for (let metadataFile of response) metadataFiles.push(new File(metadataFile));
        }
        setFilesInCookieRegistry(metadataFiles, get('maxAgeInSeconds'));
        return metadataFiles;
    } else return JSON.parse(files);
}

function get(key) {
    const cookies = getCookieRegistry(document.cookie);
    if (isNotUndefined(cookies)) {
        for (const registry of registries) {
            const json = cookies[registry];
            if (isNotUndefined(json)) {
                const setup = JSON.parse(json);
                const value = setup[key];
                if (isNotUndefined(value)) return value;
            }
        }
    }
    return undefined;
}

/*** Main ***/

(async () => {
    setup();
    const settings = Object.freeze(new Settings());
    let files = (await getFiles()).reverse();
    let previews = [];
    let previewsTmp = [];
    let links = [];
    let linksTmp = [];
    let blockCount = 0;
    let addQuadros = () => {
        links.push(buildListItem(linksTmp.join('')));
        previews.push(previewsTmp);
        linksTmp = [];
        previewsTmp = [];
    };
    try {
        if (null !== files && isNotUndefined(files)) {
            for (let file of files) {
                if (blockCount <= settings.blockLimit) {
                    if (file.name.includes(settings.filenameExtension)) {
                        let quadro = new Quadro(file);
                        if (quadro.isValidFile(settings)) {
                            // Links (index)
                            let link = quadro.anchor();
                            linksTmp.push(link);
                            // Images (previews)
                            previewsTmp.push(quadro.preview(settings));
                            // Distribution (order) of links and images
                            if (blockCount % globalSettings.blockPageRowSize === 0) addQuadros();
                            blockCount++;
                        }
                    }
                }
            }
            if (linksTmp.length > 0 && previewsTmp.length > 0) addQuadros();
        }
    } catch (err) {
        console.error(err);
        document.getElementById('error').innerHTML = `${err}`;
        links = [];
        previews = [];
    }
    document.getElementById('index').innerHTML = buildUnorderedList(getStringFromArrayOfArrays(links));
    document.getElementById('previews').innerHTML = getStringFromArrayOfArrays(previews);
})();

/*** Main objects ***/

function Settings() {
    // TODO, get('<key>') should be under this scope only.
    // Configuration values from GlobalSetup
    this.apiKey = JSON.parse(get('apiKey'));
    // this.apiKeyFixed = this.apiKey[get('apiKeyIndex')];
    this.apiKeyRandomIndex = getRandomInt(1, this.apiKey.length - 1);
    this.apiKeyRandom = this.apiKey[this.apiKeyRandomIndex];
    this.filenameExclusions = JSON.parse(get('filenameExclusions'));
    this.filenameBlockGroupFilter = JSON.parse(get('filenameBlockGroupFilter'));
    this.filenameBlockGroupFilterLength = get('filenameBlockGroupFilterLength');
    this.filenameExtension = get('filenameExtension');
    this.isPreviewEnabled = get('isPreviewEnabled');
    this.blockLimit = get('blockLimit');
    // this.blockLimit = Number.MAX_VALUE; // <- quick override
}

/*** Spaghetti alla Quadra ***/

function Quadro(file) {
    this.file = file;
    this.filename = file.name.replace(get('filenamePrefix'), '').replace(get('filenameExtension'), '');
    this.extension = file.name.substr(get('filenameLength'), this.file.length);
    this.url = `${get('project')}/${file.path}`;

    this.anchor = () => {
        const target = this.filename.replace('quad-', '').split('.').shift().substr(4);
        return `<a href="${this.url}">${target}</a>`;
    };

    this.preview = (settings) => {
        if (!settings.filenameExclusions.find(str => this.filename.includes(str))) {
            return settings.isPreviewEnabled
                ? `<a id="preview-${this.filename}" href="${this.url}" title="${this.filename}"><img style="-webkit-user-select: none;margin: auto;cursor: zoom-in;background-color: hsl(0, 0%, 90%);transition: background-color 300ms;" src="https://phantomjscloud.com/api/browser/v2/${settings.apiKeyRandom}/?request={url:%22${this.url}%22,renderType:%22jpeg%22,renderSettings:{viewport:{width:${get('width')},height:${get('height')}},clipRectangle:{width:${get('width')},height:${get('height')}},zoomFactor:${get('zoomFactor')}},requestSettings:{doneWhen:[{event:%22domReady%22}]}}" width="${get('displayWidth')}" height="${get('displayHeight')}" alt="${this.filename}" loading="lazy"></a>`
                : '';
        } else return '';
    };

    this.isValidFile = (settings) => {
        return (!settings.filenameExclusions.find(str => this.filename.includes(str)));
    };
}

function File(file) {
    this.name = file.name;
    this.path = file.path;
    this.sha = file.sha;
    this.size = file.size;
    this.url = file.url;
    this.html_url = file.html_url;
    this.git_url = file.git_url;
    this.download_url = file.download_url;
    this.type = file.type;
    this.link = new Link(file._links);
}

function Link(_links) {
    this.self = _links.self;
    this.git = _links.git;
    this.html = _links.html;
}

/*** HTML elements builders ***/

function buildUnorderedList(innerHtml = '') {
    const ulStart = '<ul style="list-style: none; padding-left: 0;">';
    const ulEnd = '</ul>';
    return String().concat(ulStart, innerHtml, ulEnd);
}

function buildListItem(innerHtml = '') {
    const liStart = '<li>';
    const liEnd = '</li>';
    return String().concat(liStart, innerHtml, liEnd);
}
