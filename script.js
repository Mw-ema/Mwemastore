// script.js - unified for index/product/cart/checkout
// Data: sample products
const PRODUCTS = [
  {
    id: 1,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1518444022266-6f1b1b8b7b6b?auto=format&fit=crop&w=900&q=60",
    sku: "MS-WH-001",
    description: "Comfortable wireless headphones with long battery life and rich sound."
  },
  {
    id: 2,
    name: "Smart Watch",
    category: "Electronics",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b?auto=format&fit=crop&w=900&q=60",
    sku: "MS-SW-002",
    description: "Stylish smartwatch with fitness tracking and message alerts."
  },
  {
    id: 3,
    name: "Leather Handbag",
    category: "Fashion",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1520975915852-1f8e3f7d814f?auto=format&fit=crop&w=900&q=60",
    sku: "MS-LB-003",
    description: "Elegant leather handbag with multiple compartments."
  },
  {
    id: 4,
    name: "Modern Table Lamp",
    category: "Home",
    price: 34.5,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=900&q=60",
    sku: "MS-LM-004",
    description: "Minimalist table lamp with warm LED lighting."
  },
  {
    id: 5,
    name: "Face Cream",
    category: "Beauty",
    price: 19.0,
    image: "https://images.unsplash.com/photo-1542834369-f10ebf06d3cb?auto=format&fit=crop&w=900&q=60",
    sku: "MS-FC-005",
    description: "Nourishing face cream for daily hydration."
  },
  {
    id: 6,
    name: "Kids Building Set",
    category: "Toys",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1581093588401-0b4f5b6baf19?auto=format&fit=crop&w=900&q=60",
    sku: "MS-KB-006",
    description: "Fun building blocks to spark creativity."
  }
];

// CART stored in localStorage under 'muema_cart' as array of {id, qty}
function readCart() {
  try {
    const raw = localStorage.getItem('muema_cart') || '[]';
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}
function writeCart(cart) {
  localStorage.setItem('muema_cart', JSON.stringify(cart));
  updateCartCountUI();
}
function updateCartCountUI() {
  const cart = readCart();
  const totalQty = cart.reduce((s, it) => s + (parseInt(it.qty, 10) || 0), 0);
  const el = document.getElementById('cartCount');
  if(el) el.textContent = totalQty;
}
function findProduct(id) {
  return PRODUCTS.find(p => p.id === id);
}
function addToCart(id, qty = 1) {
  id = parseInt(id,10); qty = parseInt(qty,10) || 1;
  const cart = readCart();
  const existing = cart.find(i => i.id === id);
  if(existing) existing.qty = existing.qty + qty;
  else cart.push({ id, qty });
  writeCart(cart);
}

// Save a single item intended for immediate checkout (optional)
function saveCheckoutItem(id, qty=1) {
  localStorage.setItem('muema_checkout_item', JSON.stringify({ id, qty }));
}

// If a checkout_item exists, merge to cart when opening checkout
function mergeCheckoutItemToCart() {
  const raw = localStorage.getItem('muema_checkout_item');
  if(!raw) return;
  try {
    const { id, qty } = JSON.parse(raw);
    addToCart(id, qty);
  } catch(e) {/* ignore */}
  localStorage.removeItem('muema_checkout_item');
}

/* ===== INDEX (product grid) ===== */
function displayProducts(list) {
  const container = document.getElementById('products') || document.getElementById('productGrid');
  if(!container) return;
  container.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card glass';
    card.innerHTML = `
      <a class="product-link" href="product.html?id=${p.id}">
        <img src="${p.image}" alt="${p.name}" />
      </a>
      <div class="product-info">
        <h3>${p.name}</h3>
        <div class="price">KES ${p.price.toFixed(2)}</div>
        <div style="display:flex;gap:8px;margin-top:8px;">
          <button class="add-btn" data-id="${p.id}">Add to Cart</button>
          <a href="product.html?id=${p.id}" class="btn-secondary" style="padding:8px 10px; text-decoration:none;">View</a>
        </div>
      </div>
    `;
    container.appendChild(card);

    card.querySelector('.add-btn').addEventListener('click', (e) => {
      addToCart(p.id, 1);
      // small feedback
      e.target.textContent = 'Added';
      setTimeout(()=> e.target.textContent = 'Add to Cart', 900);
    });
  });
}

/* ===== INDEX: search & categories wiring ===== */
function wireIndexControls() {
  // show all initially
  displayProducts(PRODUCTS);
  updateCartCountUI();

  const search = document.getElementById('searchInput');
  if(search){
    search.addEventListener('input', (e) => {
      const term = e.target.value.trim().toLowerCase();
      const activeCat = document.querySelector('.category.active')?.dataset?.category || 'All';
      const filtered = PRODUCTS.filter(p => {
        const inCat = (activeCat === 'All' || p.category === activeCat);
        const inTerm = p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term);
        return inCat && inTerm;
      });
      displayProducts(filtered);
    });
  }

  // categories
  document.querySelectorAll('.category').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.category').forEach(x=>x.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category || 'All';
      const filtered = (cat === 'All') ? PRODUCTS : PRODUCTS.filter(p => p.category === cat);
      displayProducts(filtered);
    });
  });
}

/* ===== PRODUCT DETAILS page ===== */
function displayProductDetails(id) {
  const prod = findProduct(id);
  if(!prod) return;
  // images
  const imagesWrap = document.getElementById('productImages');
  if(imagesWrap){
    imagesWrap.innerHTML = `<img src="${prod.image}" alt="${prod.name}" />`;
  }
  const title = document.getElementById('prodTitle'); if(title) title.textContent = prod.name;
  const sku = document.getElementById('prodSku'); if(sku) sku.textContent = 'SKU: ' + prod.sku;
  const price = document.getElementById('prodPrice'); if(price) price.textContent = 'KES ' + prod.price.toFixed(2);
  const desc = document.getElementById('prodDesc'); if(desc) desc.textContent = prod.description;
  const cat = document.getElementById('prodCat'); if(cat) cat.textContent = prod.category;
  updateCartCountUI();

  // add to cart button wiring
  const addBtn = document.getElementById('addToCartBtn');
  if(addBtn) {
    addBtn.addEventListener('click', () => {
      const qty = parseInt(document.getElementById('qtyInput').value, 10) || 1;
      addToCart(prod.id, qty);
      addBtn.textContent = 'Added ✓';
      setTimeout(()=> addBtn.textContent = 'Add to Cart', 900);
    });
  }
}

/* ===== CART page rendering & manipulation ===== */
function renderCartPage() {
  updateCartCountUI();
  mergeCheckoutItemToCart();

  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');
  if(!container || !summary) return;

  const cart = readCart();
  if(cart.length === 0) {
    container.innerHTML = '<div class="glass" style="padding:16px;">Your cart is empty. <a href="index.html" class="btn-primary">Shop Now</a></div>';
    summary.innerHTML = '';
    document.getElementById('proceedBtn').style.display = 'none';
    return;
  }

  document.getElementById('proceedBtn').style.display = 'inline-block';

  container.innerHTML = '';
  let subtotal = 0;
  cart.forEach(item => {
    const prod = findProduct(item.id);
    if(!prod) return;
    const lineTotal = prod.price * item.qty;
    subtotal += lineTotal;

    const el = document.createElement('div');
    el.className = 'cart-item glass';
    el.innerHTML = `
      <img src="${prod.image}" alt="${prod.name}">
      <div class="meta">
        <h3 style="margin-bottom:6px;">${prod.name}</h3>
        <div>SKU: ${prod.sku}</div>
        <div style="margin-top:6px;">Price: <strong>KES ${prod.price.toFixed(2)}</strong></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end;">
        <input class="qty-input" type="number" min="1" value="${item.qty}" data-id="${item.id}" />
        <div>Line: <strong>KES ${lineTotal.toFixed(2)}</strong></div>
        <button class="btn-secondary remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;
    container.appendChild(el);
  });

  const shipping = subtotal > 0 ? 200 : 0; // flat shipping
  const total = subtotal + shipping;
  summary.innerHTML = `
    <div style="padding:12px">
      <h3>Order Summary</h3>
      <div style="display:flex;justify-content:space-between;margin-top:8px;"><span>Subtotal</span><strong>KES ${subtotal.toFixed(2)}</strong></div>
      <div style="display:flex;justify-content:space-between;margin-top:8px;"><span>Shipping</span><strong>KES ${shipping.toFixed(2)}</strong></div>
      <hr style="margin:10px 0;border-color:rgba(255,255,255,0.04)" />
      <div style="display:flex;justify-content:space-between;margin-top:8px;"><span>Total</span><strong>KES ${total.toFixed(2)}</strong></div>
    </div>
  `;

  // Wire qty change & remove
  document.querySelectorAll('.qty-input').forEach(inp => {
    inp.addEventListener('change', (e) => {
      const id = parseInt(e.target.dataset.id,10);
      let q = parseInt(e.target.value,10);
      if(q < 1) q = 1; e.target.value = q;
      const cart = readCart();
      const it = cart.find(i=>i.id===id);
      if(it) it.qty = q;
      writeCart(cart);
      renderCartPage(); // re-render
    });
  });
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(e.target.dataset.id,10);
      let cart = readCart();
      cart = cart.filter(i=> i.id !== id);
      writeCart(cart);
      renderCartPage();
    });
  });
}

/* ===== Checkout summary rendering ===== */
function calculateCartTotals() {
  const cart = readCart();
  let subtotal = 0;
  cart.forEach(it => {
    const p = findProduct(it.id);
    if(p) subtotal += p.price * it.qty;
  });
  const shipping = subtotal > 0 ? 200 : 0;
  const total = subtotal + shipping;
  return { cart, subtotal, shipping, total };
}

function renderCheckoutSummary() {
  updateCartCountUI();
  const aside = document.getElementById('orderSummary');
  if(!aside) return;
  const { cart, subtotal, shipping, total } = calculateCartTotals();
  if(cart.length === 0) {
    aside.innerHTML = `<div style="padding:12px;">Your cart is empty. <a href="index.html" class="btn-primary">Shop Items</a></div>`;
    return;
  }
  aside.innerHTML = `
    <h3>Order Summary</h3>
    <div style="max-height:300px;overflow:auto;margin-top:10px;">
      ${cart.map(it => {
        const p = findProduct(it.id);
        return `<div style="display:flex;justify-content:space-between;margin-bottom:8px;">
          <div>${p?.name} × ${it.qty}</div>
          <div><strong>KES ${(p.price * it.qty).toFixed(2)}</strong></div>
        </div>`;
      }).join('')}
    </div>
    <hr style="border-color:rgba(255,255,255,0.05);margin:10px 0;" />
    <div style="display:flex;justify-content:space-between;"><span>Subtotal</span><strong>KES ${subtotal.toFixed(2)}</strong></div>
    <div style="display:flex;justify-content:space-between;"><span>Shipping</span><strong>KES ${shipping.toFixed(2)}</strong></div>
    <div style="display:flex;justify-content:space-between;margin-top:8px;"><strong>Total</strong><strong>KES ${total.toFixed(2)}</strong></div>
  `;
}

// Place order: create simple order object and clear cart
function placeOrder(shipInfo) {
  const { subtotal, shipping, total, cart } = (() => {
    const t = calculateCartTotals();
    return { subtotal: t.subtotal, shipping: t.shipping, total: t.total, cart: t.cart };
  })();
  const orderId = 'MS' + Date.now().toString().slice(-6); // simple unique-ish id
  // In a real app you'd send this to server
  // Provide order object
  const order = {
    orderId,
    name: shipInfo.name,
    phone: shipInfo.phone,
    address: shipInfo.address,
    items: cart,
    subtotal,
    shipping,
    total,
    date: new Date().toISOString()
  };
  // Clear cart
  writeCart([]);
  return order;
}

/* ===== Helper: product page link wiring when on index ===== */
document.addEventListener('DOMContentLoaded', () => {
  // update cart count everywhere
  updateCartCountUI();

  // if on index: wire controls
  if(document.getElementById('products')) {
    wireIndexControls();
  }

  // if product page elements exist, but product.html has its own inline script to call displayProductDetails
  if(document.querySelector('.product-page')) {
    // product.html inline script calls displayProductDetails already
    updateCartCountUI();
  }

  // if on cart page
  if(document.querySelector('.cart-page')) {
    // render on load
    renderCartPage();
  }

  // if checkout page
  if(document.querySelector('.checkout-page')) {
    mergeCheckoutItemToCart(); // ensure any direct "buy now" item is merged
    renderCheckoutSummary();
  }

  // search inputs on all pages
  const search = document.getElementById('searchInput');
  if(search) {
    search.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        // simple search redirect to home and fill term locally
        e.preventDefault();
        const term = search.value.trim();
        // on small site: just filter in-place on index; here we will redirect to index and store term for immediate use
        localStorage.setItem('muema_search_term', term);
        location.href = 'index.html';
      }
    });
  }

  // If index opened and there's a stored search term, apply it
  const storedTerm = localStorage.getItem('muema_search_term');
  if(storedTerm && document.getElementById('searchInput') && document.getElementById('products')) {
    document.getElementById('searchInput').value = storedTerm;
    document.getElementById('searchInput').dispatchEvent(new Event('input'));
    localStorage.removeItem('muema_search_term');
  }
});
