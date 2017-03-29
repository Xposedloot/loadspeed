import http from 'http';
import socketIo from 'socket.io';
import fs from 'fs';
import request from 'request';

// handle routes
const handler = (req, res) => {
  return res.end(JSON.stringify({
    message: 'hello world'
  }));
}

const app = http.createServer(handler);
const io = socketIo(app);

const loadPage = (url) => {
  return new Promise((res, rej) => {
    let time = Date.now();
    request(url, (err, response) => {
      time = Date.now() - time;

      if(err)
        return rej(err);

      return res({
        'statusCode:', response && response.statusCode,
        'load_time': time
      })

    })
  })
}

io.on('connection', (socket) => {
  console.log(socket.id);
})

app.listen(8080);
