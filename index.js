require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

app.listen(process.env.PORT, () => console.log(`ouvindo porta ${process.env.PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const error = require('./middlewares/error');
const userCreate = require('./controllers/userCreate');
const authName = require('./middlewares/authName');
const authEmail = require('./middlewares/authEmail');
const authPass = require('./middlewares/authPass');
const validateEmail = require('./middlewares/validateEmail');

app.post('/user', authName, authEmail, authPass, validateEmail, userCreate);

app.use(error);