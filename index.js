const express = require('express');
const app = express();
const mongoose = require('mongoose');
const equipementRouter = require('./routes/equipements');
app.use(express.json());

app.use('/api/equipements', equipementRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`app is running on ${port}`);
})
