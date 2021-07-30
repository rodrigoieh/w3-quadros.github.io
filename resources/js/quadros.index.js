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

const getElementImageSourceBackup = (img) => {
    const apiKey = 'ak-08259-02jjr-yw60d-m1k8w-bev11';
    const ngrok = 'https://38aafc66ed3c.ngrok.io';
    const url = `${ngrok}/quadros/${img.alt.split('-')[1].substr(0, 6)}/${img.alt}.html`;
    const zoomFactor = 1;
    const height = 700;
    const width = 700;
    const parameters = {
        target: `https://phantomjscloud.com/api/browser/v2/${apiKey}/`,
        request: `?request={url:%22${url}%22,`,
        renderType: `renderType:%22jpeg%22,`,
        renderSettings: `renderSettings:{viewport:{width:${width},height:${height}},clipRectangle:{width:${width},height:${height}},`,
        zoomFactor: `zoomFactor:${zoomFactor}},`,
        requestSettings: `requestSettings:{doneWhen:[{event:%22domReady%22}]}}`,
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

const getElementAnchor = (id, href, title = id) => {
    let a = document.createElement('a');
    a.id = `preview-a-${id}`;
    a.title = title;
    a.href = '/'.concat(href);
    return a;
}

const getElementImage = (id, src, width = 150, height = 150) => {
    let img = document.createElement('img');
    img.id = `preview-img-${id}`;
    img.src = src;
    img.alt = id;
    img.width = width;
    img.height = height;
    img.style.cursor = 'zoom-in';
    img.style.color = '#c86023';
    img.style.backgroundColor = 'transparent';
    img.style.backgroundColor = 'hsl(206,42%,23%)';
    img.addEventListener('load', event => debugPreviewImage(event));
    img.addEventListener('error', event => debugPreviewImage(event, img));
    img.addEventListener('abort', event => debugPreviewImage(event));
    return img;
};

let previews = document.getElementById('previews');
const directories = index.collection.reverse();
for (const directory of directories) {
    const quadros = directory.collection;
    if (quadros !== undefined) {
        const k = quadros.length;
        for (let i = k - 1; i > 0; i--) {
            const quadro = Quadro.class(quadros[i]);
            let a = getElementAnchor(quadro.id, quadro.path);
            const image = getElementImage(quadro.id, quadro.preview);
            a.appendChild(image);
            previews.appendChild(a);
        }
    }
}