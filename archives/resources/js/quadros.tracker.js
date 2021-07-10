const width = 100;
const height = 100;
const circleCx = 50;
const circleCy = 50;
const circleR = 20;
const circleStroke = '#F5F5F580';
const circleStrokeWidth = 2;
const circleFill = 'transparent';

function main() {
    load();
}

function load() {
    document.title = '';
    let body = document.body,
        x = document.createElement('div'),
        y = document.createElement('div'),
        svg = document.createElement('svg'),
        circle = document.createElement('circle');
    x.setAttribute('id', 'x');
    y.setAttribute('id', 'y');
    x.setAttribute('class', 'x');
    y.setAttribute('class', 'y');
    svg.setAttribute('id', 'position');
    svg.setAttribute('class', 'circle');
    svg.setAttribute('height', String(height));
    svg.setAttribute('width', String(width));
    circle.setAttribute('cx', String(circleCx));
    circle.setAttribute('cy', String(circleCy));
    circle.setAttribute('r', String(circleR));
    circle.setAttribute('stroke', String(circleStroke));
    circle.setAttribute('stroke-width', String(circleStrokeWidth));
    circle.setAttribute('fill', circleFill);
    svg.appendChild(circle);
    body.appendChild(x);
    body.appendChild(y);
    body.appendChild(svg);
    document.addEventListener('mousemove', (event) => {
        document.getElementById('x').style.top = String(event.clientY).concat('px');
        document.getElementById('y').style.left = String(event.clientX).concat('px');
        document.getElementById('position').style.top = String(event.clientY - 50).concat('px');
        document.getElementById('position').style.left = String(event.clientX - 50).concat('px');
    });
}
