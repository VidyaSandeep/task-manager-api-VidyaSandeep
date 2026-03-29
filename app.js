const express = require('express');
const app = express();
const port = 3000;
const tasksRoute = require('./test/routes/tasksRoute');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tasks', tasksRoute);

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.get('/', (req, res) => {
    console.log(req.query); 
    res.send('Hello World!');
})



module.exports = app;