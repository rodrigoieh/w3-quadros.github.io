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