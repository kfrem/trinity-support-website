
const records = window.TRINITY_RECORDS || [];
const library = document.getElementById('library');
const search = document.getElementById('search');
const kind = document.getElementById('kind');
const category = document.getElementById('category');
const count = document.getElementById('doc-count');

function initCategories(){
  if(!category) return;
  [...new Set(records.map(r=>r.category))].sort().forEach(c=>{
    const o=document.createElement('option'); o.value=c; o.textContent=c; category.appendChild(o);
  });
}

function render(){
  if(!library) return;
  const q=(search.value||'').toLowerCase();
  const items=records.filter(r=>
    (!kind.value||r.kind===kind.value)&&(!category.value||r.category===category.value)&&
    [r.title,r.owner,r.category,r.summary,r.kind].join(' ').toLowerCase().includes(q)
  );
  if (count) count.textContent=`${items.length} controlled documents`;
  library.innerHTML=items.map(r=>`<article><div class="tagline"><span class="tag">${r.kind}</span><span class="tag">${r.category}</span></div><h3>${r.title}</h3><p>${r.summary}</p><p><strong>Owner:</strong> ${r.owner}</p><a class="open" href="${r.url}">Open printable document</a></article>`).join('');
}

if(search && kind && category) {
  initCategories(); render();
  [search,kind,category].forEach(el=>el.addEventListener('input',render));
}

const dashSearch = document.getElementById('dash-search');
const dashStatus = document.getElementById('dash-status');
const dashRows = document.getElementById('dashboard-rows');
const priorityCategories = new Set(['safeguarding','property','governance','finance']);

function dashboardStatus(r){ return priorityCategories.has(r.category) ? 'Priority watch' : 'On schedule'; }

function dashboardTrigger(r){
  const map = {
    safeguarding:'Safeguarding referral, exploitation risk, missing episode, self-harm incident, Ofsted/CQC/legal update',
    property:'Fire safety issue, H&S incident, repair failure, contractor concern, housing standard update',
    governance:'Complaint trend, commissioner finding, audit gap, data breach, regulation or contract change',
    finance:'Resident money issue, gift/conflict concern, audit discrepancy, benefit/rent rule change',
    workforce:'DBS/recruitment issue, staffing gap, training lapse, grievance or disciplinary trend',
    equality:'Equality complaint, reasonable adjustment need, discrimination concern, Equality Act update',
    support:'Resident feedback trend, placement breakdown, move-on issue, contract requirement change',
    form:'Incident using form, missing evidence, audit finding, legal/contract change affecting record fields'
  };
  return map[r.category] || 'Annual review or management trigger';
}

function renderDashboard(){
  if(!dashRows) return;
  const q=(dashSearch.value||'').toLowerCase();
  const status=dashStatus.value;
  const items=records.filter(r=>{
    const st=dashboardStatus(r), trig=dashboardTrigger(r);
    return (!status || st===status) && [r.title,r.kind,r.owner,r.category,st,trig].join(' ').toLowerCase().includes(q);
  });
  const totEl = document.getElementById('total-docs');
  const priEl = document.getElementById('priority-docs');
  if(totEl) totEl.textContent=records.length;
  if(priEl) priEl.textContent=records.filter(r=>dashboardStatus(r)==='Priority watch').length;
  dashRows.innerHTML=items.map(r=>{
    const st=dashboardStatus(r), cls=st==='Priority watch'?'status-watch':'status-ok';
    return `<tr><td><a href="${r.url}">${r.title}</a></td><td>${r.kind}</td><td>${r.owner}</td><td>3 Jun 2027</td><td class="${cls}">${st}</td><td>${dashboardTrigger(r)}</td></tr>`;
  }).join('');
}

if(dashRows) {
  renderDashboard();
  [dashSearch,dashStatus].forEach(el=>el&&el.addEventListener('input',renderDashboard));
}

// Interactive Accordion Logic
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isExpanded = item.classList.contains('active');
    
    // Collapse all accordion items
    document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('active'));
    
    // Open clicked if it wasn't open
    if (!isExpanded) {
      item.classList.add('active');
    }
  });
});
