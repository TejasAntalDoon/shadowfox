const products = [
  {
    id: 1,
    name: "ANC Pro Headphones",
    price: 89.99,
    old: 119.99,
    cat: "Audio",
    badge: "sale",
    rating: 5,
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Mech RGB Keyboard",
    price: 129.99,
    old: null,
    cat: "Peripherals",
    badge: "new",
    rating: 5,
    img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Noise-Cancel Earbuds",
    price: 59.99,
    old: 79.99,
    cat: "Audio",
    badge: "sale",
    rating: 4,
    img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "4K Webcam Ultra",
    price: 99.99,
    old: null,
    cat: "Peripherals",
    badge: "new",
    rating: 5,
    img: "https://images.unsplash.com/photo-1587826080692-f439cd0b70da?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "USB-C 7-in-1 Hub",
    price: 39.99,
    old: 54.99,
    cat: "Peripherals",
    badge: "sale",
    rating: 4,
    img: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Boom Studio Mic",
    price: 149.99,
    old: null,
    cat: "Audio",
    badge: "",
    rating: 5,
    img: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Ambient LED Strip 5m",
    price: 34.99,
    old: 44.99,
    cat: "Lighting",
    badge: "sale",
    rating: 4,
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: '27" Curved Display',
    price: 299.99,
    old: 349.99,
    cat: "Displays",
    badge: "hot",
    rating: 5,
    img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    price: 24.99,
    old: null,
    cat: "Peripherals",
    badge: "new",
    rating: 4,
    img: "https://images.unsplash.com/photo-1586495777744-4e6232bf2f9e?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Smart Desk Lamp",
    price: 54.99,
    old: 69.99,
    cat: "Lighting",
    badge: "sale",
    rating: 5,
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop",
  },
];

/* ── RENDER PRODUCTS ─────────────────────────── */
function renderProducts(list) {
  document.getElementById("product-grid").innerHTML = list.length
    ? list
        .map(
          (p) => `
      <div class="card">
        <div class="card-img">
          <img src="${p.img}" alt="${p.name}" loading="lazy" />
          ${p.badge ? `<span class="badge ${p.badge === "new" ? "new" : ""}">${p.badge.toUpperCase()}</span>` : ""}
        </div>
        <div class="card-body">
          <div class="card-cat">${p.cat}</div>
          <div class="stars">${"★".repeat(p.rating)}${"☆".repeat(5 - p.rating)}</div>
          <h3>${p.name}</h3>
          <div class="card-price">
            <span class="price">$${p.price.toFixed(2)}</span>
            ${p.old ? `<span class="old-price">$${p.old.toFixed(2)}</span>` : ""}
          </div>
          <button class="btn-primary" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>`,
        )
        .join("")
    : `<p style="color:var(--muted);grid-column:1/-1;text-align:center;padding:3rem">No products found.</p>`;
}

/* ── CART ────────────────────────────────────── */
function addToCart(id) {
  const found = cart.find((i) => i.id === id);
  found
    ? found.qty++
    : cart.push({ ...products.find((p) => p.id === id), qty: 1 });
  updateCartUI();
  showToast("Added to cart ✓");
}

function removeFromCart(id) {
  cart = cart.filter((i) => i.id !== id);
  updateCartUI();
  renderCartDrawer();
}

function updateCartUI() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  document.getElementById("cart-count").textContent = total;
  document.getElementById("drawer-count").textContent = total;
}

function renderCartDrawer() {
  const list = document.getElementById("cart-items");
  if (!cart.length) {
    list.innerHTML = `<div class="cart-empty"><div>🛒</div><p>Your cart is empty</p></div>`;
  } else {
    list.innerHTML = cart
      .map(
        (i) => `
      <li class="cart-item">
        <img src="${i.img}" alt="${i.name}" />
        <div class="cart-item-info">
          <h4>${i.name}</h4>
          <p>Qty: ${i.qty}</p>
        </div>
        <span class="cart-item-price">$${(i.price * i.qty).toFixed(2)}</span>
        <button class="cart-item-remove" onclick="removeFromCart(${i.id})">✕</button>
      </li>`,
      )
      .join("");
  }
  document.getElementById("cart-total").textContent = cart
    .reduce((s, i) => s + i.price * i.qty, 0)
    .toFixed(2);
}

function toggleCart() {
  const overlay = document.getElementById("cart-overlay");
  overlay.classList.toggle("hidden");
  if (!overlay.classList.contains("hidden")) renderCartDrawer();
}

function closeCart(e) {
  if (e.target === document.getElementById("cart-overlay")) toggleCart();
}

/* ── FILTER & SEARCH ─────────────────────────── */
function filterCat(btn, cat) {
  document
    .querySelectorAll(".cat-pill")
    .forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(cat ? products.filter((p) => p.cat === cat) : products);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("search").addEventListener("input", (e) => {
  const q = e.target.value.toLowerCase();
  renderProducts(
    q
      ? products.filter(
          (p) =>
            p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q),
        )
      : products,
  );
});

/* ── CHECKOUT ────────────────────────────────── */
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (!cart.length) return showToast("Your cart is empty!");
  showToast("Order placed! Thank you 🎉");
  cart = [];
  updateCartUI();
  renderCartDrawer();
  setTimeout(toggleCart, 1500);
});

/* ── TOAST ───────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.add("hidden"), 2500);
}

/* ── MOBILE MENU ─────────────────────────────── */
document
  .getElementById("menu-btn")
  .addEventListener("click", () =>
    document.getElementById("mobile-nav").classList.toggle("hidden"),
  );
function closeMenu() {
  document.getElementById("mobile-nav").classList.add("hidden");
}

/* ── FORMS ───────────────────────────────────── */
function subscribe(e) {
  e.preventDefault();
  showToast("Subscribed! Check your inbox 🎉");
  document.getElementById("nl-email").value = "";
}
function sendMsg(e) {
  e.preventDefault();
  showToast("Message sent! We'll reply within 24h ✓");
  e.target.reset();
}

/* ── STICKY HEADER SHADOW ────────────────────── */
window.addEventListener(
  "scroll",
  () =>
    (document.getElementById("header").style.boxShadow =
      scrollY > 10 ? "0 2px 20px rgba(0,0,0,.4)" : "none"),
);

/* ── CART BUTTON ─────────────────────────────── */
document.getElementById("cart-btn").addEventListener("click", toggleCart);

/* ── INIT ────────────────────────────────────── */
renderProducts(products);
