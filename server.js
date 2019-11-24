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
  console.log(req.body.id);
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
  console.log(gallery);
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

  users.forEach(elem => {
    console.log(elem.userName);
    if (
      emailValid === -1 &&
      elem.userName === req.body.login &&
      elem.password === req.body.password
    ) {
      console.log(elem);
      res.send(elem.login);
    } else if (
      emailValid !== -1 &&
      elem.email === req.body.login &&
      elem.password === req.body.password
    ) {
      console.log('2');
      res.send(elem.login);
    } else {
      console.log('3');
      res.send('error');
    }
  });
});

app.listen(3000, () => console.log('port 3000'));
