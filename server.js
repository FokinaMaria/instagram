const { join } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { gallery } = require('./data.js');
const { users } = require('./data.js');

const app = express();

app.use(bodyParser());

app.use(express.static(join(__dirname, 'dist')));

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

app.get('/images', (req, res) => {
  res.send(gallery);
});

app.post('/images', (req, res) => {
  gallery.forEach(elem => {
    if (elem.id === req.body.id) {
      elem.likeCount++;
    }
  });
  res.send(gallery[req.body.id]);
});

app.post('/comment', (req, res) => {
  gallery.forEach(elem => {
    if (elem.id === req.body.id) {
      elem.comment.push(req.body);
      elem.commentCount++;
    }
  });
  res.send(gallery);
});

app.delete('/deleteComment', (req, res) => {
  let objDelete = JSON.parse(req.query.value);
  gallery.forEach(elem => {
    if (elem.id === objDelete.id) {
      elem.commentCount--;
      elem.comment = elem.comment.filter(
        x => x.deleteBindId !== objDelete.deleteBindId
      );
      res.send(elem.comment);
    }
  });
});

app.put('/user', (req, res) => {
  users.push(req.body);
  res.sendStatus(200);
});

app.post('/user', (req, res) => {
  let emailValid = req.body.login.lastIndexOf('@');
  let showError = 1;
  let showLogin = '';
  users.forEach(elem => {
    if (
      emailValid === -1 &&
      elem.userName === req.body.login &&
      elem.password === req.body.password
    ) {
      showError = 0;
      showLogin = elem.login;
    } else if (
      emailValid !== -1 &&
      elem.email === req.body.login &&
      elem.password === req.body.password
    ) {
      showError = 0;
      showLogin = elem.login;
    }
  });
  if (showError === 1) {
    res.send('error');
  } else {
    res.send(showLogin);
  }
});

app.listen(3000, () => console.log('port 3000'));
