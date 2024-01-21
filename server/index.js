const express = require('express');
const app = express();
const admin = require('firebase-admin');
const serviceAccount = require('./firebase.json');
const cors = require('cors');
app.use(cors());


app.use(express.json());


// DB configuration

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Routes
app.post('/todo', async (req, res) => {
    const { title } = req.body;
    const todo = { title, completed: false };
    const addedTodo = await db.collection('todos').add(todo);
    res.status(201).send({ id: addedTodo.id, ...todo });
});

app.get('/todos', async (req, res) => {
    const todosSnapshot = await db.collection('todos').get();
    const todos = [];
    todosSnapshot.forEach(doc => {
        todos.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).send(todos);
});

// Write routes to update todo
app.put('/todo/:id', async (req, res) => {
    // check if given todo id exists, only then update the todo
    const { id } = req.params;
    const todoSnapshot = await db.collection('todos').doc(id).get();
    if (!todoSnapshot.exists) {
        res.status(404).send('Todo not found');
        return;
    }
    const { title, completed } = req.body;
    const todo = { title, completed };
    await db.collection('todos').doc(id).set(todo);
    res.status(200).send({ id, ...todo });
});

// Delete todo
app.delete('/todo/:id', async (req, res) => {
    // check if given todo id exists, only then delete the todo
    const { id } = req.params;
    const todoSnapshot = await db.collection('todos').doc(id).get();
    if (!todoSnapshot.exists) {
        res.status(404).send('Todo not found');
        return;
    }
    await db.collection('todos').doc(id).delete();
    res.status(200).send({ id });
});


app.use(express.json());

app.get('/', (req, res) => {
    res.send('Todo App Backend');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


