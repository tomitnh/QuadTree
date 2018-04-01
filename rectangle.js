class Rectangle {
	constructor (x, y, w, h) {
		this.x = x;		// x-coord
		this.y = y;		// y-coord
		this.w = w;		// width
		this.h = h;		// height
	}

	// Check whether this rectangle contains point p
	contains(p) {
		return (p.x >= this.x - this.w &&
			p.x <= this.x + this.w && 
			p.y >= this.y - this.h &&
			p.y <= this.y + this.h);
	}
}