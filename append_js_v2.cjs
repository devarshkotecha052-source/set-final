const fs = require('fs');

const jsToAppend = `
// V2 Research Drawer and Analytics Logic
document.addEventListener('DOMContentLoaded', () => {
  const drawer = document.getElementById('research-drawer');
  const drawerTitle = document.getElementById('drawer-title');
  const drawerBody = document.getElementById('drawer-body');
  const closeDrawer = document.getElementById('close-drawer');
  
  let setuData = null;
  let currentChart = null;

  async function loadData() {
    if (!setuData) {
      try {
        const response = await fetch('./data/setu_data.json');
        setuData = await response.json();
      } catch (err) {
        console.error('Failed to load setu_data.json', err);
      }
    }
    return setuData;
  }

  function destroyCurrentChart() {
    if (currentChart) {
      currentChart.destroy();
      currentChart = null;
    }
  }

  // Bind Explore More buttons
  document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const moduleName = btn.getAttribute('data-module');
      const data = await loadData();
      if (!data) return;

      destroyCurrentChart();
      drawer.classList.add('active');
      renderModule(moduleName, data);
    });
  });

  if(closeDrawer) {
    closeDrawer.addEventListener('click', () => {
      drawer.classList.remove('active');
      destroyCurrentChart();
    });
  }

  function renderModule(moduleName, data) {
    if (moduleName === 'overview') {
      drawerTitle.innerText = "Company Overview";
      drawerBody.innerHTML = \`
        <div class="v2-kpi-grid">
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Legal Name</div>
            <div class="v2-kpi-val" style="font-size:0.9rem;">\${data.overview.legalName}</div>
          </div>
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Founded</div>
            <div class="v2-kpi-val">\${data.overview.founded}</div>
          </div>
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Headquarters</div>
            <div class="v2-kpi-val" style="font-size:0.9rem;">\${data.overview.headquarters}</div>
          </div>
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Valuation</div>
            <div class="v2-kpi-val">\${data.overview.latestValuation}</div>
          </div>
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Total Funding</div>
            <div class="v2-kpi-val">\${data.overview.totalFunding}</div>
          </div>
          <div class="v2-kpi-card">
            <div class="v2-kpi-lbl">Status</div>
            <div class="v2-kpi-val" style="font-size:0.9rem; color:#48bb78;">\${data.overview.companyStatus}</div>
          </div>
        </div>

        <div class="v2-section-title">Milestones & History</div>
        <div class="v2-timeline-vertical">
          \${data.history.map(h => \`
            <div class="v2-timeline-item">
              <div class="v2-timeline-year">\${h.year}</div>
              <div style="font-weight:600; font-size:0.9rem; margin-bottom:4px;">\${h.event}</div>
              <div style="font-size:0.8rem; color:#a0aec0;">\${h.detail}</div>
            </div>
          \`).join('')}
        </div>

        <div class="v2-section-title">Citations & References</div>
        <div class="v2-ref-box">
          \${data.references.map(r => \`<div style="margin-bottom:8px;">• \${r}</div>\`).join('')}
        </div>
      \`;
    }

    else if (moduleName === 'problem') {
      drawerTitle.innerText = "Detailed Problem Study";
      drawerBody.innerHTML = \`
        <div style="margin-bottom:20px; font-size:0.9rem; color:#a0aec0;">
          Before Setu, integrating banking services into apps required direct host-to-host connections. These integrations suffered from deep friction points:
        </div>

        <div class="v2-section-title">Traditional vs Setu Workflow</div>
        <table class="v2-table">
          <thead>
            <tr>
              <th>Friction Area</th>
              <th>Without Setu</th>
              <th>With Setu</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Workflow</strong></td>
              <td>\${data.problem.before.process}</td>
              <td>\${data.problem.after.process}</td>
            </tr>
            <tr>
              <td><strong>Time Delay</strong></td>
              <td style="color:#e53e3e;">\${data.problem.before.time}</td>
              <td style="color:#48bb78;">\${data.problem.after.time}</td>
            </tr>
            <tr>
              <td><strong>Cost Implication</strong></td>
              <td>\${data.problem.before.cost}</td>
              <td>\${data.problem.after.cost}</td>
            </tr>
            <tr>
              <td><strong>Compliance</strong></td>
              <td>\${data.problem.before.regulation}</td>
              <td>\${data.problem.after.regulation}</td>
            </tr>
          </tbody>
        </table>

        <div class="v2-section-title">Why Legacy Systems Failed</div>
        <div style="font-size:0.85rem; color:#cbd5e0; margin-bottom:16px;">
          Core Banking Systems (CBS) operate on ancient transaction engines built on mainframe servers. They lack modern HTTP APIs, rely heavily on custom ISO 8583 message layers, and require leased lines. This technical debt effectively blocked small startups from embedding financial services.
        </div>
      \`;
    }

    else if (moduleName === 'founders') {
      drawerTitle.innerText = "Founder Deep Dives";
      drawerBody.innerHTML = \`
        <div style="margin-bottom:20px; font-size:0.9rem; color:#a0aec0;">
          Profiles of the innovators behind the API bridge:
        </div>

        \${data.founders.map(f => \`
          <div style="background:rgba(255,255,255,0.02); padding:16px; border-radius:12px; margin-bottom:20px; border:1px solid rgba(255,255,255,0.05);">
            <h3 style="color:#fff; margin-bottom:4px;">\${f.name}</h3>
            <div style="font-size:0.8rem; color:var(--primary-color); font-weight:600; margin-bottom:12px;">\${f.title}</div>
            <p style="font-size:0.85rem; margin-bottom:12px;">\${f.bio}</p>
            <div style="font-size:0.8rem; color:#a0aec0;">
              <strong>Education:</strong> \${f.education}<br>
              <strong>Past Roles:</strong> \${f.previousRoles}<br>
              <strong>Current Status:</strong> \${f.currentRole}
            </div>
          </div>
        \`).join('')}

        <div class="v2-section-title">The Public Connection Graph</div>
        <div style="font-size:0.85rem; color:#cbd5e0;">
          Both founders operated inside <strong>iSPIRT</strong> (the volunteer think-tank behind India's digital public goods) and collaborated directly on building the developer community for <strong>UPI</strong>. Their shared realization that private tech companies struggled to connect with public rails directly inspired the inception of Setu.
        </div>
      \`;
    }

    else if (moduleName === 'business_model') {
      drawerTitle.innerText = "Business Canvas & Unit Economics";
      drawerBody.innerHTML = \`
        <div class="v2-section-title">Unit Economics</div>
        <div style="font-size:0.85rem; color:#cbd5e0; margin-bottom:24px;">
          Setu operates on a transaction-based subscription hybrid model. 
          <ul>
            <li style="margin-bottom:8px;"><strong>Payments (Collect/BBPS):</strong> Flat pricing per successful API call (~INR 1-5) or a % cut on high-ticket merchant auto-debits.</li>
            <li style="margin-bottom:8px;"><strong>Identity & KYC:</strong> Micro-payments per verify API call (e.g. INR 1 for PAN, INR 5 for Aadhaar eSign).</li>
            <li style="margin-bottom:8px;"><strong>Account Aggregator:</strong> SaaS subscription package for lending underwriters to query bank accounts.</li>
          </ul>
        </div>

        <div class="v2-section-title">Value Mix Canvas</div>
        <div style="font-size:0.85rem; color:#cbd5e0;">
          <strong>Key Value Drivers:</strong>
          <table class="v2-table">
            <tr>
              <td><strong>Partners</strong></td>
              <td>Axis, HDFC, Yes Bank, NPCI</td>
            </tr>
            <tr>
              <td><strong>Resources</strong></td>
              <td>Direct API bridges, Bank CBS lines</td>
            </tr>
            <tr>
              <td><strong>Cost Structure</strong></td>
              <td>Direct banking costs (70% of cost base), Tech infra, Compliance audits</td>
            </tr>
          </table>
        </div>
      \`;
    }

    else if (moduleName === 'products') {
      drawerTitle.innerText = "Product Suite Deep Dive";
      drawerBody.innerHTML = \`
        <div style="margin-bottom:20px; font-size:0.9rem; color:#a0aec0;">
          Setu's API products span identity verification, payments routing, and bank details fetching:
        </div>

        \${data.products.map(p => \`
          <div style="background:rgba(255,255,255,0.02); padding:16px; border-radius:12px; margin-bottom:16px; border:1px solid rgba(255,255,255,0.05);">
            <h4 style="color:#fff; margin-bottom:4px;">\${p.name}</h4>
            <div style="font-size:0.8rem; color:var(--primary-color); font-weight:600; margin-bottom:8px;">Launched: \${p.launch}</div>
            <p style="font-size:0.85rem; margin-bottom:8px;">\${p.desc}</p>
            <div style="font-size:0.8rem; color:#a0aec0;">
              <strong>Pricing Model:</strong> \${p.pricing}<br>
              <strong>Target Customers:</strong> \${p.customers}
            </div>
          </div>
        \`).join('')}
      \`;
    }

    else if (moduleName === 'scale') {
      drawerTitle.innerText = "Scale & Ecosystem Map";
      drawerBody.innerHTML = \`
        <div class="v2-section-title">Operational Scope</div>
        <div style="font-size:0.85rem; color:#cbd5e0; margin-bottom:24px;">
          With Pine Labs' backing, Setu APIs are integrated into India's largest merchant payment networks. 
          <ul>
            <li style="margin-bottom:8px;"><strong>API Volume:</strong> Processing over 40 million API queries monthly.</li>
            <li style="margin-bottom:8px;"><strong>Partner Network:</strong> Directly connected with over 15 major public and private banks.</li>
            <li style="margin-bottom:8px;"><strong>Fintechs Enabled:</strong> 300+ live digital consumer platforms (including neo-banks, lending startups, and wealth apps).</li>
          </ul>
        </div>
      \`;
    }

    else if (moduleName === 'status') {
      drawerTitle.innerText = "Financial & Competitor Matrix";
      drawerBody.innerHTML = \`
        <div class="v2-section-title">Public Financial Performance (FY20 - FY23)</div>
        <div class="v2-chart-container">
          <canvas id="revenueChart" width="400" height="250"></canvas>
        </div>

        <div class="v2-section-title">SWOT Strategic Context</div>
        <div style="font-size:0.85rem; color:#cbd5e0; margin-bottom:24px;">
          Setu's high-tech infrastructure makes them the ultimate acquisition play for Pine Labs, but their standalone P&L shows wide losses (INR -31.7 Cr in FY23) due to heavy investments in product building and compliance.
        </div>

        <div class="v2-section-title">Competitor Comparison</div>
        <table class="v2-table">
          <thead>
            <tr>
              <th>Competitor</th>
              <th>Strength</th>
              <th>Weakness</th>
            </tr>
          </thead>
          <tbody>
            \${data.competitors.map(c => \`
              <tr>
                <td><strong>\${c.name}</strong></td>
                <td>\${c.strengths}</td>
                <td>\${c.weaknesses}</td>
              </tr>
            \`).join('')}
          </tbody>
        </table>
      \`;

      // Render Chart.js line graph for revenue vs losses
      const ctx = document.getElementById('revenueChart').getContext('2d');
      const years = data.financials.revenueHistory.map(r => r.year);
      const revs = data.financials.revenueHistory.map(r => parseFloat(r.revenue.replace('INR ', '').replace(' Cr', '')));
      const losses = data.financials.revenueHistory.map(r => parseFloat(r.loss.replace('INR ', '').replace(' Cr', '')));

      currentChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: years,
          datasets: [
            {
              label: 'Revenue (INR Cr)',
              data: revs,
              borderColor: '#42cacd',
              backgroundColor: 'rgba(66,202,205,0.1)',
              borderWidth: 2,
              fill: true
            },
            {
              label: 'Losses (INR Cr)',
              data: losses,
              borderColor: '#e53e3e',
              backgroundColor: 'rgba(229,62,62,0.1)',
              borderWidth: 2,
              fill: true
            }
          ]
        },
        options: {
          responsive: true,
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
  }
});
`;

let mainJs = fs.readFileSync('main.js', 'utf8');
fs.writeFileSync('main.js', mainJs + '\n' + jsToAppend);
console.log('Successfully appended V2 JS logic to main.js');
