const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Add "Next Step" button after "Run Simulation" button
html = html.replace('<button class="btn-primary" id="btn-run-sim" style="width: 100%; margin-top: 16px;">Run Simulation</button>', 
                    '<button class="btn-primary" id="btn-run-sim" style="width: 100%; margin-top: 16px;">Start Guided Tour</button>\n          <button class="btn-outline" id="btn-next-step" style="width: 100%; margin-top: 12px; display: none; background: var(--text-primary); color: #fff; border: none;">Next Step ➔</button>');

fs.writeFileSync('index.html', html);
