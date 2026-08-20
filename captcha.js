
function randomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChar() {
	const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
	return chars[randomInt(0, chars.length - 1)];
}

function randomColor() {
	const hue = randomInt(0, 360);
	return `hsl(${hue}, 60%, 40%)`;
}

function escapeXml(value) {
	return String(value)
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&apos;');
}

function createCaptchaSvg() {
	const width = 200;
	const height = 70;
	const text = Array.from({ length: 5 }, randomChar).join('');
	const chars = Array.from(text);
	const lines = Array.from({ length: 8 }, () => {
		const x1 = randomInt(10, width - 20);
		const y1 = randomInt(10, height - 10);
		const x2 = randomInt(10, width - 10);
		const y2 = randomInt(20, height - 5);
		return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${randomColor()}" stroke-width="1.2" stroke-linecap="round" />`;
	}).join('');

	const glyphs = chars.map((char, index) => {
		const x = 25 + index * 32 + randomInt(-4, 4);
		const y = 42 + randomInt(-6, 8);
		const rotate = randomInt(-18, 18);
		const fontSize = randomInt(28, 34);
		return `<text x="${x}" y="${y}" font-size="${fontSize}" font-family="Arial, Helvetica, sans-serif" font-weight="700" transform="rotate(${rotate} ${x} ${y})" fill="${randomColor()}">${escapeXml(char)}</text>`;
	}).join('');

	const svg = `
		<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="captcha">
			<rect width="${width}" height="${height}" fill="#FFFFFF"/>
			${lines}
			${glyphs}
		</svg>
	`;

	return { text, data: svg.trim() };
}

let Create = function(client, name) {
	let captcha = createCaptchaSvg();
	client.captcha = captcha.text;
	let data = {};
	data['data'] = 'data:image/svg+xml;base64,' + Buffer.from(captcha.data).toString('base64');
	data['name'] = name;
	client.red({captcha: data});
}
module.exports = function(data){
	switch(data){
		case 'signUp':
			Create(this, 'signUp');
			break;

		case 'giftcode':
			Create(this, 'giftcode');
			break;

		case 'forgotpass':
			Create(this, 'forgotpass');
			break;

		case 'transfer':
			Create(this, 'transfer');
			break;

		case 'chargeCard':
			Create(this, 'chargeCard');
			break;

		case 'withdrawXu':
			Create(this, 'withdrawXu');
			break;

		case 'withdrawCard':
			Create(this, 'withdrawCard');
			break;
	}
}
