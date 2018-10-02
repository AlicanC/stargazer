const express = require('express');
const path = require('path');

const github_callback = require('./github_callback.js');

const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static(path.resolve(__dirname, '../build')));

app.get('/github_callback', github_callback);

app.get('*', (request, response) => {
  response.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.error(`Node.js ${process.pid}: listening on port ${PORT}`);
});
