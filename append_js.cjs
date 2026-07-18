const js_append = `

// Experience Setu Simulation Logic
document.addEventListener('DOMContentLoaded', () => {
  const scenarios = {
    kyc: {
      name: 'KYC Verification',
      steps: ['Connect API', 'Send PAN details', 'Bank Verification', 'Status Success'],
      logs: [
        'POST /api/v1/kyc/verify\\n{ "pan": "ABCDE1234F" }',
        'Status: Processing...',
        'Bank response: Verified\\nLatency: 42ms',
        '200 OK\\n{ "status": "verified", "name": "Setu User" }'
      ]
    },
    payment: {
      name: 'Payment Collection',
      steps: ['Create Link', 'User Clicks', 'Bank Auth', 'Payment Success'],
      logs: [
        'POST /api/v1/payment/link\\n{ "amount": 500 }',
        'Link generated: setu.co/pay/xyz',
        'User authorized via UPI',
        '200 OK\\n{ "status": "PAID", "utr": "123456789" }'
      ]
    },
    aa: {
      name: 'Account Aggregation',
      steps: ['Request Consent', 'User Approves', 'Fetch Data', 'Data Received'],
      logs: [
        'POST /api/v1/consent\\n{ "type": "bank_statement" }',
        'Consent requested via AA',
        'User approved consent (OTP)',
        '200 OK\\n{ "data": [ "Txn1", "Txn2" ] }'
      ]
    }
  };

  const personas = {
    developer: 'You are viewing the flow from the perspective of the application developer integrating Setu.',
    customer: 'You are the end user experiencing a seamless financial flow inside the app.',
    bank: 'You are the partner bank receiving structured data requests from Setu.'
  };

  const simSelect = document.getElementById('sim-scenario');
  const pTabs = document.querySelectorAll('.p-tab');
  const pDesc = document.getElementById('persona-desc');
  const stepTracker = document.getElementById('step-tracker');
  const btnRunSim = document.getElementById('btn-run-sim');
  const btnRestart = document.getElementById('btn-restart');
  const dashStatus = document.getElementById('dash-status');
  const dashLatency = document.getElementById('dash-latency');
  const packet1 = document.getElementById('packet-1');
  const packet2 = document.getElementById('packet-2');
  const gamification = document.getElementById('sim-gamification');
  const gTime = document.getElementById('g-time');
  const devLogs = document.getElementById('dev-logs');
  const vTabs = document.querySelectorAll('.v-tab');
  const views = document.querySelectorAll('.dash-body');

  let currentScenario = 'kyc';
  let isRunning = false;

  function renderSteps() {
    stepTracker.innerHTML = '';
    scenarios[currentScenario].steps.forEach((step, index) => {
      const div = document.createElement('div');
      div.className = 'track-step';
      div.innerText = \`\${index + 1}. \${step}\`;
      div.id = \`step-\${index}\`;
      stepTracker.appendChild(div);
    });
  }

  simSelect.addEventListener('change', (e) => {
    if(isRunning) return;
    currentScenario = e.target.value;
    renderSteps();
    resetSim();
  });

  pTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      pTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      pDesc.innerText = personas[tab.getAttribute('data-persona')];
    });
  });

  vTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      vTabs.forEach(t => t.classList.remove('active'));
      views.forEach(v => v.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById('view-' + tab.getAttribute('data-view')).classList.add('active');
    });
  });

  function resetSim() {
    gamification.classList.remove('visible');
    dashStatus.innerText = 'Idle';
    dashStatus.className = 'status-badge';
    dashLatency.innerText = '0ms';
    devLogs.innerText = 'Waiting for simulation...';
    document.querySelectorAll('.track-step').forEach(el => {
      el.classList.remove('active', 'done');
    });
    packet1.className = 'packet-sim';
    packet2.className = 'packet-sim';
    document.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
  }

  async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  btnRestart.addEventListener('click', () => {
    if(!isRunning) resetSim();
  });

  btnRunSim.addEventListener('click', async () => {
    if(isRunning) return;
    isRunning = true;
    resetSim();
    
    dashStatus.innerText = 'Running';
    dashStatus.className = 'status-badge running';
    devLogs.innerText = 'Initializing...\\n';
    
    const sData = scenarios[currentScenario];
    const startTime = performance.now();

    for(let i=0; i<4; i++) {
      // Update tracker
      document.querySelectorAll('.track-step').forEach(el => el.classList.remove('active'));
      document.getElementById(\`step-\${i}\`).classList.add('active');
      
      // Node highlighting and packet animation
      document.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
      
      if(i === 0 || i === 3) {
        document.getElementById('node-customer').classList.add('active');
        if(i===0) { packet1.className = 'packet-sim animate-forward'; }
        if(i===3) { packet1.className = 'packet-sim animate-backward'; }
      } else if (i === 1 || i === 2) {
        document.getElementById('node-setu').classList.add('active');
        document.getElementById('node-bank').classList.add('active');
        if(i===1) { packet2.className = 'packet-sim animate-forward'; }
        if(i===2) { packet2.className = 'packet-sim animate-backward'; }
      }

      // Update dev logs
      devLogs.innerText += '\\n> ' + sData.logs[i];
      devLogs.scrollTop = devLogs.scrollHeight;
      
      // Random latency
      const lat = Math.floor(Math.random() * 50) + 10;
      dashLatency.innerText = lat + 'ms';
      
      await sleep(1000);
      document.getElementById(\`step-\${i}\`).classList.remove('active');
      document.getElementById(\`step-\${i}\`).classList.add('done');
    }

    const endTime = performance.now();
    const timeTaken = ((endTime - startTime) / 1000).toFixed(1);

    dashStatus.innerText = 'Success';
    dashStatus.className = 'status-badge success';
    
    gTime.innerText = timeTaken + 's';
    gamification.classList.add('visible');
    
    isRunning = false;
  });

  // Init
  renderSteps();
});
`;

const fs = require('fs');
fs.appendFileSync('main.js', js_append);
