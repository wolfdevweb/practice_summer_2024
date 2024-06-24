'use strict';

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express(); //создаем экземпляр Express.js приложения
const authRoutes = require('./routes/authRouter');
const winston = require('winston');
const expressWinston = require('express-winston');
const PORT = 3005;
const projectRoutes = require('./routes/projectsRouter');
const LINK =
  'mongodb+srv://root:uF5fFJRAf7F67qcg@cluster.xpwlncm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';

mongoose
  .connect(LINK)
  .then(() => console.log('çonnect succesful'))
  .catch((e) => console.log(e));

app.use(express.json()); //устанавливаем парсер json для обработки данных
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});
app.use(
  expressWinston.logger({
    winstonInstance: logger,
    meta: true,
    msg: 'HTTP {{req.method}} {{req.url}} - Body: {{JSON.stringify(req.body)}}',
    expressFormat: true,
    colorize: false,
    ignoreRoute: function () {
      return false;
    },
  })
);
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    optionsSuccessStatus: 200,
  })
);

app.use('/api', authRoutes);
app.use('/api', projectRoutes);
app.use((err, req, res) => {
  res.status(500).send('Something broke !');
});

app.listen(PORT, () => {
  console.log('server is running');
});
app.use(
  expressWinston.errorLogger({
    winstonInstance: logger,
  })
);
