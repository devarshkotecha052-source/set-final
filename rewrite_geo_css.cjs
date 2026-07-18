const fs = require('fs');

const cssContent = `
/* Interactive Geography & Scale Section */
.geo-layout { display: grid; grid-template-columns: 6fr 4fr; gap: 48px; margin-top: 24px; min-height: 500px; }
@media (max-width: 1024px) { .geo-layout { grid-template-columns: 1fr; } }

/* Toggles */
.geo-chip { padding: 8px 16px; border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.05); border-radius: 20px; color: #a0aec0; font-size: 0.8rem; cursor: pointer; transition: var(--transition); }
.geo-chip:hover { background: rgba(255,255,255,0.1); }
.geo-chip.active { background: rgba(66,202,205,0.15); color: var(--primary-color); border-color: var(--primary-color); }

/* Map Container */
.geo-map-card { background: #0b141d; border-radius: 20px; padding: 24px; border: 1px solid rgba(255,255,255,0.05); box-shadow: inset 0 0 50px rgba(0,0,0,0.5); display: flex; flex-direction: column; position: relative; }
.geo-map-wrapper { flex: 1; position: relative; width: 100%; display: flex; align-items: center; justify-content: center; }

/* Base SVG */
.geo-base-map { width: 100%; height: 400px; filter: drop-shadow(0 0 20px rgba(66,202,205,0.1)); }
.india-outline { fill: none; stroke: rgba(66,202,205,0.3); stroke-width: 2; stroke-linejoin: round; }

/* Paths and Packets */
.geo-routes { transition: opacity 0.3s; }
.geo-path { fill: none; stroke: rgba(255,255,255,0.1); stroke-width: 2; stroke-dasharray: 5, 5; }
.geo-packet { r: 3; fill: var(--primary-color); filter: drop-shadow(0 0 5px var(--primary-color)); }

/* Hub Markers */
.geo-hub { position: absolute; display: flex; flex-direction: column; align-items: center; transform: translate(-50%, -50%); cursor: pointer; z-index: 10; opacity: 1; transition: opacity 0.3s, transform 0.3s; }
.geo-hub.hidden-by-year, .geo-hub.hidden-by-layer { opacity: 0; pointer-events: none; transform: translate(-50%, -40%); }
.geo-hub span { font-size: 0.7rem; color: #a0aec0; margin-top: 8px; background: rgba(0,0,0,0.6); padding: 2px 6px; border-radius: 4px; backdrop-filter: blur(4px); transition: color 0.3s; pointer-events: none; }
.geo-hub:hover span { color: #fff; }

.geo-beacon { width: 16px; height: 16px; background: var(--primary-color); border-radius: 50%; position: relative; }
.geo-beacon::after { content: ''; position: absolute; top: -12px; left: -12px; right: -12px; bottom: -12px; border-radius: 50%; border: 2px solid var(--primary-color); animation: ripple 2s infinite cubic-bezier(0.65, 0, 0.34, 1); }
@keyframes ripple { 0% { transform: scale(0.5); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }

.geo-pulse { width: 12px; height: 12px; background: #fff; border-radius: 50%; position: relative; box-shadow: 0 0 10px rgba(255,255,255,0.5); transition: background 0.3s, box-shadow 0.3s; }
.geo-hub:hover .geo-pulse { background: var(--primary-color); box-shadow: 0 0 15px var(--primary-color); }

/* Timeline */
.geo-timeline-control { margin-bottom: 24px; padding: 0 16px; }
#geo-year-slider { width: 100%; appearance: none; background: rgba(255,255,255,0.1); height: 4px; border-radius: 2px; outline: none; }
#geo-year-slider::-webkit-slider-thumb { appearance: none; width: 16px; height: 16px; border-radius: 50%; background: var(--primary-color); cursor: pointer; box-shadow: 0 0 10px rgba(66,202,205,0.5); }
.geo-year-labels { display: flex; justify-content: space-between; margin-top: 8px; font-size: 0.7rem; color: #718096; }

/* Info Panel */
.geo-info-card { background: #1a202c; border-radius: 20px; padding: 32px; border: 1px solid rgba(255,255,255,0.05); display: flex; flex-direction: column; }
.geo-info-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
#geo-info-title { color: #fff; font-size: 1.5rem; margin: 0; }
.geo-info-badge { background: rgba(66,202,205,0.15); color: var(--primary-color); padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; }
.geo-info-body { color: #a0aec0; font-size: 0.95rem; line-height: 1.6; margin-bottom: 32px; flex: 1; }

.geo-kpi-grid { display: flex; justify-content: space-between; gap: 16px; }
.geo-kpi { flex: 1; background: rgba(255,255,255,0.03); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; align-items: center; border: 1px solid rgba(255,255,255,0.05); }
.geo-kpi span { font-size: 0.7rem; color: #718096; margin-top: 12px; text-transform: uppercase; text-align: center; }

/* SVG Circular Progress */
.geo-kpi-ring { width: 60px; height: 60px; position: relative; }
.geo-kpi-ring svg { width: 100%; height: 100%; transform: rotate(-90deg); }
.geo-kpi-ring .circle { fill: none; stroke: var(--primary-color); stroke-width: 3; stroke-linecap: round; animation: progressFill 1.5s ease-out forwards; }
.geo-kpi-val { position: absolute; top: 0; left: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 1rem; font-weight: 700; color: #fff; }
@keyframes progressFill { 0% { stroke-dasharray: 0, 100; } }

/* Ecosystem Diagram */
.eco-diagram-wrapper { margin-top: 64px; background: rgba(255,255,255,0.02); border-radius: 24px; padding: 40px; border: 1px solid rgba(255,255,255,0.05); }
.eco-flow { display: flex; align-items: center; justify-content: space-between; }
.eco-node { width: 120px; height: 100px; background: #1a202c; border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; border: 1px solid rgba(255,255,255,0.1); cursor: pointer; transition: all 0.3s; z-index: 2; position: relative; }
.eco-node i { font-size: 1.5rem; color: #a0aec0; margin-bottom: 8px; transition: color 0.3s; }
.eco-node span { font-size: 0.8rem; color: #e2e8f0; font-weight: 600; }
.eco-node.highlight { border-color: var(--primary-color); background: rgba(66,202,205,0.1); box-shadow: 0 0 20px rgba(66,202,205,0.2); }
.eco-node:hover { transform: translateY(-5px); border-color: #fff; }
.eco-node:hover i { color: #fff; }

.eco-arrow { flex: 1; height: 2px; background: rgba(255,255,255,0.1); position: relative; z-index: 1; margin: 0 -10px; }
.eco-arrow.highlight { background: linear-gradient(90deg, rgba(66,202,205,0.2), var(--primary-color), rgba(66,202,205,0.2)); background-size: 200% 100%; animation: gradientMove 2s linear infinite; }
@keyframes gradientMove { 0% { background-position: 100% 0; } 100% { background-position: -100% 0; } }
`;

let style = fs.readFileSync('style.css', 'utf8');
fs.writeFileSync('style.css', style + cssContent);
