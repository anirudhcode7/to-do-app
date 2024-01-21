import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import TodoList from './TodoList';

function App() {
    const [todos, setTodos] = useState([]);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:3001/todos');
        setTodos(response.data);
    };

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div>
            <h1>Todo App</h1>
            <AddTodo onTodoAdded={fetchTodos} />
            <TodoList todos={todos} />
        </div>
    );
}

export default App;
