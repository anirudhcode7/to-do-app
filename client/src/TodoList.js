import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';

function TodoList({ todos, onTodoDeleted }) {

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/todo/${id}`);
            onTodoDeleted(); // Refresh the todo list
        } catch (error) {
            console.error('There was an error deleting the todo!', error);
        }
    };


    return (
        <div style={{ margin: 'auto', maxWidth: 600 }}>
            {todos.map(todo => (
                <Card key={todo.id} style={{ margin: '8px 0' }}>
                    <CardContent style={{ display: 'flex', alignItems: 'center' }}>
                        <Checkbox />
                        <Typography variant="h6" style={{ flexGrow: 1 }}>
                            {todo.title}
                        </Typography>
                        <IconButton onClick={() => handleDelete(todo.id)} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </CardContent>
                    
                </Card>
            ))}
        </div>
    );
}

export default TodoList;
