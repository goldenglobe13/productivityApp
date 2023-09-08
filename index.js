const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

dotenv.config({ path: './config.env' });

const express = require('express');
const morgan = require('morgan');
const WebSocket = require('ws');

const seriesRouter = require('./routes/seriesRoutes');

const app = express();

// 1) MIDDLEWARES
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 2) ROUTE HANDLERS

// 3) ROUTES

app.use('/api/v1/series', seriesRouter);

// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD,
// );

const DB = `mongodb+srv://amin:DSFKEeuifg3RweVQ@natourscluster.ze8boia.mongodb.net/imdb?retryWrites=true&w=majority`;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection successful');
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;

const wss = new WebSocket.Server({ port: port });
wss.on('connection', (ws, req) => {
  ws.id = req.headers['sec-websocket-key'];
  // console.log(ws);
  console.log(ws.id);
  ws.on('message', (message) => {
    console.log(`Received message from ${ws.id} => ${message}`);
  });
  ws.send('Hello! Message From Server!!');
});

// 1) START SERVER

// app.listen(port, () => {
//   console.log(`App running on port ${port}...`);
// });
