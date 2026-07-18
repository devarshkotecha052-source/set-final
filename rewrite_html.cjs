const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const oldDashboard = /<div class="sim-dashboard">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>\s*<\/section>/;

const newDashboard = `<div class="sim-dashboard">
          <div class="dash-header">
            <h4>Live Explanation</h4>
            <div class="view-toggle">
              <button class="v-tab active" data-view="narrative">Guided</button>
              <button class="v-tab" data-view="dev">Developer</button>
            </div>
          </div>
          
          <div class="dash-body active" id="view-narrative">
            <h3 id="step-title" style="color: var(--primary-color); margin-bottom: 12px; font-size: 1.1rem;">Step 1: User Initiates Request</h3>
            
            <div class="narrative-block">
              <h5>What's happening?</h5>
              <p id="desc-what">The customer begins a financial service request through a partner application.</p>
            </div>
            
            <div class="narrative-block">
              <h5>Why is this necessary?</h5>
              <p id="desc-why">Every financial journey starts with a user action, such as checking account data or initiating a payment.</p>
            </div>
            
            <div class="narrative-block">
              <h5>Setu's Role</h5>
              <p id="desc-role">Setu prepares a secure API request and routes it to the appropriate financial institution.</p>
            </div>
            
            <details class="tech-insight">
              <summary>Technical Insight</summary>
              <p id="desc-tech" style="font-family: monospace; font-size: 0.8rem; margin-top: 8px; color: var(--text-tertiary);">POST /api/v1/init - The client SDK initiates a secure TLS handshake with Setu's API Gateway.</p>
            </details>
          </div>
          
          <div class="dash-body dev-view" id="view-dev">
            <pre id="dev-logs" style="font-size: 0.75rem; color: #a0aec0; white-space: pre-wrap;">Waiting for simulation...</pre>
          </div>
        </div>
      </div>
    </div>
  </section>`;

html = html.replace(oldDashboard, newDashboard);

// Update Gamification to Final Learning Summary
const oldGami = /<div class="sim-gamification" id="sim-gamification">[\s\S]*?<\/button>\s*<\/div>/;
const newGami = `<div class="sim-gamification" id="sim-gamification">
            <div class="learning-summary">
              <h3 style="color: #38a169; margin-bottom: 16px;">✓ Journey Completed</h3>
              <div class="summary-content">
                <p><strong>Problem Solved:</strong> Legacy bank integration is slow and fragmented. Setu acts as a unified translation layer.</p>
                <p><strong>Setu's Value:</strong> Standardized APIs reduced integration from months to hours.</p>
                <p><strong>Participants:</strong> Customer, App Developer, Setu API Gateway, and Partner Banks.</p>
              </div>
              <button class="btn-primary" id="btn-restart" style="margin-top: 24px; width: 100%;">Restart Simulation</button>
            </div>
          </div>`;

html = html.replace(oldGami, newGami);

// Inject Node Tooltips modal
const tooltips = `
  <div id="node-modal" class="node-modal">
    <div class="node-modal-content">
      <span id="close-modal" class="close-modal">&times;</span>
      <h3 id="modal-title">Node Role</h3>
      <p id="modal-desc" style="margin-top: 12px; font-size: 0.9rem;"></p>
    </div>
  </div>
`;

html = html.replace('</body>', tooltips + '\n</body>');

fs.writeFileSync('index.html', html);
