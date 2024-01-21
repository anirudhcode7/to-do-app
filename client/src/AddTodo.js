import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ onTodoAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;
        await axios.post('http://localhost:3001/todo', { title });
        setTitle('');
        onTodoAdded(); // Trigger refresh of the todo list
    };

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Add a new todo..." 
            />
            <button type="submit">Add</button>
        </form>
    );
}

export default AddTodo;
