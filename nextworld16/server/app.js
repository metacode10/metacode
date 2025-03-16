import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const todoList = [{
    id: 1,
    text: '할일 1',
    done : false,
}];

let id = 2; // Initialize id

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/todo', (req, res) => {
    res.json(todoList);
});

app.post('/api/todo', (req, res) => {
    const { text, done } = req.body;
    if (typeof text !== 'string' || typeof done !== 'boolean') {
        return res.status(400).json({ error: "Invalid request body" });
    }
    
    todoList.push({
        id: id++, 
        text,
        done,
    });

    return res.send('success');
});

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});