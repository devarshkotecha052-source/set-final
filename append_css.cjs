const fs = require('fs');

const css_append = `
/* Experience Setu Simulation */
.sim-layout { display: grid; grid-template-columns: 250px 1fr 300px; gap: 32px; background: #fff; border: 1px solid var(--surface-border); border-radius: 12px; padding: 24px; box-shadow: var(--shadow); margin-top: 32px; min-height: 500px; }
.sim-controls { border-right: 1px solid var(--surface-border); padding-right: 24px; display: flex; flex-direction: column; gap: 24px; }
.control-group label { font-size: 0.85rem; font-weight: 700; color: var(--text-secondary); text-transform: uppercase; margin-bottom: 8px; display: block; }
.sim-select { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--surface-border); background: #f9fbfd; font-family: inherit; }
.persona-tabs { display: flex; background: #f9fbfd; border-radius: 6px; padding: 4px; border: 1px solid var(--surface-border); }
.p-tab { flex: 1; border: none; background: transparent; padding: 8px; font-size: 0.8rem; font-weight: 600; cursor: pointer; border-radius: 4px; color: var(--text-tertiary); transition: var(--transition); }
.p-tab.active { background: #fff; color: var(--primary-color); box-shadow: 0 2px 4px rgba(0,0,0,0.05); }

.step-tracker { flex: 1; margin-top: 16px; border-left: 2px solid var(--surface-border); padding-left: 16px; display: flex; flex-direction: column; gap: 16px; }
.track-step { position: relative; font-size: 0.85rem; color: var(--text-tertiary); transition: var(--transition); }
.track-step::before { content: ''; position: absolute; left: -21px; top: 4px; width: 8px; height: 8px; border-radius: 50%; background: var(--surface-border); transition: var(--transition); }
.track-step.active { color: var(--text-primary); font-weight: 600; }
.track-step.active::before { background: var(--primary-color); box-shadow: 0 0 0 3px rgba(66,202,205,0.2); }
.track-step.done { color: #38a169; }
.track-step.done::before { background: #38a169; }

/* Visual Network */
.sim-visual { position: relative; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #091016; border-radius: 12px; overflow: hidden; padding: 40px; }
.node-network { display: flex; align-items: center; justify-content: space-between; width: 100%; position: relative; z-index: 2; }
.net-node { width: 120px; height: 120px; background: rgba(255,255,255,0.05); border: 2px solid rgba(255,255,255,0.1); border-radius: 16px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: #fff; font-size: 0.85rem; font-weight: 600; text-align: center; backdrop-filter: blur(10px); transition: var(--transition); z-index: 5; }
.net-node .node-icon { font-size: 2rem; margin-bottom: 8px; }
.net-node.core { border-color: var(--primary-color); box-shadow: 0 0 30px rgba(66,202,205,0.2); background: rgba(66,202,205,0.1); }
.net-node.active { transform: scale(1.05); border-color: #38a169; box-shadow: 0 0 20px rgba(56,161,105,0.4); }

.net-path { flex: 1; height: 2px; background: rgba(255,255,255,0.1); position: relative; margin: 0 16px; z-index: 1; }
.packet-sim { position: absolute; top: -5px; left: 0; width: 12px; height: 12px; background: var(--primary-color); border-radius: 50%; opacity: 0; box-shadow: 0 0 10px var(--primary-color); z-index: 10; }
.packet-sim.animate-forward { animation: shootRight 1s ease-in-out forwards; opacity: 1; }
.packet-sim.animate-backward { animation: shootLeft 1s ease-in-out forwards; opacity: 1; background: #38a169; box-shadow: 0 0 10px #38a169; }

@keyframes shootRight { 0% { left: 0; opacity: 1; } 90% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
@keyframes shootLeft { 0% { left: 100%; opacity: 1; } 90% { opacity: 1; } 100% { left: 0; opacity: 0; } }

.sim-gamification { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(9,16,22,0.9); backdrop-filter: blur(10px); display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 20; opacity: 0; pointer-events: none; transition: var(--transition); }
.sim-gamification.visible { opacity: 1; pointer-events: all; }
.g-stats { display: flex; gap: 32px; margin-top: 24px; text-align: center; color: #fff; }
.g-stats span { font-size: 2rem; font-weight: 700; color: var(--primary-color); }

/* Dashboard */
.sim-dashboard { border-left: 1px solid var(--surface-border); padding-left: 24px; display: flex; flex-direction: column; }
.dash-header { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--surface-border); padding-bottom: 12px; margin-bottom: 16px; }
.view-toggle { display: flex; gap: 8px; }
.v-tab { background: transparent; border: 1px solid var(--surface-border); border-radius: 4px; padding: 4px 8px; font-size: 0.75rem; cursor: pointer; transition: var(--transition); }
.v-tab.active { background: var(--primary-color); color: #fff; border-color: var(--primary-color); }
.dash-body { display: none; flex: 1; flex-direction: column; gap: 16px; }
.dash-body.active { display: flex; animation: fadeIn 0.3s ease; }
.metric-row { display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; font-weight: 600; padding: 12px; background: #f9fbfd; border-radius: 6px; border: 1px solid var(--surface-border); }
.status-badge { padding: 4px 8px; border-radius: 12px; font-size: 0.75rem; background: #e2e8f0; color: #4a5568; }
.status-badge.running { background: #bee3f8; color: #2b6cb0; }
.status-badge.success { background: #c6f6d5; color: #22543d; }

.live-chart { display: flex; align-items: flex-end; gap: 4px; height: 100px; margin-top: auto; padding: 12px; background: #f9fbfd; border-radius: 6px; border: 1px solid var(--surface-border); }
.live-chart .bar { flex: 1; background: var(--primary-color); opacity: 0.5; border-radius: 2px 2px 0 0; transition: height 0.5s ease; }

.dev-view { background: #091016; padding: 16px; border-radius: 8px; overflow-y: auto; max-height: 400px; }
.btn-outline { background: transparent; border: 1px solid #fff; color: #fff; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 600; transition: var(--transition); }
.btn-outline:hover { background: #fff; color: #091016; }

@media (max-width: 1024px) {
  .sim-layout { grid-template-columns: 1fr; }
  .sim-controls { border-right: none; border-bottom: 1px solid var(--surface-border); padding-right: 0; padding-bottom: 24px; }
  .sim-dashboard { border-left: none; border-top: 1px solid var(--surface-border); padding-left: 0; padding-top: 24px; }
  .node-network { flex-direction: column; gap: 24px; }
  .net-path { width: 2px; height: 40px; margin: 0; }
  @keyframes shootRight { 0% { top: 0; opacity: 1; } 90% { opacity: 1; } 100% { top: 100%; opacity: 0; } }
  @keyframes shootLeft { 0% { top: 100%; opacity: 1; } 90% { opacity: 1; } 100% { top: 0; opacity: 0; } }
}
`;

fs.appendFileSync('style.css', css_append);
