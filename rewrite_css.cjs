const fs = require('fs');

const cssAppend = `
/* Interactive Guided Explanation Additions */
.narrative-block { margin-bottom: 16px; border-left: 3px solid var(--primary-color); padding-left: 12px; }
.narrative-block h5 { font-size: 0.85rem; color: var(--text-tertiary); text-transform: uppercase; margin-bottom: 4px; }
.narrative-block p { font-size: 0.95rem; line-height: 1.5; color: var(--text-primary); }
.tech-insight { margin-top: 24px; background: #f9fbfd; padding: 12px; border: 1px solid var(--surface-border); border-radius: 6px; cursor: pointer; font-size: 0.9rem; font-weight: 600; color: var(--text-secondary); }

/* Final Learning Summary */
.learning-summary { text-align: left; padding: 32px; background: #fff; border-radius: 12px; box-shadow: var(--shadow); max-width: 500px; color: var(--text-primary); }
.summary-content p { margin-bottom: 12px; font-size: 0.95rem; line-height: 1.5; }

/* Interactive Modals */
.node-modal { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(9,16,22,0.8); backdrop-filter: blur(5px); display: flex; align-items: center; justify-content: center; z-index: 100; opacity: 0; pointer-events: none; transition: var(--transition); }
.node-modal.visible { opacity: 1; pointer-events: all; }
.node-modal-content { background: #fff; padding: 32px; border-radius: 12px; width: 400px; position: relative; box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
.close-modal { position: absolute; top: 16px; right: 16px; font-size: 1.5rem; cursor: pointer; color: var(--text-tertiary); transition: var(--transition); }
.close-modal:hover { color: #e53e3e; }
`;

fs.appendFileSync('style.css', cssAppend);
