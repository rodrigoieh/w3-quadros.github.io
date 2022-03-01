const fs = require('fs'),
    path = require('path'),
    util = require("util");

function ls(object) {
    const storage = 'https://rodrigoieh.github.io/w3-quadros.previews.github.io';
    const exclusions = ['draft', 'hidden'];
    const isActive = (object) => (!exclusions.find(str => object.includes(str)));
    const lstat = fs.lstatSync(object),
        data = {
            // default values
            id: path.basename(object),
            type: 'folder',
            path: object,
            preview: '',
            filename: '',
            extension: '',
            directory: path.basename(object),
            visible: object.visible = isActive(object)
        };
    if (lstat.isDirectory()) {
        data.collection = fs.readdirSync(object).map((child) => ls(object + '/' + child));
        delete data.preview;
        delete data.filename;
        delete data.extension;
    } else {
        data.type = 'file';
        data.id = path.basename(object).split('.').slice(0, -1).join('.');
        data.preview = storage.concat('/', object.replace('html', 'jpeg'));
        data.preview = data.preview.replace(/.draft|.hidden/, '');
        data.filename = path.basename(object);
        data.extension = path.extname(object);
        data.directory = path.dirname(object);
    }
    return data;
}

function output(tree, type = 'javascript') {
    const parse = (tree) => {
        tree = tree.replace(/'/g, '"');
        return tree;
    }
    switch (type) {
        case 'json':
            console.log(tree);
            break;
        case 'javascript':
        default:
            console.log('const index = ', parse(tree), ';');
    }
}

if (module.parent == undefined) {
    // usage: node resources/node/quadros.index.js quadros > resources/js/quadros.index.js
    let tree = util.inspect(ls(process.argv[2]), false, null, false);
    output(tree)
}