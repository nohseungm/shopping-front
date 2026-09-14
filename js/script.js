// 상품 목록 정의
const products = [
  { id: 1, name: "베이직 반팔 티셔츠", price: 15000, image: "img/product1.jpg", category: "티셔츠" },
  { id: 2, name: "데님 청바지", price: 39000, image: "img/product2.jpg", category: "청바지" },
  { id: 3, name: "후드 집업", price: 45000, image: "img/product3.jpg", category: "아우터" },
  { id: 4, name: "블랙 슬랙스", price: 34000, image: "img/product4.jpg", category: "슬랙스" },
  { id: 5, name: "롱패딩 점퍼", price: 95000, image: "img/product5.jpg", category: "아우터" }
];

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let liked = JSON.parse(localStorage.getItem("likes")) || [];
const productList = document.getElementById("product-list");
let currentView = "home";
let currentCategory = "all";

// 상품 목록 렌더링 함수
function renderProducts(productArray) {
  productList.innerHTML = "";

  productArray.forEach(product => {
    const isLiked = liked.includes(product.id);
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.price.toLocaleString()}원</p>
      <button onclick="addToCart(${product.id})">장바구니 담기</button>
      <button class="like-btn ${isLiked ? "liked" : ""}" onclick="toggleLike(${product.id})">
        ${isLiked ? "❤️" : "🤍"}
      </button>
    `;
    productList.appendChild(card);
  });
}

// 장바구니에 상품 추가
function addToCart(productId) {
  const selected = products.find(p => p.id === productId);
  const existing = cart.find(item => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...selected, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`🛒 "${selected.name}"이(가) 장바구니에 추가되었습니다.`);
}

// 찜 기능 on/off
function toggleLike(productId) {
  if (liked.includes(productId)) {
    liked = liked.filter(id => id !== productId);
  } else {
    liked.push(productId);
  }
  localStorage.setItem("likes", JSON.stringify(liked));
  currentView === "liked" ? showLikedProducts() : filterCategory(currentCategory);
}

// 찜한 상품만 보기
function showLikedProducts() {
  currentView = "liked";
  const likedProducts = products.filter(p => liked.includes(p.id));
  document.getElementById("hero").style.display = "none";
  document.getElementById("filters").style.display = "none";
  if (likedProducts.length === 0) {
    productList.innerHTML = `<p style="padding: 40px; text-align: center; font-size: 18px; color: #888;">찜한 상품이 없습니다.</p>`;
  } else {
    renderProducts(likedProducts);
  }
}

// 카테고리별 상품 필터링
function filterCategory(category) {
  currentView = "home";
  currentCategory = category;
  document.getElementById("hero").style.display = "block";
  document.getElementById("filters").style.display = "block";
  const filtered = category === "all"
    ? products
    : products.filter(p => p.category === category);
  renderProducts(filtered);
}

// 페이지 로드 시 초기 렌더링 분기
if (window.location.hash === "#liked") {
  currentView = "liked";
  showLikedProducts();
} else {
  filterCategory("all");
}
