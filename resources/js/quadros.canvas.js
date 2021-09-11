let isDebugEnabled = false;
let isDrawing = false;
let isTransparencyDisabled = true;
let x = 0, y = 0;
let contextLineWidth = 8;
let contextStrokeStyle = 'rgba(113,8,8,0.75)';
let contextBackground = 'rgba(178, 167, 147, 0.95)';
let contextLineCapIndex = 0;
const contextLineCaps = ['butt', 'round', 'square'];
const canvasWidth = 600;
const canvasHeight = 600;

function main(contextStrokeStyleOverride = 0, contextBackgroundOverride = '') {
    if (contextStrokeStyleOverride !== 0) contextStrokeStyle = contextStrokeStyleOverride;
    if (contextBackgroundOverride !== '') contextBackground = contextBackgroundOverride;
    load();
}

function load() {
    document.title = '';
    let body = document.body,
        div = document.createElement('div'),
        canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'demo');
    canvas.setAttribute('width', `${canvasWidth}px`);
    canvas.setAttribute('height', `${canvasHeight}px`);
    let context = canvas.getContext('2d', {alpha: true});
    if (isTransparencyDisabled) {
        context.fillStyle = contextBackground;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
    }
    canvas.addEventListener('mousedown', e => {
        x = e.offsetX;
        y = e.offsetY;
        isDrawing = true;
    });
    canvas.addEventListener('mousemove', e => {
        if (isDrawing === true) {
            draw(context, x, y, e.offsetX, e.offsetY);
            x = e.offsetX;
            y = e.offsetY;
        }
    });
    canvas.addEventListener('mouseup', e => {
        if (isDrawing === true) {
            draw(context, x, y, e.offsetX, e.offsetY);
            x = 0;
            y = 0;
            isDrawing = false;
        }
    });
    document.addEventListener('keydown', event => {
        const key = event.key;
        switch (key) {
            case '+':
                setLineWidth(1);
                break;
            case '-':
                if (contextLineWidth > 1) setLineWidth(-1);
                break;
            case 'D':
            case 'd':
                download(canvas);
                break;
            case 'C':
            case 'c':
                switchLineCap(context);
                break;
        }
    });
    div.appendChild(canvas);
    body.appendChild(div);
}

function setLineWidth(value) {
    contextLineWidth += value;
    if (isDebugEnabled) console.debug(contextLineWidth);
}

function switchLineCap(context) {
    if (++contextLineCapIndex >= contextLineCaps.length) contextLineCapIndex = 0;
    context.lineCap = contextLineCaps[contextLineCapIndex];
    if (isDebugEnabled) console.debug(context.lineCap);
}

function draw(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = contextStrokeStyle;
    context.lineWidth = contextLineWidth;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function download(canvas) {
    const dataUrl = canvas.toDataURL();
    let link = document.createElement('a');
    link.download = filename();
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function filename() {
    return `canvas-${timestamp()}.png`;
}

function timestamp() {
    const datetime = new Date()
    const date = datetime.toISOString().split('T')[0].replaceAll('-', '');
    const time = datetime.toTimeString().split(' ')[0].replaceAll(':', '');
    return `${date}-${time}`
}