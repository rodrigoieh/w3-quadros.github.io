/*** Setup and data acquisition  ***/

function GlobalSettings() {
    this.isDebugEnabled = location.hostname === 'localhost';
    this.blockPageSize = 100;
    this.blockPageRowSize = 3;
    // this.blockPageRowSizeMin = 1;
    // this.blockPageRowSizeMax = 100;
}

const globalSettings = Object.freeze(new GlobalSettings());

function setup() {
    try {
        if (go()) {
            setupGlobal();
            setupCookies();
            setupPhantomJs();
            setupGitHubApi();
            // testSetup();
            go(true);
        }
    } catch (err) {
        console.error(err);
        return false
    }
    return true;
}

function go(check = false) {
    try {
        this.go = get('ready');
        if (typeof go === 'undefined' || !go) {
            if (check) document.cookie = `setupCheck=${JSON.stringify({ready: true})}`;
            return true;
        } else return false;
    } catch (err) {
        console.error(err);
    }
    return true;
}

function setupGlobal() {
    const isPreviewEnabled = true;
    const blockLimit = globalSettings.isDebugEnabled ? globalSettings.blockPageSize : Number.MAX_VALUE;
    const filenamePrefix = 'quadro-archive-';
    const filenameMask = 'quadro-archive-00000';
    const filenameExtension = '.html';
    const filenameLength = filenameMask.length;
    const filenameExclusions = ['index', 'draft', 'hidden'];
    const filenameBlockGroupFilter = ['000'];
    const filenameBlockGroupFilterLength = 3;
    const setupGlobal = {
        isPreviewEnabled: isPreviewEnabled,
        blockLimit: blockLimit,
        filenamePrefix: filenamePrefix,
        filenameExtension: filenameExtension,
        filenameLength: filenameLength,
        filenameExclusions: JSON.stringify(filenameExclusions),
        filenameBlockGroupFilter: JSON.stringify(filenameBlockGroupFilter),
        filenameBlockGroupFilterLength: filenameBlockGroupFilterLength
    }
    document.cookie = `setupFiles=${JSON.stringify({files: undefined})}`;
    document.cookie = `setupCheck=${JSON.stringify({ready: false})}`;
    document.cookie = `setupGlobal=${JSON.stringify(setupGlobal)}`;
}

function setupCookies() {
    const cookieMaxAgeInSeconds = 60 * 60;
    const setupCookies = {cookieMaxAgeInSeconds: cookieMaxAgeInSeconds}
    document.cookie = `setupCookies=${JSON.stringify(setupCookies)}`;
}

function setupGitHubApi() {
    const project = 'https://rodrigoieh.github.io/w3-quadros.github.io';
    const endpoint = 'https://api.github.com/repos/rodrigoieh/w3-quadros.github.io/contents';
    let targets = [
        '/archives/quadros/202106',
        '/archives/quadros/202107',
        '/archives/quadros/308711'
    ];
    const setupGitHubApi = {
        project: project,
        endpoint: endpoint,
        targets: targets
    }
    document.cookie = `setupGitHubApi=${JSON.stringify(setupGitHubApi)}`;
}

function setupPhantomJs() {
    const apiKey = [
        // 'ak-6mfhv-yvhbm-0cs14-8fdqp-7b0vp',
        'ak-gzrtr-8akne-kz20p-ev265-tej7k',
        'ak-13j42-79z7r-4vgww-k62m1-g22j9',
        'ak-dkvsb-xwb82-hyt9n-z89mr-szjwq',
        'ak-ev70j-8v733-v3t4b-rvfkb-8snv8',
        'ak-nmb48-n5bhy-0cr20-t979f-r18c9',
        'ak-wnt9g-68y2y-zct7q-zd602-hh00b',
        'ak-8cw66-7vbwv-cwvz2-rsjq3-x5hrq'
    ];
    const apiKeyIndex = 3;
    const zoomFactor = 1;
    const height = 700;
    const width = 700;
    const displayHeight = 150;
    const displayWidth = 150;
    const setupPhantomJs = {
        apiKey: JSON.stringify(apiKey),
        apiKeyIndex: apiKeyIndex,
        zoomFactor: zoomFactor,
        height: height,
        width: width,
        displayHeight: displayHeight,
        displayWidth: displayWidth
    }
    document.cookie = `setupPhantomJs=${JSON.stringify(setupPhantomJs)}`;
}
