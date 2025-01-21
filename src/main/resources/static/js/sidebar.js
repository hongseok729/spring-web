document.addEventListener("DOMContentLoaded", function () {
    // 여러 개의 사이드바(.sidebar)를 모두 검색
    const sidebars = document.querySelectorAll(".sidebar");

    sidebars.forEach(function (sidebar) {
        // 각 사이드바 내의 toggle 버튼, 메뉴 아이템 등을 찾습니다.
        const toggleBtn = sidebar.querySelector(".toggle-btn");
        const menuItems = sidebar.querySelectorAll(".menu-item");

        // 홈 버튼: href가 "/" 인 경우, 부모 클릭 이벤트 전파 차단
        const homeLink = sidebar.querySelector(".menu-item a.menu-link[href='/']");
        if (homeLink) {
            homeLink.addEventListener("click", function (e) {
                // 부모의 click 이벤트가 실행되지 않도록 차단
                e.stopPropagation();
                // 기본 링크 이동은 그대로 진행
            });
        }

        /**
         * 주어진 메뉴 아이템에 속한 서브메뉴를 토글(열기/닫기)합니다.
         * - 서브메뉴가 없다면 아무 동작도 하지 않습니다.
         * - 이미 열려 있다면 닫고, 닫혀 있다면 엽니다.
         *   (다른 메뉴에는 영향 주지 않음)
         */
        function toggleSubMenu(menuItem) {
            const subMenu = menuItem.querySelector(".sub-menu");
            if (!subMenu) return; // 서브메뉴가 없으면 패스

            if (menuItem.classList.contains("active")) {
                // 이미 열려 있다면 닫기
                menuItem.classList.remove("active");
                subMenu.style.maxHeight = null;
            } else {
                // 닫혀 있다면 열기
                menuItem.classList.add("active");
                subMenu.style.maxHeight = subMenu.scrollHeight + "px";
            }
        }

        /**
         * 각 메뉴 아이템(.menu-item)에 클릭 이벤트 부여
         * - 서브메뉴 내부를 클릭하면 기본 이동 허용
         * - 홈 버튼(href="/") 클릭 시 부모 토글 로직 미실행
         * - 사이드바가 닫혀 있으면 먼저 열고, 서브메뉴 토글
         */
        menuItems.forEach(function (menuItem) {
            menuItem.addEventListener("click", function (e) {
                // 1) 클릭 대상이 서브메뉴 내부라면(서브메뉴 항목 링크) 부모 토글 로직 실행 안 함.
                if (e.target.closest(".sub-menu")) {
                    return; // 서브메뉴 링크 클릭 => 기본 이동
                }

                // 2) 홈 버튼이면(메인 링크 "/") 이미 별도 처리되었으므로 토글 로직 X
                const homeLinkInThisItem = menuItem.querySelector("a.menu-link[href='/']");
                if (homeLinkInThisItem && e.target.closest("a.menu-link[href='/']")) {
                    return;
                }

                // 기본 동작 막기 (예: "#" 링크 등 이동 방지)
                e.preventDefault();

                // 3) 사이드바가 닫혀 있으면 먼저 열기
                if (!sidebar.classList.contains("open")) {
                    sidebar.classList.add("open");
                    if (toggleBtn) {
                        toggleBtn.textContent = "<";
                    }
                }

                // 4) 해당 메뉴 아이템의 서브메뉴만 토글
                toggleSubMenu(menuItem);
            });
        });

        /**
         * 아이콘(i) 클릭 시에도 동일한 로직
         * - 홈 버튼 아이콘은 제외
         */
        const icons = sidebar.querySelectorAll(".menu-item i");
        icons.forEach(function (icon) {
            icon.addEventListener("click", function (e) {
                // 홈 버튼 아이콘이면 토글 로직 적용 X
                const isHomeIcon = icon
                    .closest(".menu-item")
                    ?.querySelector("a.menu-link[href='/']");
                if (isHomeIcon) {
                    return;
                }

                // 아이콘 클릭 시 이벤트 전파 차단 (부모 중복 클릭 방지)
                e.stopPropagation();

                // 사이드바가 닫혀 있으면 먼저 열기
                if (!sidebar.classList.contains("open")) {
                    sidebar.classList.add("open");
                    if (toggleBtn) {
                        toggleBtn.textContent = "<";
                    }
                }
                toggleSubMenu(icon.closest(".menu-item"));
            });
        });

        /**
         * 토글 버튼(☰ / <) 클릭 이벤트:
         * - 사이드바 자체를 열거나 닫음
         * - 닫을 경우 모든 서브메뉴도 닫음
         */
        if (toggleBtn) {
            toggleBtn.addEventListener("click", function () {
                const isOpen = sidebar.classList.toggle("open");
                if (isOpen) {
                    toggleBtn.textContent = "<";
                } else {
                    toggleBtn.textContent = "☰";

                    // 사이드바가 닫힐 때 모든 서브메뉴 초기화
                    menuItems.forEach(function (menuItem) {
                        menuItem.classList.remove("active");
                        const subMenu = menuItem.querySelector(".sub-menu");
                        if (subMenu) {
                            subMenu.style.maxHeight = null;
                        }
                    });
                }
            });
        }
    }); // end of sidebars.forEach
});
