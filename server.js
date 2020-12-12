const express = require('express');
const app = express();
const analyze = require('./function/program');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.post('/analyze/tasks', (req, res) => {
  let result = analyze.analyzeTasks(req.body.input);
  res.send(result)
});

app.listen(3000, () => {
  console.log('server running')
})
