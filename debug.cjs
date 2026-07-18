const { JSDOM } = require('jsdom');
const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');
const dom = new JSDOM(html, { runScripts: "dangerously" });
const window = dom.window;
const document = window.document;

// Mock some APIs for DOM testing
window.requestAnimationFrame = (cb) => setTimeout(cb, 0);

// Catch errors
window.addEventListener("error", (event) => {
  console.log("JSDOM Error:", event.error);
});

try {
  // Load main.js
  const js = fs.readFileSync('main.js', 'utf8');
  const script = document.createElement('script');
  script.textContent = js;
  document.body.appendChild(script);
  
  // Trigger DOMContentLoaded
  const event = document.createEvent('Event');
  event.initEvent('DOMContentLoaded', true, true);
  window.document.dispatchEvent(event);
  
  console.log("App Screen innerHTML length:", document.getElementById('v3-app-screen').innerHTML.length);
  console.log("Timeline innerHTML length:", document.getElementById('v3-timeline').innerHTML.length);
  
} catch (e) {
  console.error("Caught exception:", e);
}
