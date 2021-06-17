const express = require('express');
const cors = require('cors');
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));




// routes
app.use(require('./routes/index'));


app.listen(8000);
console.log('Serve on port 8000');