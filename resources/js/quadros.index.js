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
            if (quadro.visible) {
                const image = getElementImage(quadro.id, quadro.preview);
                a.appendChild(image);
                previews.appendChild(a);
            }
        }
    }
}