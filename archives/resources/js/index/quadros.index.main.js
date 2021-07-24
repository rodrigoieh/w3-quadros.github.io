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
    let links = [];
    let linksTmp = [];
    let previews = [];
    let previewsTmp = [];
    let blockCount = 0;
    let apiKeyIndex = 1;
    let apiKeysLength = settings.apiKeysLength();
    const getApiKey = () => {
        const apiKeyUsageCount = previews.length + previewsTmp.length;
        if (apiKeysLength > 1 && apiKeyUsageCount % 3 === 0) {
            console.debug('rotating apikey index', settings.apiKey(apiKeyIndex), apiKeyIndex);
            if (++apiKeyIndex === apiKeysLength - 1) apiKeyIndex = 0;
        }
        let apiKey = settings.apiKey(apiKeyIndex);
        if (typeof apiKey !== 'undefined') return apiKey;
        else {
            console.error(apiKey, apiKeysLength, apiKeyIndex, apiKeyUsageCount);
            debugger;
        }
    };
    const addQuadros = () => {
        links.push(buildListItem(linksTmp));
        previews.push(...previewsTmp);
        linksTmp = [];
        previewsTmp = [];
    };
    try {
        if (null !== files && isNotUndefined(files)) {
            for (let file of files) {
                if (blockCount < settings.blockLimit) {
                    if (file.name.includes(settings.filenameExtension)) {
                        let quadro = new Quadro(file);
                        if (quadro.isValidFile(settings)) {
                            // Links (index)
                            let link = quadro.anchor();
                            linksTmp.push(link);
                            // Images (previews)
                            previewsTmp.push(quadro.preview(settings, getApiKey()));
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
    let index = document.getElementById('index');
    index.appendChild(buildUnorderedList(links));
    let previews_ = document.getElementById('previews');
    for (const preview of previews) previews_.appendChild(preview);
})();

/*** Main objects ***/

function Settings() {
    // Configuration values from GlobalSetup
    this.project = get('project');
    this.root = get('root');
    this.apiKeys = JSON.parse(get('apiKey'));
    this.apiKey = (apiKeyIndex) => this.apiKeys[apiKeyIndex];
    this.apiKeysLength = () => this.apiKeys.length;
    this.filenameExclusions = JSON.parse(get('filenameExclusions'));
    this.filenameBlockGroupFilter = JSON.parse(get('filenameBlockGroupFilter'));
    this.filenameBlockGroupFilterLength = get('filenameBlockGroupFilterLength');
    this.filenameExtension = get('filenameExtension');
    this.isPreviewEnabled = get('isPreviewEnabled');
    this.blockLimit = get('blockLimit');
}

/*** Spaghetti alla Quadra ***/

function Quadro(file) {
    this.file = file;
    this.filename = file.name.replace(get('filenamePrefix'), '').replace(get('filenameExtension'), '');
    this.extension = file.name.substr(get('filenameLength'), this.file.length);
    this.url = `${get('project')}/${file.path}`;

    this.anchor = () => {
        const target = this.filename.replace('quad-', '').split('.').shift().substr(4);
        let link = document.createElement('a');
        link.href = this.url;
        link.innerHTML = target;
        return link;
    };

    this.preview = (settings, apiKey) => {
        if (!settings.filenameExclusions.find(str => this.filename.includes(str))) {
            if (settings.isPreviewEnabled) {
                let a = document.createElement('a');
                a.id = `preview-${this.filename}`;
                a.href = this.url.replace(settings.root, '');
                a.title = this.filename;
                let img = document.createElement('img');
                img.id = `preview-img-${this.filename}`;
                img.alt = this.filename;
                img.loading = 'lazy';
                img.width = get('displayWidth');
                img.height = get('displayHeight');
                img.style.margin = 'auto';
                img.style.cursor = 'zoom-in';
                img.style.backgroundColor = 'hsl(0, 0%, 90%)';
                img.style.transition = 'background-color 300ms';
                img.style.webkitUserSelect = 'none';
                let parameters = {
                    target: `https://phantomjscloud.com/api/browser/v2/${apiKey}/`,
                    request: `?request={url:%22${this.url}%22,`,
                    renderType: `renderType:%22jpeg%22,`,
                    renderSettings: `renderSettings:{viewport:{width:${get('width')},height:${get('height')}},clipRectangle:{width:${get('width')},height:${get('height')}},`,
                    zoomFactor: `zoomFactor:${get('zoomFactor')}},`,
                    requestSettings: `requestSettings:{doneWhen:[{event:%22domReady%22}]}}`,
                }
                let buildSource = () =>
                    parameters.target +
                    parameters.request +
                    parameters.renderType +
                    parameters.renderSettings +
                    parameters.zoomFactor +
                    parameters.requestSettings;
                img.src = buildSource();
                const verbose = false;
                const debugImageSource = (event) => {
                    switch (event.type) {
                        case 'error':
                            console.error(event.type, img.id, verbose ? img.src : '', verbose ? event : '');
                            break;
                        case 'abort':
                            console.error(event.type, img.id, verbose ? img.src : '', verbose ? event : '');
                            break;
                        default:
                            let isImageLoaded = img.complete && img.naturalHeight !== 0;
                            console.debug(event.type, img.id, isImageLoaded, verbose ? img.src : '', verbose ? event : '');
                    }
                };
                img.addEventListener('load', event => debugImageSource(event));
                img.addEventListener('error', event => debugImageSource(event));
                img.addEventListener('abort', event => debugImageSource(event));
                a.appendChild(img);
                return a;
            } else return undefined;
        }
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

function buildUnorderedList(elements) {
    let ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.paddingLeft = '0';
    for (const element of elements) ul.appendChild(element);
    return ul;
}

function buildListItem(elements) {
    let li = document.createElement('li');
    li.style.listStyle = 'none';
    li.style.marginLeft = '0';
    // li.style.marginTop = '10px';
    for (const element of elements) li.appendChild(element);
    return li;
}