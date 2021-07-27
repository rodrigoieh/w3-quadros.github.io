const fs = require('fs'),
    path = require('path')

function ls(filename) {
    const storage = 'https://quad.xronos.cl';
    const exclusions = ['draft', 'hidden'];
    const isActive = (filename) => (!exclusions.find(str => filename.includes(str)));
    const stats = fs.lstatSync(filename),
        info = {
            path: filename,
            name: path.basename(filename),
            visible: filename.visible = isActive(filename)
        };

    if (stats.isDirectory()) {
        info.type = 'folder';
        info.children = fs.readdirSync(filename).map((child) => ls(filename + '/' + child));
        info.visible = isActive(filename);
    } else {
        info.type = 'file';
        info.preview = storage.concat('/', filename.replace('html', 'jpeg'));
    }
    return info;
}

if (module.parent == undefined) {
    // usage: node ./resources/js/index/quadros.index.json.js quadros > index.json
    const util = require('util');
    const properties = ['type', 'path', 'name', 'preview', 'visible', 'children'];
    let tree = util.inspect(ls(process.argv[2]), showHidden = false, depth = null, colorize = false);
    tree = tree.replace(/'/g, '"');
    // properties.forEach(p => tree.replace(new RegExp(`/${p}/`, 'g'), `"${p}"`));
    tree = tree.replace(/path/g, '"path"');
    tree = tree.replace(/name/g, '"name"');
    tree = tree.replace(/type/g, '"type"');
    tree = tree.replace(/preview/g, '"preview"');
    tree = tree.replace(/visible/g, '"visible"');
    tree = tree.replace(/children/g, '"children"');
    console.log(tree);
}