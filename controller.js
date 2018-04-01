/***********
 * Controller.js 
 *
 * Controls frame animation and drawing on the canvas
 */

var fps = 30; // Standard frames per second
window.setInterval(animate, 1000/fps);

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

// Register click listner
canvas.addEventListener('mousedown', mouseDown);

// TODO: Recheck the location and size of rect
var rect = new Rectangle(0, 0, canvas.width, canvas.height);
var capacity = 4;

var qTree = new QuadTree(rect, capacity);
var pArr = [];

for (var i = 0; i < 5; i++) {
	var x = Math.floor( Math.random() * canvas.width);
	var y = Math.floor(Math.random() * canvas.height);
	var p = new Point(x, y);
	qTree.insert(p);
	pArr.push(p);
}

console.log(qTree);

function mouseDown(e) {
	var p = new Point(e.x, e.y);
	qTree.insert(p);
	pArr.push(p);
}

function draw() {
	ctx.fillStyle = 'black';
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	qTree.show();

	for (var i = 0; i < pArr.length; i++) {
		var p = pArr[i];
		ellipse(p.x, p.y, 3, 3);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
}

function animate() {

	// clear canvas and draw new frame
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	draw();
}

function dist(x1, y1, x2, y2) {
	// calculating distance with Pythagorean theorem
	var a = x2 - x1;
	var b = y2 - y1;
	return Math.sqrt(a*a + b*b);
}

function line (x1, y1, x2, y2) {
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function ellipse (x, y, r1, r2) {
	ctx.beginPath();
	ctx.ellipse(x, y, r1, r2, 0, 0, 2 * Math.PI);
	ctx.stroke();
}