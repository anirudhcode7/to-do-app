import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';
import TodoList from './TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5' // A light gray background color
    },
    // Define other theme properties if needed
  },
  // You can also customize typography and other components here
});


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
      <ThemeProvider theme={theme}>
          <div style={{ padding: '20px' }}>
              <h1 style={{ textAlign: 'center', margin: '100px 0' }}>Todo App</h1>
              <AddTodo onTodoAdded={fetchTodos} />
              <TodoList todos={todos} onTodoDeleted={fetchTodos} />
          </div>
      </ThemeProvider>
  );
}

export default App;
