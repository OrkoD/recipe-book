const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

const recipeRoutes = require('./routes/recipe');

// mongoose.connect('mongodb://localhost:27017/recipe-book', { useNewUrlParser: true });
mongoose.connect('mongodb://Orest:password1111@ds233541.mlab.com:33541/recipe-book', { useNewUrlParser: true });
mongoose.connection.on('connected', () => console.log(`Connected to database...`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/recipe', recipeRoutes);

app.get('*', (req, res) => res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(port, () => console.log(`Server started on port: ${port}`));