var c = document.querySelector('canvas'),
    ctx = c.getContext('2d'),
    w = c.width = 220,
    h = c.height = 220,
    cx = w / 2,
    cy = h / 2,
    orbCount = 200,
    pathCount = 9,
    border = 80,
    orbs = [],
    tick = 0;

function rand(min, max) {
	return Math.random() * (max - min) + min;
}

function dist(x1, y1, x2, y2) {
	var dx = x1 - x2;
	var dy = y1 - y2;
	return Math.sqrt(dx * dx + dy * dy);
}

for (var i = 0; i < orbCount; i++) {
	orbs.push({
		x: cx,
		y: cy,
		vx: 0,
		vy: 0,
		a: 0.075,
		path: []
	});
}

function loop() {
	requestAnimationFrame(loop);
	ctx.clearRect(0, 0, w, h);
	ctx.globalCompositeOperation = 'source-over';
	ctx.beginPath();
	ctx.arc(cx, cy, border * (1 + Math.sin(tick / 40) * 0.15), 0, Math.PI * 2);
	ctx.fillStyle = '#fff';
	ctx.fill();
	ctx.beginPath();
	ctx.arc(cx, cy, border / 2 * (1 + Math.cos(tick / 40) * 0.15), 0, Math.PI * 2);
	ctx.fillStyle = '#24a381';
	ctx.fill();
	ctx.globalCompositeOperation = 'xor';
	ctx.beginPath();
	orbs.forEach(function (orb) {
		orb.vx += rand(-orb.a, orb.a);
		orb.vy += rand(-orb.a, orb.a);
		if (Math.abs(orb.vx) > 2) {
			orb.vx *= 0.99;
		}
		if (Math.abs(orb.vy) > 2) {
			orb.vy *= 0.99;
		}
		orb.x += orb.vx;
		orb.y += orb.vy;
		if (dist(orb.x, orb.y, cx, cy) >= border) {
			orb.vx += (cx - orb.x) * 0.001;
			orb.vy += (cy - orb.y) * 0.001;
		}
		orb.path.push([orb.x, orb.y]);
		if (tick >= pathCount) {
			orb.path.shift();
		}
		ctx.moveTo(orb.x, orb.y);
		ctx.lineTo(orb.path[0][0], orb.path[0][1]);
	});
	ctx.lineWidth = (1 + Math.sin(tick / 20)) * 0.75;
	ctx.strokeStyle = '#000';
	ctx.stroke();
	tick++;
}

loop();
