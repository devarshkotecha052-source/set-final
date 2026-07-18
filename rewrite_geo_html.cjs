const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<section id="scale"[^>]*>[\s\S]*?<!-- 5\. Status Today -->/;
const newHtml = `
  <section id="scale" class="section" style="background: #091016; color: #fff; position: relative; overflow: hidden;">
    <div class="container fade-up" style="max-width: 1600px; padding: 0 24px;">
      
      <div style="text-align: center; margin-bottom: 40px;">
        <span class="sec-tag" style="color:#62d3d6;">Geography & Scale</span>
        <h2 class="sec-title" style="color: #fff;">The India Stack Engine</h2>
        <p style="color: #a0aec0; max-width: 700px; margin: 16px auto 0;">Setu operates exclusively within India, building the connective tissue between citizens, fintechs, and the core India Stack.</p>
        
        <div class="geo-toggles" style="margin-top: 32px; display: flex; flex-wrap: wrap; justify-content: center; gap: 12px;">
          <button class="geo-chip active" data-layer="hq">Headquarters</button>
          <button class="geo-chip active" data-layer="banks">Partner Banks</button>
          <button class="geo-chip active" data-layer="stack">India Stack</button>
          <button class="geo-chip active" data-layer="network">API Network</button>
        </div>
      </div>
      
      <div class="geo-layout">
        
        <!-- Interactive Map Container (Left, 60%) -->
        <div class="geo-map-card">
          <!-- Timeline Slider for Map -->
          <div class="geo-timeline-control">
            <input type="range" id="geo-year-slider" min="2018" max="2023" value="2023" step="1" />
            <div class="geo-year-labels">
              <span>2018</span><span>2019</span><span>2020</span><span>2021</span><span>2022</span><span>2023+</span>
            </div>
          </div>
          
          <div class="geo-map-wrapper">
            <!-- Simplified Base India SVG -->
            <svg class="geo-base-map" viewBox="0 0 500 550" preserveAspectRatio="xMidYMid meet">
              <path class="india-outline" d="M180,10 L250,5 L320,30 L350,90 L420,130 L480,170 L480,260 L410,290 L390,390 L310,480 L230,530 L160,490 L100,400 L50,300 L20,200 L60,110 L120,60 Z" />
              
              <!-- SVG Paths overlay for API network -->
              <g class="geo-routes layer-network">
                <!-- Curve BLR to BOM -->
                <path id="route-blr-bom" class="geo-path" d="M 180,450 Q 120,380 90,310" />
                <circle class="geo-packet"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#route-blr-bom"/></animateMotion></circle>
                
                <!-- Curve BLR to DEL -->
                <path id="route-blr-del" class="geo-path" d="M 180,450 Q 220,300 200,120" />
                <circle class="geo-packet" style="animation-delay:0.5s;"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#route-blr-del"/></animateMotion></circle>
                
                <!-- Curve BLR to HYD -->
                <path id="route-blr-hyd" class="geo-path" d="M 180,450 Q 200,400 220,350" />
                <circle class="geo-packet" style="animation-delay:1s;"><animateMotion dur="1.5s" repeatCount="indefinite"><mpath href="#route-blr-hyd"/></animateMotion></circle>
                
                <!-- Curve BLR to MAA -->
                <path id="route-blr-maa" class="geo-path" d="M 180,450 Q 220,470 240,490" />
                <circle class="geo-packet" style="animation-delay:0.2s;"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#route-blr-maa"/></animateMotion></circle>
              </g>
            </svg>
            
            <!-- Absolute Hubs -->
            <div class="geo-hub hq layer-hq" style="top: 80%; left: 35%;" data-hub="blr" data-year="2018">
              <div class="geo-beacon"></div>
              <span>Bengaluru</span>
            </div>
            
            <div class="geo-hub layer-banks" style="top: 55%; left: 18%;" data-hub="bom" data-year="2019">
              <div class="geo-pulse"></div>
              <span>Mumbai</span>
            </div>
            
            <div class="geo-hub layer-stack" style="top: 20%; left: 38%;" data-hub="del" data-year="2020">
              <div class="geo-pulse"></div>
              <span>Delhi (UIDAI)</span>
            </div>
            
            <div class="geo-hub layer-banks" style="top: 62%; left: 42%;" data-hub="hyd" data-year="2021">
              <div class="geo-pulse"></div>
              <span>Hyderabad</span>
            </div>
            
            <div class="geo-hub layer-stack" style="top: 88%; left: 46%;" data-hub="maa" data-year="2022">
              <div class="geo-pulse"></div>
              <span>Chennai (AA)</span>
            </div>
            
          </div>
        </div>
        
        <!-- Contextual Info & KPIs (Right, 40%) -->
        <div class="geo-info-card">
          <div class="geo-info-header">
            <h3 id="geo-info-title">The Setu Network</h3>
            <span class="geo-info-badge" id="geo-info-year">2023 Operations</span>
          </div>
          <div class="geo-info-body">
            <p id="geo-info-desc">Setu's API infrastructure spans India's major financial and technological hubs. Hover over any node on the map to explore its specific role in the ecosystem, or use the timeline to trace our growth.</p>
          </div>
          
          <div class="geo-kpi-grid">
            <div class="geo-kpi">
              <div class="geo-kpi-ring">
                <svg viewBox="0 0 36 36"><path class="circle" stroke-dasharray="85, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                <div class="geo-kpi-val">85+</div>
              </div>
              <span>API Endpoints</span>
            </div>
            <div class="geo-kpi">
              <div class="geo-kpi-ring">
                <svg viewBox="0 0 36 36"><path class="circle" stroke-dasharray="99, 100" style="stroke:#38a169;" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                <div class="geo-kpi-val">99%</div>
              </div>
              <span>Uptime</span>
            </div>
            <div class="geo-kpi">
              <div class="geo-kpi-ring">
                <svg viewBox="0 0 36 36"><path class="circle" stroke-dasharray="40, 100" style="stroke:#f6ad55;" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" /></svg>
                <div class="geo-kpi-val">40M</div>
              </div>
              <span>API Calls/Mo</span>
            </div>
          </div>
        </div>
        
      </div>
      
      <!-- Ecosystem Diagram -->
      <div class="eco-diagram-wrapper fade-up">
        <h4 style="text-align:center; color:#a0aec0; margin-bottom:24px; font-weight:600; text-transform:uppercase; letter-spacing:0.1em; font-size:0.8rem;">How Setu Fits Into India</h4>
        <div class="eco-flow">
          <div class="eco-node" data-eco="citizen">
            <i class="fas fa-user"></i>
            <span>Citizen</span>
          </div>
          <div class="eco-arrow"></div>
          <div class="eco-node" data-eco="fintech">
            <i class="fas fa-mobile-alt"></i>
            <span>Fintech App</span>
          </div>
          <div class="eco-arrow highlight"></div>
          <div class="eco-node highlight" data-eco="setu">
            <img src="/setu-logo.svg" alt="Setu" style="height:20px; filter:brightness(0) invert(1);" />
          </div>
          <div class="eco-arrow highlight"></div>
          <div class="eco-node" data-eco="stack">
            <i class="fas fa-layer-group"></i>
            <span>India Stack</span>
          </div>
          <div class="eco-arrow"></div>
          <div class="eco-node" data-eco="bank">
            <i class="fas fa-university"></i>
            <span>Banks</span>
          </div>
        </div>
        <p id="eco-expl" style="text-align:center; margin-top:16px; font-size:0.85rem; color:#718096; min-height:40px;">Hover over any node above to understand its responsibility in the value chain.</p>
      </div>

    </div>
  </section>
  <!-- 5. Status Today -->
`;
html = html.replace(regex, newHtml);
fs.writeFileSync('index.html', html);
