// 장바구니 정보 가져오기
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartItems = document.getElementById("cart-items");
const totalPrice = document.getElementById("total-price");

// 장바구니 화면 렌더링 함수
function renderCart() {
  cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = "<p style='padding: 40px; text-align: center; color: #888;'>장바구니가 비어 있습니다.</p>";
    totalPrice.innerText = "";
    return;
  }

  cart.forEach((item, index) => {
    const itemDiv = document.createElement("div");
    itemDiv.className = "product-card";
    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h3>${item.name}</h3>
      <p>${item.price.toLocaleString()}원 × ${item.qty}</p>
      <div class="cart-buttons">
        <button onclick="updateQty(${index}, 1)">➕</button>
        <button onclick="updateQty(${index}, -1)">➖</button>
        <button onclick="removeItem(${index})">❌ 삭제</button>
      </div>
    `;
    total += item.price * item.qty;
    cartItems.appendChild(itemDiv);
  });

  totalPrice.innerText = `총 합계: ${total.toLocaleString()}원`;
}

// 수량 변경 함수
function updateQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// 항목 삭제 함수
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

renderCart();

// 찜한 상품 해시 이동 이벤트 설정
// (찜한 상품 텍스트가 포함된 a 태그 클릭 시 index.html#liked로 이동)
document.querySelectorAll("a").forEach(link => {
  if (link.textContent.includes("찜한 상품")) {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "index.html#liked";
    });
  }
});
