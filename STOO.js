
document.addEventListener('DOMContentLoaded', () => { //이벤트가 발생했을떄 HTML 문서가 완전히 구문 분석되고, 모든 지연된 스크립트가 다운로드 및 실행될 때 발생하는 이벤트
    const textarea = document.querySelector('#box1 textarea'); //box
    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#submit');
    // 추가할 위치의 부모 요소 선택
    const parentsBox=document.getElementById('input_templet');
    // 할 일 저장하기
function loadTodos() {
    parentsBox.innerHTML = ''; // 기존 내용 비우기
    const todos = JSON.parse(localStorage.getItem('todos') || '[]'); // JSON.parse()는 문자열을 객체(또는 배열)로 바꿈. localStorage에서 'todos' 키의 값을 불러오고, 없으면 빈 배열로 시작함,localStorage는 웹 개발에서 데이터를 브라우저에 저장할 수 있는 기능
    todos.forEach((todo,index) => { // forEach는 배열을 하나씩 반복할 때 쓰는 반복문
    const box =document.createElement('div');//div스타일로 박스를 js에서만 구현
    box.className='box';//넣을 클래스 이름을 넣기
    box.innerHTML=`
        <button class="delete-btn" data-index="${index}"> 
            <img src="../images/Cancel.png" alt="각각삭제"
        </button>
        <label>
            <input type="checkbox" ${todo.done ? 'checked' : ''} data-index="${index}">
            ${todo.text}
        </label>`//체크 박스를  각 인덱스 해당하는 박스에 같이 출력,data index는 각의 index를 10진수로 저장 밑에각각삭제에서 구현(gpt참고..)
        parentsBox.appendChild(box);//box를 부모요소에서 보이게 힘
    })
}

    // 저장 함수
    function saveTodo() {
        const text = textarea.value.trim();//trim()은 앞뒤 공백을 없애줌,이를 통해 조건문에서 textarea에 입력x이면 제한
        if (!text) {
            alert('할 일을 입력하세요!');
            return;
        }

        let todos = JSON.parse(localStorage.getItem('todos') || '[]');//고정이었던 todo를 다시 변환가능한 값으로 변환
        todos.push({ text: text, done: false });//객체에 text: 입력한 할 일 내용, done: 체크 상태를 배열에 추가
        localStorage.setItem('todos', JSON.stringify(todos));//JSON.stringify(todos)는 문자열로 todo를 다시 변환
        textarea.value = '';
        loadTodos();//다시 입력받기 위해 초기화
    }

    // 전체 삭제 함수
    function deleteAll() {
        if (confirm('정말 모든 할 일을 삭제할까요?')) { //alert 경고창으로 삭제하실건지 확인
        localStorage.removeItem('todos');//배열을 삭제
        loadTodos();//다시입력받기 위해 초기화
        }
    }
    //각각 삭제
    // const deleteButton2 = document.querySelector('#delete');

    // function eachdelete(){
    //     if
    // }
    // 체크 상태 저장
parentsBox.addEventListener('change', (e) => {//addEventListener('change', (e) => { ... }) 는 어떤 요소에서 값이 바뀌었을 때 실행할 함수(이벤트 핸들러)를 등록하는 코드
    if (e.target.type === 'checkbox') { //이벤트 객체 e에서 이벤트가 발생한 정확한 HTML 요소
        const index = e.target.dataset.index;//data-index라는 사용자 정의 데이터 속성(data attribute) 값 --일종의 인덱스
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');//투두 객체는 다시 고정
        todos[index].done = e.target.checked; //todo[index]에 값이 입력받으면 true값을 줌
        localStorage.setItem('todos', JSON.stringify(todos));//페이지 새로고침고침해도 true값을 유지하기 위해 문자열로 저장
    }
});
//각각삭제
    parentsBox.addEventListener('click', (e) => {
        const btn=e.target.closest('.delete-btn')
        // 1) 개별 삭제 버튼 클릭
        if (btn) {
            const todos = JSON.parse(localStorage.getItem('todos') || '[]');
            const index= parseInt(btn.dataset.index,10);
            todos.splice(index, 1);  // 해당 항목 제거
            localStorage.setItem('todos', JSON.stringify(todos));
            loadTodos();
            return;
        }
    });

    // 이벤트 연결
    saveButton.addEventListener('click', saveTodo);
    deleteButton.addEventListener('click', deleteAll);
    // delete.
    loadTodos(); // 다시입력받기 위해 초기화
});



