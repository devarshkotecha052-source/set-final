const fs = require('fs');

let content = fs.readFileSync('index.html', 'utf8');

// 1. Update Navigation
const navPattern = /<div class="nav-links">[\s\S]*?<\/div>/;
const newNav = `<div class="nav-links">
        <a href="#friction">The Problem</a>
        <a href="#founders">The Founders</a>
        <a href="#model">Business Model</a>
        <a href="#experience">Experience Setu</a>
        <a href="#scale">Geography & Scale</a>
        <a href="#status">Status Today</a>
      </div>`;
content = content.replace(navPattern, newNav);

// 2. Remove numeric prefixes
content = content.replace('<span class="sec-tag">01. The Problem</span>', '<span class="sec-tag">The Problem</span>');
content = content.replace('<span class="sec-tag">02. The Builders</span>', '<span class="sec-tag">The Builders</span>');
content = content.replace('<span class="sec-tag">03. The Engine</span>', '<span class="sec-tag">The Engine</span>');
content = content.replace('<span class="sec-tag" style="color:#62d3d6;">04. Scale</span>', '<span class="sec-tag" style="color:#62d3d6;">Geography & Scale</span>');
content = content.replace('<span class="sec-tag">05. Status Today</span>', '<span class="sec-tag">Status Today</span>');

// 3. Insert Experience Setu section
const experienceHtml = `
  <!-- Experience Setu Simulation -->
  <section id="experience" class="section" style="background: #ffffff; overflow: hidden; position: relative;">
    <div class="container fade-up">
      <span class="sec-tag">Experience Setu</span>
      <h2 class="sec-title">Interactive API Journey</h2>
      
      <div class="sim-layout">
        <!-- Controls -->
        <div class="sim-controls">
          <div class="control-group">
            <label>Select Scenario</label>
            <select id="sim-scenario" class="sim-select">
              <option value="kyc">KYC Verification</option>
              <option value="payment">Payment Collection</option>
              <option value="aa">Account Aggregation</option>
            </select>
          </div>
          
          <div class="control-group">
            <label>Active Persona</label>
            <div class="persona-tabs">
              <button class="p-tab active" data-persona="developer">Developer</button>
              <button class="p-tab" data-persona="customer">Customer</button>
              <button class="p-tab" data-persona="bank">Bank</button>
            </div>
            <p id="persona-desc" style="font-size: 0.8rem; margin-top: 8px; color: var(--text-tertiary);">You are viewing the flow from the perspective of the application developer integrating Setu.</p>
          </div>
          
          <div class="step-tracker" id="step-tracker">
            <!-- Populated by JS -->
          </div>
          
          <button class="btn-primary" id="btn-run-sim" style="width: 100%; margin-top: 16px;">Run Simulation</button>
        </div>
        
        <!-- Visual Flow -->
        <div class="sim-visual">
          <div class="node-network">
            <div class="net-node" id="node-customer">
               <div class="node-icon">👤</div>
               <span>Customer App</span>
            </div>
            <div class="net-path" id="path-1">
               <div class="packet-sim" id="packet-1"></div>
            </div>
            <div class="net-node core" id="node-setu">
               <div class="node-icon">⚡</div>
               <span>Setu API Gateway</span>
            </div>
            <div class="net-path" id="path-2">
               <div class="packet-sim" id="packet-2"></div>
            </div>
            <div class="net-node" id="node-bank">
               <div class="node-icon">🏦</div>
               <span id="bank-name">Partner Bank</span>
            </div>
          </div>
          
          <div class="sim-gamification" id="sim-gamification">
            <h3 style="color: #38a169;">✓ Journey Completed</h3>
            <div class="g-stats">
              <div><span id="g-time">1.2s</span><br><small>Total Time</small></div>
              <div><span id="g-apis">3</span><br><small>APIs Called</small></div>
            </div>
            <button class="btn-outline" id="btn-restart" style="margin-top: 16px;">Restart</button>
          </div>
        </div>
        
        <!-- Live Dashboard -->
        <div class="sim-dashboard">
          <div class="dash-header">
            <h4>System Logs</h4>
            <div class="view-toggle">
              <button class="v-tab active" data-view="visual">Visual</button>
              <button class="v-tab" data-view="dev">Developer</button>
            </div>
          </div>
          
          <div class="dash-body visual-view active" id="view-visual">
            <div class="metric-row">
              <span>Status</span>
              <span id="dash-status" class="status-badge">Idle</span>
            </div>
            <div class="metric-row">
              <span>Latency</span>
              <span id="dash-latency">0ms</span>
            </div>
            <div class="metric-row">
              <span>Success Rate</span>
              <span style="color: #38a169; font-weight: bold;">99.9%</span>
            </div>
            
            <div class="live-chart">
              <div class="bar" style="height: 20%"></div>
              <div class="bar" style="height: 40%"></div>
              <div class="bar" style="height: 30%"></div>
              <div class="bar" style="height: 80%"></div>
              <div class="bar" style="height: 50%"></div>
            </div>
          </div>
          
          <div class="dash-body dev-view" id="view-dev">
            <pre id="dev-logs" style="font-size: 0.75rem; color: #a0aec0; white-space: pre-wrap;">Waiting for simulation...</pre>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

content = content.replace('<!-- 4. Geography & Scale -->', experienceHtml + '\n  <!-- 4. Geography & Scale -->');

fs.writeFileSync('index.html', content);
