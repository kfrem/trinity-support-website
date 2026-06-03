
const records = window.TRINITY_RECORDS || [];
const library = document.getElementById('library');
const search = document.getElementById('search');
const kind = document.getElementById('kind');
const category = document.getElementById('category');
const count = document.getElementById('doc-count');
function initCategories(){
  [...new Set(records.map(r=>r.category))].sort().forEach(c=>{
    const o=document.createElement('option'); o.value=c; o.textContent=c; category.appendChild(o);
  });
}
function render(){
  const q=(search.value||'').toLowerCase();
  const items=records.filter(r=>
    (!kind.value||r.kind===kind.value)&&(!category.value||r.category===category.value)&&
    [r.title,r.owner,r.category,r.summary,r.kind].join(' ').toLowerCase().includes(q)
  );
  count.textContent=`${items.length} controlled documents`;
  library.innerHTML=items.map(r=>`<article><div class="tagline"><span class="tag">${r.kind}</span><span class="tag">${r.category}</span></div><h3>${r.title}</h3><p>${r.summary}</p><p><strong>Owner:</strong> ${r.owner}</p><a class="open" href="${r.url}">Open printable document</a></article>`).join('');
}
initCategories(); render();
[search,kind,category].forEach(el=>el.addEventListener('input',render));
