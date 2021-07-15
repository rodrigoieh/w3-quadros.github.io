/*** Quadros CSS style utilities ***/

function styleSetPositionCenter(element) {
    element.style.position = 'absolute';
    element.style.top = '0';
    element.style.bottom = '0';
    element.style.left = '0';
    element.style.right = '0';
    element.style.display = 'flex';
    element.style.flexWrap = 'wrap';
    element.style.alignItems = 'center';
    element.style.justifyContent = 'center';
}

function styleTransform(element, elementRotationInDegrees) {
    rotation = `rotate(${elementRotationInDegrees}deg)`;
    element.style.transform = rotation;
    element.style.webkitTransform = rotation;
}

/* Ux01 utils added for series quad-20210715-0231-00 */
const buildBorder = (weight, color = 'transparent', type = 'solid') => `${weight}px ${color} ${type}`;
const buildStyle = (color = 'transparent') => `--b:${color};`;
const border = buildBorder;
const color = buildStyle;
const setCellStyle = (element, color = colors.default, border = borders.default, side = sides.default) => {
    element.style = color.concat(`border${side}: ${border}`);
};
let borders = {a: border(1, 'black'), b: border(1), none: border(0), default: border(1)};
let colors = {a: color('black'), b: color('white'), none: color('transparent'), default: color()};
let sides = {left: '-left', right: '-right', top: '-top', bottom: '-bottom', all: '', default: ''};
/* Ux01 */
