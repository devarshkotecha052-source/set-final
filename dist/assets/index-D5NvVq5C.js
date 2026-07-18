(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),document.addEventListener(`DOMContentLoaded`,()=>{let e=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&e.target.classList.add(`visible`)})},{threshold:.1});document.querySelectorAll(`.fade-up, .stagger-item`).forEach(t=>{e.observe(t)});let t=document.querySelectorAll(`.v3-tab:not(.disabled)`),n=document.getElementById(`v3-app-screen`),r=document.getElementById(`v3-diagram-track`),i=document.getElementById(`v3-what`),a=document.getElementById(`v3-why`),o=document.getElementById(`v3-role`),s=document.getElementById(`met-api`),c=document.getElementById(`met-lat`),l=document.getElementById(`met-srv`),u=document.getElementById(`v3-celebration`),d=document.getElementById(`cel-apis`),f=document.getElementById(`cel-time`),p=document.getElementById(`cel-nodes`),m=document.getElementById(`btn-v3-restart`),h=document.getElementById(`btn-next-step`),g=null,_=0,v=0,y=null,b={kyc:{nodes:[{id:`n-app`,icon:`📱`,label:`App Frontend`},{id:`n-srv`,icon:`💻`,label:`App Server`},{id:`n-gw`,icon:`⚡`,label:`Setu Gateway`},{id:`n-auth`,icon:`🔒`,label:`Auth Layer`},{id:`n-rout`,icon:`🔀`,label:`API Router`},{id:`n-nsdl`,icon:`🏛️`,label:`NSDL Gov`}],screens:[{id:`kyc-1`,html:`
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px;">Identity Verification</h4>
              <p style="font-size:0.85rem; color:#718096; margin-bottom:16px;">We need to verify your PAN before you can trade.</p>
              <label style="font-size: 0.75rem; color: #4a5568; font-weight: bold; margin-bottom: 4px; display: block;">Permanent Account Number</label>
              <input type="text" class="v3-input" value="ABCDE1234F" readonly />
              <button class="v3-btn" onclick="simTrigger('kyc', 1)">Verify PAN securely</button>
            </div>
          `},{id:`kyc-2`,html:`
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
              <div class="skeleton-line" style="width: 60%;"></div>
              <div class="skeleton-line" style="width: 100%;"></div>
              <div class="skeleton-line" style="width: 80%;"></div>
              <p style="font-size:0.85rem; color:#718096; margin-top:24px; text-align:center;">Verifying with NSDL...</p>
            </div>
          `},{id:`kyc-3`,html:`
            <div class="v3-app-header">CryptoX</div>
            <div class="v3-app-card" style="text-align:center; padding: 40px 20px;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:16px;">✓</div>
              <h4>Identity Verified</h4>
              <p style="font-size:0.85rem; color:#718096; margin-top:8px;">Welcome to CryptoX! Your account is fully activated.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('234ms')">Go to Portfolio</button>
            </div>
          `}],actions:{1:async()=>{S(`kyc-2`),C(`App validates input`,`Basic frontend sanity check before calling servers.`,`-`),await T(`n-app`),await x(),C(`App calls backend`,`Secure server-to-server communication ensures secrets aren't exposed.`,`Setu expects traffic only from verified backend servers.`),await E(`n-app`,`n-srv`),await T(`n-srv`),await x(),C(`Routing to Setu`,`The app uses Setu SDK to trigger KYC verify.`,`Setu Gateway ingests the request via a simple REST API.`),await E(`n-srv`,`n-gw`),await T(`n-gw`),w(),await x(),C(`Authentication Layer`,`Ensuring the app is an authorized Setu partner before touching sensitive data.`,`Setu Auth verifies JWT tokens and rate limits the request.`),await E(`n-gw`,`n-auth`),await T(`n-auth`),await x(),C(`Protocol Translation`,`Setu maps the simple JSON request to NSDL's complex XML format.`,`API Router formats the request and securely transmits it to the government.`),await E(`n-auth`,`n-rout`),await T(`n-rout`),await x(),C(`NSDL Verification`,`The official government database checks if the PAN is valid and active.`,`Setu orchestrates the connection and waits for the upstream response.`),await E(`n-rout`,`n-nsdl`),await T(`n-nsdl`),await x(),C(`Response Normalization`,`NSDL returns raw XML which is hard to parse.`,`Setu standardizes the XML back into a clean, predictable JSON response.`),document.getElementById(`n-nsdl`).classList.add(`success`),await E(`n-nsdl`,`n-rout`,!0),await E(`n-rout`,`n-auth`,!0),await E(`n-auth`,`n-gw`,!0),await x(),C(`Success`,`The app receives the clear boolean result and updates the UI instantly.`,`End of Setu orchestration for this request.`),await E(`n-gw`,`n-srv`,!0),await E(`n-srv`,`n-app`,!0),S(`kyc-3`)}}},aa:{nodes:[{id:`n-app`,icon:`📱`,label:`App Frontend`},{id:`n-gw`,icon:`⚡`,label:`Setu Gateway`},{id:`n-fiu`,icon:`🔍`,label:`FIU Module`},{id:`n-cons`,icon:`📝`,label:`Consent Mgr`},{id:`n-fip`,icon:`🏦`,label:`HDFC Bank (FIP)`}],screens:[{id:`aa-1`,html:`
            <div class="v3-app-header">LendSmart</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px;">Loan Eligibility</h4>
              <p style="font-size:0.85rem; color:#718096; margin-bottom:16px;">We need 6 months of bank statements to assess your loan.</p>
              <button class="v3-btn" onclick="simTrigger('aa', 1)">Link Bank Account</button>
            </div>
          `},{id:`aa-2`,html:`
            <div class="v3-app-header" style="color: #42cacd;">Setu AA Screen</div>
            <div class="v3-app-card" style="border: 2px solid #42cacd;">
              <h4 style="margin-bottom:8px;">Approve Data Share</h4>
              <div style="background:#f4f6f8; padding: 12px; border-radius: 8px; margin-bottom: 16px; font-size: 0.8rem;">
                <strong>Bank:</strong> HDFC Bank Ltd<br>
                <strong>Duration:</strong> 6 Months<br>
                <strong>Purpose:</strong> Loan Underwriting
              </div>
              <button class="v3-btn" style="background:#42cacd;" onclick="simTrigger('aa', 2)">I Approve</button>
            </div>
          `},{id:`aa-3`,html:`
            <div class="v3-app-header">LendSmart</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <div class="skeleton-line" style="width: 80%;"></div>
               <p style="font-size:0.85rem; color:#718096; margin-top:24px; text-align:center;">Decrypting Bank Data...</p>
            </div>
          `},{id:`aa-4`,html:`
            <div class="v3-app-header">LendSmart</div>
            <div class="v3-app-card" style="text-align:center;">
              <h4 style="color:#38a169;">Approved: ₹5,00,000</h4>
              <p style="font-size:0.85rem; color:#718096; margin-top:8px;">Based on your healthy cash flows, you are pre-approved!</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('412ms')">Accept Loan</button>
            </div>
          `}],actions:{1:async()=>{S(`aa-2`),C(`Request Consent`,`App requests the Account Aggregator interface.`,`Setu generates a secure RBI-compliant webview (visible on the phone).`),await T(`n-app`),await E(`n-app`,`n-gw`),await T(`n-gw`),await E(`n-gw`,`n-cons`),await T(`n-cons`),w()},2:async()=>{S(`aa-3`),C(`Data Fetch Triggered`,`User approved the consent. We must now retrieve the actual bank data.`,`Setu acts as the Financial Information User (FIU) on behalf of LendSmart.`),await x(),await E(`n-cons`,`n-fiu`),await T(`n-fiu`),await E(`n-fiu`,`n-fip`),await T(`n-fip`),w(),C(`Bank Packing Data`,`The user's bank (FIP) queries its core banking system for 6 months of statements.`,`Setu securely polls or waits for a webhook from the bank.`),await x(),C(`Data Decryption`,`The bank statement is returned heavily encrypted to prevent tampering.`,`Setu decrypts it locally and parses the raw ISO formats into clean JSON.`),document.getElementById(`n-fip`).classList.add(`success`),await E(`n-fip`,`n-fiu`,!0),await E(`n-fiu`,`n-gw`,!0),await E(`n-gw`,`n-app`,!0),await x(),C(`Underwriting Complete`,`LendSmart runs its underwriting rules on the decrypted JSON.`,`-`),S(`aa-4`)}}},payment:{nodes:[{id:`n-app`,icon:`📱`,label:`QuickPay`},{id:`n-gw`,icon:`⚡`,label:`Setu API`},{id:`n-upi`,icon:`🔄`,label:`UPI Switch`},{id:`n-npci`,icon:`🏦`,label:`NPCI Core`}],screens:[{id:`pay-1`,html:`
            <div class="v3-app-header">QuickPay</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px; text-align:center;">Send to Merchant</h4>
              <input type="text" class="v3-input" value="₹2,500" readonly style="font-size:1.5rem; text-align:center; font-weight:bold;" />
              <button class="v3-btn" onclick="simTrigger('payment', 1)">Pay Securely</button>
            </div>
          `},{id:`pay-2`,html:`
            <div class="v3-app-header">QuickPay</div>
            <div class="v3-app-card" style="text-align:center; padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <div class="skeleton-line" style="width: 60%;"></div>
               <p style="font-size:0.85rem; color:#718096; margin-top:24px;">Please authorize on your UPI app...</p>
            </div>
          `},{id:`pay-3`,html:`
            <div class="v3-app-header">QuickPay</div>
            <div class="v3-app-card" style="text-align:center;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:16px;">✓</div>
              <h4 style="color:#38a169;">Payment Success</h4>
              <p style="font-size:0.85rem; color:#718096; margin-top:8px;">Transaction SETU12345 confirmed.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('1.2s')">View Receipt</button>
            </div>
          `}],actions:{1:async()=>{S(`pay-2`),C(`UPI Collect Initiated`,`A payment request is triggered to the user's VPA (UPI ID).`,`Setu abstracts away the complex UPI spec via a single REST API call.`),await T(`n-app`),await E(`n-app`,`n-gw`),await T(`n-gw`),w(),await x(),C(`NPCI Routing`,`The request travels to the central NPCI switch.`,`Setu translates the REST API call into ISO standard banking messages that NPCI requires.`),await E(`n-gw`,`n-upi`),await T(`n-upi`),await E(`n-upi`,`n-npci`),await T(`n-npci`),await x(),C(`Webhook Confirmation`,`The user opened their GPay/PhonePe and entered their PIN.`,`Setu receives the async webhook from NPCI and instantly notifies the merchant.`),document.getElementById(`n-npci`).classList.add(`success`),await E(`n-npci`,`n-upi`,!0),await E(`n-upi`,`n-gw`,!0),await E(`n-gw`,`n-app`,!0),S(`pay-3`)}}},statement:{nodes:[{id:`n-app`,icon:`📱`,label:`MoneyView`},{id:`n-gw`,icon:`⚡`,label:`Setu API`},{id:`n-parser`,icon:`📄`,label:`Statement Parser`},{id:`n-engine`,icon:`⚙️`,label:`Categorization`}],screens:[{id:`stat-1`,html:`
            <div class="v3-app-header">MoneyView</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px;">Upload Statement</h4>
              <p style="font-size:0.85rem; color:#718096; margin-bottom:16px;">Upload your PDF e-statement to analyze your spending.</p>
              <button class="v3-btn" onclick="simTrigger('statement', 1)">Upload statement.pdf</button>
            </div>
          `},{id:`stat-2`,html:`
            <div class="v3-app-header">MoneyView</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <div class="skeleton-line" style="width: 80%;"></div>
               <p style="font-size:0.85rem; color:#718096; margin-top:24px; text-align:center;">Extracting transactions...</p>
            </div>
          `},{id:`stat-3`,html:`
            <div class="v3-app-header">MoneyView</div>
            <div class="v3-app-card">
              <h4 style="color:#38a169;">Insights Ready</h4>
              <div style="display:flex; justify-content:space-between; margin-top:16px; padding-bottom:8px; border-bottom:1px solid #e2e8f0;">
                <span style="font-size:0.8rem; font-weight:600;">Food & Dining</span>
                <span style="font-size:0.8rem; color:#e53e3e;">-₹12,400</span>
              </div>
              <div style="display:flex; justify-content:space-between; margin-top:8px; padding-bottom:8px; border-bottom:1px solid #e2e8f0;">
                <span style="font-size:0.8rem; font-weight:600;">Salary</span>
                <span style="font-size:0.8rem; color:#38a169;">+₹85,000</span>
              </div>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('1.5s')">View Full Report</button>
            </div>
          `}],actions:{1:async()=>{S(`stat-2`),C(`File Upload`,`The user uploads a password-protected PDF bank statement.`,`Setu securely ingests the file via API.`),await T(`n-app`),await E(`n-app`,`n-gw`),await T(`n-gw`),w(),await x(),C(`PDF Parsing`,`The PDF is a visual document, not structured data.`,`Setu's proprietary parser reads the document structure, applies the password, and extracts raw transaction strings.`),await E(`n-gw`,`n-parser`),await T(`n-parser`),await x(),C(`ML Categorization`,`Raw strings like "UPI-SWIGGY-1234" need context.`,`Setu's AI engine categorizes it as "Food & Dining" and detects if it's a credit or debit.`),await E(`n-parser`,`n-engine`),await T(`n-engine`),await x(),C(`Insights Delivery`,`The app receives perfectly structured JSON data.`,`Setu formats the machine learning output into clean, ready-to-use JSON.`),document.getElementById(`n-engine`).classList.add(`success`),await E(`n-engine`,`n-parser`,!0),await E(`n-parser`,`n-gw`,!0),await E(`n-gw`,`n-app`,!0),S(`stat-3`)}}},loan:{nodes:[{id:`n-app`,icon:`📱`,label:`CreditApp`},{id:`n-gw`,icon:`⚡`,label:`Setu Bureau`},{id:`n-cibil`,icon:`📊`,label:`CIBIL / Experian`}],screens:[{id:`loan-1`,html:`
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px;">Check Score</h4>
              <p style="font-size:0.85rem; color:#718096; margin-bottom:16px;">We need your consent to fetch your credit report.</p>
              <button class="v3-btn" onclick="simTrigger('loan', 1)">Fetch Credit Score</button>
            </div>
          `},{id:`loan-2`,html:`
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <p style="font-size:0.85rem; color:#718096; margin-top:24px; text-align:center;">Querying Bureaus...</p>
            </div>
          `},{id:`loan-3`,html:`
            <div class="v3-app-header">CreditApp</div>
            <div class="v3-app-card" style="text-align:center;">
              <div style="font-size:3rem; color:#38a169; margin-bottom:8px;">785</div>
              <h4 style="color:#1a202c;">Excellent Score</h4>
              <p style="font-size:0.85rem; color:#718096; margin-top:8px;">You have no defaults in the last 3 years.</p>
              <button class="v3-btn" style="margin-top:24px;" onclick="showCelebration('290ms')">Apply for Card</button>
            </div>
          `}],actions:{1:async()=>{S(`loan-2`),C(`Bureau Query`,`The app requests a credit pull.`,`Setu routes the request to the appropriate credit bureau (CIBIL, Experian, Equifax).`),await T(`n-app`),await E(`n-app`,`n-gw`),await T(`n-gw`),w(),await x(),C(`Data Retrieval`,`The credit bureau searches its database.`,`Setu handles the legacy XML/SOAP protocols used by the bureaus securely.`),await E(`n-gw`,`n-cibil`),await T(`n-cibil`),await x(),C(`Scoring`,`Bureau returns the report.`,`Setu parses the massive legacy file into a simple, developer-friendly JSON object containing the score.`),document.getElementById(`n-cibil`).classList.add(`success`),await E(`n-cibil`,`n-gw`,!0),await E(`n-gw`,`n-app`,!0),S(`loan-3`)}}},identity:{nodes:[{id:`n-app`,icon:`📱`,label:`Onboarder`},{id:`n-gw`,icon:`⚡`,label:`Setu API`},{id:`n-uidai`,icon:`👁️`,label:`UIDAI / Aadhaar`}],screens:[{id:`id-1`,html:`
            <div class="v3-app-header">Onboarder</div>
            <div class="v3-app-card">
              <h4 style="margin-bottom:8px;">Aadhaar OKYC</h4>
              <input type="text" class="v3-input" value="1234 5678 9012" readonly />
              <button class="v3-btn" onclick="simTrigger('identity', 1)">Send OTP</button>
            </div>
          `},{id:`id-2`,html:`
            <div class="v3-app-header">Onboarder</div>
            <div class="v3-app-card" style="padding: 32px 20px;">
               <div class="skeleton-line" style="width: 100%;"></div>
               <p style="font-size:0.85rem; color:#718096; margin-top:24px; text-align:center;">Contacting UIDAI...</p>
            </div>
          `},{id:`id-3`,html:`
            <div class="v3-app-header">Onboarder</div>
            <div class="v3-app-card" style="text-align:center;">
              <h4 style="color:#38a169;">OTP Sent</h4>
              <p style="font-size:0.85rem; color:#718096; margin-top:8px;">Enter the 6-digit OTP sent to your linked mobile.</p>
              <input type="text" class="v3-input" placeholder="------" style="text-align:center; letter-spacing:4px; font-weight:bold;" />
              <button class="v3-btn" onclick="showCelebration('340ms')">Verify</button>
            </div>
          `}],actions:{1:async()=>{S(`id-2`),C(`OTP Request`,`The app requests an Aadhaar OTP generation.`,`Setu securely routes the Aadhaar number to the UIDAI infrastructure.`),await T(`n-app`),await E(`n-app`,`n-gw`),await T(`n-gw`),w(),await x(),C(`UIDAI Dispatch`,`UIDAI validates the Aadhaar number and dispatches an SMS.`,`Setu waits for the UIDAI confirmation of SMS dispatch.`),await E(`n-gw`,`n-uidai`),await T(`n-uidai`),await x(),C(`Success`,`The user receives the OTP.`,`Setu forwards the success state to the app to show the OTP input screen.`),document.getElementById(`n-uidai`).classList.add(`success`),await E(`n-uidai`,`n-gw`,!0),await E(`n-gw`,`n-app`,!0),S(`id-3`)}}}};window.simTrigger=async(e,t)=>{document.querySelectorAll(`.v3-btn`).forEach(e=>e.disabled=!0),h.style.display=`block`,h.disabled=!1,await b[e].actions[t](),h.style.display=`none`,document.querySelectorAll(`.v3-btn`).forEach(e=>e.disabled=!1)};function x(){return new Promise(e=>{y=e})}h.addEventListener(`click`,()=>{if(y){let e=y;y=null,e()}});function S(e){let t=document.querySelector(`.v3-screen.active`);t&&t.classList.replace(`active`,`exit`);let n=document.getElementById(e);n&&(n.classList.remove(`exit`),n.classList.add(`active`))}function C(e,t,n){i.innerText=e,a.innerText=t,o.innerText=n,i.parentElement.style.animation=`none`,i.parentElement.offsetHeight,i.parentElement.style.animation=`pulse 0.5s ease`}function w(){_++,s.innerText=_,s.classList.add(`updated`),setTimeout(()=>s.classList.remove(`updated`),300),c.innerText=Math.floor(Math.random()*50+20)+`ms`}async function T(e){let t=document.getElementById(e);t&&(t.classList.add(`active`),v++,l.innerText=v),await D(200)}async function E(e,t,n=!1){let r=document.getElementById(`v3-diagram-track`),i=document.createElement(`div`);i.className=`v3-path`,r.insertBefore(i,document.getElementById(t));let a=document.createElement(`div`);a.className=`v3-packet ${n?`rev`:`fwd`}`,i.appendChild(a),await D(600),i.remove()}async function D(e){return new Promise(t=>setTimeout(t,e))}window.showCelebration=e=>{d.innerText=_,f.innerText=e,p.innerText=v,u.classList.add(`active`)};function O(e){if(g===e)return;g=e,u.classList.remove(`active`),h.style.display=`none`,y&&=(y(),null),_=0,v=0,s.innerText=`0`,l.innerText=`0`,c.innerText=`0ms`,C(`Interact with the phone to begin.`,`-`,`-`);let t=b[e];r.innerHTML=``,t.nodes.forEach((e,n)=>{let i=document.createElement(`div`);if(i.className=`v3-node`,i.id=e.id,i.innerHTML=`<i>${e.icon}</i><span>${e.label}</span>`,r.appendChild(i),n<t.nodes.length-1){let e=document.createElement(`div`);e.className=`v3-path`,r.appendChild(e)}}),n.innerHTML=``,t.screens.forEach((e,t)=>{let r=document.createElement(`div`);r.className=`v3-screen `+(t===0?`active`:`exit`),r.id=e.id,r.innerHTML=e.html,n.appendChild(r)})}t.forEach(e=>{e.addEventListener(`click`,()=>{t.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`),O(e.getAttribute(`data-scenario`))})}),m.addEventListener(`click`,()=>{g=null,O(document.querySelector(`.v3-tab.active`).getAttribute(`data-scenario`))}),O(`kyc`)}),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`geo-year-slider`),t=document.querySelectorAll(`.geo-hub`),n=document.querySelectorAll(`.geo-chip`),r=document.getElementById(`geo-info-title`),i=document.getElementById(`geo-info-year`),a=document.getElementById(`geo-info-desc`),o=document.querySelector(`.layer-network`),s=document.querySelectorAll(`.geo-eco-node`),c=document.getElementById(`eco-expl`),l={blr:{title:`Bengaluru`,badge:`Headquarters (2018)`,desc:`Setu's birthplace and core engineering hub. Our platform operations, product development, and primary API routing infrastructure reside here.`},bom:{title:`Mumbai`,badge:`Financial Hub (2019)`,desc:`Direct connections to India's major partner banks, NBFCs, and financial institutions ensuring sub-100ms latency for critical transactions.`},del:{title:`Delhi`,badge:`Govt Stack (2020)`,desc:`Crucial routing node for India Stack integrations including UIDAI (Aadhaar OKYC), NSDL (PAN Verification), and DigiLocker.`},hyd:{title:`Hyderabad`,badge:`Fintech Hub (2021)`,desc:`Supporting the massive influx of fintech partners, lending startups, and wealth-tech apps utilizing Setu's APIs.`},maa:{title:`Chennai`,badge:`AA Hub (2022)`,desc:`Primary node handling the massive data loads for Account Aggregator decryption, machine learning categorization, and insights.`}},u={citizen:`The end consumer requesting a financial service (e.g., applying for a loan, making a payment).`,fintech:`The consumer-facing application (e.g., Groww, CRED) that integrates Setu's APIs to offer the service.`,setu:`The orchestration engine. Setu translates the app's request, handles security/routing, and standardizes responses.`,stack:`India's digital public infrastructure (Aadhaar, UPI, Account Aggregator) securely providing identity and data.`,bank:`The regulated financial institution providing the underlying capital, account, or credit.`};e&&e.addEventListener(`input`,e=>{let n=parseInt(e.target.value);t.forEach(e=>{let t=parseInt(e.getAttribute(`data-year`));n>=t?e.classList.remove(`hidden-by-year`):e.classList.add(`hidden-by-year`)}),o&&!o.classList.contains(`hidden-by-layer`)&&(o.style.opacity=n>=2019?`1`:`0`),r.innerText=`Ecosystem Growth`,i.innerText=`Year `+n,n===2018&&(a.innerText=`Setu founded in Bengaluru. Initial infrastructure laid down.`),n===2019&&(a.innerText=`Expansion into Mumbai to connect with partner banks and NBFCs.`),n===2020&&(a.innerText=`Integration with Delhi's UIDAI and NSDL government stacks.`),n===2021&&(a.innerText=`Hyderabad node opens to support massive fintech startup volume.`),n>=2022&&(a.innerText=`Chennai node handles the Account Aggregator revolution. Full India routing active.`)}),t.forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.getAttribute(`data-hub`),n=l[t];n&&(r.innerText=n.title,i.innerText=n.badge,a.innerText=n.desc,r.style.animation=`none`,r.offsetHeight,r.style.animation=`pulse 0.5s ease`)})}),n.forEach(t=>{t.addEventListener(`click`,()=>{t.classList.toggle(`active`);let n=t.getAttribute(`data-layer`),r=t.classList.contains(`active`);n===`network`&&o?r&&parseInt(e.value)>=2019?(o.style.opacity=`1`,o.classList.remove(`hidden-by-layer`)):(o.style.opacity=`0`,o.classList.add(`hidden-by-layer`)):document.querySelectorAll(`.layer-`+n).forEach(e=>{r?e.classList.remove(`hidden-by-layer`):e.classList.add(`hidden-by-layer`)})})}),s.forEach(e=>{e.addEventListener(`mouseenter`,()=>{let t=e.getAttribute(`data-eco`);c.innerText=u[t]||`Hover over any node above to understand its responsibility in the value chain.`}),e.addEventListener(`mouseleave`,()=>{c.innerText=`Hover over any node above to understand its responsibility in the value chain.`})})}),document.addEventListener(`DOMContentLoaded`,()=>{let e=document.getElementById(`friction-slider`),t=document.querySelector(`.slider-after`);e&&t&&(t.style.clipPath=`polygon(0 0, ${e.value}% 0, ${e.value}% 100%, 0 100%)`,e.addEventListener(`input`,e=>{t.style.clipPath=`polygon(0 0, ${e.target.value}% 0, ${e.target.value}% 100%, 0 100%)`}));let n=document.querySelectorAll(`.f-tab`),r=document.querySelectorAll(`.f-bio`);n.forEach(e=>{e.addEventListener(`click`,()=>{n.forEach(e=>e.classList.remove(`active`)),r.forEach(e=>e.classList.remove(`active`)),e.classList.add(`active`);let t=`bio-`+e.getAttribute(`data-target`),i=document.getElementById(t);i&&i.classList.add(`active`)})}),document.querySelectorAll(`.bmc-box`).forEach(e=>{e.addEventListener(`click`,()=>{e.classList.toggle(`expanded`)})})}),document.addEventListener(`DOMContentLoaded`,()=>{function e(e){let t=parseFloat(e.getAttribute(`data-target`)),n=!Number.isInteger(t),r=t/(2e3/16),i=0,a=()=>{i+=r,i<t?(e.innerText=n?i.toFixed(1):Math.ceil(i).toLocaleString(),requestAnimationFrame(a)):e.innerText=(n?t.toFixed(1):t.toLocaleString())+(e.getAttribute(`data-suffix`)||``)};a()}let t=new IntersectionObserver(t=>{t.forEach(t=>{t.isIntersecting&&t.target.classList.contains(`counter`)&&(e(t.target),t.target.classList.remove(`counter`))})},{threshold:.15});document.querySelectorAll(`.counter`).forEach(e=>t.observe(e))});