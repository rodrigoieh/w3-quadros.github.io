/*** Quadros ***/
const version = '1.0.0';
const author = 'rodrigoieh@xronos.cl';
const info = () => {
    const colors = [
        '#073447', '#073447', '#073447',
        '#e5520d', '#e5520d', '#e5520d'
    ];
    const background = `background-image: linear-gradient(to bottom, ${colors.join()});`;
    console.log('%c\n' + '\n' +
        ' ██████╗ ██╗   ██╗ █████╗ ██████╗ ██████╗  ██████╗ ███████╗\n' +
        '██╔═══██╗██║   ██║██╔══██╗██╔══██╗██╔══██╗██╔═══██╗██╔════╝\n' +
        '██║   ██║██║   ██║███████║██║  ██║██████╔╝██║   ██║███████╗\n' +
        '██║▄▄ ██║██║   ██║██╔══██║██║  ██║██╔══██╗██║   ██║╚════██║\n' +
        '╚██████╔╝╚██████╔╝██║  ██║██████╔╝██║  ██║╚██████╔╝███████║\n' +
        '╚══▀▀═╝  ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝ '
        , background);
    console.log(`version: ${version}`);
    console.log(`author:  ${author}`);
};

/*** Object for previews ***/

class Quadro {
    constructor(id, type, path, preview, filename, extension, directory, visible) {
        this.id = id;
        this.type = type;
        this.path = path;
        this.preview = preview;
        this.filename = filename;
        this.extension = extension;
        this.directory = directory;
        this.visible = visible;
    }

    static class(o) {
        return new Quadro(o.id, o.type, o.path, o.preview, o.filename, o.extension, o.directory, o.visible);
    }
}

/*** Connects to PhantomCloudJS to get an image preview (snapshot) ***/

const getElementImageSourceBackup = (img) => {
    const apiKey = 'ak-08259-02jjr-yw60d-m1k8w-bev11';
    const host = 'https://6824-186-106-145-191.ngrok.io';
    const url = `${host}/quadros/${img.alt.split('-')[1].substr(0, 6)}/${img.alt}.html`;
    const zoomFactor = 1;
    const height = 700;
    const width = 700;
    const parameters = {
        target: `https://phantomjscloud.com/api/browser/v2/${apiKey}/`,
        request: `?request={url:"${url}",`,
        renderType: `renderType:"jpeg",`,
        renderSettings: `renderSettings:{viewport:{width:${width},height:${height}},clipRectangle:{width:${width},height:${height}},`,
        zoomFactor: `zoomFactor:${zoomFactor}},`,
        requestSettings: `requestSettings:{doneWhen:[{event:"domReady"}]}}`,
    }
    const buildSource = () =>
        parameters.target +
        parameters.request +
        parameters.renderType +
        parameters.renderSettings +
        parameters.zoomFactor +
        parameters.requestSettings;
    return buildSource();
}

/*** Event handling functions ***/

// Image source event handlers
const debugPreviewImage = (event, img) => {
    switch (event.type) {
        case 'mouseover':
            let tmp = img.cloneNode(true);
            img.parentNode.replaceChild(tmp, img);
            tmp.src = img.longdesc;
            break;
        case 'error':
            console.error(img.src);
            img.longdesc = getElementImageSourceBackup(img);
            img.addEventListener('mouseover', event => debugPreviewImage(event, img));
            break;
        case 'abort':
            break;
        case 'load':
        default:
    }
};

// Toggles between display/hide, on images with id markers 'draft' and 'hidden'
const toggleImageDisplay = () => {
    let images = document.getElementsByTagName('img');
    for (let i = 0; i < images.length; i++) {
        let img = images[i];
        if (img.id.includes('hidden')) {
            let visible = img.style.display;
            let display = 'none';
            if (visible === display) display = 'inline';
            img.style.display = display;
        }
    }
};

/*** Event listeners ***/

const addEventListeners = () => {
    // Handles key input events from users keyboard
    document.addEventListener('keydown', (event) => {
        const key = event.key;
        switch (key) {
            case 'U':
            case 'u':
                toggleImageDisplay();
                break;
        }
    });
};

/*** Html element builder/helper function for links ***/

const getElementAnchor = (id, href, title = id) => {
    let a = document.createElement('a');
    a.id = `preview-a-${id}`;
    a.title = title;
    a.href = '/'.concat(href);
    return a;
}

/*** Html element builder/helper function for images ***/

const getElementImage = (id, src, visible, width = 100, height = 100) => {
    let img = document.createElement('img');
    img.id = `preview-img-${id}${visible ? '' : '-hidden'}`;
    img.src = src;
    img.alt = id;
    img.width = width;
    img.height = height;
    img.style.cursor = 'zoom-in';
    img.style.color = '#c86023';
    img.style.backgroundColor = 'transparent';
    img.style.backgroundColor = 'hsl(206,42%,23%)';
    img.style.display = visible ? 'inherit' : 'none';
    // img.style.filter = `grayscale(${visible ? 100 : 50}%)`;
    img.addEventListener('load', event => debugPreviewImage(event));
    img.addEventListener('error', event => debugPreviewImage(event, img));
    img.addEventListener('abort', event => debugPreviewImage(event));
    return img;
};

/*** Index main function ***/

(function () {
    const quadSize = isMobileNavigator() ? 150 : 100;
    let previews = document.getElementById('previews');
    const directories = index.collection.reverse();
    for (const directory of directories) {
        const quadros = directory.collection;
        if (quadros !== undefined) {
            const k = quadros.length;
            for (let i = k - 1; i >= 0; i--) {
                const quadro = Quadro.class(quadros[i]);
                let a = getElementAnchor(quadro.id, quadro.path);
                const image = getElementImage(quadro.id, quadro.preview, quadro.visible, quadSize, quadSize);
                a.appendChild(image);
                previews.appendChild(a);
            }
        }
    }
    addEventListeners();
    info();
}());