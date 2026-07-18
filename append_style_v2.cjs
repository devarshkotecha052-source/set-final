const fs = require('fs');

const cssToAppend = `
/* Research Drawer V2 Style */
.research-drawer {
  position: fixed;
  top: 0;
  right: -550px;
  width: 500px;
  height: 100%;
  background: rgba(9, 16, 22, 0.98);
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: -15px 0 45px rgba(0, 0, 0, 0.6);
  z-index: 1050;
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  padding: 30px;
  overflow-y: auto;
  color: #f7fafc;
}
.research-drawer.active {
  right: 0;
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 20px;
  margin-bottom: 24px;
}
.close-drawer {
  font-size: 2rem;
  cursor: pointer;
  color: #718096;
  transition: color 0.3s;
  line-height: 1;
}
.close-drawer:hover {
  color: #fff;
}
.drawer-body {
  font-size: 0.95rem;
  line-height: 1.6;
}

/* Custom Scrollbar for Drawer */
.research-drawer::-webkit-scrollbar {
  width: 6px;
}
.research-drawer::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
.research-drawer::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.15);
  border-radius: 3px;
}

/* V2 Dashboard UI Elements */
.v2-kpi-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}
.v2-kpi-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 16px;
  border-radius: 12px;
  transition: border-color 0.3s;
}
.v2-kpi-card:hover {
  border-color: var(--primary-color);
}
.v2-kpi-lbl {
  font-size: 0.75rem;
  color: #a0aec0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: 6px;
}
.v2-kpi-val {
  font-size: 1.1rem;
  font-weight: 700;
  color: #fff;
}

.v2-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
  margin-bottom: 24px;
  font-size: 0.85rem;
}
.v2-table th, .v2-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.v2-table th {
  color: #a0aec0;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
.v2-table tr:hover {
  background: rgba(255, 255, 255, 0.02);
}

.v2-section-title {
  font-size: 1.1rem;
  margin-top: 28px;
  margin-bottom: 16px;
  color: var(--primary-color);
  font-weight: 600;
  border-left: 3px solid var(--primary-color);
  padding-left: 12px;
}

.v2-timeline-vertical {
  position: relative;
  margin-left: 20px;
  padding-left: 24px;
  border-left: 2px solid rgba(255, 255, 255, 0.05);
}
.v2-timeline-item {
  position: relative;
  margin-bottom: 24px;
}
.v2-timeline-item::before {
  content: '';
  position: absolute;
  left: -31px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--primary-color);
  border: 2px solid rgba(9, 16, 22, 0.98);
}
.v2-timeline-year {
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 4px;
}

/* Radar/Chart Wrapper */
.v2-chart-container {
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Reference block */
.v2-ref-box {
  background: rgba(255, 255, 255, 0.01);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  padding: 16px;
  border-radius: 8px;
  font-size: 0.8rem;
  color: #a0aec0;
}

@media (max-width: 550px) {
  .research-drawer {
    width: 100%;
    right: -100%;
  }
}
`;

let style = fs.readFileSync('style.css', 'utf8');
fs.writeFileSync('style.css', style + '\n' + cssToAppend);
console.log('Successfully appended V2 css to style.css');
