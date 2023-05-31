if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const router = require('./routers');
const app = express();
const port = process.env.PORT || 4000;
const cors = require('cors');

app.use(cors());

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true }));

app.use(express.json());



app.use(router);

app.listen(port, () => {
  console.log(`Listening from port ${port}`);
});
