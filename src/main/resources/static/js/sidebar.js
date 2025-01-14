// sidebar.js
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");

    toggleBtn.addEventListener("click", () => {
        sidebar.classList.toggle("open"); // 사이드바 열기/닫기 토글
    });
});
