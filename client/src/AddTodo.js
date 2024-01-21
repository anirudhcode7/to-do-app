import React, { useState } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function AddTodo({ onTodoAdded }) {
    const [title, setTitle] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!title) return;
        await axios.post('http://localhost:3001/todo', { title });
        setTitle('');
        onTodoAdded();
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: 'auto', maxWidth: 900, display: 'flex', gap: '20px' }}>
            <TextField
                fullWidth
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Add a new todo..."
            />
            <Button
                type="submit"
                variant="contained"
                sx={{ bgcolor: '#9c27b0', '&:hover': { bgcolor: '#7b1fa2'  } }} // use violet color from MUI colors
            >
                Add
            </Button>
        </form>
    );
}

export default AddTodo;
