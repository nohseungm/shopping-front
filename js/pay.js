// 장바구니 정보 로드
const cart = JSON.parse(localStorage.getItem("cart")) || [];
const orderSummary = document.getElementById("order-summary");
const receiptBox = document.getElementById("receipt-box");

// 주문 번호 생성
function generateOrderNumber() {
  return "#" + Math.floor(100000 + Math.random() * 900000);
}

// 현재 날짜 및 시간 포맷
function getCurrentDateTime() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

// 장바구니 비어 있는 경우
if (cart.length === 0) {
  orderSummary.innerHTML = "<p style='color: #888;'>장바구니에 담긴 상품이 없습니다.</p>";
  receiptBox.innerHTML = "";
} else {
  // 장바구니 정보 렌더링
  let total = 0;
  const list = cart.map(item => {
    total += item.price * item.qty;
    return `<p>${item.name} × ${item.qty}개 = ${(item.price * item.qty).toLocaleString()}원</p>`;
  }).join("");

  orderSummary.innerHTML = `
    <div style="margin-bottom: 16px;">${list}</div>
    <strong>총 합계: ${total.toLocaleString()}원</strong>
  `;

  receiptBox.innerHTML = `
    <h4>🧾 전자 영수증</h4>
    ${list}
    <p><strong>총 금액:</strong> ${total.toLocaleString()}원</p>
    <p><strong>주문번호:</strong> ${generateOrderNumber()}</p>
    <p><strong>결제일시:</strong> ${getCurrentDateTime()}</p>
  `;
}

// 결제 완료 시 이벤트 처리
const checkoutForm = document.getElementById("checkout-form");

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    alert("상품을 장바구니에 담아주세요.");
    return;
  }

  alert("결제가 완료되었습니다! 감사합니다 🙏");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});
