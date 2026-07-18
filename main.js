// Setu Fintech Encyclopedia V2.6 Interactive Logic (Accordions IA)
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // 1. Scroll Animations & Counters
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        if (entry.target.classList.contains('counter')) {
          animateCounter(entry.target);
          entry.target.classList.remove('counter');
        }
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-up, .stagger-item, .counter').forEach(el => observer.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.getAttribute('data-target'));
    const isFloat = !Number.isInteger(target);
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    const update = () => {
      current += step;
      if (current < target) {
        el.innerText = isFloat ? current.toFixed(1) : Math.ceil(current).toLocaleString();
        requestAnimationFrame(update);
      } else {
        el.innerText = (isFloat ? target.toFixed(1) : target.toLocaleString()) + (el.getAttribute('data-suffix') || '');
      }
    };
    update();
  }

  // ==========================================
  // 2. Category & Subheading Accordions
  // ==========================================
  const catWrappers = document.querySelectorAll('.category-wrapper');
  const subCards = document.querySelectorAll('.enc-subheading-card');
  
  // Category Accordion Toggle
  catWrappers.forEach(wrapper => {
    const header = wrapper.querySelector('.category-header');
    const content = wrapper.querySelector('.category-content');
    
    header.addEventListener('click', () => {
      const isAlreadyActive = wrapper.classList.contains('active');
      
      // Close other categories
      catWrappers.forEach(otherWrapper => {
        if (otherWrapper !== wrapper) {
          otherWrapper.classList.remove('active');
          const otherContent = otherWrapper.querySelector('.category-content');
          otherContent.style.maxHeight = null;
        }
      });
      
      if (isAlreadyActive) {
        wrapper.classList.remove('active');
        content.style.maxHeight = null;
      } else {
        wrapper.classList.add('active');
        // Smooth transition helper: set to scrollHeight, then uncap
        content.style.maxHeight = content.scrollHeight + 1000 + 'px';
        setTimeout(() => {
          if (wrapper.classList.contains('active')) {
            content.style.maxHeight = 'none';
          }
        }, 500);

        // If financials category is opened, initialize Chart.js
        if (wrapper.id === 'cat-financials') {
          setTimeout(initFinancialsChart, 200);
        }
      }
    });
  });

  // Subheading Accordion Toggle
  subCards.forEach(card => {
    const header = card.querySelector('.subheading-header');
    const body = card.querySelector('.subheading-body');
    
    header.addEventListener('click', (e) => {
      e.stopPropagation(); // Prevent category click
      const isAlreadyActive = card.classList.contains('active');
      
      if (isAlreadyActive) {
        card.classList.remove('active');
        body.style.maxHeight = null;
      } else {
        card.classList.add('active');
        body.style.maxHeight = body.scrollHeight + 'px';
        
        // Push state to update URL hash
        history.pushState(null, null, '#' + card.id);
        
        // Smooth scroll to card
        setTimeout(() => {
          card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    });
  });

  // Handle direct links on load via URL Hash
  const hash = window.location.hash;
  if (hash) {
    const targetCard = document.querySelector(hash);
    if (targetCard) {
      // Find parent category wrapper
      const parentWrapper = targetCard.closest('.category-wrapper');
      if (parentWrapper) {
        parentWrapper.classList.add('active');
        const parentContent = parentWrapper.querySelector('.category-content');
        parentContent.style.maxHeight = 'none';
        
        if (parentWrapper.id === 'cat-financials') {
          setTimeout(initFinancialsChart, 200);
        }
      }
      
      targetCard.classList.add('active');
      const cardBody = targetCard.querySelector('.subheading-body');
      if (cardBody) {
        cardBody.style.maxHeight = cardBody.scrollHeight + 'px';
      }
      
      setTimeout(() => {
        targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    }
  }

  // ==========================================
  // 3. Before vs After Slider (Friction)
  // ==========================================
  const slider = document.getElementById('friction-slider');
  const sliderImage = document.querySelector('.slider-after');
  if (slider && sliderImage) {
    sliderImage.style.clipPath = `polygon(0 0, ${slider.value}% 0, ${slider.value}% 100%, 0 100%)`;
    slider.addEventListener('input', (e) => {
      sliderImage.style.clipPath = `polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`;
    });
  }

  // ==========================================
  // 4. Founders Tabs
  // ==========================================
  const fTabs = document.querySelectorAll('.f-tab');
  const fBios = document.querySelectorAll('.f-bio');
  fTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.stopPropagation();
      fTabs.forEach(t => t.classList.remove('active'));
      fBios.forEach(b => b.classList.remove('active'));
      tab.classList.add('active');
      const targetId = 'bio-' + tab.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if(targetEl) {
        targetEl.classList.add('active');
        
        // Auto-expand parent body container since bio size might vary
        const subCard = tab.closest('.enc-subheading-card');
        if (subCard) {
          const body = subCard.querySelector('.subheading-body');
          body.style.maxHeight = 'none';
        }
      }
    });
  });

  // ==========================================
  // 5. Geography Map & Timeline Slider
  // ==========================================
  const geoSlider = document.getElementById('geo-year-slider');
  const hubs = document.querySelectorAll('.hub-marker');
  const infoTitle = document.getElementById('geo-info-title');
  const infoBadge = document.getElementById('geo-info-badge');
  const infoDesc = document.getElementById('geo-info-desc');
  
  const hubData = {
    blr: {
      title: "Bengaluru",
      badge: "Headquarters (2018)",
      desc: "Setu's birthplace and core engineering hub. Our platform operations, product development, and primary API routing infrastructure reside here."
    },
    bom: {
      title: "Mumbai",
      badge: "Financial Hub (2019)",
      desc: "Direct connections to India's major partner banks, NBFCs, and financial institutions ensuring sub-100ms latency for critical transactions."
    },
    del: {
      title: "Delhi",
      badge: "Govt Stack (2020)",
      desc: "Crucial routing node for India Stack integrations including UIDAI (Aadhaar OKYC), NSDL (PAN Verification), and DigiLocker."
    },
    hyd: {
      title: "Hyderabad",
      badge: "Fintech Hub (2021)",
      desc: "Supporting the massive influx of fintech partners, lending startups, and wealth-tech apps utilizing Setu's APIs."
    },
    maa: {
      title: "Chennai",
      badge: "AA Hub (2022)",
      desc: "Primary node handling the massive data loads for Account Aggregator decryption, machine learning categorization, and insights."
    }
  };

  if(geoSlider) {
    geoSlider.addEventListener('input', (e) => {
      const year = parseInt(e.target.value);
      
      hubs.forEach(hub => {
        const hubYear = parseInt(hub.getAttribute('data-year'));
        if(year >= hubYear) {
          hub.style.opacity = '1';
          hub.style.pointerEvents = 'auto';
        } else {
          hub.style.opacity = '0';
          hub.style.pointerEvents = 'none';
        }
      });
      
      infoTitle.innerText = "Ecosystem Growth";
      infoBadge.innerText = "Year " + year;
      
      if(year === 2018) infoDesc.innerText = "Setu founded in Bengaluru. Initial infrastructure laid down.";
      if(year === 2019) infoDesc.innerText = "Expansion into Mumbai to connect with partner banks and NBFCs.";
      if(year === 2020) infoDesc.innerText = "Integration with Delhi's UIDAI and NSDL government stacks.";
      if(year === 2021) infoDesc.innerText = "Hyderabad node opens to support massive fintech startup volume.";
      if(year >= 2022) infoDesc.innerText = "Chennai node handles the Account Aggregator revolution. Full India routing active.";
    });
  }

  hubs.forEach(hub => {
    hub.addEventListener('mouseenter', () => {
      const id = hub.getAttribute('data-hub');
      const data = hubData[id];
      if(data) {
        infoTitle.innerText = data.title;
        infoBadge.innerText = data.badge;
        infoDesc.innerText = data.desc;
      }
    });
  });

  // ==========================================
  // 6. Chart.js Financials
  // ==========================================
  let financialsChart = null;
  function initFinancialsChart() {
    if (financialsChart) return;
    const canvas = document.getElementById('revenueChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    financialsChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['FY20', 'FY21', 'FY22', 'FY23'],
        datasets: [
          {
            label: 'Operating Revenue (INR Cr)',
            data: [0.16, 3.2, 9.2, 15.3],
            borderColor: '#42cacd',
            backgroundColor: 'rgba(66,202,205,0.1)',
            borderWidth: 2,
            fill: true
          },
          {
            label: 'Net Loss (INR Cr)',
            data: [4.5, 12.1, 29.1, 31.7],
            borderColor: '#e53e3e',
            backgroundColor: 'rgba(229,62,62,0.1)',
            borderWidth: 2,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#a0aec0' }
          },
          x: {
            grid: { color: 'rgba(255,255,255,0.05)' },
            ticks: { color: '#a0aec0' }
          }
        },
        plugins: {
          legend: {
            labels: { color: '#fff' }
          }
        }
      }
    });
  }

  // ==========================================
  // 7. V4 iPhone Simulator Logic
  // ==========================================
  const appScreen = document.getElementById('v3-app-screen');
  const diagramTrack = document.getElementById('v3-diagram-track');
  const explWhat = document.getElementById('v3-what');
  const explWhy = document.getElementById('v3-why');
  const explRole = document.getElementById('v3-role');
  const metApi = document.getElementById('met-api');
  const metLat = document.getElementById('met-lat');
  const metSrv = document.getElementById('met-srv');
  const celOverlay = document.getElementById('v3-celebration');
  const celApis = document.getElementById('cel-apis');
  const celTime = document.getElementById('cel-time');
  const celNodes = document.getElementById('cel-nodes');
  const btnRestart = document.getElementById('btn-v3-restart');
  const btnNext = document.getElementById('btn-next-step');
  
  let currentScenario = null;
  let apiCount = 0;
  let srvCount = 0;
  let nextStepResolver = null;

  const scenarios = {
    kyc: {
      nodes: [
        { id: 'n-app', icon: '📱', label: 'App Frontend' },
        { id: 'n-srv', icon: '💻', label: 'App Server' },
        { id: 'n-gw', icon: '⚡', label: 'Setu Gateway' },
        { id: 'n-auth', icon: '🔒', label: 'Auth Layer' },
        { id: 'n-rout', icon: '🔀', label: 'API Router' },
        { id: 'n-nsdl', icon: '🏛️', label: 'NSDL Gov' }
      ],
      screens: [
        {
          id: 'kyc-1',
          html: `
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px; color:#1a202c;">Identity Verification</h4>
              <p style="font-size:0.8rem; color:#718096; margin-bottom:16px;">We need to verify your PAN before you can trade.</p>
              <label style="font-size: 0.7rem; color: #4a5568; font-weight: bold; margin-bottom: 4px; display: block;">Permanent Account Number</label>
              <input type="text" class="v3-input" value="ABCDE1234F" readonly />
              <button class="v3-btn" onclick="simTrigger('kyc', 1)">Verify PAN securely</button>
            </div>
          `
        },
        {
          id: 'kyc-2',
          html: `
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
              <div class="skeleton-line" style="width: 60%;"></div>
              <div class="skeleton-line" style="width: 100%;"></div>
              <div class="skeleton-line" style="width: 80%;"></div>
              <p style="font-size:0.8rem; color:#718096; margin-top:24px; text-align:center;">Verifying with NSDL...</p>
            </div>
          `
        },
        {
          id: 'kyc-3',
          html: `
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card" style="text-align:center; padding: 40px 20px;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:16px;">✓</div>
              <h4 style="color:#1a202c;">Identity Verified</h4>
              <p style="font-size:0.8rem; color:#718096; margin-top:8px;">Welcome to CryptoX! Your account is fully activated.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('234ms')">Go to Portfolio</button>
            </div>
          `
        }
      ],
      actions: {
        1: async () => {
          transitionScreen('kyc-2');
          updateExpl('App validates input', 'Basic frontend sanity check before calling servers.', '-');
          await activateNode('n-app');
          await waitNext();
          
          updateExpl('App calls backend', 'Secure server-to-server communication ensures secrets aren\'t exposed.', 'Setu expects traffic only from verified backend servers.');
          await sendPacket('n-app', 'n-srv');
          await activateNode('n-srv');
          await waitNext();
          
          updateExpl('Routing to Setu', 'The app uses Setu SDK to trigger KYC verify.', 'Setu Gateway ingests the request via a simple REST API.');
          await sendPacket('n-srv', 'n-gw');
          await activateNode('n-gw');
          incApi();
          await waitNext();
          
          updateExpl('Authentication Layer', 'Ensuring the app is an authorized Setu partner before touching sensitive data.', 'Setu Auth verifies JWT tokens and rate limits the request.');
          await sendPacket('n-gw', 'n-auth');
          await activateNode('n-auth');
          await waitNext();
          
          updateExpl('Protocol Translation', 'Setu maps the simple JSON request to NSDL\'s complex XML format.', 'API Router formats the request and securely transmits it to the government.');
          await sendPacket('n-auth', 'n-rout');
          await activateNode('n-rout');
          await waitNext();
          
          updateExpl('NSDL Verification', 'The official government database checks if the PAN is valid and active.', 'Setu orchestrates the connection and waits for the upstream response.');
          await sendPacket('n-rout', 'n-nsdl');
          await activateNode('n-nsdl');
          await waitNext();
          
          updateExpl('Response Normalization', 'NSDL returns raw XML which is hard to parse.', 'Setu standardizes the XML back into a clean, predictable JSON response.');
          const nsdl = document.getElementById('n-nsdl');
          if (nsdl) nsdl.classList.add('success');
          await sendPacket('n-nsdl', 'n-rout', true);
          await sendPacket('n-rout', 'n-auth', true);
          await sendPacket('n-auth', 'n-gw', true);
          await waitNext();
          
          updateExpl('Success', 'The app receives the clear boolean result and updates the UI instantly.', 'End of Setu orchestration for this request.');
          await sendPacket('n-gw', 'n-srv', true);
          await sendPacket('n-srv', 'n-app', true);
          
          transitionScreen('kyc-3');
        }
      }
    },
    loan: {
      nodes: [
        { id: 'n-app', icon: '📱', label: 'CreditApp' },
        { id: 'n-gw', icon: '⚡', label: 'Setu Bureau' },
        { id: 'n-cibil', icon: '📊', label: 'CIBIL / Experian' }
      ],
      screens: [
        {
          id: 'loan-1',
          html: `
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px; color:#1a202c;">Check Score</h4>
              <p style="font-size:0.8rem; color:#718096; margin-bottom:16px;">We need your consent to fetch your credit report.</p>
              <button class="v3-btn" onclick="simTrigger('loan', 1)">Fetch Credit Score</button>
            </div>
          `
        },
        {
          id: 'loan-2',
          html: `
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <p style="font-size:0.8rem; color:#718096; margin-top:24px; text-align:center;">Querying Bureaus...</p>
            </div>
          `
        },
        {
          id: 'loan-3',
          html: `
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card" style="text-align:center;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:8px;">785</div>
              <h4 style="color:#1a202c;">Excellent Score</h4>
              <p style="font-size:0.8rem; color:#718096; margin-top:8px;">You have no defaults in the last 3 years.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('290ms')">Apply for Card</button>
            </div>
          `
        }
      ],
      actions: {
        1: async () => {
          transitionScreen('loan-2');
          updateExpl('Bureau Query', 'The app requests a credit pull.', 'Setu routes the request to the appropriate credit bureau (CIBIL, Experian, Equifax).');
          await activateNode('n-app');
          await sendPacket('n-app', 'n-gw');
          await activateNode('n-gw');
          incApi();
          await waitNext();
          
          updateExpl('Data Retrieval', 'The credit bureau searches its database.', 'Setu handles the legacy XML/SOAP protocols used by the bureaus securely.');
          await sendPacket('n-gw', 'n-cibil');
          await activateNode('n-cibil');
          await waitNext();
          
          updateExpl('Scoring', 'Bureau returns the report.', 'Setu parses the massive legacy file into a simple, developer-friendly JSON object containing the score.');
          const cib = document.getElementById('n-cibil');
          if (cib) cib.classList.add('success');
          await sendPacket('n-cibil', 'n-gw', true);
          await sendPacket('n-gw', 'n-app', true);
          
          transitionScreen('loan-3');
        }
      }
    },
    autopay: {
      nodes: [
        { id: 'n-app', icon: '📱', label: 'Subscription' },
        { id: 'n-gw', icon: '⚡', label: 'Setu Autopay' },
        { id: 'n-bank', icon: '🏦', label: 'Issuer Bank' }
      ],
      screens: [
        {
          id: 'auto-1',
          html: `
            <div class="v3-app-header">Netflix</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px; color:#1a202c;">Autopay Setup</h4>
              <p style="font-size:0.8rem; color:#718096; margin-bottom:16px;">Set up monthly auto-debit of ₹649 for your Premium plan.</p>
              <button class="v3-btn" onclick="simTrigger('autopay', 1)">Enable UPI Autopay</button>
            </div>
          `
        },
        {
          id: 'auto-2',
          html: `
            <div class="v3-app-header">Netflix</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <p style="font-size:0.8rem; color:#718096; margin-top:24px; text-align:center;">Registering mandate...</p>
            </div>
          `
        },
        {
          id: 'auto-3',
          html: `
            <div class="v3-app-header">Netflix</div>
            <div class="v3-app-card" style="text-align:center;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:16px;">✓</div>
              <h4 style="color:#1a202c;">Mandate Active</h4>
              <p style="font-size:0.8rem; color:#718096; margin-top:8px;">Autopay registered. Your next billing is on 18th Aug.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('380ms')">Start Watching</button>
            </div>
          `
        }
      ],
      actions: {
        1: async () => {
          transitionScreen('auto-2');
          updateExpl('Register Mandate', 'The subscription merchant requests a recurring collection authorization.', 'Setu wraps UPI 2.0 mandate creation endpoints into a unified API.');
          await activateNode('n-app');
          await sendPacket('n-app', 'n-gw');
          await activateNode('n-gw');
          incApi();
          await waitNext();
          
          updateExpl('Bank Authorization', 'The mandate request is routed to the customer\'s bank for execution.', 'Setu handles the callback endpoints and processes bank OTP callbacks.');
          await sendPacket('n-gw', 'n-bank');
          await activateNode('n-bank');
          await waitNext();
          
          updateExpl('Callback Ingestion', 'Bank confirms that the mandate has been created successfully.', 'Setu registers the webhook, confirms the UPI token, and notifies Netflix.');
          const bankNode = document.getElementById('n-bank');
          if (bankNode) bankNode.classList.add('success');
          await sendPacket('n-bank', 'n-gw', true);
          await sendPacket('n-gw', 'n-app', true);
          
          transitionScreen('auto-3');
        }
      }
    }
  };

  window.simTrigger = async (scen, actionId) => {
    document.querySelectorAll('.v3-btn').forEach(b => b.disabled = true);
    if(btnNext) {
      btnNext.style.display = 'block';
      btnNext.disabled = false;
    }
    await scenarios[scen].actions[actionId]();
    if(btnNext) btnNext.style.display = 'none';
    document.querySelectorAll('.v3-btn').forEach(b => b.disabled = false);
  };

  function waitNext() {
    return new Promise(resolve => {
      nextStepResolver = resolve;
    });
  }
  
  if(btnNext) {
    btnNext.addEventListener('click', () => {
      if (nextStepResolver) {
        let r = nextStepResolver;
        nextStepResolver = null; 
        r();
      }
    });
  }

  function transitionScreen(screenId) {
    const current = document.querySelector('.v3-screen.active');
    if (current) current.classList.replace('active', 'exit');
    
    const next = document.getElementById(screenId);
    if (next) {
      next.classList.remove('exit');
      next.classList.add('active');
    }
  }

  function updateExpl(what, why, role) {
    if(explWhat) explWhat.innerText = what;
    if(explWhy) explWhy.innerText = why;
    if(explRole) explRole.innerText = role;
    
    if(explWhat && explWhat.parentElement) {
      explWhat.parentElement.style.animation = 'none';
      explWhat.parentElement.offsetHeight; 
      explWhat.parentElement.style.animation = 'pulse 0.5s ease';
    }
  }

  function incApi() {
    apiCount++;
    if(metApi) {
      metApi.innerText = apiCount;
      metApi.classList.add('updated');
      setTimeout(() => metApi.classList.remove('updated'), 300);
    }
    if(metLat) metLat.innerText = Math.floor(Math.random() * 50 + 20) + 'ms';
  }

  async function activateNode(id) {
    const n = document.getElementById(id);
    if(n) {
      n.classList.add('active');
      srvCount++;
      if(metSrv) metSrv.innerText = srvCount;
    }
    await sleep(200);
  }

  async function sendPacket(fromId, toId, rev = false) {
    const track = document.getElementById('v3-diagram-track');
    const toNode = document.getElementById(toId);
    if(!track || !toNode) return;
    
    const path = document.createElement('div');
    path.className = 'v3-path';
    track.insertBefore(path, toNode); 
    
    const pkt = document.createElement('div');
    pkt.className = `v3-packet ${rev ? 'rev' : 'fwd'}`;
    path.appendChild(pkt);
    
    await sleep(600);
    path.remove();
  }

  async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  window.showCelebration = (time) => {
    if(celApis) celApis.innerText = apiCount;
    if(celTime) celTime.innerText = time;
    if(celNodes) celNodes.innerText = srvCount;
    if(celOverlay) celOverlay.classList.add('active');
  };

  function loadScenario(scenKey) {
    if(currentScenario === scenKey) return;
    currentScenario = scenKey;
    
    if(celOverlay) celOverlay.classList.remove('active');
    if(btnNext) btnNext.style.display = 'none';
    if(nextStepResolver) { nextStepResolver(); nextStepResolver = null; }
    
    apiCount = 0; srvCount = 0;
    if(metApi) metApi.innerText = '0';
    if(metSrv) metSrv.innerText = '0';
    if(metLat) metLat.innerText = '0ms';
    updateExpl('Interact with the phone to begin.', '-', '-');
    
    const sc = scenarios[scenKey];
    if(!sc || !diagramTrack || !appScreen) return;
    
    // Render Nodes
    diagramTrack.innerHTML = '';
    sc.nodes.forEach((n, i) => {
      const nd = document.createElement('div');
      nd.className = 'v3-node';
      nd.id = n.id;
      nd.innerHTML = `<i>${n.icon}</i><span>${n.label}</span>`;
      diagramTrack.appendChild(nd);
      if (i < sc.nodes.length - 1) {
        const line = document.createElement('div');
        line.className = 'v3-path';
        diagramTrack.appendChild(line);
      }
    });
    
    // Render Screens
    appScreen.innerHTML = '';
    sc.screens.forEach((s, i) => {
      const div = document.createElement('div');
      div.className = 'v3-screen ' + (i === 0 ? 'active' : 'exit');
      div.id = s.id;
      div.innerHTML = s.html;
      appScreen.appendChild(div);
    });
  }

  const v3Tabs = document.querySelectorAll('.v3-tab');
  v3Tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      v3Tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      loadScenario(tab.getAttribute('data-scenario'));
    });
  });

  if(btnRestart) {
    btnRestart.addEventListener('click', () => {
      currentScenario = null;
      const activeTab = document.querySelector('.v3-tab.active');
      if(activeTab) loadScenario(activeTab.getAttribute('data-scenario'));
    });
  }

  // Initialize V4 simulator
  loadScenario('kyc');
});
