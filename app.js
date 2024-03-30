const express = require("express");
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/src'));

app.get("/", (req, res) => 
  res.sendFile(__dirname + '/src/index.html')
);

app.listen(port, () => console.log(`Listening on port ${port}`));