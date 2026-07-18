const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Insert Chart.js and Research Drawer container before main.js script
const scriptTag = '<script type="module" src="/main.js"></script>';
const drawerHTML = `
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  
  <!-- Research Drawer -->
  <div id="research-drawer" class="research-drawer">
    <div class="drawer-header">
      <h3 id="drawer-title" style="margin:0; font-size:1.4rem; color:#fff;">Research Module</h3>
      <span id="close-drawer" class="close-drawer">&times;</span>
    </div>
    <div class="drawer-body" id="drawer-body">
      <!-- Dynamic content will be injected here -->
    </div>
  </div>
`;
html = html.replace(scriptTag, drawerHTML + '\n  ' + scriptTag);

// 2. Add button to Hero Section
const heroActionTag = '<a href="#friction" class="btn-primary">Initialize Research</a>';
const heroButton = `${heroActionTag}
        <button class="btn-secondary explore-btn" data-module="overview" style="margin-left: 12px; background: rgba(255,255,255,0.05); color:#fff; border: 1px solid rgba(255,255,255,0.2); padding: 12px 24px; border-radius: 6px; cursor:pointer; font-weight:600; font-size: 1rem; transition: background 0.3s;">Explore Company Dashboard</button>`;
html = html.replace(heroActionTag, heroButton);

// 3. Add button to Friction Section
const frictionSliderTag = '<input type="range" min="0" max="100" value="50" class="slider-input" id="friction-slider">';
const frictionButton = `${frictionSliderTag}
          <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="problem" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Detailed Problem Study</button></div>`;
html = html.replace(frictionSliderTag, frictionButton);

// 4. Add button to Founders Section
const foundersEndTag = '<!-- Bio 3 -->\n          <div class="f-bio" id="bio-vision">\n            <h3>The Aadhaar & iSPIRT Connection</h3>\n            <p>Both founders met while operating at the very core of India\'s Digital Public Infrastructure (DPI). They realized that while the government built the rails (UPI, Aadhaar, Account Aggregator), private companies couldn\'t access them easily. Setu was born to be the missing "bridge" (Setu means bridge in Hindi) between these public goods and private innovation.</p>\n          </div>\n        </div>';
const foundersButton = `${foundersEndTag}
        <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="founders" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Founder Profiles</button></div>`;
html = html.replace(foundersEndTag, foundersButton);

// 5. Add button to Business Model Section
const bmcGridEndTag = '</div>\n      </div>\n    </div>\n  </section>';
// Wait, the first occurrence of bmcGridEndTag is at the end of section #model. Let's make it more specific:
const modelSectionEndTag = 'Key Partners</h4>\n          <p><strong>Banks:</strong> Axis, ICICI, HDFC.</p>\n          <p style="margin-top:12px; font-size:0.9rem; color:var(--text-tertiary);"><strong>Regulators:</strong> NPCI, RBI, UIDAI.<br><strong>Tech Giants:</strong> Pine Labs (now parent company).</p>\n        </div>\n      </div>\n    </div>\n  </section>';
const modelSectionButton = `Key Partners</h4>
          <p><strong>Banks:</strong> Axis, ICICI, HDFC.</p>
          <p style="margin-top:12px; font-size:0.9rem; color:var(--text-tertiary);"><strong>Regulators:</strong> NPCI, RBI, UIDAI.<br><strong>Tech Giants:</strong> Pine Labs (now parent company).</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="business_model" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Unit Economics & Canvas</button></div>
    </div>
  </section>`;
html = html.replace(modelSectionEndTag, modelSectionButton);

// 6. Add button to Experience Section
const experienceEndTag = '</div>\n          <button class="btn-primary" id="btn-v3-restart" style="margin-top:24px; width:100%;">Run Another Scenario</button>\n        </div>\n      </div>\n      \n    </div>\n  </section>';
const experienceButton = `</div>
          <button class="btn-primary" id="btn-v3-restart" style="margin-top:24px; width:100%;">Run Another Scenario</button>
        </div>
      </div>
      <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="products" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Detailed Product Breakdown</button></div>
    </div>
  </section>`;
html = html.replace(experienceEndTag, experienceButton);

// 7. Add button to Scale Section
const scaleSectionEndTag = '<span>API Calls/Mo</span>\n            </div>\n          </div>\n        </div>\n        \n      </div>';
const scaleSectionButton = `<span>API Calls/Mo</span>
            </div>
          </div>
        </div>
        <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="scale" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Ecosystem Hubs & Partners</button></div>
      </div>`;
html = html.replace(scaleSectionEndTag, scaleSectionButton);

// 8. Add button to Status Section
const statusSectionEndTag = '<h4>Threats</h4>\n          <p style="font-size:0.9rem; margin-top:8px;">Rise of well-funded competitors like M2P Fintech, Decentro, and RazorpayX entering the API infrastructure space.</p>\n        </div>\n      </div>';
const statusSectionButton = `<h4>Threats</h4>
          <p style="font-size:0.9rem; margin-top:8px;">Rise of well-funded competitors like M2P Fintech, Decentro, and RazorpayX entering the API infrastructure space.</p>
        </div>
      </div>
      <div style="text-align:center; margin-top:32px; width: 100%;"><button class="btn-primary explore-btn" data-module="status" style="background:var(--primary-color); border:none; padding:12px 24px; border-radius:6px; cursor:pointer; font-weight:bold; color:#091016; font-size: 0.9rem;">Explore Financial & SWOT Analysis</button></div>`;
html = html.replace(statusSectionEndTag, statusSectionButton);

fs.writeFileSync('index.html', html);
console.log('Successfully injected V2 elements into index.html');
