const fs = require('fs');

const jsContent = `
// Geography & Scale Interactive Logic
document.addEventListener('DOMContentLoaded', () => {
  const geoSlider = document.getElementById('geo-year-slider');
  const hubs = document.querySelectorAll('.geo-hub');
  const chips = document.querySelectorAll('.geo-chip');
  
  const infoTitle = document.getElementById('geo-info-title');
  const infoYear = document.getElementById('geo-info-year');
  const infoDesc = document.getElementById('geo-info-desc');
  const networkLayer = document.querySelector('.layer-network');
  
  const ecoNodes = document.querySelectorAll('.eco-node');
  const ecoExpl = document.getElementById('eco-expl');
  
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
  
  const ecoData = {
    citizen: "The end consumer requesting a financial service (e.g., applying for a loan, making a payment).",
    fintech: "The consumer-facing application (e.g., Groww, CRED) that integrates Setu's APIs to offer the service.",
    setu: "The orchestration engine. Setu translates the app's request, handles security/routing, and standardizes responses.",
    stack: "India's digital public infrastructure (Aadhaar, UPI, Account Aggregator) securely providing identity and data.",
    bank: "The regulated financial institution providing the underlying capital, account, or credit."
  };

  // 1. Timeline Logic
  if(geoSlider) {
    geoSlider.addEventListener('input', (e) => {
      const year = parseInt(e.target.value);
      
      hubs.forEach(hub => {
        const hubYear = parseInt(hub.getAttribute('data-year'));
        if(year >= hubYear) {
          hub.classList.remove('hidden-by-year');
        } else {
          hub.classList.add('hidden-by-year');
        }
      });
      
      // If network layer is enabled via chips, hide it before 2019
      if(networkLayer && !networkLayer.classList.contains('hidden-by-layer')) {
        networkLayer.style.opacity = year >= 2019 ? '1' : '0';
      }
      
      infoTitle.innerText = "Ecosystem Growth";
      infoYear.innerText = "Year " + year;
      
      if(year === 2018) infoDesc.innerText = "Setu founded in Bengaluru. Initial infrastructure laid down.";
      if(year === 2019) infoDesc.innerText = "Expansion into Mumbai to connect with partner banks and NBFCs.";
      if(year === 2020) infoDesc.innerText = "Integration with Delhi's UIDAI and NSDL government stacks.";
      if(year === 2021) infoDesc.innerText = "Hyderabad node opens to support massive fintech startup volume.";
      if(year >= 2022) infoDesc.innerText = "Chennai node handles the Account Aggregator revolution. Full India routing active.";
    });
  }
  
  // 2. Map Hub Hover/Click
  hubs.forEach(hub => {
    hub.addEventListener('mouseenter', () => {
      const id = hub.getAttribute('data-hub');
      const data = hubData[id];
      if(data) {
        infoTitle.innerText = data.title;
        infoYear.innerText = data.badge;
        infoDesc.innerText = data.desc;
        infoTitle.style.animation = 'none';
        infoTitle.offsetHeight; 
        infoTitle.style.animation = 'pulse 0.5s ease';
      }
    });
  });
  
  // 3. Layer Toggles
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chip.classList.toggle('active');
      const layer = chip.getAttribute('data-layer');
      const isActive = chip.classList.contains('active');
      
      if(layer === 'network' && networkLayer) {
        if(isActive && parseInt(geoSlider.value) >= 2019) {
          networkLayer.style.opacity = '1';
          networkLayer.classList.remove('hidden-by-layer');
        } else {
          networkLayer.style.opacity = '0';
          networkLayer.classList.add('hidden-by-layer');
        }
      } else {
        document.querySelectorAll('.layer-' + layer).forEach(el => {
          if(isActive) el.classList.remove('hidden-by-layer');
          else el.classList.add('hidden-by-layer');
        });
      }
    });
  });
  
  // 4. Ecosystem Diagram Hover
  ecoNodes.forEach(node => {
    node.addEventListener('mouseenter', () => {
      const id = node.getAttribute('data-eco');
      ecoExpl.innerText = ecoData[id] || "Hover over any node above to understand its responsibility in the value chain.";
    });
    node.addEventListener('mouseleave', () => {
      ecoExpl.innerText = "Hover over any node above to understand its responsibility in the value chain.";
    });
  });

});
`;

let js = fs.readFileSync('main.js', 'utf8');
fs.writeFileSync('main.js', js + jsContent);
