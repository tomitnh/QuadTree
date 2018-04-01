class Rectangle {
	constructor (x, y, w, h) {
		this.x = x;		// x-coord
		this.y = y;		// y-coord
		this.w = w;		// width
		this.h = h;		// height
	}

	// Check whether this rectangle contains point p
	contains(p) {
		return p.x >= this.x && p.x <= this.w &&
			p.y >= this.y && p.y <= this.h;
	}
}