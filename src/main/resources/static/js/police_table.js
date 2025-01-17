// 모달 관련 요소 가져오기
const modal = document.getElementById("supportModal");
const span = document.getElementsByClassName("close")[0];
const stationNameInput = document.getElementById("stationName");
const supportForm = document.getElementById("supportForm");
const photoInput = document.getElementById("photo");
const fileList = document.getElementById("fileList");
const fileCount = document.getElementById("fileCount");

// 선택된 파일 목록을 저장할 배열
let selectedFiles = [];

// 관서 클릭 시 모달 열기
function stationClick(stationName) {
    if (stationNameInput) {
        stationNameInput.value = stationName; // 관서명 입력
        console.log(`관서명 설정: ${stationName}`); // 디버깅 메시지 추가
    } else {
        console.error("stationNameInput 요소를 찾을 수 없습니다."); // 디버깅용 오류 메시지
    }
    modal.style.display = "block"; // 모달 표시
}

// 닫기 버튼 클릭 시 모달 닫기 및 폼 초기화
span.onclick = function () {
    closeModal();
}

// 모달 외부 클릭 시 닫기 및 폼 초기화
window.onclick = function (event) {
    if (event.target == modal) {
        closeModal();
    }
}

// 모달 닫기 함수
function closeModal() {
    modal.style.display = "none";
    supportForm.reset(); // 모달 닫을 때 폼 초기화
    selectedFiles = []; // 선택된 파일 초기화
    renderFileList(); // 파일 리스트 초기화
}

// 파일 입력 변경 시 처리
photoInput.addEventListener("change", function () {
    for (let i = 0; i < photoInput.files.length; i++) {
        const file = photoInput.files[i];
        // 이미 선택된 파일인지 확인
        if (!selectedFiles.some(f => f.name === file.name && f.size === file.size && f.lastModified === file.lastModified)) {
            selectedFiles.push(file);
        }
    }
    renderFileList();
    // 폼의 파일 입력 필드를 초기화하여 동일한 파일을 다시 선택할 수 있도록 함
    photoInput.value = ""; // 전체 폼을 초기화하지 않고 파일 입력만 초기화
});

// 파일 리스트 렌더링 함수
function renderFileList() {
    fileList.innerHTML = ""; // 기존 리스트 초기화

    if (selectedFiles.length === 0) {
        fileCount.textContent = "선택된 파일 없음";
    } else {
        fileCount.textContent = `${selectedFiles.length}개의 파일이 선택되었습니다.`;

        selectedFiles.forEach((file, index) => {
            const li = document.createElement("li");

            const fileNameSpan = document.createElement("span");
            fileNameSpan.className = "file-name";
            fileNameSpan.textContent = file.name;

            const removeButton = document.createElement("button");
            removeButton.className = "remove-file";
            removeButton.innerHTML = "&times;";
            removeButton.onclick = function () {
                removeFile(index);
            };

            li.appendChild(fileNameSpan);
            li.appendChild(removeButton);
            fileList.appendChild(li);
        });
    }
}

// 파일 제거 함수
function removeFile(index) {
    selectedFiles.splice(index, 1);
    renderFileList();
}

// 폼 제출 처리
supportForm.addEventListener("submit", function (event) {
    event.preventDefault(); // 기본 제출 방지

    const message = document.getElementById("message").value.trim();
    if (!message) {
        alert("내용을 작성해주세요.");
        return;
    }

    // 폼 데이터 생성
    const formData = new FormData();
    formData.append("stationName", stationNameInput.value);
    formData.append("message", message);

    // 선택된 파일이 있을 경우 추가
    if (selectedFiles.length > 0) {
        selectedFiles.forEach((file, index) => {
            formData.append("photo", file);
        });
    }

    // 서버로 폼 데이터 전송 (AJAX)
    fetch('/submitSupport', { // 실제 제출 URL로 변경
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                alert("지원 요청이 성공적으로 전송되었습니다!");
                closeModal();
            } else {
                alert("지원 요청 전송에 실패했습니다.");
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert("지원 요청 전송에 실패했습니다.");
        });
});
