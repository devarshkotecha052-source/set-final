const fs = require('fs');

let js = fs.readFileSync('main.js', 'utf8');

const newLogic = `
// Experience Setu Simulation Logic
document.addEventListener('DOMContentLoaded', () => {
  const stepsData = [
    {
      title: "Step 1: User Initiates Request",
      what: "The customer begins a financial service request through a partner application.",
      why: "Every financial journey starts with a user action, such as checking account data or initiating a payment.",
      role: "Setu provides the SDKs and interface components to securely capture this intent.",
      tech: "POST /api/v1/init - The client initiates a secure TLS handshake with Setu.",
      node: 'customer',
      log: 'POST /api/v1/init\\nUser clicked "Verify Bank"\\nPayload: { userId: "CUST_99X" }'
    },
    {
      title: "Step 2: Consent Collection",
      what: "The user is prompted to grant permission for their data or payment to be processed.",
      why: "Consent is legally mandatory before accessing financial data under RBI's Account Aggregator framework.",
      role: "Setu provides a standardized, compliant consent screen that works seamlessly inside any app.",
      tech: "A cryptographically signed consent artifact is generated and stored for auditability.",
      node: 'customer',
      log: 'POST /api/v1/consent\\nGenerating AA UI...\\nUser approved OTP.'
    },
    {
      title: "Step 3: API Processing",
      what: "The request reaches Setu, is validated, and securely routed to the relevant bank.",
      why: "Banks have legacy systems that are difficult to query directly. Setu acts as a translation layer.",
      role: "Setu normalizes the diverse XML/SOAP structures of old banks into clean JSON for the app.",
      tech: "The API Gateway performs OAuth 2.0 auth and routes the payload.",
      node: 'setu',
      log: 'ROUTING via Setu Gateway...\\nTranslating JSON -> ISO 8583\\nForwarding to Partner Bank IP...'
    },
    {
      title: "Step 4: Bank Verification",
      what: "The partner bank verifies the request, performs required checks, and generates a response.",
      why: "The bank is the ultimate source of truth holding the user's funds or identity data.",
      role: "Setu maintains high-availability leased lines with banks to ensure 99.9% uptime during verification.",
      tech: "Core Banking Systems (CBS) process the transaction and return a payload.",
      node: 'bank',
      log: 'Processing at Core Banking System...\\nAccount check: SUCCESS\\nLatency: 142ms'
    },
    {
      title: "Step 5: Response Returned",
      what: "Setu receives the response, standardizes it, and sends it to the application for the customer to see.",
      why: "The customer needs immediate feedback on whether their action succeeded or failed.",
      role: "Setu handles all the complexity, allowing the app developer to simply read a 'success: true' JSON key.",
      tech: "A 200 OK HTTP response is fired via webhook back to the application.",
      node: 'setu',
      log: '200 OK\\n{ "status": "VERIFIED", "timestamp": "2026-07-18" }\\nFiring Webhook to App...'
    }
  ];

  const nodeRoles = {
    'customer': {
      title: 'Customer Application',
      desc: 'The front-end interface (like a fintech app or ecommerce checkout). Responsibilities include gathering user intent and displaying data. Security requires standard app-level encryption and TLS.'
    },
    'setu': {
      title: 'Setu API Gateway',
      desc: 'The translation bridge. Responsibilities include standardizing disparate bank APIs into clean JSON, managing API keys, handling consent artifacts, and maintaining 99.99% uptime.'
    },
    'bank': {
      title: 'Regulated Partner Bank',
      desc: 'The regulated entity (e.g. Axis, ICICI) that holds the actual capital and core user identity data. Required by RBI to expose endpoints via the Account Aggregator or UPI framework.'
    }
  };

  const pTabs = document.querySelectorAll('.p-tab');
  const pDesc = document.getElementById('persona-desc');
  const stepTracker = document.getElementById('step-tracker');
  const btnRunSim = document.getElementById('btn-run-sim');
  const btnNextStep = document.getElementById('btn-next-step');
  const btnRestart = document.getElementById('btn-restart');
  const gamification = document.getElementById('sim-gamification');
  const devLogs = document.getElementById('dev-logs');
  const vTabs = document.querySelectorAll('.v-tab');
  const views = document.querySelectorAll('.dash-body');
  
  const titleEl = document.getElementById('step-title');
  const whatEl = document.getElementById('desc-what');
  const whyEl = document.getElementById('desc-why');
  const roleEl = document.getElementById('desc-role');
  const techEl = document.getElementById('desc-tech');

  const modal = document.getElementById('node-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const closeModal = document.getElementById('close-modal');

  let isRunning = false;
  let currentStepIndex = 0;

  // Render tracker steps
  function renderSteps() {
    stepTracker.innerHTML = '';
    stepsData.forEach((step, index) => {
      const div = document.createElement('div');
      div.className = 'track-step';
      div.innerText = step.title;
      div.id = \`step-\${index}\`;
      stepTracker.appendChild(div);
    });
  }

  // Node Modals
  document.querySelectorAll('.net-node').forEach(node => {
    node.style.cursor = 'pointer';
    node.addEventListener('click', () => {
      const type = node.id.split('-')[1];
      if (nodeRoles[type]) {
        modalTitle.innerText = nodeRoles[type].title;
        modalDesc.innerText = nodeRoles[type].desc;
        modal.classList.add('visible');
      }
    });
  });

  if (closeModal) {
    closeModal.addEventListener('click', () => modal.classList.remove('visible'));
  }

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
    devLogs.innerText = 'Waiting for simulation...';
    document.querySelectorAll('.track-step').forEach(el => {
      el.classList.remove('active', 'done');
    });
    
    // reset packets instantly without animation
    const p1 = document.getElementById('packet-1');
    const p2 = document.getElementById('packet-2');
    p1.className = 'packet-sim';
    p2.className = 'packet-sim';
    void p1.offsetWidth; // trigger reflow
    void p2.offsetWidth;
    
    document.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
    
    titleEl.innerText = "Ready to start...";
    whatEl.innerText = "Click Start Guided Tour to begin the interactive journey.";
    whyEl.innerText = "";
    roleEl.innerText = "";
    techEl.innerText = "";
    
    btnRunSim.style.display = 'block';
    btnNextStep.style.display = 'none';
    btnNextStep.innerText = 'Next Step ➔';
    isRunning = false;
    currentStepIndex = 0;
  }

  btnRestart.addEventListener('click', () => {
    resetSim();
  });

  function playStep(index) {
    if(index >= stepsData.length) {
      gamification.classList.add('visible');
      btnNextStep.style.display = 'none';
      btnRunSim.style.display = 'block';
      isRunning = false;
      return;
    }

    const sData = stepsData[index];
    
    // Update tracker
    document.querySelectorAll('.track-step').forEach((el, i) => {
      el.classList.remove('active');
      if (i < index) el.classList.add('done');
    });
    document.getElementById(\`step-\${index}\`).classList.add('active');
    
    // Update Guided Explanation text
    titleEl.innerText = sData.title;
    whatEl.innerText = sData.what;
    whyEl.innerText = sData.why;
    roleEl.innerText = sData.role;
    techEl.innerText = sData.tech;
    
    // Node highlighting and packet animation
    document.querySelectorAll('.net-node').forEach(n => n.classList.remove('active'));
    document.getElementById('node-' + sData.node).classList.add('active');
    
    // Reset packets before re-triggering animation
    const p1 = document.getElementById('packet-1');
    const p2 = document.getElementById('packet-2');
    p1.className = 'packet-sim';
    p2.className = 'packet-sim';
    void p1.offsetWidth;
    void p2.offsetWidth;

    if(index === 0) { p1.className = 'packet-sim animate-forward'; }
    if(index === 2) { p2.className = 'packet-sim animate-forward'; }
    if(index === 4) { p2.className = 'packet-sim animate-backward'; }
    
    // Update dev logs
    devLogs.innerText += '\\n> ' + sData.log;
    devLogs.scrollTop = devLogs.scrollHeight;

    if (index === stepsData.length - 1) {
      btnNextStep.innerText = 'Finish Journey ✓';
    }
  }

  btnRunSim.addEventListener('click', () => {
    if(isRunning) return;
    isRunning = true;
    currentStepIndex = 0;
    
    devLogs.innerText = 'Initializing...\\n';
    btnRunSim.style.display = 'none';
    btnNextStep.style.display = 'block';
    
    playStep(currentStepIndex);
  });

  btnNextStep.addEventListener('click', () => {
    currentStepIndex++;
    playStep(currentStepIndex);
  });

  // Init
  renderSteps();
  resetSim();
});
`;

// Replace everything after "// Experience Setu Simulation Logic"
const splitToken = "// Experience Setu Simulation Logic";
const parts = js.split(splitToken);
if (parts.length > 1) {
    fs.writeFileSync('main.js', parts[0] + newLogic);
}
