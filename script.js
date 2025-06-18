document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.querySelector('.addbutton');
    const input = document.getElementById('addtext');
    const container = document.querySelector('.container');

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos') || '[]');
        todos.forEach(todo => addTodo(todo.text, todo.done));
    }

    function saveTodos() {
        const items = container.querySelectorAll('.items');
        const todos = Array.from(items).map(item => {
            return {
                text: item.querySelector('p').textContent,
                done: item.querySelector('.doneCheck').checked
            };
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function addTodo(text, done = false) {
        const item = document.createElement('div');
        item.className = 'items filled';
        item.innerHTML = `
            <div class="delete"></div>
            <p>${text}</p>
            <input class="doneCheck" type="checkbox" ${done ? 'checked' : ''}>
        `;

        item.querySelector('.delete').addEventListener('click', () => {
            item.remove();
            saveTodos();
        });

        const checkbox = item.querySelector('.doneCheck');
        const p = item.querySelector('p');
        function updateLine() {
            if (checkbox.checked) {
                p.style.textDecoration = 'line-through';
                p.style.color = '#aaa';
            } else {
                p.style.textDecoration = 'none';
                p.style.color = '';
            }
        }
        checkbox.addEventListener('change', () => {
            updateLine();
            saveTodos();
        });
        updateLine();

        container.appendChild(item);
    }

    addButton.addEventListener('click', () => {
        const text = input.value.trim();
        if (!text) {
            alert('할 일을 입력하세요.');
            return;
        }
        addTodo(text);
        input.value = '';
        saveTodos();
    });

    input.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
            addButton.click();
        }
    });

    loadTodos();
});