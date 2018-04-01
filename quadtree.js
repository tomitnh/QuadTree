/**
 * The QuadTree divides a canvas/rectangle into four quadrants.
 * Then, each of those quadrant may further be subdivided into
 * four sub-quadrants. The process continue everytime the 
 * capacity for each quadrant is reached.
 * v0.5 - QuadTree working as expected.
 */
class QuadTree {
	constructor(boundary, n) {
		this.boundary = boundary;	// Rectangle
		this.capacity = n;
		this.points = [];

		this.divided = false;
		this.northwest = null;
		this.northeast = null;
		this.southwest = null;
		this.southeast = null;
	}

	subdivide () {
		var r = this.boundary;

		var nw = new Rectangle(r.x - r.w / 2, r.y - r.h / 2, r.w / 2, r.h / 2);
		this.northwest = new QuadTree(nw, this.capacity);
		var ne = new Rectangle(r.x + r.w / 2, r.y - r.h / 2, r.w / 2, r.h / 2);
		this.northeast = new QuadTree(ne, this.capacity);
		var sw = new Rectangle(r.x - r.w / 2, r.y + r.h / 2, r.w / 2, r.h / 2);
		this.southwest = new QuadTree(sw, this.capacity);
		var se = new Rectangle(r.x + r.w / 2, r.y + r.h / 2, r.w / 2, r.h / 2);
		this.southeast = new QuadTree(se, this.capacity);

		this.divided = true;
	}

	insert (p) {
		if (this.points.length < this.capacity) {
			this.points.push(p);
		} else {
			if (!this.divided) {
				this.subdivide();
			}

			if (this.northwest.boundary.contains(p)){
				this.northwest.insert(p);
			} else  if (this.northeast.boundary.contains(p)){
				this.northeast.insert(p);
			} else if (this.southwest.boundary.contains(p)){
				this.southwest.insert(p);
			} else {
				this.southeast.insert(p);
			}
		}
	}

	show () { 
		var canvas = document.getElementById('canvas');
		var ctx = canvas.getContext('2d');

		var r = this.boundary;
		ctx.strokeStyle = 'grey';
		ctx.lineWidth = '2';
		// Translate Centered x,y to Top Left x,y to be drawn
		ctx.strokeRect(r.x - r.w,
			r.y - r.h, 
			r.w * 2, 
			r.h * 2);

		if (this.divided) {
			this.northeast.show();
			this.northwest.show();
			this.southwest.show();
			this.southeast.show();
		}
	}
}