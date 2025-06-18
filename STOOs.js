document.addEventListener('DOMContentLoaded', () => {
    const textarea = document.querySelector('#box1 textarea');
    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#submit');
    const parentBox = document.getElementById('input_templet');

  // 할 일 로드
function loadTodos() {
    parentBox.innerHTML = ''; // 기존 내용 비우기
    const todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.forEach((todo, index) => {
        const box = document.createElement('div');
        box.className = 'box';
        box.innerHTML = `
        <label>
            <input type="checkbox" ${todo.done ? 'checked' : ''} data-index="${index}">
            ${todo.text}
        </label>
        `;
        parentBox.appendChild(box);
    });
}

  // 저장
function saveTodo() {
    const text = textarea.value.trim();
    if (!text) {
        alert('할 일을 입력하세요!');
        return;
    }

    let todos = JSON.parse(localStorage.getItem('todos') || '[]');
    todos.push({ text: text, done: false });
    localStorage.setItem('todos', JSON.stringify(todos));
    textarea.value = '';
    loadTodos();
}

  // 전체 삭제
function deleteAll() {
    if (confirm('정말 모든 할 일을 삭제할까요?')) {
        localStorage.removeItem('todos');
        loadTodos();
    }
}

  // 체크 상태 업데이트
parentBox.addEventListener('change', (e) => {
    if (e.target.type === 'checkbox') {
        const index = e.target.dataset.index;
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos[index].done = e.target.checked;
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

  // 이벤트 연결
saveButton.addEventListener('click', saveTodo);
deleteButton.addEventListener('click', deleteAll);

  loadTodos(); // 처음 로드 시 실행
});
