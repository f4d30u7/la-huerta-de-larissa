const products = [
  {id:1,name:'Almendras tostadas',category:'Frutos secos',weight:'250 g',price:8900,oldPrice:9900,emoji:'🌰',visual:'#ecd9bd',desc:'Crocantes, sin sal agregada y listas para cualquier momento.',tags:['Vegano','Sin TACC'],badge:'10% OFF'},
  {id:2,name:'Mix La Huerta',category:'Frutos secos',weight:'300 g',price:10400,emoji:'🥜',visual:'#e7d9c7',desc:'Almendras, castañas de cajú, nueces y pasas.',tags:['Vegano','Sin TACC']},
  {id:3,name:'Semillas de chía',category:'Semillas',weight:'250 g',price:4300,emoji:'🌱',visual:'#d8e3cb',desc:'Una opción versátil para desayunos, puddings y recetas.',tags:['Vegano','Sin TACC']},
  {id:4,name:'Granola cacao & coco',category:'Cereales',weight:'350 g',price:7200,oldPrice:8000,emoji:'🥣',visual:'#ead3c3',desc:'Avena, cacao, coco y frutos secos, con perfil bien crocante.',tags:['Vegano'],badge:'Oferta'},
  {id:5,name:'Avena integral',category:'Cereales',weight:'500 g',price:3900,emoji:'🌾',visual:'#eee4bd',desc:'Clásica, simple y rendidora para desayunos y cocina.',tags:['Vegano']},
  {id:6,name:'Harina de almendras',category:'Harinas',weight:'250 g',price:9600,emoji:'🥖',visual:'#f1e5cb',desc:'Alternativa suave y nutritiva para preparaciones dulces o saladas.',tags:['Vegano','Sin TACC']},
  {id:7,name:'Premezcla pan casero',category:'Sin TACC',weight:'400 g',price:5900,emoji:'🍞',visual:'#e4d8bb',desc:'Mezcla lista para preparar panes sin gluten en casa.',tags:['Sin TACC','Vegano'],badge:'Sin TACC'},
  {id:8,name:'Chips de garbanzo',category:'Veganos',weight:'120 g',price:4700,emoji:'🫓',visual:'#e9dcae',desc:'Snack horneado y crocante, ideal para picar distinto.',tags:['Vegano','Sin TACC']},
  {id:9,name:'Infusión frutos rojos',category:'Infusiones',weight:'20 saquitos',price:5400,emoji:'🍓',visual:'#efd3d1',desc:'Frutal y aromática para tomar caliente o fría.',tags:['Vegano','Sin TACC']},
  {id:10,name:'Té verde & jengibre',category:'Infusiones',weight:'20 saquitos',price:5200,emoji:'🍵',visual:'#d9e6c9',desc:'Fresco, especiado y liviano para una pausa simple.',tags:['Vegano','Sin TACC']},
  {id:11,name:'Semillas de zapallo',category:'Semillas',weight:'200 g',price:6800,emoji:'🎃',visual:'#dfe1b8',desc:'Crocantes y prácticas para sumar a ensaladas y bowls.',tags:['Vegano','Sin TACC']},
  {id:12,name:'Harina de garbanzo',category:'Harinas',weight:'500 g',price:5100,emoji:'🫘',visual:'#ead7ad',desc:'Ideal para fainá, rebozados y preparaciones vegetales.',tags:['Vegano','Sin TACC']}
];

let cart = [];
let activeFilter = 'Todos';
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const money = (value) => new Intl.NumberFormat('es-AR',{style:'currency',currency:'ARS',maximumFractionDigits:0}).format(value);

function renderProducts(){
  const grid = $('#productGrid');
  const filtered = products.filter(p => activeFilter==='Todos' || p.category===activeFilter || p.tags.includes(activeFilter));
  grid.innerHTML = filtered.map(p => `
    <article class="product-card">
      <div class="product-visual" style="--visual:${p.visual}">
        ${p.badge ? `<span class="badge">${p.badge}</span>` : ''}
        <div class="product-pack"><span class="emoji">${p.emoji}</span><b>${p.name}</b><small>${p.weight}</small></div>
      </div>
      <div class="product-info">
        <div class="product-topline">${p.category}</div>
        <h3>${p.name}</h3>
        <p>${p.desc}</p>
        <div class="tag-row">${p.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div>
        <div class="product-bottom">
          <div class="price-wrap">${p.oldPrice?`<span class="old-price">${money(p.oldPrice)}</span>`:''}<span class="price">${money(p.price)}</span></div>
          <button class="add-btn" data-add="${p.id}" aria-label="Agregar ${p.name} al carrito">+</button>
        </div>
      </div>
    </article>`).join('');

  $$('[data-add]').forEach(btn => btn.addEventListener('click', () => addToCart(Number(btn.dataset.add))));
}

function addToCart(id){
  const product = products.find(p=>p.id===id);
  const found = cart.find(i=>i.id===id);
  if(found) found.qty += 1; else cart.push({...product,qty:1});
  renderCart();
  toast(`${product.name} agregado al carrito`);
}

function renderCart(){
  const itemCount = cart.reduce((acc,i)=>acc+i.qty,0);
  $('#cartCount').textContent = itemCount;
  $('#cartItems').innerHTML = cart.map(item=>`
    <div class="cart-item">
      <div class="cart-item-visual" style="background:${item.visual}">${item.emoji}</div>
      <div><strong>${item.name}</strong><small>${item.qty} × ${money(item.price)}</small></div>
      <button data-remove="${item.id}" aria-label="Quitar ${item.name}">×</button>
    </div>`).join('');
  const subtotal = cart.reduce((acc,i)=>acc+i.price*i.qty,0);
  $('#cartSubtotal').textContent = money(subtotal);
  $('#cartEmpty').style.display = cart.length ? 'none' : 'block';
  $('#cartItems').style.display = cart.length ? 'flex' : 'none';
  $$('[data-remove]').forEach(btn=>btn.addEventListener('click',()=>{
    cart = cart.filter(i=>i.id!==Number(btn.dataset.remove));
    renderCart();
  }));
}

function setFilter(filter){
  activeFilter = filter;
  $$('.filter-chip').forEach(b=>b.classList.toggle('active',b.dataset.filter===filter));
  renderProducts();
  document.querySelector('#productos').scrollIntoView({behavior:'smooth'});
}

function openCart(){
  $('#cartDrawer').classList.add('open');
  $('#cartDrawer').setAttribute('aria-hidden','false');
  $('#backdrop').classList.add('show');
  document.body.classList.add('no-scroll');
}
function closeCart(){
  $('#cartDrawer').classList.remove('open');
  $('#cartDrawer').setAttribute('aria-hidden','true');
  $('#backdrop').classList.remove('show');
  document.body.classList.remove('no-scroll');
}
function openCheckout(){
  if(!cart.length){toast('Agregá al menos un producto antes de continuar');return;}
  closeCart();
  $('#checkoutModal').classList.add('open');
  $('#checkoutModal').setAttribute('aria-hidden','false');
  document.body.classList.add('no-scroll');
}
function closeCheckout(){
  $('#checkoutModal').classList.remove('open');
  $('#checkoutModal').setAttribute('aria-hidden','true');
  document.body.classList.remove('no-scroll');
}
function toast(msg){
  let el = document.querySelector('.toast');
  if(!el){el=document.createElement('div');el.className='toast';document.body.appendChild(el)}
  el.textContent=msg; el.classList.add('show');
  clearTimeout(window.toastTimer); window.toastTimer=setTimeout(()=>el.classList.remove('show'),1800);
}

$$('.filter-chip').forEach(btn=>btn.addEventListener('click',()=>setFilter(btn.dataset.filter)));
$$('.category-card').forEach(btn=>btn.addEventListener('click',()=>setFilter(btn.dataset.filter)));
$('#cartButton').addEventListener('click',openCart);
$('#closeCart').addEventListener('click',closeCart);
$('#backdrop').addEventListener('click',closeCart);
$('#checkoutButton').addEventListener('click',openCheckout);
$('#closeCheckout').addEventListener('click',closeCheckout);
$('#checkoutModal').addEventListener('click',e=>{if(e.target===e.currentTarget)closeCheckout()});
$('#checkoutForm').addEventListener('submit',e=>{
  e.preventDefault();
  e.currentTarget.hidden=true;
  $('#checkoutSuccess').hidden=false;
  cart=[]; renderCart();
});
$('#addCombo').addEventListener('click',()=>{
  [1,4,10].forEach(id=>addToCart(id));
  openCart();
});
$('#menuToggle').addEventListener('click',()=>{
  const nav=$('#mainNav'); const open=nav.classList.toggle('open');
  $('#menuToggle').setAttribute('aria-expanded',String(open));
});
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>$('#mainNav').classList.remove('open')));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeCart();closeCheckout()}});

renderProducts();
renderCart();
