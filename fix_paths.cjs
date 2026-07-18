const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace /setu-logo.svg with ./setu-logo.svg
html = html.replace(/src="\/setu-logo\.svg"/g, 'src="./setu-logo.svg"');
// Replace /partners/ with ./partners/
html = html.replace(/src="\/partners\//g, 'src="./partners/');

fs.writeFileSync('index.html', html);
