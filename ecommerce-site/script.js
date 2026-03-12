const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 49.99,
    old: 69.99,
    category: "Audio",
    badge: "Sale",
    img: "https://placehold.co/200x150?text=Headphones",
  },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 79.99,
    old: null,
    category: "Peripherals",
    badge: "New",
    img: "https://placehold.co/200x150?text=Keyboard",
  },
  {
    id: 3,
    name: "USB-C Hub",
    price: 29.99,
    old: 39.99,
    category: "Peripherals",
    badge: "Sale",
    img: "https://placehold.co/200x150?text=USB+Hub",
  },
  {
    id: 4,
    name: "Webcam HD 1080p",
    price: 59.99,
    old: null,
    category: "Peripherals",
    badge: "",
    img: "https://placehold.co/200x150?text=Webcam",
  },
  {
    id: 5,
    name: "Noise-Cancel Earbuds",
    price: 39.99,
    old: 55.0,
    category: "Audio",
    badge: "Hot",
    img: "https://placehold.co/200x150?text=Earbuds",
  },
  {
    id: 6,
    name: "LED Desk Lamp",
    price: 34.99,
    old: null,
    category: "Lighting",
    badge: "New",
    img: "https://placehold.co/200x150?text=Lamp",
  },
  {
    id: 7,
    name: "Boom Microphone",
    price: 89.99,
    old: 110.0,
    category: "Audio",
    badge: "Sale",
    img: "https://placehold.co/200x150?text=Microphone",
  },
  {
    id: 8,
    name: "RGB Mouse Pad XL",
    price: 19.99,
    old: null,
    category: "Peripherals",
    badge: "",
    img: "https://placehold.co/200x150?text=Mouse+Pad",
  },
];

let cart = [];

function renderProducts(list) {
  document.getElementById("product-grid").innerHTML = list
    .map(
      (p) => `
    <div class="card">
      ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
      <img src="${p.img}" alt="${p.name}" />
      <h3>${p.name}</h3>
      ${p.old ? `<span class="old-price">$${p.old.toFixed(2)}</span>` : ""}
      <p class="price">$${p.price.toFixed(2)}</p>
      <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
    </div>`,
    )
    .join("");
}

function filterProducts(cat) {
  const filtered = cat ? products.filter((p) => p.category === cat) : products;
  renderProducts(filtered);
  document.getElementById("products").scrollIntoView({ behavior: "smooth" });
}

function addToCart(id) {
  const item = cart.find((i) => i.id === id);
  item
    ? item.qty++
    : cart.push({ ...products.find((p) => p.id === id), qty: 1 });
  document.getElementById("cart-count").textContent = cart.reduce(
    (s, i) => s + i.qty,
    0,
  );
}

function renderCart() {
  document.getElementById("cart-items").innerHTML = cart.length
    ? cart
        .map(
          (i) =>
            `<li><span>${i.name} × ${i.qty}</span><span>$${(i.price * i.qty).toFixed(2)}</span></li>`,
        )
        .join("")
    : "<li>Your cart is empty.</li>";
  document.getElementById("cart-total").textContent = cart
    .reduce((s, i) => s + i.price * i.qty, 0)
    .toFixed(2);
}

document.getElementById("cart-btn").onclick = () => {
  renderCart();
  document.getElementById("cart-modal").classList.remove("hidden");
};
document.getElementById("close-cart").onclick = () =>
  document.getElementById("cart-modal").classList.add("hidden");
document.getElementById("checkout-btn").onclick = () => {
  if (!cart.length) return alert("Your cart is empty!");
  alert("✅ Order placed! Thank you for shopping with ShopBase.");
  cart = [];
  document.getElementById("cart-count").textContent = 0;
  document.getElementById("cart-modal").classList.add("hidden");
};

document.getElementById("search").oninput = (e) =>
  renderProducts(
    products.filter((p) =>
      p.name.toLowerCase().includes(e.target.value.toLowerCase()),
    ),
  );

function subscribeNewsletter(e) {
  e.preventDefault();
  alert("🎉 Thanks for subscribing! Check your inbox for your 10% discount.");
  document.getElementById("email-input").value = "";
}
function submitContact(e) {
  e.preventDefault();
  alert("✅ Message sent! We'll get back to you within 24 hours.");
  e.target.reset();
}

renderProducts(products);
