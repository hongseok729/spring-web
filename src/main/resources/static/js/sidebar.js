document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const toggleBtn = document.getElementById("toggleBtn");
    const menuItems = document.querySelectorAll(".menu-item");
    const notificationIcons = document.querySelectorAll(".menu-item i"); // 모든 아이콘

    // 사이드바와 서브메뉴를 토글하는 함수
    function toggleSidebarAndSubMenu(icon) {
        const parentMenuItem = icon.closest(".menu-item");
        const subMenu = parentMenuItem.querySelector(".sub-menu");
        const isSidebarOpen = sidebar.classList.contains("open");
        const isMenuActive = parentMenuItem.classList.contains("active");

        if (!isSidebarOpen) {
            // 사이드바를 열고 서브메뉴 활성화
            sidebar.classList.add("open");
            parentMenuItem.classList.add("active");
            if (subMenu) {
                subMenu.style.maxHeight = subMenu.scrollHeight + "px"; // 서브메뉴 열기
            }
            toggleBtn.textContent = "<"; // 버튼 모양을 '<'로 변경
        } else if (isSidebarOpen && isMenuActive) {
            // 사이드바를 닫고 서브메뉴 비활성화
            sidebar.classList.remove("open");
            parentMenuItem.classList.remove("active");
            if (subMenu) {
                subMenu.style.maxHeight = null; // 서브메뉴 닫기
            }
            toggleBtn.textContent = "☰"; // 사이드바가 닫히면 기본 버튼으로 돌아감
        } else {
            // 사이드바가 열려 있고 다른 메뉴를 선택한 경우
            menuItems.forEach((item) => {
                item.classList.remove("active");
                const otherSubMenu = item.querySelector(".sub-menu");
                if (otherSubMenu) {
                    otherSubMenu.style.maxHeight = null;
                }
            });

            parentMenuItem.classList.add("active");
            if (subMenu) {
                subMenu.style.maxHeight = subMenu.scrollHeight + "px"; // 새로운 서브메뉴 열기
            }
        }
    }

    // 아이콘 클릭 시 사이드바와 서브메뉴 토글
    notificationIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            toggleSidebarAndSubMenu(icon);
        });
    });

    // ☰ 버튼 클릭 시 사이드바 열기/닫기
    toggleBtn.addEventListener("click", () => {
        const isOpen = sidebar.classList.toggle("open");

        // 사이드바가 열리면 버튼을 '<'로 변경
        if (isOpen) {
            toggleBtn.textContent = "<"; // 사이드바 열릴 때 '<'로 변경
        } else {
            toggleBtn.textContent = "☰"; // 사이드바가 닫히면 기본 버튼으로 변경
        }

        // 사이드바가 닫힐 때 모든 서브메뉴 닫기
        if (!isOpen) {
            menuItems.forEach((menuItem) => {
                menuItem.classList.remove("active");
                const subMenu = menuItem.querySelector(".sub-menu");
                if (subMenu) {
                    subMenu.style.maxHeight = null;
                }
            });
        }
    });

    // 메뉴 아이템 클릭 시 서브메뉴 열림/닫힘 처리
    menuItems.forEach((menuItem) => {
        menuItem.addEventListener("click", function () {
            const subMenu = menuItem.querySelector(".sub-menu");

            // 사이드바가 닫혀 있으면 열기
            if (!sidebar.classList.contains("open")) {
                sidebar.classList.add("open");
                toggleBtn.textContent = "<"; // 사이드바 열릴 때 버튼을 '<'로 변경
            }

            // 서브메뉴 열기
            if (subMenu) {
                const isActive = menuItem.classList.toggle("active");

                // 서브메뉴 열림/닫힘 애니메이션 처리
                if (isActive) {
                    subMenu.style.maxHeight = subMenu.scrollHeight + "px";
                } else {
                    subMenu.style.maxHeight = null;
                }
            }
        });
    });
});