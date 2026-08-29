// ==========================================================================
// TOKO BUMBU DIGITAL - APP LOGIC & STATE MANAGEMENT
// ==========================================================================

// State Storage Keys
const STORAGE_KEYS = {
  PRODUCTS: 'toko_bumbu_products',
  ORDERS: 'toko_bumbu_orders',
  CONFIG: 'toko_bumbu_config',
  CART: 'toko_bumbu_cart'
};

// Global Application State
let appState = {
  config: {},
  products: [],
  orders: [],
  cart: [],
  currentCategory: 'all',
  searchQuery: '',
  selectedProduct: null,
  selectedVariantIndex: 0,
  selectedQty: 1,
  deliveryMethod: 'pickup', // 'pickup' | 'delivery'
  paymentMethod: 'qris',   // 'qris' | 'bank' | 'cash'
  isAdmin: false
};

// ==========================================================================
// INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupEventListeners();
  renderApp();
});

function loadData() {
  // Load Config
  const savedConfig = localStorage.getItem(STORAGE_KEYS.CONFIG);
  if (savedConfig) {
    appState.config = JSON.parse(savedConfig);
    // Jika masih memakai nomor placeholder awal, ganti otomatis ke nomor penjual resmi
    if (!appState.config.whatsapp || appState.config.whatsapp === '6281234567890') {
      appState.config.whatsapp = DEFAULT_STORE_CONFIG.whatsapp;
      saveData(STORAGE_KEYS.CONFIG);
    }
  } else {
    appState.config = { ...DEFAULT_STORE_CONFIG };
  }

  // Load Products
  const savedProducts = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
  appState.products = savedProducts ? JSON.parse(savedProducts) : [...DEFAULT_PRODUCTS];

  // Load Orders
  const savedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
  appState.orders = savedOrders ? JSON.parse(savedOrders) : [...INITIAL_MOCK_ORDERS];

  // Load Cart
  const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
  appState.cart = savedCart ? JSON.parse(savedCart) : [];
}

function saveData(key) {
  if (key === STORAGE_KEYS.CONFIG) {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(appState.config));
  } else if (key === STORAGE_KEYS.PRODUCTS) {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(appState.products));
  } else if (key === STORAGE_KEYS.ORDERS) {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(appState.orders));
  } else if (key === STORAGE_KEYS.CART) {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(appState.cart));
  }
}

// ==========================================================================
// FORMATTERS & UTILS
// ==========================================================================
function formatRupiah(number) {
  return 'Rp ' + Number(number).toLocaleString('id-ID');
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✅' : type === 'warning' ? '⚠️' : 'ℹ️'}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

// Close modal when clicking outside overlay
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('active');
    }
  });
});

// ==========================================================================
// EVENT LISTENERS SETUP
// ==========================================================================
function setupEventListeners() {
  // Brand / Home click
  document.getElementById('storeLogoBtn').addEventListener('click', (e) => {
    e.preventDefault();
    if (appState.isAdmin) toggleAdminMode();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Admin Mode Toggle
  document.getElementById('btnToggleAdmin').addEventListener('click', toggleAdminMode);

  // Search Input
  document.getElementById('searchInput').addEventListener('input', (e) => {
    appState.searchQuery = e.target.value.toLowerCase().trim();
    renderProductGrid();
  });

  // Floating Cart Bar Open
  document.getElementById('btnOpenCartModal').addEventListener('click', () => {
    renderCartModal();
    openModal('checkoutModal');
  });

  // Quantity stepper in Product Detail Modal
  document.getElementById('btnQtyMinus').addEventListener('click', () => {
    if (appState.selectedQty > 1) {
      appState.selectedQty--;
      updateDetailModalPrice();
    }
  });

  document.getElementById('btnQtyPlus').addEventListener('click', () => {
    appState.selectedQty++;
    updateDetailModalPrice();
  });

  // Add to Cart Confirm
  document.getElementById('btnConfirmAddToCart').addEventListener('click', confirmAddToCart);

  // Checkout Form Submit
  document.getElementById('checkoutForm').addEventListener('submit', handleCheckoutSubmit);

  // Admin Navigation Tabs
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetTab = btn.getAttribute('data-tab');
      document.querySelectorAll('.admin-content-section').forEach(sec => sec.style.display = 'none');
      document.getElementById(targetTab).style.display = 'block';
    });
  });

  // Store Settings Form Submit
  document.getElementById('storeSettingsForm').addEventListener('submit', handleStoreSettingsSubmit);

  // Admin Add Product Button
  document.getElementById('btnAddNewProduct').addEventListener('click', openAddProductModal);
  document.getElementById('btnAddVariantRow').addEventListener('click', () => addAdminVariantRow());
  document.getElementById('adminProductForm').addEventListener('submit', handleAdminProductSubmit);
}

// ==========================================================================
// RENDER FUNCTIONS
// ==========================================================================
function renderApp() {
  renderNavbar();
  renderCategories();
  renderProductGrid();
  updateCartFloatingBar();
  renderAdminPanel();
}

function renderNavbar() {
  document.getElementById('navStoreName').textContent = appState.config.name;
  document.getElementById('navMarketBadge').textContent = `📍 ${appState.config.marketName}`;
}

function renderCategories() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = DEFAULT_CATEGORIES.map(cat => `
    <button class="category-btn ${appState.currentCategory === cat.id ? 'active' : ''}" onclick="selectCategory('${cat.id}')">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

function selectCategory(catId) {
  appState.currentCategory = catId;
  renderCategories();
  renderProductGrid();
}

function renderProductGrid() {
  const container = document.getElementById('productGrid');
  
  let filtered = appState.products.filter(p => {
    const matchCategory = appState.currentCategory === 'all' || p.category === appState.currentCategory;
    const matchSearch = !appState.searchQuery || 
      p.name.toLowerCase().includes(appState.searchQuery) || 
      p.description.toLowerCase().includes(appState.searchQuery);
    return matchCategory && matchSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px 20px; background: white; border-radius: var(--radius-md);">
        <p style="font-size: 2rem; margin-bottom: 8px;">🔍</p>
        <h4 style="font-weight: 700; color: var(--dark);">Bumbu Tidak Ditemukan</h4>
        <p style="font-size: 0.85rem; color: var(--gray-500);">Coba gunakan kata kunci lain atau pilih kategori Semua Bumbu.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(product => {
    const defaultVariant = product.variants.find(v => v.default) || product.variants[0];
    const priceDisplay = formatRupiah(defaultVariant.price);

    return `
      <div class="product-card" onclick="openProductDetailModal('${product.id}')" style="cursor: pointer;">
        <div class="product-img-wrapper">
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80'">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          ${!product.inStock ? `<span class="stock-tag" style="background:#dc2626;">Habis</span>` : ''}
        </div>
        <div class="product-body">
          <span class="product-category-tag">${getCategoryName(product.category)}</span>
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-pricing">
            <span class="price-main">${priceDisplay}</span>
            <span class="price-unit">/ ${defaultVariant.name}</span>
          </div>
          <button class="btn-add-cart" ${!product.inStock ? 'disabled style="background:#9ca3af; cursor:not-allowed;"' : ''}>
            🛒 ${product.inStock ? 'Pilih Takaran' : 'Stok Habis'}
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function getCategoryName(catId) {
  const cat = DEFAULT_CATEGORIES.find(c => c.id === catId);
  return cat ? cat.name : 'Bumbu';
}

// ==========================================================================
// PRODUCT DETAIL & VARIANT MODAL
// ==========================================================================
function openProductDetailModal(productId) {
  const product = appState.products.find(p => p.id === productId);
  if (!product || !product.inStock) return;

  appState.selectedProduct = product;
  appState.selectedVariantIndex = product.variants.findIndex(v => v.default) || 0;
  if (appState.selectedVariantIndex < 0) appState.selectedVariantIndex = 0;
  appState.selectedQty = 1;

  document.getElementById('modalProductTitle').textContent = product.name;
  document.getElementById('modalProductImg').src = product.image;
  document.getElementById('modalProductDesc').textContent = product.description;
  document.getElementById('modalItemNote').placeholder = product.notePlaceholder || "Contoh: Pedas sedang, jangan pakai kunyit";
  document.getElementById('modalItemNote').value = "";

  renderVariantOptions();
  updateDetailModalPrice();
  openModal('productDetailModal');
}

function renderVariantOptions() {
  const container = document.getElementById('modalVariantContainer');
  const product = appState.selectedProduct;
  if (!product) return;

  container.innerHTML = product.variants.map((v, idx) => `
    <div class="variant-chip ${idx === appState.selectedVariantIndex ? 'selected' : ''}" onclick="selectVariant(${idx})">
      <span class="variant-chip-name">${v.name}</span>
      <span class="variant-chip-price">${formatRupiah(v.price)}</span>
    </div>
  `).join('');
}

function selectVariant(index) {
  appState.selectedVariantIndex = index;
  renderVariantOptions();
  updateDetailModalPrice();
}

function updateDetailModalPrice() {
  const product = appState.selectedProduct;
  if (!product) return;

  const variant = product.variants[appState.selectedVariantIndex];
  const subtotal = variant.price * appState.selectedQty;

  document.getElementById('modalQtyDisplay').textContent = appState.selectedQty;
  document.getElementById('modalSubtotalPrice').textContent = formatRupiah(subtotal);
}

function confirmAddToCart() {
  const product = appState.selectedProduct;
  if (!product) return;

  const variant = product.variants[appState.selectedVariantIndex];
  const note = document.getElementById('modalItemNote').value.trim();
  const qty = appState.selectedQty;

  // Check if identical item with same variant and note exists in cart
  const existingIndex = appState.cart.findIndex(item => 
    item.productId === product.id && 
    item.variantName === variant.name && 
    item.note === note
  );

  if (existingIndex >= 0) {
    appState.cart[existingIndex].qty += qty;
    appState.cart[existingIndex].subtotal = appState.cart[existingIndex].qty * variant.price;
  } else {
    appState.cart.push({
      cartId: 'item_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      productId: product.id,
      name: product.name,
      variantName: variant.name,
      price: variant.price,
      qty: qty,
      subtotal: variant.price * qty,
      note: note
    });
  }

  saveData(STORAGE_KEYS.CART);
  updateCartFloatingBar();
  closeModal('productDetailModal');
  showToast(`Berhasil menambahkan ${product.name} (${variant.name}) ke keranjang!`);
}

// ==========================================================================
// CART & FLOATING BAR LOGIC
// ==========================================================================
function updateCartFloatingBar() {
  const bar = document.getElementById('cartFloatingBar');
  const countBadge = document.getElementById('cartCountBadge');
  const totalPreview = document.getElementById('cartTotalPreview');

  const totalItems = appState.cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = appState.cart.reduce((sum, item) => sum + item.subtotal, 0);

  if (totalItems > 0 && !appState.isAdmin) {
    bar.style.display = 'block';
    countBadge.textContent = totalItems;
    totalPreview.textContent = formatRupiah(totalPrice);
  } else {
    bar.style.display = 'none';
  }
}

function renderCartModal() {
  const container = document.getElementById('cartItemsContainer');
  
  if (appState.cart.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 24px; color: var(--gray-500);">
        <p style="font-size: 1.8rem; margin-bottom: 6px;">🛒</p>
        <p>Keranjang belanja masih kosong.</p>
      </div>
    `;
    updateCheckoutSummary();
    return;
  }

  container.innerHTML = appState.cart.map(item => `
    <div class="cart-item-row">
      <div class="cart-item-info">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-variant">Takaran: ${item.variantName} (${formatRupiah(item.price)}/satuan)</div>
        ${item.note ? `<div class="cart-item-note">📝 Catatan: "${item.note}"</div>` : ''}
        <div class="cart-item-price">${formatRupiah(item.subtotal)} (${item.qty} pcs)</div>
      </div>
      <div style="display:flex; flex-direction:column; align-items:flex-end; justify-content:space-between;">
        <button type="button" class="btn-remove-item" onclick="removeFromCart('${item.cartId}')" title="Hapus Item">🗑️</button>
        <div class="qty-control" style="margin-bottom:0; transform: scale(0.85); transform-origin: right;">
          <button type="button" class="btn-qty" onclick="changeCartItemQty('${item.cartId}', -1)">-</button>
          <span class="qty-display">${item.qty}</span>
          <button type="button" class="btn-qty" onclick="changeCartItemQty('${item.cartId}', 1)">+</button>
        </div>
      </div>
    </div>
  `).join('');

  updateCheckoutSummary();
}

function changeCartItemQty(cartId, delta) {
  const item = appState.cart.find(i => i.cartId === cartId);
  if (!item) return;

  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(cartId);
  } else {
    item.subtotal = item.qty * item.price;
    saveData(STORAGE_KEYS.CART);
    renderCartModal();
    updateCartFloatingBar();
  }
}

function removeFromCart(cartId) {
  appState.cart = appState.cart.filter(i => i.cartId !== cartId);
  saveData(STORAGE_KEYS.CART);
  renderCartModal();
  updateCartFloatingBar();
  showToast("Item dihapus dari keranjang", "warning");
}

function selectDeliveryMethod(method) {
  appState.deliveryMethod = method;
  document.getElementById('optPickup').classList.toggle('selected', method === 'pickup');
  document.getElementById('optDelivery').classList.toggle('selected', method === 'delivery');

  document.getElementById('pickupTimeGroup').style.display = method === 'pickup' ? 'block' : 'none';
  document.getElementById('deliveryAddressGroup').style.display = method === 'delivery' ? 'block' : 'none';

  updateCheckoutSummary();
}

function selectPaymentMethod(method) {
  appState.paymentMethod = method;
  document.getElementById('payQris').classList.toggle('selected', method === 'qris');
  document.getElementById('payBank').classList.toggle('selected', method === 'bank');
  document.getElementById('payCash').classList.toggle('selected', method === 'cash');
}

function updateCheckoutSummary() {
  const subtotal = appState.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const shipping = appState.deliveryMethod === 'delivery' ? 5000 : 0;
  const grandTotal = subtotal + shipping;

  document.getElementById('summarySubtotal').textContent = formatRupiah(subtotal);
  document.getElementById('summaryShipping').textContent = shipping === 0 ? 'Gratis (Ambil di Lapak)' : formatRupiah(shipping);
  document.getElementById('summaryGrandTotal').textContent = formatRupiah(grandTotal);
}

// ==========================================================================
// CHECKOUT & RECEIPT GENERATOR
// ==========================================================================
function handleCheckoutSubmit(e) {
  e.preventDefault();

  if (appState.cart.length === 0) {
    showToast("Keranjang belanja masih kosong!", "warning");
    return;
  }

  const custName = document.getElementById('custName').value.trim();
  const custPhone = document.getElementById('custPhone').value.trim();
  const pickupTime = document.getElementById('custPickupTime').value.trim() || 'Langsung ke lapak';
  const custAddress = document.getElementById('custAddress').value.trim();

  if (appState.deliveryMethod === 'delivery' && !custAddress) {
    showToast("Mohon lengkapi alamat pengantaran!", "warning");
    return;
  }

  // Generate Unique Nota ID
  const now = new Date();
  const dateStr = now.toISOString().slice(2, 10).replace(/-/g, '');
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  const notaId = `BMB-${dateStr}-${randomSuffix}`;

  const subtotal = appState.cart.reduce((sum, item) => sum + item.subtotal, 0);
  const shippingFee = appState.deliveryMethod === 'delivery' ? 5000 : 0;
  const total = subtotal + shippingFee;

  const paymentStatusMap = {
    qris: 'Lunas / Scan QRIS',
    bank: 'Transfer Bank',
    cash: 'Bayar di Lapak (Tunai)'
  };

  const newOrder = {
    id: notaId,
    date: formatCurrentDateTime(),
    customer: {
      name: custName,
      phone: custPhone,
      method: appState.deliveryMethod,
      pickupTime: appState.deliveryMethod === 'pickup' ? pickupTime : '-',
      address: appState.deliveryMethod === 'delivery' ? custAddress : '-'
    },
    payment: {
      method: appState.paymentMethod,
      status: paymentStatusMap[appState.paymentMethod],
      isPaid: appState.paymentMethod === 'qris'
    },
    items: [...appState.cart],
    shippingFee: shippingFee,
    total: total,
    status: 'Baru'
  };

  // Save order to history
  appState.orders.unshift(newOrder);
  saveData(STORAGE_KEYS.ORDERS);

  // Clear Cart
  appState.cart = [];
  saveData(STORAGE_KEYS.CART);
  updateCartFloatingBar();
  closeModal('checkoutModal');

  // Render & Show Digital Receipt
  renderReceiptModal(newOrder);
  openModal('receiptModal');

  // Generate & Trigger WhatsApp Dispatch
  sendOrderToWhatsApp(newOrder);
}

function formatCurrentDateTime() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const day = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year = d.getFullYear();
  const hours = pad(d.getHours());
  const mins = pad(d.getMinutes());
  return `${day}/${month}/${year} ${hours}:${mins} WIB`;
}

function renderReceiptModal(order) {
  document.getElementById('receiptStoreName').textContent = appState.config.name.toUpperCase();
  document.getElementById('receiptStoreAddress').textContent = `${appState.config.marketName} - ${appState.config.address}`;
  document.getElementById('receiptStorePhone').textContent = `WhatsApp: ${appState.config.whatsapp}`;

  document.getElementById('receiptNotaId').textContent = '#' + order.id;
  document.getElementById('receiptDate').textContent = order.date;
  document.getElementById('receiptCustomerName').textContent = order.customer.name;
  document.getElementById('receiptCustomerPhone').textContent = order.customer.phone;
  document.getElementById('receiptMethod').textContent = order.customer.method === 'pickup' 
    ? `Ambil di Lapak (${order.customer.pickupTime})` 
    : `Diantar Kurir: ${order.customer.address}`;

  const subtotal = order.items.reduce((sum, i) => sum + i.subtotal, 0);

  const itemsHtml = order.items.map(item => `
    <tr>
      <td>
        <strong>${item.name}</strong><br>
        <span style="font-size:0.75rem; color:#444;">${item.variantName} @ ${formatRupiah(item.price)}</span>
        ${item.note ? `<div class="receipt-item-note">📝 "${item.note}"</div>` : ''}
      </td>
      <td class="col-right" style="font-weight:700;">x${item.qty}</td>
      <td class="col-right" style="font-weight:700;">${formatRupiah(item.subtotal)}</td>
    </tr>
  `).join('');

  document.getElementById('receiptItemsTableBody').innerHTML = itemsHtml;
  document.getElementById('receiptSubtotal').textContent = formatRupiah(subtotal);
  document.getElementById('receiptShipping').textContent = order.shippingFee === 0 ? 'Rp 0 (Lapak)' : formatRupiah(order.shippingFee);
  document.getElementById('receiptGrandTotal').textContent = formatRupiah(order.total);
  document.getElementById('receiptPaymentStatus').textContent = order.payment.status;

  // Setup WhatsApp Re-send button
  document.getElementById('btnSendWaAgain').onclick = () => sendOrderToWhatsApp(order);
}

// ==========================================================================
// WHATSAPP NOTIFICATION FORMATTER
// ==========================================================================
function sendOrderToWhatsApp(order) {
  let message = `🧾 *PESANAN BUMBU BARU - ${appState.config.name.toUpperCase()}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `🔖 *No. Nota :* #${order.id}\n`;
  message += `📅 *Tanggal  :* ${order.date}\n\n`;

  message += `👤 *DATA PEMESAN:*\n`;
  message += `• Nama : ${order.customer.name}\n`;
  message += `• No. HP : ${order.customer.phone}\n`;
  
  if (order.customer.method === 'pickup') {
    message += `• Metode : 🏪 Ambil Sendiri di Lapak\n`;
    message += `• Rencana Ambil : ${order.customer.pickupTime}\n\n`;
  } else {
    message += `• Metode : 🛵 Diantar Kurir Pasar\n`;
    message += `• Alamat : ${order.customer.address}\n\n`;
  }

  message += `📋 *RINCIAN PESANAN BUMBU:*\n`;
  order.items.forEach((item, idx) => {
    message += `${idx + 1}. *${item.name}*\n`;
    message += `   ▫️ Takaran : ${item.variantName} (x${item.qty})\n`;
    if (item.note) {
      message += `   ▫️ Catatan : _"${item.note}"_\n`;
    }
    message += `   ▫️ Harga   : ${formatRupiah(item.subtotal)}\n`;
  });

  const subtotal = order.items.reduce((sum, i) => sum + i.subtotal, 0);
  message += `\n━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `💰 Subtotal Bumbu : ${formatRupiah(subtotal)}\n`;
  message += `🛵 Biaya Ongkir   : ${order.shippingFee === 0 ? 'Rp 0 (Ambil Lapak)' : formatRupiah(order.shippingFee)}\n`;
  message += `🔥 *TOTAL BAYAR   : ${formatRupiah(order.total)}*\n`;
  message += `💳 *Metode Bayar  : ${order.payment.status}*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Mohon segera disiapkan ya Bu/Pak Penjual. Terima kasih!_ 🙏✨`;

  let phone = (appState.config.whatsapp || '').replace(/\D/g, '');
  if (phone.startsWith('0')) {
    phone = '62' + phone.substring(1);
  }
  const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`;
  
  // Open WhatsApp in a new tab
  window.open(waUrl, '_blank');
}

// ==========================================================================
// ADMIN DASHBOARD LOGIC
// ==========================================================================
function toggleAdminMode() {
  appState.isAdmin = !appState.isAdmin;
  const buyerView = document.getElementById('buyerView');
  const adminView = document.getElementById('adminView');
  const toggleBtn = document.getElementById('btnToggleAdmin');
  const toggleText = document.getElementById('adminToggleText');

  if (appState.isAdmin) {
    buyerView.style.display = 'none';
    adminView.classList.add('active');
    toggleBtn.classList.add('active');
    toggleText.textContent = 'Kembali ke Toko';
    renderAdminPanel();
    document.getElementById('cartFloatingBar').style.display = 'none';
  } else {
    buyerView.style.display = 'block';
    adminView.classList.remove('active');
    toggleBtn.classList.remove('active');
    toggleText.textContent = 'Mode Penjual';
    updateCartFloatingBar();
    renderProductGrid();
  }
}

function renderAdminPanel() {
  renderAdminOrders();
  renderAdminProducts();
  renderAdminSettings();
}

function renderAdminOrders() {
  const container = document.getElementById('adminOrderTableBody');
  document.getElementById('adminOrderCount').textContent = appState.orders.length;

  if (appState.orders.length === 0) {
    container.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:20px; color:var(--gray-500);">Belum ada pesanan masuk.</td></tr>`;
    return;
  }

  container.innerHTML = appState.orders.map(order => {
    const itemsSummary = order.items.map(i => `• ${i.name} (${i.variantName} x${i.qty})`).join('<br>');
    const statusClass = order.status.toLowerCase();

    return `
      <tr>
        <td><strong>#${order.id}</strong></td>
        <td style="font-size:0.75rem; color:var(--gray-500);">${order.date}</td>
        <td>
          <strong>${order.customer.name}</strong><br>
          <span style="font-size:0.75rem; color:var(--gray-500);">${order.customer.phone}</span>
        </td>
        <td>${order.customer.method === 'pickup' ? '🏪 Ambil Lapak' : '🛵 Diantar Kurir'}</td>
        <td style="font-size:0.8rem;">${itemsSummary}</td>
        <td><strong style="color:var(--primary);">${formatRupiah(order.total)}</strong></td>
        <td><span style="font-size:0.8rem;">${order.payment.status}</span></td>
        <td>
          <select onchange="updateOrderStatus('${order.id}', this.value)" style="padding:4px 8px; font-size:0.75rem; border-radius:4px; font-weight:700;">
            <option value="Baru" ${order.status === 'Baru' ? 'selected' : ''}>🔴 Baru</option>
            <option value="Diproses" ${order.status === 'Diproses' ? 'selected' : ''}>🟠 Sedang Disiapkan</option>
            <option value="Siap" ${order.status === 'Siap' ? 'selected' : ''}>🔵 Siap Diambil/Kirim</option>
            <option value="Selesai" ${order.status === 'Selesai' ? 'selected' : ''}>🟢 Selesai</option>
          </select>
        </td>
        <td>
          <button class="btn-qty" style="width:auto; padding:4px 8px; font-size:0.75rem;" onclick="viewOrderReceipt('${order.id}')" title="Cetak Nota">
            🧾 Nota
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function updateOrderStatus(orderId, newStatus) {
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    saveData(STORAGE_KEYS.ORDERS);
    showToast(`Status nota #${orderId} diubah ke: ${newStatus}`);
  }
}

function viewOrderReceipt(orderId) {
  const order = appState.orders.find(o => o.id === orderId);
  if (order) {
    renderReceiptModal(order);
    openModal('receiptModal');
  }
}

function renderAdminProducts() {
  const container = document.getElementById('adminProductTableBody');

  container.innerHTML = appState.products.map(prod => {
    const variantsList = prod.variants.map(v => `${v.name}: <strong>${formatRupiah(v.price)}</strong>`).join('<br>');

    return `
      <tr>
        <td>
          <img src="${prod.image}" alt="${prod.name}" style="width:48px; height:48px; border-radius:8px; object-fit:cover;" onerror="this.src='https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80'">
        </td>
        <td>
          <strong>${prod.name}</strong>
          ${prod.badge ? `<br><span class="product-badge" style="position:static; display:inline-block; margin-top:2px;">${prod.badge}</span>` : ''}
        </td>
        <td>${getCategoryName(prod.category)}</td>
        <td style="font-size:0.8rem;">${variantsList}</td>
        <td>
          <button class="badge-status ${prod.inStock ? 'selesai' : 'baru'}" style="border:none; cursor:pointer;" onclick="toggleProductStock('${prod.id}')">
            ${prod.inStock ? '✅ Tersedia' : '❌ Habis'}
          </button>
        </td>
        <td>
          <button class="btn-qty" style="width:auto; padding:6px 10px; font-size:0.75rem;" onclick="openEditProductModal('${prod.id}')">
            ✏️ Ubah Harga/Data
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function toggleProductStock(prodId) {
  const prod = appState.products.find(p => p.id === prodId);
  if (prod) {
    prod.inStock = !prod.inStock;
    saveData(STORAGE_KEYS.PRODUCTS);
    renderAdminProducts();
    showToast(`Status stok "${prod.name}" diperbarui!`);
  }
}

function openAddProductModal() {
  document.getElementById('adminProductModalTitle').textContent = '➕ Tambah Bumbu Baru';
  document.getElementById('editProdId').value = '';
  document.getElementById('editProdName').value = '';
  document.getElementById('editProdCategory').value = 'giling';
  document.getElementById('editProdBadge').value = '';
  document.getElementById('editProdDesc').value = '';
  document.getElementById('editProdImg').value = '';

  const variantContainer = document.getElementById('adminVariantList');
  variantContainer.innerHTML = '';
  addAdminVariantRow('1/4 Kg (250 gr)', 15000);
  addAdminVariantRow('1/2 Kg (500 gr)', 28000);
  addAdminVariantRow('1 Kg (1000 gr)', 55000);

  openModal('editProductModal');
}

function openEditProductModal(prodId) {
  const prod = appState.products.find(p => p.id === prodId);
  if (!prod) return;

  document.getElementById('adminProductModalTitle').textContent = `✏️ Edit Bumbu: ${prod.name}`;
  document.getElementById('editProdId').value = prod.id;
  document.getElementById('editProdName').value = prod.name;
  document.getElementById('editProdCategory').value = prod.category;
  document.getElementById('editProdBadge').value = prod.badge || '';
  document.getElementById('editProdDesc').value = prod.description || '';
  document.getElementById('editProdImg').value = prod.image || '';

  const variantContainer = document.getElementById('adminVariantList');
  variantContainer.innerHTML = '';
  prod.variants.forEach(v => {
    addAdminVariantRow(v.name, v.price);
  });

  openModal('editProductModal');
}

function addAdminVariantRow(name = '', price = '') {
  const container = document.getElementById('adminVariantList');
  const row = document.createElement('div');
  row.className = 'admin-variant-row';
  row.style.cssText = 'display:flex; gap:8px; align-items:center;';
  row.innerHTML = `
    <input type="text" placeholder="Nama Takaran (misal: 1/4 Kg)" value="${name}" class="var-name" style="flex:2;" required>
    <input type="number" placeholder="Harga (Rp)" value="${price}" class="var-price" style="flex:1;" required>
    <button type="button" class="btn-qty" style="color:var(--danger);" onclick="this.parentElement.remove()">🗑️</button>
  `;
  container.appendChild(row);
}

function handleAdminProductSubmit(e) {
  e.preventDefault();

  const id = document.getElementById('editProdId').value;
  const name = document.getElementById('editProdName').value.trim();
  const category = document.getElementById('editProdCategory').value;
  const badge = document.getElementById('editProdBadge').value.trim();
  const description = document.getElementById('editProdDesc').value.trim();
  const image = document.getElementById('editProdImg').value.trim() || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80';

  // Extract variants
  const varRows = document.querySelectorAll('#adminVariantList .admin-variant-row');
  const variants = [];
  varRows.forEach((row, idx) => {
    const varName = row.querySelector('.var-name').value.trim();
    const varPrice = Number(row.querySelector('.var-price').value);
    if (varName && varPrice > 0) {
      variants.push({
        name: varName,
        weight: varName,
        price: varPrice,
        default: idx === 0
      });
    }
  });

  if (variants.length === 0) {
    showToast("Minimal harus ada 1 varian takaran dan harga!", "warning");
    return;
  }

  if (id) {
    // Edit existing
    const existingIndex = appState.products.findIndex(p => p.id === id);
    if (existingIndex >= 0) {
      appState.products[existingIndex] = {
        ...appState.products[existingIndex],
        name, category, badge, description, image, variants
      };
    }
  } else {
    // Add new
    const newProd = {
      id: 'p_' + Date.now(),
      name, category, badge, description, image, variants,
      inStock: true,
      notePlaceholder: "Catatan takaran atau rasa khusus"
    };
    appState.products.push(newProd);
  }

  saveData(STORAGE_KEYS.PRODUCTS);
  renderAdminProducts();
  renderProductGrid();
  closeModal('editProductModal');
  showToast("Data bumbu & penyesuaian harga berhasil disimpan!");
}

function renderAdminSettings() {
  document.getElementById('settingStoreName').value = appState.config.name || '';
  document.getElementById('settingWhatsapp').value = appState.config.whatsapp || '';
  document.getElementById('settingMarketName').value = appState.config.marketName || '';
  document.getElementById('settingAddress').value = appState.config.address || '';
  document.getElementById('settingBankName').value = appState.config.bankName || '';
  document.getElementById('settingBankAccount').value = `${appState.config.bankAccount} a.n ${appState.config.bankHolder}`;
  document.getElementById('settingQrisName').value = appState.config.qrisName || '';
  document.getElementById('settingQrisNmid').value = appState.config.qrisNmid || '';
}

function handleStoreSettingsSubmit(e) {
  e.preventDefault();

  appState.config.name = document.getElementById('settingStoreName').value.trim();
  appState.config.whatsapp = document.getElementById('settingWhatsapp').value.trim();
  appState.config.marketName = document.getElementById('settingMarketName').value.trim();
  appState.config.address = document.getElementById('settingAddress').value.trim();
  appState.config.bankName = document.getElementById('settingBankName').value.trim();
  appState.config.qrisName = document.getElementById('settingQrisName').value.trim();
  appState.config.qrisNmid = document.getElementById('settingQrisNmid').value.trim();

  saveData(STORAGE_KEYS.CONFIG);
  renderNavbar();
  showToast("Pengaturan toko & nomor WhatsApp berhasil diperbarui!");
}
