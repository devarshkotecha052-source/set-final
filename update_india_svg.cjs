const fs = require('fs');

const oldMap = fs.readFileSync('old_map.txt', 'utf8');
const startIndex = oldMap.indexOf('<svg');
const endIndex = oldMap.indexOf('</svg>') + 6;
const rawOldSvg = oldMap.substring(startIndex, endIndex);

// Find the path string
const dStart = rawOldSvg.indexOf('d="M');
const dEnd = rawOldSvg.indexOf('"', dStart + 3);
const indiaPathD = rawOldSvg.substring(dStart + 3, dEnd);

const newSvgBlock = `
            <svg class="geo-base-map" viewBox="0 0 1024 1024" preserveAspectRatio="xMidYMid meet">
              <g transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)" stroke="none">
                <path class="india-outline" style="fill:rgba(66,202,205,0.1); stroke:rgba(66,202,205,0.3); stroke-width:15;" d="` + indiaPathD + `" />
              </g>
              
              <!-- SVG Paths overlay for API network -->
              <g class="geo-routes layer-network">
                <!-- BLR(430,760) to BOM(256,614) -->
                <path id="route-blr-bom" class="geo-path" d="M 430,760 Q 250,700 256,614" />
                <circle class="geo-packet"><animateMotion dur="2s" repeatCount="indefinite"><mpath href="#route-blr-bom"/></animateMotion></circle>
                
                <!-- BLR(430,760) to DEL(358,327) -->
                <path id="route-blr-del" class="geo-path" d="M 430,760 Q 450,500 358,327" />
                <circle class="geo-packet" style="animation-delay:0.5s;"><animateMotion dur="3s" repeatCount="indefinite"><mpath href="#route-blr-del"/></animateMotion></circle>
                
                <!-- BLR(430,760) to HYD(430,634) -->
                <path id="route-blr-hyd" class="geo-path" d="M 430,760 Q 450,700 430,634" />
                <circle class="geo-packet" style="animation-delay:1s;"><animateMotion dur="1.5s" repeatCount="indefinite"><mpath href="#route-blr-hyd"/></animateMotion></circle>
                
                <!-- BLR(430,760) to MAA(471,800) -->
                <path id="route-blr-maa" class="geo-path" d="M 430,760 Q 460,820 471,800" />
                <circle class="geo-packet" style="animation-delay:0.2s;"><animateMotion dur="1s" repeatCount="indefinite"><mpath href="#route-blr-maa"/></animateMotion></circle>
              </g>
            </svg>
            
            <!-- Absolute Hubs -->
            <div class="geo-hub hq layer-hq" style="top: 74%; left: 42%;" data-hub="blr" data-year="2018">
              <div class="geo-beacon"></div>
              <span>Bengaluru</span>
            </div>
            
            <div class="geo-hub layer-banks" style="top: 60%; left: 25%;" data-hub="bom" data-year="2019">
              <div class="geo-pulse"></div>
              <span>Mumbai</span>
            </div>
            
            <div class="geo-hub layer-stack" style="top: 32%; left: 35%;" data-hub="del" data-year="2020">
              <div class="geo-pulse"></div>
              <span>Delhi (UIDAI)</span>
            </div>
            
            <div class="geo-hub layer-banks" style="top: 62%; left: 42%;" data-hub="hyd" data-year="2021">
              <div class="geo-pulse"></div>
              <span>Hyderabad</span>
            </div>
            
            <div class="geo-hub layer-stack" style="top: 78%; left: 46%;" data-hub="maa" data-year="2022">
              <div class="geo-pulse"></div>
              <span>Chennai (AA)</span>
            </div>
`;

let indexHtml = fs.readFileSync('index.html', 'utf8');

const startTarget = '<svg class="geo-base-map"';
const endTarget = '</div>\n        </div>';

const startIndex2 = indexHtml.indexOf(startTarget);
const endIndex2 = indexHtml.indexOf(endTarget, startIndex2);

if (startIndex2 !== -1 && endIndex2 !== -1) {
    const finalHtml = indexHtml.substring(0, startIndex2) + newSvgBlock + '\n          ' + indexHtml.substring(endIndex2);
    fs.writeFileSync('index.html', finalHtml);
} else {
    console.log("Could not find replacement boundaries.");
}
