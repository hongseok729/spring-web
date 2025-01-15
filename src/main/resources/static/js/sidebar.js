// sidebar.js
document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const menuItems = document.querySelectorAll(".menu-item");
    const icons = document.querySelectorAll(".menu-item i"); // 모든 아이콘 선택

    // 사이드바 토글 함수
    function toggleSidebar() {
        sidebar.classList.toggle("open");

        // 사이드바가 닫힐 때 모든 서브메뉴과 활성화 상태 해제
        if (!sidebar.classList.contains("open")) {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
                const subMenu = menuItem.querySelector(".sub-menu");
                if (subMenu) {
                    subMenu.style.maxHeight = null;
                }
                // 활성화된 아이콘 해제
                const icon = menuItem.querySelector("i");
                if (icon) {
                    icon.classList.remove("active");
                }
            });
        }
    }

    // 서브메뉴 토글 함수
    function toggleSubMenu(menuItem) {
        const subMenu = menuItem.querySelector(".sub-menu");
        const isActive = menuItem.classList.toggle("active");

        if (isActive) {
            subMenu.style.maxHeight = subMenu.scrollHeight + "px";
        } else {
            subMenu.style.maxHeight = null;
        }
    }

    // ☰ 버튼 클릭 시 사이드바 열기/닫기
    toggleBtn.addEventListener("click", toggleSidebar);

    // 아이콘 클릭 시 활성화 상태 토글 및 사이드바 열기
    icons.forEach((icon) => {
        icon.addEventListener("click", function (e) {
            e.stopPropagation(); // 이벤트 버블링 방지

            // 현재 클릭된 아이콘의 부모 메뉴 아이템
            const menuItem = this.closest(".menu-item");

            // 다른 아이콘의 활성화 상태 해제
            icons.forEach((otherIcon) => {
                if (otherIcon !== this) {
                    otherIcon.classList.remove("active");
                }
            });

            // 클릭된 아이콘의 활성화 상태 토글
            this.classList.toggle("active");

            // 사이드바 열기
            if (!sidebar.classList.contains("open")) {
                sidebar.classList.add("open");
            }

            // 서브메뉴 토글
            if (menuItem.querySelector(".sub-menu")) {
                toggleSubMenu(menuItem);
            }
        });

        // 키보드 접근성 추가 (Enter 또는 Space 키)
        icon.addEventListener("keydown", function (e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault(); // 기본 동작 방지
                this.click(); // 클릭 이벤트 트리거
            }
        });
    });

    // 메뉴 아이템 클릭 시 서브메뉴 열림/닫힘 처리
    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", function (e) {
            // 메뉴 아이템 내부의 아이콘 클릭 시는 이미 처리되었으므로 무시
            if (e.target.closest("i")) {
                return;
            }
            // 아이콘 외부를 클릭했을 때는 서브메뉴 토글
            toggleSubMenu(menuItem);
        });
    });
});
